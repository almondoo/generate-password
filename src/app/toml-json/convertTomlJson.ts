import * as TOML from 'smol-toml';

export function tomlToJson(input: string): string {
  const obj = TOML.parse(input);
  return JSON.stringify(obj, null, 2);
}

export function jsonToToml(input: string): string {
  const obj = JSON.parse(input);
  return TOML.stringify(obj);
}
