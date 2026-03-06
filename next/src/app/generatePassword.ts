export interface PasswordInputs {
  level: string;
  custom: {
    number: boolean;
    duplication: boolean;
    upperCaseOnly: boolean;
    lowerCaseOnly: boolean;
  };
  symbols: string[];
  length: number;
  generatedNumber: number;
}

const UPPER_CASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER_CASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBER = '0123456789';
export const SYMBOL = '!"#$%&\'()*+,-./:;<=>?@[]^_`{|}~';

function secureRandomInt(max: number): number {
  const limit = Math.floor(0x100000000 / max) * max;
  const array = new Uint32Array(1);
  let value: number;
  do {
    crypto.getRandomValues(array);
    value = array[0];
  } while (value >= limit);
  return value % max;
}

export function buildCharset(inputs: PasswordInputs): string {
  let chars = '';
  if (inputs.custom.upperCaseOnly) {
    chars += UPPER_CASE;
  } else if (inputs.custom.lowerCaseOnly) {
    chars += LOWER_CASE;
  } else {
    chars += UPPER_CASE + LOWER_CASE;
  }

  if (inputs.level === '2') {
    chars += NUMBER;
  } else if (inputs.level === '3') {
    chars += NUMBER + SYMBOL;
  } else {
    if (inputs.custom.number) {
      chars += NUMBER;
    }
    chars += inputs.symbols.join('');
  }
  return chars;
}

export function generatePassword(
  charset: string,
  length: number,
  noDuplication: boolean,
): string {
  if (noDuplication) {
    const arr = charset.split('');
    const resultLength = Math.min(length, arr.length);
    for (let i = arr.length - 1; i > arr.length - 1 - resultLength; i--) {
      const j = secureRandomInt(i + 1);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(arr.length - resultLength).join('');
  } else {
    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset[secureRandomInt(charset.length)];
    }
    return password;
  }
}

export function generatePasswords(inputs: PasswordInputs): string[] {
  const charset = buildCharset(inputs);
  const passwords: string[] = [];
  for (let i = 0; i < inputs.generatedNumber; i++) {
    passwords.push(
      generatePassword(charset, inputs.length, inputs.custom.duplication),
    );
  }
  return passwords;
}
