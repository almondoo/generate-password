import pako from 'pako';

export function compressGzip(text: string): string {
  const compressed = pako.gzip(text);
  const chunkSize = 8192;
  const parts: string[] = [];
  for (let i = 0; i < compressed.length; i += chunkSize) {
    parts.push(String.fromCharCode(...compressed.subarray(i, i + chunkSize)));
  }
  return btoa(parts.join(''));
}

export function decompressGzip(base64: string): string {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return pako.ungzip(bytes, { to: 'string' });
}
