export async function onRequestPost({ request, env }) {
  const { password } = await request.json();

  if (!env.STROLI_PASSWORD) {
    return new Response("Secret not configured", { status: 500 });
  }

  if (password !== env.STROLI_PASSWORD) {
    return new Response(
      JSON.stringify({ ok: false }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  // PASSWORD CORRECTA → SERVIR ARCHIVO
  const file = await fetch(new URL("/files/stroli-secret.zip", request.url));

  return new Response(file.body, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": "attachment; filename=stroli-secret.zip"
    }
  });
}
