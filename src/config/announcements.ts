/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  Rotating announcement badge
 *  The small pill shown in the corner of every page. It always stays on
 *  screen (no dismiss button) and cycles through the messages below.
 *
 *  - `messages`: add, remove, or reorder as many lines as you want — they
 *     rotate in this order, then loop back to the first one.
 *  - `intervalMs`: how long each message stays on screen before crossfading
 *     to the next one, in milliseconds (10000 = 10 seconds).
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const announcements = {
  intervalMs: 10000,
  messages: [
    'In God We Trust.',
    'No bitches?',
    'The eyes never lie.',
    '🗣️ CALL OUT MY NAME!',
    'Kiss me hard before you go 💗',
    '666',
    'No shit sherlock.',
  ],
};
