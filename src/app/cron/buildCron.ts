export interface CronSchedule {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
}

export function buildCron(schedule: CronSchedule): string {
  return `${schedule.minute} ${schedule.hour} ${schedule.dayOfMonth} ${schedule.month} ${schedule.dayOfWeek}`;
}

export const MINUTE_OPTIONS = [
  { label: '毎分', value: '*' },
  { label: '0分', value: '0' },
  { label: '15分', value: '15' },
  { label: '30分', value: '30' },
  { label: '45分', value: '45' },
  { label: '0,30分', value: '0,30' },
  { label: '0,15,30,45分', value: '0,15,30,45' },
] as const;

export const HOUR_OPTIONS = [
  { label: '毎時', value: '*' },
  { label: '0時', value: '0' },
  { label: '3時', value: '3' },
  { label: '6時', value: '6' },
  { label: '9時', value: '9' },
  { label: '12時', value: '12' },
  { label: '15時', value: '15' },
  { label: '18時', value: '18' },
  { label: '21時', value: '21' },
] as const;

export const DOM_OPTIONS = [
  { label: '毎日', value: '*' },
  { label: '1日', value: '1' },
  { label: '15日', value: '15' },
  { label: '1,15日', value: '1,15' },
] as const;

export const MONTH_OPTIONS = [
  { label: '毎月', value: '*' },
  { label: '1月', value: '1' },
  { label: '4月', value: '4' },
  { label: '7月', value: '7' },
  { label: '10月', value: '10' },
  { label: '1,4,7,10月', value: '1,4,7,10' },
] as const;

export const DOW_OPTIONS = [
  { label: '毎日', value: '*' },
  { label: '月〜金', value: '1-5' },
  { label: '土日', value: '0,6' },
  { label: '月', value: '1' },
  { label: '水', value: '3' },
  { label: '金', value: '5' },
] as const;
