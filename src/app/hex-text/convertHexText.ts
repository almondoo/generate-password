export function textToHex(text: string): string {
  return new TextEncoder()
    .encode(text)
    .reduce((acc, byte) => acc + (acc ? ' ' : '') + byte.toString(16).toUpperCase().padStart(2, '0'), '');
}

export function hexToText(hex: string): string {
  const trimmed = hex.trim();
  if (!trimmed) return '';
  const bytes = trimmed
    .split(/[\s,]+/)
    .map((h) => Number.parseInt(h, 16));
  return new TextDecoder().decode(new Uint8Array(bytes));
}
