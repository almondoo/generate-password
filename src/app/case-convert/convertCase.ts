function tokenize(input: string): string[] {
  return input
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/[_\-./\s]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

export function toCamelCase(input: string): string {
  const words = tokenize(input);
  if (words.length === 0) return '';
  return words[0].toLowerCase() + words.slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
}

export function toPascalCase(input: string): string {
  return tokenize(input).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
}

export function toSnakeCase(input: string): string {
  return tokenize(input).map(w => w.toLowerCase()).join('_');
}

export function toUpperSnakeCase(input: string): string {
  return tokenize(input).map(w => w.toUpperCase()).join('_');
}

export function toKebabCase(input: string): string {
  return tokenize(input).map(w => w.toLowerCase()).join('-');
}

export interface CaseResults {
  camelCase: string;
  pascalCase: string;
  snakeCase: string;
  upperSnakeCase: string;
  kebabCase: string;
}

export function convertAllCases(input: string): CaseResults {
  const words = tokenize(input);
  if (words.length === 0) return { camelCase: '', pascalCase: '', snakeCase: '', upperSnakeCase: '', kebabCase: '' };
  return {
    camelCase: words[0].toLowerCase() + words.slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(''),
    pascalCase: words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(''),
    snakeCase: words.map(w => w.toLowerCase()).join('_'),
    upperSnakeCase: words.map(w => w.toUpperCase()).join('_'),
    kebabCase: words.map(w => w.toLowerCase()).join('-'),
  };
}
