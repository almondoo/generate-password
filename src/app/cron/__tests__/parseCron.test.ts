import { describe, expect, it } from 'vitest';
import { describeCron, getNextExecutions } from '../parseCron';

describe('describeCron', () => {
  it('毎分のCron式を説明する', () => {
    const result = describeCron('* * * * *');
    expect(result).toBeTruthy();
  });

  it('特定の時間のCron式を説明する', () => {
    const result = describeCron('0 9 * * 1-5');
    expect(result).toBeTruthy();
  });

  it('不正なCron式でエラーを投げる', () => {
    expect(() => describeCron('invalid')).toThrow();
  });
});

describe('getNextExecutions', () => {
  it('次回実行日時を指定数分返す', () => {
    const results = getNextExecutions('* * * * *', 5);
    expect(results).toHaveLength(5);
    for (const date of results) {
      expect(date).toBeInstanceOf(Date);
    }
  });

  it('日時が昇順に並ぶ', () => {
    const results = getNextExecutions('0 * * * *', 3);
    for (let i = 1; i < results.length; i++) {
      expect(results[i].getTime()).toBeGreaterThan(results[i - 1].getTime());
    }
  });

  it('不正なCron式でエラーを投げる', () => {
    expect(() => getNextExecutions('bad', 5)).toThrow();
  });
});
