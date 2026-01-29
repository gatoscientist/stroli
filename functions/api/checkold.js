export async function onRequestPost(context) {
  const { request, env } = context;

  const body = await request.json();
  const inputPassword = body.password;

  if (inputPassword === env.STROLI_PASSWORD) {
    return new Response(
      JSON.stringify({ ok: true }),
      { headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({ ok: false }),
    { status: 401, headers: { "Content-Type": "application/json" } }
  );
}
