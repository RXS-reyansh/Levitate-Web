// Levitate-Web/api-server.mjs
// Stats API — serves GET /api/stats (one-shot) and GET /api/stats/stream (SSE).
// The SSE endpoint uses a MongoDB change stream so clients receive updates the
// instant the bot writes new data — no client-side polling needed.

import { createServer } from 'http';
import { MongoClient }  from 'mongodb';

const PORT      = Number(process.env.STATS_API_PORT ?? 3001);
const MONGO_URI = process.env.MONGO_URI;
const BOT_ID    = process.env.BOT_IDENTIFIER ?? '';
const DB_NAME   = 'LevitateDiscordBot';

if (!MONGO_URI) {
  console.error('[API SERVER] MONGO_URI is not set — exiting.');
  process.exit(1);
}

const mongoClient = new MongoClient(MONGO_URI, { tls: true, connectTimeoutMS: 15_000 });

function col(name) {
  const prefixed = BOT_ID ? `${BOT_ID}_${name}` : name;
  return mongoClient.db(DB_NAME).collection(prefixed);
}

async function getStats() {
  const [botDoc, statsDoc] = await Promise.all([
    col('settings').findOne({ _id: 'bot_stats'    }),
    col('settings').findOne({ _id: 'global_stats' }),
  ]);
  return {
    servers:          botDoc?.servers          ?? 0,
    members:          botDoc?.members          ?? 0,
    channels:         botDoc?.channels         ?? 0,
    commandsExecuted: statsDoc?.commandsExecuted ?? 0,
  };
}

// ── SSE client registry ───────────────────────────────────────────────────────

/** @type {Set<import('http').ServerResponse>} */
const sseClients = new Set();

function broadcast(stats) {
  const payload = `data: ${JSON.stringify(stats)}\n\n`;
  for (const res of sseClients) {
    try { res.write(payload); } catch { sseClients.delete(res); }
  }
}

// ── MongoDB change stream — watches both settings docs ────────────────────────

async function watchChanges() {
  // Watch for any updates to the two docs we care about.
  const stream = col('settings').watch(
    [{ $match: { 'documentKey._id': { $in: ['bot_stats', 'global_stats'] } } }],
    { fullDocument: 'updateLookup' },
  );

  stream.on('change', async () => {
    try {
      const stats = await getStats();
      broadcast(stats);
    } catch (err) {
      console.error('[API SERVER] Broadcast error:', err.message);
    }
  });

  stream.on('error', (err) => {
    console.error('[API SERVER] Change stream error — retrying in 5 s:', err.message);
    stream.close().catch(() => {});
    setTimeout(watchChanges, 5_000);
  });

  console.log('[API SERVER] MongoDB change stream active');
}

// ── HTTP server ───────────────────────────────────────────────────────────────

const server = createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  const url = req.url?.split('?')[0];

  // ── One-shot JSON ──────────────────────────────────────────────────────────
  if (url === '/api/stats') {
    try {
      const stats = await getStats();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(stats));
    } catch (err) {
      console.error('[API SERVER] Error fetching stats:', err.message);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal server error' }));
    }
    return;
  }

  // ── SSE stream ─────────────────────────────────────────────────────────────
  if (url === '/api/stats/stream') {
    res.writeHead(200, {
      'Content-Type':  'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection':    'keep-alive',
      // Tell Nginx / any upstream proxy not to buffer this response.
      'X-Accel-Buffering': 'no',
    });
    res.flushHeaders();

    // Send current stats immediately so the client doesn't wait for the next change.
    try {
      const stats = await getStats();
      res.write(`data: ${JSON.stringify(stats)}\n\n`);
    } catch { /* non-fatal — client will get next broadcast */ }

    // Keep-alive comment every 25 s (prevents proxy/browser timeouts).
    const keepAlive = setInterval(() => {
      try { res.write(': keep-alive\n\n'); } catch { /* client gone */ }
    }, 25_000);

    sseClients.add(res);

    req.on('close', () => {
      clearInterval(keepAlive);
      sseClients.delete(res);
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

// ── Boot ──────────────────────────────────────────────────────────────────────

async function start() {
  await mongoClient.connect();
  console.log('[API SERVER] Connected to MongoDB');
  await watchChanges();
  server.listen(PORT, () => {
    console.log(`[API SERVER] Listening on port ${PORT} — /api/stats  /api/stats/stream`);
  });
}

start().catch(err => {
  console.error('[API SERVER] Failed to start:', err.message);
  process.exit(1);
});
