export const config = { runtime: 'edge' };

const APP_URL = 'https://brainarchive.vercel.app';
const API_URL = 'https://brainarchive.onrender.com';
const FALLBACK_TITLE = 'BrainArchive';
const FALLBACK_DESC = 'A public notebook on BrainArchive';

type NotebookData = {
  title?: string;
  description?: string;
};

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
  return trimmed.length > max ? `${trimmed.slice(0, max - 3)}...` : trimmed;
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

async function fetchNotebook(id: string): Promise<NotebookData | null> {
  const candidates = [
    `${API_URL}/api/notebooks/public/${encodeURIComponent(id)}`,
    `${API_URL}/notebooks/public/${encodeURIComponent(id)}`,
    `${API_URL}/api/notebooks/${encodeURIComponent(id)}`,
    `${API_URL}/notebooks/${encodeURIComponent(id)}`,
  ];

  for (const endpoint of candidates) {
    try {
      const response = await fetch(endpoint, {
        headers: { accept: 'application/json' },
        cache: 'no-store',
      });

      if (!response.ok) continue;

      const payload = await response.json();
      const notebook = payload?.data ?? payload;

      if (notebook && (notebook.title || notebook.description)) {
        return notebook as NotebookData;
      }
    } catch {
      // try next endpoint
    }
  }

  return null;
}

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const queryId = url.searchParams.get('id');
  const pathSegments = url.pathname.split('/').filter(Boolean);
  const pathId = pathSegments[pathSegments.length - 1];
  const id = queryId || (pathId && pathId !== 'og' ? pathId : null);
  const canonicalUrl = id ? `${APP_URL}/public/nb/${encodeURIComponent(id)}` : `${APP_URL}/notebooks`;

  if (!id) {
    return Response.redirect(canonicalUrl, 302);
  }

  try {
    const notebook = await fetchNotebook(id);
    const title = notebook?.title ? `${String(notebook.title)} - BrainArchive` : FALLBACK_TITLE;
    const description = notebook?.description ? String(notebook.description) : FALLBACK_DESC;

    const html = buildOgHtml({
      title,
      description,
      canonicalUrl,
    });

    return new Response(html, {
      status: 200,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'public, s-maxage=60, stale-while-revalidate=300',
        'x-og-source': notebook ? 'notebook' : 'fallback',
      },
    });
  } catch {
    const html = buildOgHtml({
      title: FALLBACK_TITLE,
      description: FALLBACK_DESC,
      canonicalUrl,
    });

    return new Response(html, {
      status: 200,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'public, s-maxage=60, stale-while-revalidate=300',
        'x-og-source': 'fallback',
      },
    });
  }
}
