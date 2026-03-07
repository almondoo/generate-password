import { NextRequest, NextResponse } from 'next/server';

function extractMetaContent(html: string, property: string): string {
  const patterns = [
    new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']*)["']`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+property=["']${property}["']`, 'i'),
    new RegExp(`<meta[^>]+name=["']${property}["'][^>]+content=["']([^"']*)["']`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+name=["']${property}["']`, 'i'),
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return match[1];
  }
  return '';
}

function extractTitle(html: string): string {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match?.[1] ?? '';
}

function isPrivateHost(hostname: string): boolean {
  const parts = hostname.split('.').map(Number);
  if (hostname === 'localhost' || hostname === '[::1]') return true;
  if (parts.length === 4 && parts.every((n) => n >= 0 && n <= 255)) {
    if (parts[0] === 127) return true;
    if (parts[0] === 10) return true;
    if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
    if (parts[0] === 192 && parts[1] === 168) return true;
    if (parts[0] === 169 && parts[1] === 254) return true;
    if (parts[0] === 0) return true;
  }
  return false;
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');
  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return NextResponse.json({ error: 'Only HTTP(S) URLs are allowed' }, { status: 400 });
    }
    if (isPrivateHost(parsed.hostname)) {
      return NextResponse.json({ error: 'Private/internal URLs are not allowed' }, { status: 400 });
    }

    const res = await fetch(url, {
      headers: { 'User-Agent': 'bot' },
      redirect: 'follow',
      signal: AbortSignal.timeout(5000),
    });

    const contentLength = res.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > 2 * 1024 * 1024) {
      return NextResponse.json({ error: 'Response too large' }, { status: 400 });
    }

    const reader = res.body?.getReader();
    if (!reader) {
      return NextResponse.json({ error: 'No response body' }, { status: 500 });
    }
    const chunks: Uint8Array[] = [];
    let totalSize = 0;
    const maxSize = 200_000;
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalSize += value.byteLength;
      chunks.push(value);
      if (totalSize >= maxSize) break;
    }
    reader.cancel();
    const html = chunks.map(c => decoder.decode(c, { stream: true })).join('').slice(0, maxSize);

    const title = extractMetaContent(html, 'og:title') || extractTitle(html);
    const description = extractMetaContent(html, 'og:description') || extractMetaContent(html, 'description');
    const image = extractMetaContent(html, 'og:image');
    const siteName = extractMetaContent(html, 'og:site_name');

    return NextResponse.json({ title, description, image, url, siteName });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch URL' }, { status: 500 });
  }
}
