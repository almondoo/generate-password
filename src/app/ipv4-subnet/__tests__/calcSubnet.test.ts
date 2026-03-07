import { describe, expect, it } from 'vitest';
import { calcSubnet } from '../calcSubnet';

describe('calcSubnet', () => {
  it('/24サブネットを計算する', () => {
    const result = calcSubnet('192.168.1.0/24');
    expect(result.networkAddress).toBe('192.168.1.0');
    expect(result.broadcastAddress).toBe('192.168.1.255');
    expect(result.subnetMask).toBe('255.255.255.0');
    expect(result.hostMin).toBe('192.168.1.1');
    expect(result.hostMax).toBe('192.168.1.254');
    expect(result.hostCount).toBe(254);
  });

  it('/16サブネットを計算する', () => {
    const result = calcSubnet('10.0.0.0/16');
    expect(result.networkAddress).toBe('10.0.0.0');
    expect(result.broadcastAddress).toBe('10.0.255.255');
    expect(result.subnetMask).toBe('255.255.0.0');
    expect(result.hostCount).toBe(65534);
  });

  it('/32サブネットを計算する', () => {
    const result = calcSubnet('192.168.1.1/32');
    expect(result.networkAddress).toBe('192.168.1.1');
    expect(result.broadcastAddress).toBe('192.168.1.1');
    expect(result.hostCount).toBe(0);
  });

  it('ホスト部が0でないIPでもネットワークアドレスを返す', () => {
    const result = calcSubnet('192.168.1.100/24');
    expect(result.networkAddress).toBe('192.168.1.0');
  });

  it('不正なCIDR表記でエラーを投げる', () => {
    expect(() => calcSubnet('invalid')).toThrow();
    expect(() => calcSubnet('192.168.1.0/33')).toThrow();
  });
});
