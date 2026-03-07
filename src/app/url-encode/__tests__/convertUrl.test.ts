import { describe, it, expect } from 'vitest';
import { encodeUrl, decodeUrl } from '../convertUrl';

describe('encodeUrl', () => {
  it("'hello world' を 'hello%20world' にエンコードする", () => {
    expect(encodeUrl('hello world')).toBe('hello%20world');
  });

  it('空文字をエンコードする', () => {
    expect(encodeUrl('')).toBe('');
  });

  it('日本語をエンコードできる', () => {
    const encoded = encodeUrl('こんにちは');
    const decoded = decodeUrl(encoded);
    expect(decoded).toBe('こんにちは');
  });

  it('特殊文字をエンコードする', () => {
    expect(encodeUrl('a=1&b=2')).toBe('a%3D1%26b%3D2');
  });

  it('URLをエンコードする', () => {
    expect(encodeUrl('https://example.com/?q=test&lang=ja')).toBe(
      'https%3A%2F%2Fexample.com%2F%3Fq%3Dtest%26lang%3Dja',
    );
  });
});

describe('decodeUrl', () => {
  it("'hello%20world' を 'hello world' にデコードする", () => {
    expect(decodeUrl('hello%20world')).toBe('hello world');
  });

  it('空文字をデコードする', () => {
    expect(decodeUrl('')).toBe('');
  });

  it('不正なエンコード文字列でエラーを投げる', () => {
    expect(() => decodeUrl('%E0%A4%A')).toThrow();
  });
});
