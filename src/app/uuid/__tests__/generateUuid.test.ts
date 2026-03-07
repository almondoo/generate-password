import { describe, it, expect } from 'vitest';
import { generateUuid, generateUuids, UuidInputs } from '../generateUuid';

const UUID_V4_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const UUID_V4_NO_HYPHEN_REGEX = /^[0-9a-f]{12}4[0-9a-f]{3}[89ab][0-9a-f]{15}$/;

const defaultInputs: UuidInputs = {
  generatedNumber: 1,
  uppercase: false,
  hyphen: true,
  braces: false,
};

function makeInputs(overrides: Partial<UuidInputs>): UuidInputs {
  return { ...defaultInputs, ...overrides };
}

describe('generateUuid', () => {
  it('デフォルトでハイフン付き小文字のUUID v4を生成する', () => {
    const uuid = generateUuid(defaultInputs);
    expect(uuid).toMatch(UUID_V4_REGEX);
  });

  it('uppercase=true で大文字のUUIDを生成する', () => {
    const uuid = generateUuid(makeInputs({ uppercase: true }));
    expect(uuid).toBe(uuid.toUpperCase());
    expect(uuid.toLowerCase()).toMatch(UUID_V4_REGEX);
  });

  it('hyphen=false でハイフンなしのUUIDを生成する', () => {
    const uuid = generateUuid(makeInputs({ hyphen: false }));
    expect(uuid).not.toContain('-');
    expect(uuid).toHaveLength(32);
    expect(uuid).toMatch(UUID_V4_NO_HYPHEN_REGEX);
  });

  it('braces=true で括弧付きのUUIDを生成する', () => {
    const uuid = generateUuid(makeInputs({ braces: true }));
    expect(uuid.startsWith('{')).toBe(true);
    expect(uuid.endsWith('}')).toBe(true);
    expect(uuid.slice(1, -1)).toMatch(UUID_V4_REGEX);
  });

  it('全オプション組み合わせ: 大文字+ハイフンなし+括弧', () => {
    const uuid = generateUuid(makeInputs({ uppercase: true, hyphen: false, braces: true }));
    expect(uuid.startsWith('{')).toBe(true);
    expect(uuid.endsWith('}')).toBe(true);
    const inner = uuid.slice(1, -1);
    expect(inner).toBe(inner.toUpperCase());
    expect(inner).not.toContain('-');
    expect(inner).toHaveLength(32);
  });
});

describe('generateUuids', () => {
  it('指定した数のUUIDを生成する', () => {
    const uuids = generateUuids(makeInputs({ generatedNumber: 5 }));
    expect(uuids).toHaveLength(5);
    uuids.forEach((uuid) => expect(uuid).toMatch(UUID_V4_REGEX));
  });

  it('生成されたUUIDはすべてユニーク', () => {
    const uuids = generateUuids(makeInputs({ generatedNumber: 50 }));
    const unique = new Set(uuids);
    expect(unique.size).toBe(50);
  });
});
