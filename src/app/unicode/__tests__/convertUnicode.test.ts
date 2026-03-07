import { describe, expect, it } from 'vitest';
import { textToUnicode, unicodeToText } from '../convertUnicode';

describe('textToUnicode', () => {
  it('converts ASCII text', () => {
    expect(textToUnicode('AB')).toBe('\\u0041\\u0042');
  });

  it('converts emoji with braced notation', () => {
    expect(textToUnicode('😀')).toBe('\\u{1F600}');
  });

  it('handles empty string', () => {
    expect(textToUnicode('')).toBe('');
  });
});

describe('unicodeToText', () => {
  it('converts 4-digit escapes', () => {
    expect(unicodeToText('\\u0041\\u0042')).toBe('AB');
  });

  it('converts braced escapes', () => {
    expect(unicodeToText('\\u{1F600}')).toBe('😀');
  });

  it('handles empty string', () => {
    expect(unicodeToText('')).toBe('');
  });
});
