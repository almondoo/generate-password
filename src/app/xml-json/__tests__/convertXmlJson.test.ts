import { describe, expect, it } from 'vitest';
import { jsonToXml, xmlToJson } from '../convertXmlJson';

describe('xmlToJson', () => {
  it('converts XML to JSON', () => {
    const xml = '<root><name>test</name><value>42</value></root>';
    const result = JSON.parse(xmlToJson(xml));
    expect(result.root.name).toBe('test');
    expect(result.root.value).toBe(42);
  });
});

describe('jsonToXml', () => {
  it('converts JSON to XML', () => {
    const json = '{"root":{"name":"test","value":42}}';
    const result = jsonToXml(json);
    expect(result).toContain('<name>test</name>');
    expect(result).toContain('<value>42</value>');
  });
});
