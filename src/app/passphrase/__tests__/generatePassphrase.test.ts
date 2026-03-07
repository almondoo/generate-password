import { describe, it, expect } from 'vitest';
import {
  generatePassphrase,
  generatePassphrases,
  PassphraseInputs,
} from '../generatePassphrase';

const defaultInputs: PassphraseInputs = {
  wordCount: 4,
  separator: '-',
  capitalize: false,
  generatedNumber: 1,
};

function makeInputs(overrides: Partial<PassphraseInputs>): PassphraseInputs {
  return { ...defaultInputs, ...overrides };
}

describe('generatePassphrase', () => {
  it('指定した単語数でパスフレーズを生成する', () => {
    const passphrase = generatePassphrase(defaultInputs);
    const words = passphrase.split('-');
    expect(words).toHaveLength(4);
  });

  it('区切り文字を変更できる', () => {
    const passphrase = generatePassphrase(makeInputs({ separator: '.' }));
    expect(passphrase).toContain('.');
    expect(passphrase.split('.')).toHaveLength(4);
  });

  it('capitalize=true で各単語の先頭が大文字になる', () => {
    const passphrase = generatePassphrase(makeInputs({ capitalize: true }));
    const words = passphrase.split('-');
    words.forEach((word) => {
      expect(word.charAt(0)).toBe(word.charAt(0).toUpperCase());
    });
  });

  it('1単語のパスフレーズを生成できる', () => {
    const passphrase = generatePassphrase(makeInputs({ wordCount: 1 }));
    expect(passphrase).not.toContain('-');
    expect(passphrase.length).toBeGreaterThan(0);
  });

  it('単語数を変更できる', () => {
    const passphrase = generatePassphrase(makeInputs({ wordCount: 7 }));
    const words = passphrase.split('-');
    expect(words).toHaveLength(7);
  });
});

describe('generatePassphrases', () => {
  it('指定した数のパスフレーズを生成する', () => {
    const passphrases = generatePassphrases(makeInputs({ generatedNumber: 5 }));
    expect(passphrases).toHaveLength(5);
    passphrases.forEach((p) => {
      expect(p.length).toBeGreaterThan(0);
    });
  });
});
