import { describe, it, expect } from 'vitest';
import { generateHash, HashInputs } from '../generateHash';

const defaultInputs: HashInputs = {
  text: 'hello',
  algorithm: 'SHA-256',
  uppercase: false,
};

function makeInputs(overrides: Partial<HashInputs>): HashInputs {
  return { ...defaultInputs, ...overrides };
}

describe('generateHash', () => {
  it('SHA-256で既知のハッシュ値を生成する', async () => {
    const hash = await generateHash(defaultInputs);
    expect(hash).toBe(
      '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',
    );
  });

  it('SHA-512で正しい長さのハッシュを生成する', async () => {
    const hash = await generateHash(makeInputs({ algorithm: 'SHA-512' }));
    expect(hash).toHaveLength(128);
  });

  it('SHA-1で既知のハッシュ値を生成する', async () => {
    const hash = await generateHash(makeInputs({ algorithm: 'SHA-1' }));
    expect(hash).toBe('aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d');
  });

  it('uppercase=trueで大文字のハッシュを生成する', async () => {
    const hash = await generateHash(makeInputs({ uppercase: true }));
    expect(hash).toBe(hash.toUpperCase());
    expect(hash).toBe(
      '2CF24DBA5FB0A30E26E83B2AC5B9E29E1B161E5C1FA7425E73043362938B9824',
    );
  });

  it('空文字列のハッシュを生成できる', async () => {
    const hash = await generateHash(makeInputs({ text: '' }));
    expect(hash).toBe(
      'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    );
  });
});
