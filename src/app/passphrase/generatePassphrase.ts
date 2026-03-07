import { WORDLIST } from './wordlist';

export interface PassphraseInputs {
  wordCount: number;
  separator: string;
  capitalize: boolean;
  generatedNumber: number;
}

function secureRandomInt(max: number): number {
  const array = new Uint32Array(1);
  const limit = Math.floor(0x100000000 / max) * max;
  let value: number;
  do {
    crypto.getRandomValues(array);
    value = array[0];
  } while (value >= limit);
  return value % max;
}

export function generatePassphrase(inputs: PassphraseInputs): string {
  const words = Array.from({ length: inputs.wordCount }, () => {
    const word = WORDLIST[secureRandomInt(WORDLIST.length)];
    return inputs.capitalize ? word.charAt(0).toUpperCase() + word.slice(1) : word;
  });
  return words.join(inputs.separator);
}

export function generatePassphrases(inputs: PassphraseInputs): string[] {
  return Array.from({ length: inputs.generatedNumber }, () =>
    generatePassphrase(inputs),
  );
}
