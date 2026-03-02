export const config = { runtime: 'edge' }

export default async function handler(req: Request) {
  const id = new URL(req.url).searchParams.get('id')
  const ua = req.headers.get('user-agent') || ''
  const isBot = /whatsapp|twitter|facebook|linkedin|telegram|bot|crawler|slack/i.test(ua)

  if (!isBot) {
    return Response.redirect(`https://brainarchive.vercel.app/public/nb/${id}`, 302)
  }

  try {
    const response = await fetch(`https://brainarchive.onrender.com/api/notebooks/public/${id}`)
    const data = await response.json()
    const notebook = data.data

    const html = `<!DOCTYPE html>
<html>
  <head>
    <meta property="og:title" content="${notebook.title} - BrainArchive" />
    <meta property="og:description" content="${notebook.description || 'A public notebook on BrainArchive'}" />
    <meta property="og:url" content="https://brainarchive.vercel.app/public/nb/${id}" />
    <meta property="og:site_name" content="BrainArchive" />
    <meta property="og:type" content="article" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${notebook.title} - BrainArchive" />
    <meta name="twitter:description" content="${notebook.description || 'A public notebook on BrainArchive'}" />
  </head>
  <body></body>
</html>`

    return new Response(html, {
      headers: { 'content-type': 'text/html' }
    })
  } catch (e) {
    // fallback
    return Response.redirect(`https://brainarchive.vercel.app/public/nb/${id}`, 302)
  }
}