import { describe, expect, it } from 'vitest';
import { convertBase } from '../convertBase';

describe('convertBase', () => {
  it('10進数から各基数に変換する', () => {
    const result = convertBase('255', 10);
    expect(result.dec).toBe('255');
    expect(result.bin).toBe('11111111');
    expect(result.oct).toBe('377');
    expect(result.hex).toBe('FF');
  });

  it('2進数から各基数に変換する', () => {
    const result = convertBase('1010', 2);
    expect(result.dec).toBe('10');
    expect(result.bin).toBe('1010');
    expect(result.oct).toBe('12');
    expect(result.hex).toBe('A');
  });

  it('16進数から各基数に変換する', () => {
    const result = convertBase('FF', 16);
    expect(result.dec).toBe('255');
    expect(result.hex).toBe('FF');
  });

  it('8進数から各基数に変換する', () => {
    const result = convertBase('77', 8);
    expect(result.dec).toBe('63');
    expect(result.bin).toBe('111111');
  });

  it('大きな数値を扱える（BigInt）', () => {
    const result = convertBase('18446744073709551615', 10);
    expect(result.hex).toBe('FFFFFFFFFFFFFFFF');
    expect(result.bin).toBe('1111111111111111111111111111111111111111111111111111111111111111');
  });

  it('0を変換する', () => {
    const result = convertBase('0', 10);
    expect(result.dec).toBe('0');
    expect(result.bin).toBe('0');
    expect(result.oct).toBe('0');
    expect(result.hex).toBe('0');
  });

  it('不正な入力でエラーを投げる', () => {
    expect(() => convertBase('xyz', 10)).toThrow();
  });
});
