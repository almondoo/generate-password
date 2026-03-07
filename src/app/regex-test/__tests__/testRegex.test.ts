import { describe, expect, it } from 'vitest';
import { testRegex } from '../testRegex';

describe('testRegex', () => {
  it('基本的なマッチを返す', () => {
    const results = testRegex('hello', 'g', 'hello world hello');
    expect(results).toHaveLength(2);
    expect(results[0].match).toBe('hello');
    expect(results[0].index).toBe(0);
    expect(results[1].index).toBe(12);
  });

  it('グループキャプチャを返す', () => {
    const results = testRegex('(\\d+)-(\\w+)', '', '123-abc');
    expect(results).toHaveLength(1);
    expect(results[0].groups).toEqual(['123', 'abc']);
  });

  it('マッチなしの場合は空配列を返す', () => {
    const results = testRegex('xyz', 'g', 'hello world');
    expect(results).toHaveLength(0);
  });

  it('大文字小文字を無視するフラグ', () => {
    const results = testRegex('hello', 'gi', 'Hello HELLO hello');
    expect(results).toHaveLength(3);
  });

  it('不正な正規表現でエラーを投げる', () => {
    expect(() => testRegex('[', '', 'test')).toThrow();
  });

  it('空マッチで無限ループしない', () => {
    const results = testRegex('', 'g', 'ab');
    expect(results.length).toBeGreaterThan(0);
  });
});
