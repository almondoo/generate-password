import { XMLBuilder, XMLParser } from 'fast-xml-parser';

export function xmlToJson(xml: string): string {
  const parser = new XMLParser();
  const obj = parser.parse(xml);
  return JSON.stringify(obj, null, 2);
}

export function jsonToXml(json: string): string {
  const obj = JSON.parse(json);
  const builder = new XMLBuilder({ format: true });
  return builder.build(obj);
}
