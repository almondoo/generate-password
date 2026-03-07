import { describe, expect, it } from 'vitest';
import { formatXml, minifyXml } from '../formatXml';

describe('formatXml', () => {
  it('formats XML with indentation', () => {
    const xml = '<root><child>value</child></root>';
    const result = formatXml(xml);
    expect(result).toContain('\n');
  });
});

describe('minifyXml', () => {
  it('removes whitespace between tags', () => {
    const xml = '<root>\n  <child>value</child>\n</root>';
    expect(minifyXml(xml)).toBe('<root><child>value</child></root>');
  });
});
