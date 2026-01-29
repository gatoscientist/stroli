export async function onRequestPost({ request, env }) {
  const { password } = await request.json();

  if (!env.STROLI_PASSWORD) {
    return new Response("Secret not configured", { status: 500 });
  }

  if (password !== env.STROLI_PASSWORD) {
    return new Response("Unauthorized", { status: 401 });
  }

  return new Response(
    JSON.stringify({ ok: true }),
    { headers: { "Content-Type": "application/json" } }
  );
}
