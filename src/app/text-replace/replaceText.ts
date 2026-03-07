export function replaceText(
  text: string,
  search: string,
  replacement: string,
  useRegex: boolean,
): string {
  if (search === '') return text;
  if (useRegex) {
    const regex = new RegExp(search, 'g');
    return text.replace(regex, replacement);
  }
  return text.split(search).join(replacement);
}
