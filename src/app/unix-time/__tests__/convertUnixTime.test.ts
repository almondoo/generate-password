import { describe, it, expect } from 'vitest';
import { timestampToDate, dateToTimestamp } from '../convertUnixTime';

describe('timestampToDate', () => {
  it('秒（10桁）のタイムスタンプを変換する', () => {
    const result = timestampToDate(1700000000);
    expect(result.iso).toBe('2023-11-14T22:13:20.000Z');
    expect(result.local).toBeTruthy();
  });

  it('ミリ秒（13桁）のタイムスタンプを変換する', () => {
    const result = timestampToDate(1700000000000);
    expect(result.iso).toBe('2023-11-14T22:13:20.000Z');
  });

  it('0を変換する', () => {
    const result = timestampToDate(0);
    expect(result.iso).toBe('1970-01-01T00:00:00.000Z');
  });

  it('ミリ秒付きのタイムスタンプを正しく変換する', () => {
    const result = timestampToDate(1700000000123);
    expect(result.iso).toBe('2023-11-14T22:13:20.123Z');
  });
});

describe('dateToTimestamp', () => {
  it('ISO日時文字列をタイムスタンプに変換する', () => {
    const result = dateToTimestamp('2023-11-14T22:13:20.000Z');
    expect(result.seconds).toBe(1700000000);
    expect(result.milliseconds).toBe(1700000000000);
  });

  it('datetime-local形式の文字列を変換する', () => {
    const result = dateToTimestamp('2023-01-01T00:00');
    expect(typeof result.seconds).toBe('number');
    expect(result.milliseconds).toBe(result.seconds * 1000);
  });

  it('ミリ秒はsecondsの1000倍である', () => {
    const result = dateToTimestamp('2024-06-15T12:30:00Z');
    expect(result.milliseconds).toBe(result.seconds * 1000);
  });
});
