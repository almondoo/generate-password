import { describe, expect, it } from 'vitest';
import { generateLoremIpsum } from '../generateLoremIpsum';

describe('generateLoremIpsum', () => {
  it('returns empty string for 0 paragraphs', () => {
    expect(generateLoremIpsum(0)).toBe('');
  });

  it('returns 1 paragraph starting with Lorem ipsum', () => {
    const result = generateLoremIpsum(1);
    expect(result.startsWith('Lorem ipsum')).toBe(true);
    expect(result).not.toContain('\n\n');
  });

  it('returns multiple paragraphs separated by double newlines', () => {
    const result = generateLoremIpsum(3);
    const paragraphs = result.split('\n\n');
    expect(paragraphs).toHaveLength(3);
  });

  it('first paragraph always starts with Lorem ipsum', () => {
    for (let i = 0; i < 5; i++) {
      const result = generateLoremIpsum(2);
      expect(result.startsWith('Lorem ipsum')).toBe(true);
    }
  });
});
