import { format } from 'sql-formatter';

export function formatSql(sql: string): string {
  return format(sql);
}

export function minifySql(sql: string): string {
  return sql.replace(/\s+/g, ' ').trim();
}
