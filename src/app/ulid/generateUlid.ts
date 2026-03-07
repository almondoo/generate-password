export interface UlidInputs {
  generatedNumber: number;
  lowercase: boolean;
}

const CROCKFORD = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

function encodeTime(time: number, length: number): string {
  let str = '';
  for (let i = length - 1; i >= 0; i--) {
    const mod = time % 32;
    str = CROCKFORD[mod] + str;
    time = Math.floor(time / 32);
  }
  return str;
}

function encodeRandom(length: number): string {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  let str = '';
  for (const byte of bytes) {
    str += CROCKFORD[byte % 32];
  }
  return str;
}

export function generateUlid(inputs: UlidInputs): string {
  const timestamp = encodeTime(Date.now(), 10);
  const random = encodeRandom(16);
  const ulid = timestamp + random;
  return inputs.lowercase ? ulid.toLowerCase() : ulid;
}

export function generateUlids(inputs: UlidInputs): string[] {
  return Array.from({ length: inputs.generatedNumber }, () =>
    generateUlid(inputs),
  );
}
