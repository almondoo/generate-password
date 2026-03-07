import { describe, expect, it } from 'vitest';
import { sortText } from '../sortText';

describe('sortText', () => {
  it('returns empty string for empty input', () => {
    expect(sortText('', 'asc')).toBe('');
  });

  it('sorts ascending', () => {
    expect(sortText('banana\napple\ncherry', 'asc')).toBe('apple\nbanana\ncherry');
  });

  it('sorts descending', () => {
    expect(sortText('banana\napple\ncherry', 'desc')).toBe('cherry\nbanana\napple');
  });

  it('removes duplicates', () => {
    expect(sortText('a\nb\na\nc\nb', 'unique')).toBe('a\nb\nc');
  });

  it('shuffles lines', () => {
    const input = 'a\nb\nc\nd\ne\nf\ng\nh';
    const result = sortText(input, 'shuffle');
    const resultLines = result.split('\n');
    expect(resultLines.sort()).toEqual(input.split('\n').sort());
  });
});
