import { describe, expect, it } from 'vitest';
import { compressGzip, decompressGzip } from '../convertGzip';

describe('compressGzip / decompressGzip', () => {
  it('round-trips text', () => {
    const text = 'Hello, World!';
    const compressed = compressGzip(text);
    expect(decompressGzip(compressed)).toBe(text);
  });

  it('round-trips multibyte text', () => {
    const text = 'こんにちは世界';
    const compressed = compressGzip(text);
    expect(decompressGzip(compressed)).toBe(text);
  });

  it('compresses to base64 string', () => {
    const compressed = compressGzip('test');
    expect(typeof compressed).toBe('string');
    expect(compressed.length).toBeGreaterThan(0);
  });
});
