import { describe, expect, it } from 'vitest';
import { replaceText } from '../replaceText';

describe('replaceText', () => {
  it('returns original text if search is empty', () => {
    expect(replaceText('hello', '', 'x', false)).toBe('hello');
  });

  it('replaces all occurrences in plain mode', () => {
    expect(replaceText('aabaa', 'a', 'x', false)).toBe('xxbxx');
  });

  it('replaces using regex', () => {
    expect(replaceText('foo123bar456', '\\d+', 'NUM', true)).toBe('fooNUMbarNUM');
  });

  it('handles special regex characters in plain mode', () => {
    expect(replaceText('a.b.c', '.', '-', false)).toBe('a-b-c');
  });

  it('throws on invalid regex', () => {
    expect(() => replaceText('test', '[invalid', 'x', true)).toThrow();
  });
});
