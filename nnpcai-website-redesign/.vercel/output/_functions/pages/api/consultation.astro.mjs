import { Resend } from 'resend';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const TO_EMAIL = "linmyatphyo03@gmail.com";
const FROM_EMAIL = "NNPC AI <onboarding@resend.dev>";
const RESEND_API_KEY = "re_QKHY4T4i_C2xELW5aEaha67cSfgpq6mJM";
const RATE_LIMIT_WINDOW_MS = Number(
  10 * 60 * 1e3
);
const RATE_LIMIT_MAX = Math.max(
  1,
  Number(5)
);
const resend = new Resend(RESEND_API_KEY) ;
const rateLimitStore = /* @__PURE__ */ new Map();
const getClientIp = (request) => {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }
  return request.headers.get("x-real-ip") ?? "unknown";
};
const checkRateLimit = (key) => {
  const now = Date.now();
  const entry = rateLimitStore.get(key);
  if (!entry || entry.resetAt <= now) {
    const resetAt = now + RATE_LIMIT_WINDOW_MS;
    rateLimitStore.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1, resetAt };
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }
  entry.count += 1;
  return {
    allowed: true,
    remaining: Math.max(0, RATE_LIMIT_MAX - entry.count),
    resetAt: entry.resetAt
  };
};
const safeField = (value) => typeof value === "string" ? value.trim() : "";
const isValidEmail = (email) => /.+@.+\..+/.test(email);
const POST = async ({ request }) => {
  if (!resend) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "Email service not configured."
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
  const limit = checkRateLimit(getClientIp(request));
  if (!limit.allowed) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "Too many requests. Please try again later."
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "X-RateLimit-Limit": RATE_LIMIT_MAX.toString(),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": Math.ceil(limit.resetAt / 1e3).toString()
        }
      }
    );
  }
  const formData = await request.formData();
  const honeypot = safeField(formData.get("company_website"));
  if (honeypot) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }
  const name = safeField(formData.get("name"));
  const company = safeField(formData.get("company"));
  const email = safeField(formData.get("email"));
  const phone = safeField(formData.get("phone"));
  const industry = safeField(formData.get("industry"));
  const interest = safeField(formData.get("interest"));
  const message = safeField(formData.get("message"));
  if (!name || !company || !email || !phone || !isValidEmail(email)) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "Missing or invalid required fields."
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
  const text = [
    `Name: ${name}`,
    `Company: ${company}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Industry: ${industry || "Not provided"}`,
    `Interest: ${interest || "Not provided"}`,
    `Message: ${message || "Not provided"}`
  ].join("\n");
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New consultation request from ${company}`,
      text
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "Failed to send email. Please try again later."
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "X-RateLimit-Limit": RATE_LIMIT_MAX.toString(),
      "X-RateLimit-Remaining": limit.remaining.toString(),
      "X-RateLimit-Reset": Math.ceil(limit.resetAt / 1e3).toString()
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	POST,
	prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
