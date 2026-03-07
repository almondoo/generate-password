import { describe, expect, it } from 'vitest';
import { escapeHtml, unescapeHtml } from '../convertHtmlEntity';

describe('escapeHtml', () => {
  it('escapes special characters', () => {
    expect(escapeHtml('<div class="a">&\'b\'</div>')).toBe(
      '&lt;div class=&quot;a&quot;&gt;&amp;&#39;b&#39;&lt;/div&gt;',
    );
  });

  it('returns empty string for empty input', () => {
    expect(escapeHtml('')).toBe('');
  });

  it('does not escape normal text', () => {
    expect(escapeHtml('hello world')).toBe('hello world');
  });
});

describe('unescapeHtml', () => {
  it('unescapes named entities', () => {
    expect(unescapeHtml('&lt;div&gt;&amp;&quot;&#39;&apos;')).toBe('<div>&"\'\'');
  });

  it('unescapes numeric decimal references', () => {
    expect(unescapeHtml('&#65;&#66;')).toBe('AB');
  });

  it('unescapes numeric hex references', () => {
    expect(unescapeHtml('&#x41;&#x42;')).toBe('AB');
  });

  it('returns empty string for empty input', () => {
    expect(unescapeHtml('')).toBe('');
  });
});
