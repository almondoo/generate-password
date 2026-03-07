import { describe, expect, it } from 'vitest';
import { parseUserAgent } from '../parseUserAgent';

describe('parseUserAgent', () => {
  it('Chrome User-Agentを解析する', () => {
    const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    const result = parseUserAgent(ua);
    expect(result.browser).toContain('Chrome');
    expect(result.os).toContain('Windows');
    expect(result.engine).toContain('Blink');
  });

  it('Safari User-Agentを解析する', () => {
    const ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15';
    const result = parseUserAgent(ua);
    expect(result.browser).toContain('Safari');
    expect(result.os).toContain('mac');
  });

  it('空文字列でもエラーを投げない', () => {
    const result = parseUserAgent('');
    expect(result.browser).toBe('-');
  });

  it('モバイルUser-Agentを解析する', () => {
    const ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';
    const result = parseUserAgent(ua);
    expect(result.device).toContain('iPhone');
  });
});
