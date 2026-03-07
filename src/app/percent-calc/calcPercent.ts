export type CalcMode = 'whatPercent' | 'percentOf' | 'addSubtract';

export function calcWhatPercent(a: number, b: number): number {
  return (a / b) * 100;
}

export function calcPercentOf(a: number, percent: number): number {
  return a * (percent / 100);
}

export function calcAddPercent(a: number, percent: number, add: boolean): number {
  return add ? a * (1 + percent / 100) : a * (1 - percent / 100);
}
