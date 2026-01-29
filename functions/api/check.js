export async function onRequestPost({ request, env }) {
  const { password } = await request.json();

  // Validación del secreto
  if (!env.STROLI_PASSWORD) {
    return new Response("Secret not configured", { status: 500 });
  }

  if (password !== env.STROLI_PASSWORD) {
    return new Response("Unauthorized", { status: 401 });
  }

  // 📄 PASSWORD OK → servir el PDF
  const fileUrl = new URL("/secret/Archivo_StroLi_271.pdf", request.url);
  const file = await fetch(fileUrl);

  if (!file.ok) {
    return new Response("File not found", { status: 404 });
  }

  return new Response(file.body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Archivo_StroLi_271.pdf"'
    }
  });
}
