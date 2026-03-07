import { describe, expect, it } from 'vitest';
import { csvToJson, jsonToCsv } from '../convertCsvJson';

describe('csvToJson', () => {
  it('converts CSV with header to JSON', () => {
    const csv = 'name,age\nAlice,30\nBob,25';
    const result = JSON.parse(csvToJson(csv));
    expect(result).toEqual([
      { name: 'Alice', age: '30' },
      { name: 'Bob', age: '25' },
    ]);
  });
});

describe('jsonToCsv', () => {
  it('converts JSON array to CSV', () => {
    const json = '[{"name":"Alice","age":30},{"name":"Bob","age":25}]';
    const result = jsonToCsv(json);
    expect(result).toContain('name,age');
    expect(result).toContain('Alice,30');
  });
});
