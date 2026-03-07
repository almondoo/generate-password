export interface PinInputs {
  length: number;
  generatedNumber: number;
}

function secureRandomDigit(): number {
  const array = new Uint8Array(1);
  // Reject values >= 250 to avoid modulo bias (250 is the largest multiple of 10 <= 255)
  let value: number;
  do {
    crypto.getRandomValues(array);
    value = array[0];
  } while (value >= 250);
  return value % 10;
}

export function generatePin(length: number): string {
  return Array.from({ length }, () => secureRandomDigit()).join('');
}

export function generatePins(inputs: PinInputs): string[] {
  return Array.from({ length: inputs.generatedNumber }, () =>
    generatePin(inputs.length),
  );
}
