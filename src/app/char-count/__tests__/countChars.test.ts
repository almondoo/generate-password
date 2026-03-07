import { describe, expect, it } from 'vitest';
import { countChars } from '../countChars';

describe('countChars', () => {
  it('returns zeros for empty string', () => {
    expect(countChars('')).toEqual({ chars: 0, words: 0, lines: 0, bytes: 0 });
  });

  it('counts ASCII text correctly', () => {
    expect(countChars('hello world')).toEqual({ chars: 11, words: 2, lines: 1, bytes: 11 });
  });

  it('counts multi-byte characters correctly', () => {
    const result = countChars('あいう');
    expect(result.chars).toBe(3);
    expect(result.bytes).toBe(9); // 3 bytes per character in UTF-8
  });

  it('counts lines correctly', () => {
    expect(countChars('a\nb\nc').lines).toBe(3);
  });

  it('counts words with multiple spaces', () => {
    expect(countChars('  hello   world  ').words).toBe(2);
  });

  it('returns 0 words for whitespace only', () => {
    expect(countChars('   ').words).toBe(0);
  });
});
