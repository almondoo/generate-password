import { describe, it, expect } from 'vitest';
import {
  buildCharset,
  generatePassword,
  generatePasswords,
  PasswordInputs,
} from '../generatePassword';

const defaultInputs: PasswordInputs = {
  level: '1',
  custom: {
    number: false,
    duplication: false,
    upperCaseOnly: false,
    lowerCaseOnly: false,
  },
  symbols: [],
  length: 16,
  generatedNumber: 1,
};

function makeInputs(overrides: Partial<PasswordInputs> & { custom?: Partial<PasswordInputs['custom']> }): PasswordInputs {
  return {
    ...defaultInputs,
    ...overrides,
    custom: { ...defaultInputs.custom, ...overrides.custom },
  };
}

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const DIGITS = '0123456789';
const SYMBOL = '!"#$%&\'()*+,-./:;<=>?@[]^_`{|}~';

describe('buildCharset', () => {
  it('level "1": 英字のみ（大文字+小文字）', () => {
    const charset = buildCharset(makeInputs({ level: '1' }));
    expect(charset).toBe(UPPER + LOWER);
  });

  it('level "2": 英数字', () => {
    const charset = buildCharset(makeInputs({ level: '2' }));
    expect(charset).toBe(UPPER + LOWER + DIGITS);
  });

  it('level "3": 英数字記号', () => {
    const charset = buildCharset(makeInputs({ level: '3' }));
    expect(charset).toBe(UPPER + LOWER + DIGITS + SYMBOL);
  });

  it('level "4" + custom.number=true: 英字+数字', () => {
    const charset = buildCharset(makeInputs({ level: '4', custom: { number: true } }));
    expect(charset).toBe(UPPER + LOWER + DIGITS);
  });

  it('level "4" + symbols: 英字+指定記号', () => {
    const charset = buildCharset(makeInputs({ level: '4', symbols: ['!', '@'] }));
    expect(charset).toBe(UPPER + LOWER + '!@');
  });

  it('level "4" + custom.number=true + symbols: 英字+数字+指定記号', () => {
    const charset = buildCharset(makeInputs({ level: '4', custom: { number: true }, symbols: ['#'] }));
    expect(charset).toBe(UPPER + LOWER + DIGITS + '#');
  });

  it('upperCaseOnly=true: 大文字のみ', () => {
    const charset = buildCharset(makeInputs({ custom: { upperCaseOnly: true } }));
    expect(charset).toBe(UPPER);
  });

  it('lowerCaseOnly=true: 小文字のみ', () => {
    const charset = buildCharset(makeInputs({ custom: { lowerCaseOnly: true } }));
    expect(charset).toBe(LOWER);
  });
});

describe('generatePassword', () => {
  it('指定した長さのパスワードが生成される', () => {
    const charset = UPPER + LOWER;
    const password = generatePassword(charset, 20, false);
    expect(password).toHaveLength(20);
  });

  it('文字セット内の文字のみが使用される', () => {
    const charset = 'abc';
    const password = generatePassword(charset, 100, false);
    for (const ch of password) {
      expect(charset).toContain(ch);
    }
  });

  it('noDuplication=true で重複文字がない', () => {
    const charset = UPPER + LOWER + DIGITS;
    const password = generatePassword(charset, 30, true);
    const unique = new Set(password.split(''));
    expect(unique.size).toBe(password.length);
  });

  it('noDuplication=true で文字セットより長いlengthを指定した場合、文字セット長に制限される', () => {
    const charset = 'abc';
    const password = generatePassword(charset, 10, true);
    expect(password).toHaveLength(3);
    const unique = new Set(password.split(''));
    expect(unique.size).toBe(3);
  });
});

describe('generatePasswords', () => {
  it('指定した数のパスワードが生成される', () => {
    const passwords = generatePasswords(makeInputs({ generatedNumber: 5, length: 10 }));
    expect(passwords).toHaveLength(5);
    passwords.forEach((pw) => expect(pw).toHaveLength(10));
  });

  it('level "2" で英数字パスワードが生成される', () => {
    const passwords = generatePasswords(makeInputs({ level: '2', length: 50, generatedNumber: 3 }));
    const validChars = UPPER + LOWER + DIGITS;
    passwords.forEach((pw) => {
      for (const ch of pw) {
        expect(validChars).toContain(ch);
      }
    });
  });

  it('level "3" で英数字記号パスワードが生成される', () => {
    const passwords = generatePasswords(makeInputs({ level: '3', length: 50, generatedNumber: 2 }));
    const validChars = UPPER + LOWER + DIGITS + SYMBOL;
    passwords.forEach((pw) => {
      for (const ch of pw) {
        expect(validChars).toContain(ch);
      }
    });
  });

  it('duplication=true で重複なしパスワードが生成される', () => {
    const passwords = generatePasswords(makeInputs({
      level: '2',
      length: 20,
      generatedNumber: 3,
      custom: { duplication: true },
    }));
    passwords.forEach((pw) => {
      const unique = new Set(pw.split(''));
      expect(unique.size).toBe(pw.length);
    });
  });
});
