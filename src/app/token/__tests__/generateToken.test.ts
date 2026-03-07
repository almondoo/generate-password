import { describe, it, expect } from 'vitest';
import { generateToken, generateTokens, TokenInputs } from '../generateToken';

describe('generateToken', () => {
  it('hex形式: 長さがバイト長x2になる', () => {
    const token = generateToken('hex', 16);
    expect(token).toHaveLength(32);
    expect(token).toMatch(/^[0-9a-f]+$/);
  });

  it('hex形式: 異なるバイト長で正しい長さ', () => {
    const token = generateToken('hex', 32);
    expect(token).toHaveLength(64);
  });

  it('base64形式: 有効なbase64文字列を生成する', () => {
    const token = generateToken('base64', 16);
    expect(token).toMatch(/^[A-Za-z0-9+/]+=*$/);
  });

  it('url-safe形式: +/=を含まない', () => {
    // 複数回生成して確認
    for (let i = 0; i < 10; i++) {
      const token = generateToken('url-safe', 32);
      expect(token).not.toContain('+');
      expect(token).not.toContain('/');
      expect(token).not.toContain('=');
      expect(token).toMatch(/^[A-Za-z0-9_-]+$/);
    }
  });
  it('1バイトのトークンを生成できる', () => {
    const hex = generateToken('hex', 1);
    expect(hex).toHaveLength(2);
    expect(hex).toMatch(/^[0-9a-f]{2}$/);

    const b64 = generateToken('base64', 1);
    expect(b64).toMatch(/^[A-Za-z0-9+/]+=*$/);

    const urlSafe = generateToken('url-safe', 1);
    expect(urlSafe).toMatch(/^[A-Za-z0-9_-]+$/);
  });
});

describe('generateTokens', () => {
  it('指定した数のトークンを生成する', () => {
    const inputs: TokenInputs = { format: 'hex', byteLength: 16, generatedNumber: 5 };
    const tokens = generateTokens(inputs);
    expect(tokens).toHaveLength(5);
    tokens.forEach((token) => {
      expect(token).toHaveLength(32);
      expect(token).toMatch(/^[0-9a-f]+$/);
    });
  });
});
