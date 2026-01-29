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

  // 🔓 PASSWORD OK → SERVIR Holi.txt
  const fileUrl = new URL("/secret/Holi.txt", request.url);
  const file = await fetch(fileUrl);

  if (!file.ok) {
    return new Response("File not found", { status: 404 });
  }

  return new Response(file.body, {
    headers: {
      "Content-Type": "text/plain",
      "Content-Disposition": "attachment; filename=Holi.txt"
    }
  });
}
