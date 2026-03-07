import { describe, expect, it } from 'vitest';
import { jsonToYaml, yamlToJson } from '../convertYamlJson';

describe('yamlToJson', () => {
  it('converts YAML to JSON', () => {
    const yamlStr = 'name: test\nvalue: 42\n';
    const result = JSON.parse(yamlToJson(yamlStr));
    expect(result).toEqual({ name: 'test', value: 42 });
  });
});

describe('jsonToYaml', () => {
  it('converts JSON to YAML', () => {
    const jsonStr = '{"name":"test","value":42}';
    const result = jsonToYaml(jsonStr);
    expect(result).toContain('name: test');
    expect(result).toContain('value: 42');
  });
});
