export type SortMode = 'asc' | 'desc' | 'unique' | 'shuffle';

export function sortText(text: string, mode: SortMode): string {
  if (text.trim() === '') return '';
  const lines = text.split('\n');

  switch (mode) {
    case 'asc':
      return lines.sort((a, b) => a.localeCompare(b)).join('\n');
    case 'desc':
      return lines.sort((a, b) => b.localeCompare(a)).join('\n');
    case 'unique':
      return [...new Set(lines)].join('\n');
    case 'shuffle': {
      const shuffled = [...lines];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled.join('\n');
    }
  }
}
