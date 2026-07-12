/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  MARQUEE TICKER — Config
 *  Edit this file to change what the scrolling banner above the footer says.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const marqueeConfig = {
  /** Symbol shown between each phrase. Swap for any character or short string. */
  separator: '✦',

  /** Phrases that loop endlessly, in order. */
  items: [
    'Premium Discord Bot',
    'Antinuke Protection',
    'Full Moderation Suite',
    'Server Logging',
    'Birthday System',
    'Welcomer System',
    '24/7 Uptime',
    'Free Forever',
  ],

  /** Seconds for one full loop of the phrase list. Lower = faster scroll. */
  speedSeconds: 28,
};
