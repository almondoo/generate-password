export interface IpResult {
  decimal: string;
  binary: string;
  hex: string;
  ipv6Mapped: string;
}

function parseIpv4(ip: string): number[] {
  const parts = ip.trim().split('.').map(Number);
  if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) {
    throw new Error('Invalid IPv4 address');
  }
  return parts;
}

export function convertIp(ip: string): IpResult {
  const parts = parseIpv4(ip);
  const num = ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;

  const binary = parts.map(p => p.toString(2).padStart(8, '0')).join('.');
  const hex = parts.map(p => p.toString(16).padStart(2, '0').toUpperCase()).join('.');
  const ipv6Mapped = `::ffff:${parts[0]}.${parts[1]}.${parts[2]}.${parts[3]}`;

  return {
    decimal: num.toString(),
    binary,
    hex,
    ipv6Mapped,
  };
}
