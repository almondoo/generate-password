import { hexToRgb, rgbToHex, rgbToHsl } from '../color-convert/convertColor';

export interface ColorValues {
  hex: string;
  rgb: string;
  hsl: string;
}

export function convertColor(hex: string): ColorValues {
  const rgb = hexToRgb(hex.replace(/^#/, ''));
  const hsl = rgbToHsl(rgb);
  return {
    hex: rgbToHex(rgb),
    rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
  };
}
