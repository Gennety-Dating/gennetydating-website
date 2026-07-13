// 🟠 BETA-ONLY — Landing closed-beta mode (source of truth).
//
// Everything beta-specific in this codebase is gated on `BETA_MODE` and tagged
// with a `🟠 BETA-ONLY` comment. To leave beta you have two options (both are
// documented in BETA_WEBSITE.md):
//   1. Instant: set BETA_MODE = false  → production email→OTP flow returns,
//      every beta branch goes dormant. Nothing else to touch.
//   2. Full purge: delete this file + every `🟠 BETA-ONLY` block.
//
// Either way, unrelated visual changes made after beta was introduced are NOT
// entangled with this logic, so they survive the rollback untouched.

/**
 * Master switch for the landing's closed-beta mode.
 *
 * true  → CTAs deep-link straight into the Telegram bot (the phone one-tap
 *         flow lives entirely inside the bot); the on-site email→OTP modal is
 *         bypassed.
 * false → production behaviour: the email→OTP RegistrationButton modal.
 */
export const BETA_MODE = false;

/**
 * Telegram bot the beta CTAs open. Defaults to the beta production bot
 * (`@gennetybetabot`, see "Gennety Dating Beta/deploy.md"). Override per
 * environment with NEXT_PUBLIC_BETA_BOT_USERNAME (with or without a leading "@").
 */
const BETA_BOT_USERNAME = (
  process.env.NEXT_PUBLIC_BETA_BOT_USERNAME || "gennetybetabot"
).replace(/^@/, "");

/** Bare bot link (no start param) — used for generic "message us" entry points. */
export const BETA_BOT_URL = `https://t.me/${BETA_BOT_USERNAME}`;

/**
 * Deep link the join/login CTAs open in beta mode.
 *
 * The `start` param is captured by the bot purely as
 * `referralSource = tg:<param>` (attribution). It MUST NOT begin with the bot's
 * reserved prefixes `auth_` / `web_` / `ref_`, nor equal `verify_done`, or the
 * bot's /start handler would treat it as a registration token / control signal
 * instead of plain attribution — hence the neutral `site_` prefix.
 */
export function betaBotUrl(purpose: "join" | "login"): string {
  const startParam = purpose === "login" ? "site_login" : "site_join";
  return `${BETA_BOT_URL}?start=${startParam}`;
}
