import { describe, expect, it } from 'vitest';
import { formatSql, minifySql } from '../formatSql';

describe('formatSql', () => {
  it('formats SQL', () => {
    const result = formatSql('SELECT id, name FROM users WHERE id = 1');
    expect(result).toContain('SELECT');
    expect(result).toContain('\n');
  });
});

describe('minifySql', () => {
  it('minifies SQL', () => {
    const result = minifySql('SELECT  id,\n  name\nFROM  users');
    expect(result).toBe('SELECT id, name FROM users');
  });
});
