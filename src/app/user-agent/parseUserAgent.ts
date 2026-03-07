import { UAParser } from 'ua-parser-js';

export interface UAResult {
  browser: string;
  os: string;
  device: string;
  engine: string;
}

export function parseUserAgent(ua: string): UAResult {
  const parser = new UAParser(ua);
  const result = parser.getResult();

  const fmt = (name?: string, version?: string) =>
    [name, version].filter(Boolean).join(' ') || '-';

  return {
    browser: fmt(result.browser.name, result.browser.version),
    os: fmt(result.os.name, result.os.version),
    device: fmt(result.device.vendor, result.device.model) + (result.device.type ? ` (${result.device.type})` : ''),
    engine: fmt(result.engine.name, result.engine.version),
  };
}
