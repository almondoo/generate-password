import { XMLBuilder, XMLParser } from 'fast-xml-parser';

export function formatXml(xml: string): string {
  const parser = new XMLParser({ preserveOrder: true, ignoreAttributes: false });
  const obj = parser.parse(xml);
  const builder = new XMLBuilder({ preserveOrder: true, ignoreAttributes: false, format: true, indentBy: '  ' });
  return builder.build(obj);
}

export function minifyXml(xml: string): string {
  return xml.replace(/>\s+</g, '><').trim();
}
