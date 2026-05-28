import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function generateReferralCode(length = 8): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      throw new Error("Missing email or OTP");
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Fetch pending registration
    const { data: pending, error: fetchError } = await supabase
      .from("pending_registrations")
      .select("*")
      .eq("email", email)
      .single();

    if (fetchError || !pending) {
      throw new Error("No pending registration found. Please sign up again.");
    }

    // Check expiry
    if (new Date(pending.expires_at) < new Date()) {
      await supabase.from("pending_registrations").delete().eq("email", email);
      throw new Error("Verification code expired. Please sign up again.");
    }

    // Hash the submitted OTP and compare
    const hashBuffer = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(otp)
    );
    const otpHash = Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    if (otpHash !== pending.otp_hash) {
      throw new Error("Invalid verification code");
    }

    // Create the Supabase auth user with email pre-confirmed
    const { data: authData, error: createError } = await supabase.auth.admin.createUser({
      email: pending.email,
      password: pending.password,
      email_confirm: true,
      user_metadata: { username: pending.username },
    });

    if (createError) {
      if (createError.message.includes("already been registered")) {
        throw new Error("An account with this email already exists.");
      }
      throw createError;
    }

    // Create profile (upsert in case a trigger already created one)
    await supabase.from("profiles").upsert(
      {
        id: authData.user.id,
        username: pending.username,
        hack_points: 0,
        referral_code: generateReferralCode(),
      },
      { onConflict: "id" }
    );

    // Clean up pending registration
    await supabase.from("pending_registrations").delete().eq("email", email);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
