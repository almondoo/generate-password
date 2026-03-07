import { describe, expect, it } from 'vitest';
import { convertIp } from '../convertIp';

describe('convertIp', () => {
  it('IPv4アドレスを変換する', () => {
    const result = convertIp('192.168.1.1');
    expect(result.decimal).toBe('3232235777');
    expect(result.binary).toBe('11000000.10101000.00000001.00000001');
    expect(result.hex).toBe('C0.A8.01.01');
    expect(result.ipv6Mapped).toBe('::ffff:192.168.1.1');
  });

  it('0.0.0.0を変換する', () => {
    const result = convertIp('0.0.0.0');
    expect(result.decimal).toBe('0');
    expect(result.binary).toBe('00000000.00000000.00000000.00000000');
  });

  it('255.255.255.255を変換する', () => {
    const result = convertIp('255.255.255.255');
    expect(result.decimal).toBe('4294967295');
    expect(result.hex).toBe('FF.FF.FF.FF');
  });

  it('不正なIPアドレスでエラーを投げる', () => {
    expect(() => convertIp('256.0.0.1')).toThrow();
    expect(() => convertIp('abc')).toThrow();
    expect(() => convertIp('1.2.3')).toThrow();
  });
});
