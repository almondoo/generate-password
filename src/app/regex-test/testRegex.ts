export interface RegexMatch {
  match: string;
  index: number;
  groups: string[];
}

export function testRegex(pattern: string, flags: string, text: string): RegexMatch[] {
  const regex = new RegExp(pattern, flags);
  const results: RegexMatch[] = [];

  if (flags.includes('g')) {
    let m: RegExpExecArray | null;
    while ((m = regex.exec(text)) !== null) {
      results.push({
        match: m[0],
        index: m.index,
        groups: m.slice(1),
      });
      if (m[0].length === 0) regex.lastIndex++;
    }
  } else {
    const m = regex.exec(text);
    if (m) {
      results.push({
        match: m[0],
        index: m.index,
        groups: m.slice(1),
      });
    }
  }

  return results;
}
