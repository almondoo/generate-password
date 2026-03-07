import { describe, expect, it } from 'vitest';
import { hexToText, textToHex } from '../convertHexText';

describe('textToHex', () => {
  it('converts ASCII text', () => {
    expect(textToHex('ABC')).toBe('41 42 43');
  });

  it('converts multibyte text', () => {
    expect(textToHex('あ')).toBe('E3 81 82');
  });

  it('handles empty string', () => {
    expect(textToHex('')).toBe('');
  });
});

describe('hexToText', () => {
  it('converts hex to text', () => {
    expect(hexToText('41 42 43')).toBe('ABC');
  });

  it('handles comma-separated hex', () => {
    expect(hexToText('41,42,43')).toBe('ABC');
  });

  it('handles empty string', () => {
    expect(hexToText('')).toBe('');
  });
});
