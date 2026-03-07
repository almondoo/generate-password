export type TokenFormat = 'hex' | 'base64' | 'url-safe';

export interface TokenInputs {
  format: TokenFormat;
  byteLength: number;
  generatedNumber: number;
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

function bytesToBase64(bytes: Uint8Array): string {
  const binary = String.fromCharCode(...bytes);
  return btoa(binary);
}

function bytesToUrlSafe(bytes: Uint8Array): string {
  return bytesToBase64(bytes)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export function generateToken(format: TokenFormat, byteLength: number): string {
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);

  switch (format) {
    case 'hex':
      return bytesToHex(bytes);
    case 'base64':
      return bytesToBase64(bytes);
    case 'url-safe':
      return bytesToUrlSafe(bytes);
  }
}

export function generateTokens(inputs: TokenInputs): string[] {
  return Array.from({ length: inputs.generatedNumber }, () =>
    generateToken(inputs.format, inputs.byteLength),
  );
}
