import cronstrue from 'cronstrue/i18n';

export function describeCron(expression: string): string {
  return cronstrue.toString(expression, { locale: 'ja' });
}

export function getNextExecutions(expression: string, count: number = 5): Date[] {
  const parts = expression.trim().split(/\s+/);
  if (parts.length < 5) throw new Error('Invalid cron expression');

  const now = new Date();
  const results: Date[] = [];
  const current = new Date(now);
  current.setSeconds(0, 0);
  current.setMinutes(current.getMinutes() + 1);

  const maxIterations = 525600; // 1年分の分
  for (let i = 0; i < maxIterations && results.length < count; i++) {
    if (matchesCron(current, parts)) {
      results.push(new Date(current));
    }
    current.setMinutes(current.getMinutes() + 1);
  }

  return results;
}

function matchesCron(date: Date, parts: string[]): boolean {
  const [minPart, hourPart, domPart, monPart, dowPart] = parts;
  return (
    matchField(date.getMinutes(), minPart, 0, 59) &&
    matchField(date.getHours(), hourPart, 0, 23) &&
    matchField(date.getDate(), domPart, 1, 31) &&
    matchField(date.getMonth() + 1, monPart, 1, 12) &&
    matchField(date.getDay(), dowPart, 0, 6)
  );
}

function matchField(value: number, field: string, min: number, max: number): boolean {
  if (field === '*') return true;
  return field.split(',').some(part => {
    const stepMatch = part.match(/^(.+)\/(\d+)$/);
    if (stepMatch) {
      const [, range, stepStr] = stepMatch;
      const step = parseInt(stepStr, 10);
      const [start, end] = range === '*' ? [min, max] : parseRange(range);
      for (let i = start; i <= end; i += step) {
        if (i === value) return true;
      }
      return false;
    }
    if (part.includes('-')) {
      const [start, end] = parseRange(part);
      return value >= start && value <= end;
    }
    return parseInt(part, 10) === value;
  });
}

function parseRange(range: string): [number, number] {
  const [a, b] = range.split('-').map(Number);
  return [a, b];
}
