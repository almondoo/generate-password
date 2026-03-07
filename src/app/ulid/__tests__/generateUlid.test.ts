import { describe, it, expect } from 'vitest';
import { generateUlid, generateUlids, UlidInputs } from '../generateUlid';

const CROCKFORD_REGEX = /^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$/;
const CROCKFORD_LOWER_REGEX = /^[0123456789abcdefghjkmnpqrstvwxyz]{26}$/;

const defaultInputs: UlidInputs = {
  generatedNumber: 1,
  lowercase: false,
};

function makeInputs(overrides: Partial<UlidInputs>): UlidInputs {
  return { ...defaultInputs, ...overrides };
}

describe('generateUlid', () => {
  it('26文字のULIDを生成する', () => {
    const ulid = generateUlid(defaultInputs);
    expect(ulid).toHaveLength(26);
  });

  it('Crockford Base32文字セットのみを含む', () => {
    const ulid = generateUlid(defaultInputs);
    expect(ulid).toMatch(CROCKFORD_REGEX);
  });

  it('lowercase=true で小文字のULIDを生成する', () => {
    const ulid = generateUlid(makeInputs({ lowercase: true }));
    expect(ulid).toMatch(CROCKFORD_LOWER_REGEX);
  });

  it('タイムスタンプが単調増加する', () => {
    const ulid1 = generateUlid(defaultInputs);
    const ulid2 = generateUlid(defaultInputs);
    const ts1 = ulid1.slice(0, 10);
    const ts2 = ulid2.slice(0, 10);
    expect(ts2 >= ts1).toBe(true);
  });
});

describe('generateUlids', () => {
  it('指定した数のULIDを生成する', () => {
    const ulids = generateUlids(makeInputs({ generatedNumber: 5 }));
    expect(ulids).toHaveLength(5);
    ulids.forEach((ulid) => expect(ulid).toMatch(CROCKFORD_REGEX));
  });

  it('生成されたULIDはすべてユニーク', () => {
    const ulids = generateUlids(makeInputs({ generatedNumber: 50 }));
    const unique = new Set(ulids);
    expect(unique.size).toBe(50);
  });
});
