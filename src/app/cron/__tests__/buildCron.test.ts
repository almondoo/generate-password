import { describe, expect, it } from 'vitest';
import { buildCron } from '../buildCron';

describe('buildCron', () => {
  it('毎分のCron式を生成する', () => {
    expect(buildCron({ minute: '*', hour: '*', dayOfMonth: '*', month: '*', dayOfWeek: '*' })).toBe('* * * * *');
  });

  it('平日9時のCron式を生成する', () => {
    expect(buildCron({ minute: '0', hour: '9', dayOfMonth: '*', month: '*', dayOfWeek: '1-5' })).toBe('0 9 * * 1-5');
  });

  it('毎月1日0時のCron式を生成する', () => {
    expect(buildCron({ minute: '0', hour: '0', dayOfMonth: '1', month: '*', dayOfWeek: '*' })).toBe('0 0 1 * *');
  });

  it('カスタム値を組み合わせられる', () => {
    expect(buildCron({ minute: '0,30', hour: '9', dayOfMonth: '*', month: '1,4,7,10', dayOfWeek: '*' })).toBe('0,30 9 * 1,4,7,10 *');
  });
});
