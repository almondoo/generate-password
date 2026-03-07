export function toDecimal(value: string, base: number): bigint {
  if (value.trim() === '') throw new Error('Empty input');
  const cleaned = value.trim().toLowerCase().replace(/^0[xXoObB]/, '');
  return BigInt(`${base === 16 ? '0x' : base === 8 ? '0o' : base === 2 ? '0b' : ''}${cleaned}`);
}

export function fromDecimal(decimal: bigint, base: number): string {
  if (base === 10) return decimal.toString(10);
  if (base === 16) return decimal.toString(16).toUpperCase();
  return decimal.toString(base);
}

export function convertBase(value: string, fromBase: number): { dec: string; bin: string; oct: string; hex: string } {
  const decimal = fromBase === 10 ? BigInt(value.trim()) : toDecimal(value, fromBase);
  return {
    dec: fromDecimal(decimal, 10),
    bin: fromDecimal(decimal, 2),
    oct: fromDecimal(decimal, 8),
    hex: fromDecimal(decimal, 16),
  };
}
