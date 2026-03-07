import { describe, expect, it } from 'vitest';
import { jsonToToml, tomlToJson } from '../convertTomlJson';

describe('tomlToJson', () => {
  it('converts TOML to JSON', () => {
    const toml = 'name = "test"\nvalue = 42\n';
    const result = JSON.parse(tomlToJson(toml));
    expect(result).toEqual({ name: 'test', value: 42 });
  });
});

describe('jsonToToml', () => {
  it('converts JSON to TOML', () => {
    const json = '{"name":"test","value":42}';
    const result = jsonToToml(json);
    expect(result).toContain('name = "test"');
    expect(result).toContain('value = 42');
  });
});
