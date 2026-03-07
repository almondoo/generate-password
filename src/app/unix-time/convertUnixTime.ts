export function timestampToDate(timestamp: number): { iso: string; local: string } {
  const digits = String(Math.abs(timestamp)).length;
  const ms = digits >= 13 ? timestamp : timestamp * 1000;
  const date = new Date(ms);
  return {
    iso: date.toISOString(),
    local: date.toLocaleString('ja-JP'),
  };
}

export function dateToTimestamp(dateStr: string): { seconds: number; milliseconds: number } {
  const ms = new Date(dateStr).getTime();
  return {
    seconds: Math.floor(ms / 1000),
    milliseconds: ms,
  };
}
