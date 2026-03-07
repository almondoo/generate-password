import { describe, expect, it } from 'vitest';
import { calcAddPercent, calcPercentOf, calcWhatPercent } from '../calcPercent';

describe('calcWhatPercent', () => {
  it('50 is 50% of 100', () => {
    expect(calcWhatPercent(50, 100)).toBe(50);
  });

  it('1 is 10% of 10', () => {
    expect(calcWhatPercent(1, 10)).toBe(10);
  });
});

describe('calcPercentOf', () => {
  it('50% of 200 is 100', () => {
    expect(calcPercentOf(200, 50)).toBe(100);
  });

  it('10% of 50 is 5', () => {
    expect(calcPercentOf(50, 10)).toBe(5);
  });
});

describe('calcAddPercent', () => {
  it('100 + 10% = 110', () => {
    expect(calcAddPercent(100, 10, true)).toBeCloseTo(110);
  });

  it('100 - 10% = 90', () => {
    expect(calcAddPercent(100, 10, false)).toBe(90);
  });
});
