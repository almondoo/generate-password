import { describe, expect, it } from 'vitest';
import { convertColor } from '../convertColor';
import { hexToRgb, rgbToHsl } from '../../color-convert/convertColor';

describe('hexToRgb (from color-convert)', () => {
  it('converts white', () => {
    expect(hexToRgb('ffffff')).toEqual({ r: 255, g: 255, b: 255 });
  });

  it('converts black', () => {
    expect(hexToRgb('000000')).toEqual({ r: 0, g: 0, b: 0 });
  });

  it('converts red', () => {
    expect(hexToRgb('ff0000')).toEqual({ r: 255, g: 0, b: 0 });
  });
});

describe('rgbToHsl (from color-convert)', () => {
  it('converts white', () => {
    expect(rgbToHsl({ r: 255, g: 255, b: 255 })).toEqual({ h: 0, s: 0, l: 100 });
  });

  it('converts red', () => {
    expect(rgbToHsl({ r: 255, g: 0, b: 0 })).toEqual({ h: 0, s: 100, l: 50 });
  });

  it('converts green', () => {
    expect(rgbToHsl({ r: 0, g: 128, b: 0 })).toEqual({ h: 120, s: 100, l: 25 });
  });
});

describe('convertColor', () => {
  it('returns all formats', () => {
    const result = convertColor('#ff0000');
    expect(result.hex).toBe('#FF0000');
    expect(result.rgb).toBe('rgb(255, 0, 0)');
    expect(result.hsl).toBe('hsl(0, 100%, 50%)');
  });
});
