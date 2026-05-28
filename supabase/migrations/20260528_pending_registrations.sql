-- Temporary store for in-progress signups while OTP is being verified.
-- Rows are deleted immediately after a successful verification.
-- The edge functions access this table via the service role key, which bypasses RLS.
CREATE TABLE IF NOT EXISTS pending_registrations (
  id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  email       text        UNIQUE NOT NULL,
  username    text        NOT NULL,
  password    text        NOT NULL,
  otp_hash    text        NOT NULL,
  expires_at  timestamptz NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE pending_registrations ENABLE ROW LEVEL SECURITY;
-- No RLS policies: anon/authenticated roles cannot read or write this table.
-- Only the service_role (used by edge functions) bypasses RLS.
