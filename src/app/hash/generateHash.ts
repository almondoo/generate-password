export type HashAlgorithm = 'SHA-1' | 'SHA-256' | 'SHA-512';

export interface HashInputs {
  text: string;
  algorithm: HashAlgorithm;
  uppercase: boolean;
}

export async function generateHash(inputs: HashInputs): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(inputs.text);
  const hashBuffer = await crypto.subtle.digest(inputs.algorithm, data);
  const hashArray = new Uint8Array(hashBuffer);
  let hex = Array.from(hashArray, (b) => b.toString(16).padStart(2, '0')).join('');
  if (inputs.uppercase) hex = hex.toUpperCase();
  return hex;
}
