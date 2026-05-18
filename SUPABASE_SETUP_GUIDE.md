# Supabase Setup & Testing Guide

## Step 1: Get Your New Supabase Credentials

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your new project
3. Go to **Settings** → **API** (left sidebar)
4. Copy:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

---

## Step 2: Update `.env.local`

Open `.env.local` and set:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Then restart Vite** (`npm run dev`)

---

## Step 3: Verify Database Schema

Go to **SQL Editor** in Supabase and run this query to confirm tables exist:

```sql
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
```

You should see:
- `profiles`
- `referrals`
- `promo_codes`

---

## Step 4: Enable Email Signup (if not already done)

1. Go to **Authentication** → **Providers**
2. Click **Email**
3. Ensure **Enable Email Signup** is ON
4. Go to **Email Templates** and verify they look correct

---

## Step 5: Test the Full Flow

### Test 5a: Signup & Profile Auto-Creation

1. Open your app in browser: `http://localhost:5173`
2. Go to **Register** page
3. Sign up with test email: `test1@example.com` / password: `TestPass123!`
4. Check that:
   - You're redirected to login or dashboard
   - No errors in browser console

**Verify in Supabase:**
- Go to **Authentication** → **Users** → Should see `test1@example.com`
- Go to **SQL Editor** and run:
  ```sql
  SELECT * FROM profiles WHERE id = 'USER_ID_HERE';
  ```
  (Copy the user ID from Auth users table)
  - Should see a profile row with auto-generated `referral_code` and `username`

---

### Test 5b: Login

1. Go to **Auth** page
2. Login with `test1@example.com` / `TestPass123!`
3. Check:
   - Dashboard loads
   - Your username and hack_points (should be 0) display
   - No console errors

---

### Test 5c: Test Referral Code Redemption

1. Create a second test user:
   - Signup: `test2@example.com` / `TestPass123!`
   - Copy their **Referral Code** from dashboard

2. Login as `test1@example.com`
3. In **Dashboard**, paste `test2`'s referral code in the "Redeem Code" input
4. Click redeem

**Expected behavior:**
- `test1` gains 10 points (referee bonus)
- `test2` gains 50 points (referrer bonus)
- A row appears in `referrals` table

**Verify in Supabase:**
```sql
SELECT * FROM referrals;
SELECT id, username, hack_points FROM profiles;
```

---

### Test 5d: Test Promo Code (Optional)

1. Add a test promo code in Supabase SQL Editor:
   ```sql
   INSERT INTO promo_codes (code, points_awarded, description, max_uses, active)
   VALUES ('WELCOME10', 25, 'Welcome bonus', 100, true);
   ```

2. Login as a new test user
3. In Dashboard, redeem code `WELCOME10`
4. Check:
   - User gains 25 points
   - `use_count` increments in `promo_codes`

---

## Step 6: Verify Row-Level Security (RLS)

RLS is enabled on all tables. Test it:

1. **Profiles**: 
   - Anyone can read all profiles (public read policy)
   - Users can only update their own profile

2. **Referrals**: 
   - Users can only insert referrals for themselves (as referee_id)
   - Users can only read referrals where they're referrer or referee

3. **Promo Codes**:
   - Anyone can read active promo codes only

---

## Troubleshooting

### "Invalid path specified in request URL"
- .env.local URL should be: `https://xxxxx.supabase.co` (NOT `/rest/v1/`)
- Restart Vite after changing `.env.local`

### "Supabase signup failed due to a backend database issue"
- Check Supabase **Authentication** → **Logs** for the actual error
- Verify auth triggers are working: `SELECT * FROM information_schema.triggers;`
- Ensure `handle_new_user()` function exists: `SELECT * FROM information_schema.routines;`

### User signs up but no profile is created
- The trigger `on_auth_user_created` may not have fired
- Go to SQL Editor and manually run:
  ```sql
  SELECT * FROM information_schema.triggers WHERE trigger_name = 'on_auth_user_created';
  ```
- If missing, re-run the trigger creation SQL

### Referral code redemption fails
- Verify the `redeem_referral()` function exists in SQL Editor
- Check Supabase **Logs** for exact error message
- Ensure both users have profiles created
- Referral codes are case-insensitive (stored as UPPER)

### "You have already redeemed a referral code"
- Each user can only redeem ONE referral code total
- This is by design to prevent gaming the system

---

## Quick Checklist

- [ ] `.env.local` has correct URL and anon key
- [ ] Vite restarted after env change
- [ ] Can signup and see user in Auth → Users
- [ ] Profile created automatically (check profiles table)
- [ ] Can login and see dashboard
- [ ] Can see referral code on dashboard
- [ ] Can redeem another user's referral code
- [ ] Points update correctly for both users
- [ ] No console errors

---

## Next Steps

Once all tests pass:
1. Deploy to Vercel (update `.env.production` if needed)
2. Test in production environment
3. Add more promo codes as needed via SQL or admin panel
