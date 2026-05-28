CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.cookie_consents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  action text NOT NULL CHECK (action IN ('accepted', 'rejected', 'partial', 'withdrawn')),
  policy_version text NOT NULL,
  categories jsonb NULL,
  ip_hash text NULL,
  user_agent text NULL,
  user_id text NULL,
  session_id text NULL,
  source text NOT NULL DEFAULT 'website',
  page_url text NULL
);

CREATE INDEX IF NOT EXISTS cookie_consents_created_at_idx
  ON public.cookie_consents (created_at);

CREATE INDEX IF NOT EXISTS cookie_consents_policy_version_idx
  ON public.cookie_consents (policy_version);

CREATE INDEX IF NOT EXISTS cookie_consents_user_id_idx
  ON public.cookie_consents (user_id);

CREATE INDEX IF NOT EXISTS cookie_consents_session_id_idx
  ON public.cookie_consents (session_id);

CREATE OR REPLACE FUNCTION public.prevent_cookie_consents_update_delete()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  RAISE EXCEPTION 'cookie_consents is append-only';
END;
$$;

DROP TRIGGER IF EXISTS cookie_consents_append_only ON public.cookie_consents;

CREATE TRIGGER cookie_consents_append_only
  BEFORE UPDATE OR DELETE ON public.cookie_consents
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_cookie_consents_update_delete();
