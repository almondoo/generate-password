export interface CharCountResult {
  chars: number;
  words: number;
  lines: number;
  bytes: number;
}

export function countChars(text: string): CharCountResult {
  if (text === '') {
    return { chars: 0, words: 0, lines: 0, bytes: 0 };
  }
  const chars = [...text].length;
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const lines = text.split('\n').length;
  const bytes = new TextEncoder().encode(text).length;
  return { chars, words, lines, bytes };
}
