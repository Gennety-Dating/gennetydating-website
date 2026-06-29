# Landing — Beta Mode (read before rolling back)

> 🟠 This file documents the landing's **closed-beta mode**: a self-contained,
> single-flag layer that makes the site's CTAs deep-link straight into the
> Telegram bot instead of running the on-site email→OTP registration modal.
> It is built so it can be turned off in one prompt without disturbing any
> unrelated visual changes made after beta was introduced.

## What beta mode changes (and nothing else)

In production the landing collects a university email, sends an OTP, completes
registration through the backend, and only then hands off to Telegram. The beta
app dropped email in favour of **phone one-tap inside the Telegram bot**, so the
on-site registration screen is redundant — beta just sends users straight to the
bot, where the whole flow runs.

Beta mode therefore does exactly two things:

1. **Button logic.** Every join/login CTA (`Join Now` + `Login` in the navbar,
   `Message Gennety to Join` in the hero — all the `RegistrationButton`
   component) skips the email→OTP modal and opens the Telegram bot directly.
   The footer's "message us" Telegram link points at the beta bot too.
2. **Beta UI.** A small `Beta` badge next to the wordmark in the navbar.

Everything else (copy, layout, sections, styling) is untouched and is **not**
part of the beta layer.

## Source of truth: one flag

`src/config/beta.ts` holds the master switch:

```ts
export const BETA_MODE = true;
```

- The bot the CTAs open defaults to **`@gennetybetabot`** (the beta production
  bot). Override per environment with `NEXT_PUBLIC_BETA_BOT_USERNAME`.
- CTAs deep-link with `?start=site_join` / `?start=site_login`. The bot captures
  this only as attribution (`referralSource = tg:site_join`). These params
  deliberately avoid the bot's reserved prefixes `auth_` / `web_` / `ref_` and
  the `verify_done` control signal, so they never get mistaken for a
  registration token.

## Rollback — two options

### Option A — instant toggle (reversible)
Flip the flag in `src/config/beta.ts`:

```ts
export const BETA_MODE = false;
```

That immediately restores the production email→OTP modal and hides all beta UI.
Every beta branch goes dormant; no other file needs touching. Best while you're
still switching back and forth between beta and prod.

### Option B — full purge (remove the beta code)
When the pivot to production is permanent, delete the beta layer entirely.
Every beta insertion is tagged with a `🟠 BETA-ONLY` comment, so the purge is
mechanical:

1. Delete `src/config/beta.ts` and `src/components/beta-badge.tsx`.
2. In `src/components/registration-button.tsx` — remove the `BETA_MODE` import
   and the `if (BETA_MODE) { ... }` early-return block (the email→OTP modal
   below it is the original prod component, untouched).
3. In `src/components/navbar.tsx` — remove the `BetaBadge` import and its usage
   (revert the wordmark back to a bare `<Link>` if you prefer).
4. In `src/components/sections/footer.tsx` — remove the `BETA_MODE` /
   `BETA_BOT_URL` import and restore `href={TELEGRAM_BOT_URL}`.
5. Delete this file.

Grep to confirm nothing is left behind:

```sh
grep -rn "BETA-ONLY\|BETA_MODE\|config/beta\|beta-badge" src
```

> Because the beta layer is isolated to the flag + the tagged blocks, any visual
> tweaks you make to the landing in the meantime are independent of it and
> survive either rollback path.
