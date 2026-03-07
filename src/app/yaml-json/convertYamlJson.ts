import yaml from 'js-yaml';

export function yamlToJson(input: string): string {
  const obj = yaml.load(input);
  return JSON.stringify(obj, null, 2);
}

export function jsonToYaml(input: string): string {
  const obj = JSON.parse(input);
  return yaml.dump(obj);
}
