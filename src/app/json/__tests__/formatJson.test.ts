import { describe, it, expect } from 'vitest';
import { formatJson, minifyJson } from '../formatJson';

describe('formatJson', () => {
  it('JSONを整形する', () => {
    expect(formatJson('{"a":1,"b":2}')).toBe('{\n  "a": 1,\n  "b": 2\n}');
  });

  it('ネストしたJSONを整形する', () => {
    const input = '{"a":{"b":{"c":1}}}';
    const expected = '{\n  "a": {\n    "b": {\n      "c": 1\n    }\n  }\n}';
    expect(formatJson(input)).toBe(expected);
  });

  it('配列を含むJSONを整形する', () => {
    const input = '{"items":[1,2,3]}';
    const expected = '{\n  "items": [\n    1,\n    2,\n    3\n  ]\n}';
    expect(formatJson(input)).toBe(expected);
  });

  it('不正なJSONでエラーを投げる', () => {
    expect(() => formatJson('{invalid}')).toThrow();
  });

  it('空文字でエラーを投げる', () => {
    expect(() => formatJson('')).toThrow();
  });
});

describe('minifyJson', () => {
  it('JSONを圧縮する', () => {
    const input = '{\n  "a": 1,\n  "b": 2\n}';
    expect(minifyJson(input)).toBe('{"a":1,"b":2}');
  });

  it('ネストしたJSONを圧縮する', () => {
    const input = '{\n  "a": {\n    "b": 1\n  }\n}';
    expect(minifyJson(input)).toBe('{"a":{"b":1}}');
  });

  it('不正なJSONでエラーを投げる', () => {
    expect(() => minifyJson('{invalid}')).toThrow();
  });

  it('空文字でエラーを投げる', () => {
    expect(() => minifyJson('')).toThrow();
  });
});
