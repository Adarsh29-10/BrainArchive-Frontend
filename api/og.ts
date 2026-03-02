export const config = { runtime: 'edge' };

const APP_URL = 'https://brainarchive.vercel.app';
const API_URL = 'https://brainarchive.onrender.com';
const FALLBACK_TITLE = 'BrainArchive';
const FALLBACK_DESC = 'A public notebook on BrainArchive';

const BOT_UA =
  /whatsapp|twitter|facebook|linkedin|telegram|bot|crawler|slack|discord|skypeuripreview|googlebot|bingbot|yandex/i;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function clampText(value: string, max = 200): string {
  const trimmed = value.trim();
  return trimmed.length > max ? `${trimmed.slice(0, max - 1)}…` : trimmed;
}

function buildOgHtml(params: { title: string; description: string; canonicalUrl: string }) {
  const title = escapeHtml(clampText(params.title, 120));
  const description = escapeHtml(clampText(params.description, 220));
  const canonicalUrl = escapeHtml(params.canonicalUrl);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:site_name" content="BrainArchive" />
    <meta property="og:type" content="article" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="robots" content="index,follow,max-image-preview:large" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta http-equiv="refresh" content="0;url=${canonicalUrl}" />
  </head>
  <body>
    Redirecting to <a href="${canonicalUrl}">${canonicalUrl}</a>
  </body>
</html>`;
}

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const queryId = url.searchParams.get('id');
  const pathId = url.pathname.split('/').filter(Boolean).at(-1);
  const id = queryId || (pathId && pathId !== 'og' ? pathId : null);
  const fallbackUrl = id ? `${APP_URL}/public/nb/${encodeURIComponent(id)}` : `${APP_URL}/notebooks`;

  if (!id) {
    return Response.redirect(fallbackUrl, 302);
  }

  const ua = req.headers.get('user-agent') || '';
  const isBot = BOT_UA.test(ua);

  if (!isBot) {
    return Response.redirect(fallbackUrl, 302);
  }

  try {
    const response = await fetch(`${API_URL}/api/notebooks/public/${encodeURIComponent(id)}`, {
      headers: { accept: 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Notebook fetch failed with status ${response.status}`);
    }

    const data = await response.json();
    const notebook = data?.data ?? {};
    const title = notebook?.title ? `${String(notebook.title)} - BrainArchive` : FALLBACK_TITLE;
    const description = notebook?.description ? String(notebook.description) : FALLBACK_DESC;

    const html = buildOgHtml({
      title,
      description,
      canonicalUrl: fallbackUrl,
    });

    return new Response(html, {
      status: 200,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch {
    const html = buildOgHtml({
      title: FALLBACK_TITLE,
      description: FALLBACK_DESC,
      canonicalUrl: fallbackUrl,
    });

    return new Response(html, {
      status: 200,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  }
}
