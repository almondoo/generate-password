const SENTENCES = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'Curabitur pretium tincidunt lacus, nec tempor arcu vehicula ut.',
  'Maecenas vel enim sit amet eros faucibus facilisis.',
  'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
  'Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.',
  'Donec eu libero sit amet quam egestas semper.',
  'Aenean ultricies mi vitae est, mauris sit amet enim.',
  'Proin gravida nibh vel velit auctor aliquet.',
  'Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit.',
  'Fusce nec tellus sed augue semper porta.',
  'Nulla quis sem at nibh elementum imperdiet.',
  'Integer lacinia sollicitudin massa, cras metus sed aliquet risus a tortor.',
  'Vivamus vestibulum sagittis sapien, cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
  'Etiam porta sem malesuada magna mollis euismod.',
  'Morbi leo risus, porta ac consectetur ac, vestibulum at eros.',
  'Praesent commodo cursus magna, vel scelerisque nisl consectetur et.',
];

function pickRandom<T>(arr: T[], count: number): T[] {
  const result: T[] = [];
  for (let i = 0; i < count; i++) {
    result.push(arr[Math.floor(Math.random() * arr.length)]);
  }
  return result;
}

export function generateLoremIpsum(paragraphs: number): string {
  if (paragraphs < 1) return '';
  const result: string[] = [];
  for (let i = 0; i < paragraphs; i++) {
    const sentenceCount = 3 + Math.floor(Math.random() * 4); // 3-6 sentences
    const sentences = pickRandom(SENTENCES, sentenceCount);
    if (i === 0) {
      sentences[0] = SENTENCES[0]; // Always start with "Lorem ipsum..."
    }
    result.push(sentences.join(' '));
  }
  return result.join('\n\n');
}
