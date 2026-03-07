import { describe, it, expect } from 'vitest';
import { encodeBase64, decodeBase64 } from '../convertBase64';

describe('encodeBase64', () => {
  it("'hello' を 'aGVsbG8=' にエンコードする", () => {
    expect(encodeBase64('hello')).toBe('aGVsbG8=');
  });

  it('空文字をエンコードする', () => {
    expect(encodeBase64('')).toBe('');
  });

  it('日本語をエンコードできる', () => {
    const encoded = encodeBase64('こんにちは');
    const decoded = decodeBase64(encoded);
    expect(decoded).toBe('こんにちは');
  });
});

describe('decodeBase64', () => {
  it("'aGVsbG8=' を 'hello' にデコードする", () => {
    expect(decodeBase64('aGVsbG8=')).toBe('hello');
  });

  it('空文字をデコードする', () => {
    expect(decodeBase64('')).toBe('');
  });

  it('不正なBase64文字列でエラーを投げる', () => {
    expect(() => decodeBase64('not-valid-base64!!!')).toThrow();
  });
});
