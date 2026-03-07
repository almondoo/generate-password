export function textToUnicode(text: string): string {
  return [...text]
    .map((ch) => {
      const cp = ch.codePointAt(0)!;
      if (cp > 0xffff) {
        return `\\u{${cp.toString(16).toUpperCase()}}`;
      }
      return `\\u${cp.toString(16).toUpperCase().padStart(4, '0')}`;
    })
    .join('');
}

export function unicodeToText(unicode: string): string {
  return unicode.replace(/\\u\{([0-9a-fA-F]+)\}|\\u([0-9a-fA-F]{4})/g, (_, braced, four) => {
    const cp = Number.parseInt(braced ?? four, 16);
    return String.fromCodePoint(cp);
  });
}
