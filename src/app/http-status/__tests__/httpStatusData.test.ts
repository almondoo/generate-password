import { describe, expect, it } from 'vitest';
import { filterStatuses, httpStatuses } from '../httpStatusData';

describe('httpStatuses', () => {
  it('ステータスコードの一覧が定義されている', () => {
    expect(httpStatuses.length).toBeGreaterThan(0);
  });

  it('200 OKが含まれている', () => {
    const ok = httpStatuses.find(s => s.code === 200);
    expect(ok).toBeDefined();
    expect(ok!.name).toBe('OK');
  });

  it('404 Not Foundが含まれている', () => {
    const notFound = httpStatuses.find(s => s.code === 404);
    expect(notFound).toBeDefined();
    expect(notFound!.name).toBe('Not Found');
  });
});

describe('filterStatuses', () => {
  it('コード番号でフィルタする', () => {
    const result = filterStatuses('404');
    expect(result).toHaveLength(1);
    expect(result[0].code).toBe(404);
  });

  it('名前でフィルタする', () => {
    const result = filterStatuses('not found');
    expect(result.some(s => s.code === 404)).toBe(true);
  });

  it('空文字列で全件返す', () => {
    expect(filterStatuses('')).toEqual(httpStatuses);
  });

  it('マッチなしで空配列を返す', () => {
    expect(filterStatuses('zzzzzzzzz')).toHaveLength(0);
  });
});
