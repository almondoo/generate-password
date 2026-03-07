export function encodeUrl(text: string): string {
  return encodeURIComponent(text);
}

export function decodeUrl(encoded: string): string {
  return decodeURIComponent(encoded);
}
