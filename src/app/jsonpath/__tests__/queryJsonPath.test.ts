import { describe, expect, it } from 'vitest';
import { queryJsonPath } from '../queryJsonPath';

describe('queryJsonPath', () => {
  const json = '{"store":{"book":[{"title":"A","price":10},{"title":"B","price":20}]}}';

  it('ルートパスでオブジェクト全体を返す', () => {
    const result = JSON.parse(queryJsonPath(json, '$'));
    expect(result).toHaveLength(1);
  });

  it('ネストしたプロパティを取得する', () => {
    const result = JSON.parse(queryJsonPath(json, '$.store.book[0].title'));
    expect(result).toEqual(['A']);
  });

  it('配列全要素のプロパティを取得する', () => {
    const result = JSON.parse(queryJsonPath(json, '$.store.book[*].title'));
    expect(result).toEqual(['A', 'B']);
  });

  it('不正なJSONでエラーを投げる', () => {
    expect(() => queryJsonPath('{invalid}', '$')).toThrow();
  });
});
