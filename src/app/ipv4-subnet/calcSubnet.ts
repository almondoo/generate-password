export interface SubnetResult {
  networkAddress: string;
  broadcastAddress: string;
  subnetMask: string;
  hostMin: string;
  hostMax: string;
  hostCount: number;
}

function ipToUint32(ip: string): number {
  const parts = ip.split('.').map(Number);
  if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) {
    throw new Error('Invalid IP address');
  }
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}

function uint32ToIp(n: number): string {
  return [(n >>> 24) & 0xFF, (n >>> 16) & 0xFF, (n >>> 8) & 0xFF, n & 0xFF].join('.');
}

export function calcSubnet(cidr: string): SubnetResult {
  const match = cidr.trim().match(/^(\d+\.\d+\.\d+\.\d+)\/(\d+)$/);
  if (!match) throw new Error('Invalid CIDR notation');

  const ip = ipToUint32(match[1]);
  const prefix = parseInt(match[2], 10);
  if (prefix < 0 || prefix > 32) throw new Error('Invalid prefix length');

  const mask = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
  const network = (ip & mask) >>> 0;
  const broadcast = (network | ~mask) >>> 0;

  const hostCount = prefix >= 31 ? 0 : Math.pow(2, 32 - prefix) - 2;
  const hostMin = prefix >= 31 ? uint32ToIp(network) : uint32ToIp(network + 1);
  const hostMax = prefix >= 31 ? uint32ToIp(broadcast) : uint32ToIp(broadcast - 1);

  return {
    networkAddress: uint32ToIp(network),
    broadcastAddress: uint32ToIp(broadcast),
    subnetMask: uint32ToIp(mask),
    hostMin,
    hostMax,
    hostCount,
  };
}
