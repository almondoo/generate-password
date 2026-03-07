import { JSONPath } from 'jsonpath-plus';

export function queryJsonPath(json: string, path: string): string {
  const data = JSON.parse(json);
  const result = JSONPath({ path, json: data });
  return JSON.stringify(result, null, 2);
}
