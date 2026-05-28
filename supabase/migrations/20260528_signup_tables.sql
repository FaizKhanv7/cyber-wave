-- ─── EVENT REGISTRATIONS ────────────────────────────────────────────────────
-- Stores attendee info collected from the /signup page.
-- Accessible to anyone for inserts; reads are restricted to the row owner.

CREATE TABLE IF NOT EXISTS event_registrations (
  id                   uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name            text        NOT NULL,
  dietary_restrictions text        NOT NULL DEFAULT 'None',
  referral_code_used   text,
  user_id              uuid        REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at           timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

-- Anyone (anon or authenticated) can register
CREATE POLICY "allow_public_insert" ON event_registrations
  FOR INSERT WITH CHECK (true);

-- Authenticated users can view their own registration
CREATE POLICY "allow_own_select" ON event_registrations
  FOR SELECT USING (auth.uid() = user_id);


-- ─── award_referral_points RPC ───────────────────────────────────────────────
-- Called from the /signup page when an optional referral code is submitted.
-- Always awards +50 to the code owner.
-- Also awards +10 to the caller and records the referral if they are logged in.
-- SECURITY DEFINER lets it run as the function owner (bypasses RLS on profiles/referrals).

CREATE OR REPLACE FUNCTION award_referral_points(p_code text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_owner_id  uuid;
  v_caller_id uuid;
BEGIN
  -- Resolve code owner (case-insensitive)
  SELECT id INTO v_owner_id
  FROM profiles
  WHERE referral_code = upper(p_code);

  IF v_owner_id IS NULL THEN
    RAISE EXCEPTION 'Invalid referral code';
  END IF;

  v_caller_id := auth.uid();

  -- Prevent self-referral
  IF v_caller_id IS NOT NULL AND v_caller_id = v_owner_id THEN
    RAISE EXCEPTION 'You cannot use your own referral code';
  END IF;

  -- Prevent a logged-in user from redeeming more than once
  IF v_caller_id IS NOT NULL THEN
    IF EXISTS (SELECT 1 FROM referrals WHERE referee_id = v_caller_id) THEN
      RAISE EXCEPTION 'You have already redeemed a referral code';
    END IF;
  END IF;

  -- Award +50 to the owner of the referral code
  UPDATE profiles SET hack_points = hack_points + 50 WHERE id = v_owner_id;

  -- If the caller is authenticated, award +10 and record the referral
  IF v_caller_id IS NOT NULL THEN
    UPDATE profiles SET hack_points = hack_points + 10 WHERE id = v_caller_id;
    INSERT INTO referrals (referrer_id, referee_id)
    VALUES (v_owner_id, v_caller_id)
    ON CONFLICT DO NOTHING;
  END IF;
END;
$$;
