import { createClient } from "npm:@supabase/supabase-js@2";
import { Resend } from "npm:resend@4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { email, username, password } = await req.json();

    if (!email || !username || !password) {
      throw new Error("Missing required fields: email, username, password");
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Hash the OTP with SHA-256
    const hashBuffer = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(otp)
    );
    const otpHash = Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    // Upsert pending registration (overwrites previous OTP for same email)
    const { error: upsertError } = await supabase
      .from("pending_registrations")
      .upsert(
        { email, username, password, otp_hash: otpHash, expires_at: expiresAt },
        { onConflict: "email" }
      );

    if (upsertError) throw upsertError;

    // Send OTP via Resend
    // NOTE: Replace 'noreply@wavehack.dev' with a Resend-verified sending address.
    // For testing, use 'onboarding@resend.dev' (Resend's shared test domain).
    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

    const { error: emailError } = await resend.emails.send({
      from: "WaveHack <noreply@wavehack.org>",
      to: email,
      subject: `[${otp}] Your WaveHack verification code`,
      html: `
        <div style="background:#020804;color:#f0fdf4;padding:40px;font-family:monospace;max-width:500px;margin:0 auto;border:1px solid rgba(16,185,129,0.3);border-radius:8px;">
          <div style="margin-bottom:24px;">
            <span style="color:#10b981;font-size:20px;font-weight:800;">WaveHack_</span>
          </div>
          <h2 style="color:#d1fae5;margin-bottom:16px;font-size:20px;">Verify your account</h2>
          <p style="color:#9ca3af;margin-bottom:32px;line-height:1.6;font-size:14px;">
            Enter the code below to confirm your WaveHack account.
            This code expires in <strong style="color:#10b981;">10 minutes</strong>.
          </p>
          <div style="background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);border-radius:6px;padding:24px;text-align:center;margin-bottom:32px;">
            <span style="font-size:40px;font-weight:800;letter-spacing:12px;color:#10b981;">${otp}</span>
          </div>
          <p style="color:#6b7280;font-size:12px;">
            If you didn't request this, you can safely ignore this email.
          </p>
        </div>
      `,
    });

    if (emailError) throw new Error("Failed to send verification email");

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
