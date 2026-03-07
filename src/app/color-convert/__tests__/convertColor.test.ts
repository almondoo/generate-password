import { describe, expect, it } from 'vitest';
import { fromHex, fromRgb, fromHsl, hexToRgb, rgbToHex, rgbToHsl } from '../convertColor';

describe('hexToRgb', () => {
  it('HEXをRGBに変換する', () => {
    expect(hexToRgb('#FF0000')).toEqual({ r: 255, g: 0, b: 0 });
    expect(hexToRgb('00FF00')).toEqual({ r: 0, g: 255, b: 0 });
  });

  it('不正なHEXでエラーを投げる', () => {
    expect(() => hexToRgb('ZZZZZZ')).toThrow();
    expect(() => hexToRgb('FFF')).toThrow();
  });
});

describe('rgbToHex', () => {
  it('RGBをHEXに変換する', () => {
    expect(rgbToHex({ r: 255, g: 0, b: 0 })).toBe('#FF0000');
    expect(rgbToHex({ r: 0, g: 0, b: 0 })).toBe('#000000');
  });
});

describe('rgbToHsl', () => {
  it('赤をHSLに変換する', () => {
    expect(rgbToHsl({ r: 255, g: 0, b: 0 })).toEqual({ h: 0, s: 100, l: 50 });
  });

  it('白をHSLに変換する', () => {
    expect(rgbToHsl({ r: 255, g: 255, b: 255 })).toEqual({ h: 0, s: 0, l: 100 });
  });
});

describe('fromHex', () => {
  it('HEXから全形式に変換する', () => {
    const result = fromHex('#0000FF');
    expect(result.rgb).toEqual({ r: 0, g: 0, b: 255 });
    expect(result.hsl).toEqual({ h: 240, s: 100, l: 50 });
  });
});

describe('fromRgb', () => {
  it('RGBから全形式に変換する', () => {
    const result = fromRgb({ r: 0, g: 128, b: 0 });
    expect(result.hex).toBe('#008000');
  });
});

describe('fromHsl', () => {
  it('HSLから全形式に変換する', () => {
    const result = fromHsl({ h: 0, s: 100, l: 50 });
    expect(result.hex).toBe('#FF0000');
    expect(result.rgb).toEqual({ r: 255, g: 0, b: 0 });
  });

  it('グレーを変換する', () => {
    const result = fromHsl({ h: 0, s: 0, l: 50 });
    expect(result.rgb.r).toBe(result.rgb.g);
    expect(result.rgb.g).toBe(result.rgb.b);
  });
});
