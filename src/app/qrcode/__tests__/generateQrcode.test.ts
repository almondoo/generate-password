import { describe, it, expect } from 'vitest';
import { generateQrCodeDataUrl } from '../generateQrcode';

describe('generateQrCodeDataUrl', () => {
  it('data:image/png;base64, で始まるdata URLを生成する', async () => {
    const result = await generateQrCodeDataUrl({ text: 'hello', size: 256 });
    expect(result).toMatch(/^data:image\/png;base64,/);
  });

  it('日本語テキストのQRコードを生成できる', async () => {
    const result = await generateQrCodeDataUrl({ text: 'こんにちは', size: 256 });
    expect(result).toMatch(/^data:image\/png;base64,/);
  });

  it('長いテキストのQRコードを生成できる', async () => {
    const longText = 'https://example.com/' + 'a'.repeat(200);
    const result = await generateQrCodeDataUrl({ text: longText, size: 512 });
    expect(result).toMatch(/^data:image\/png;base64,/);
  });

  it('空テキストでエラーを投げる', async () => {
    await expect(generateQrCodeDataUrl({ text: '', size: 256 })).rejects.toThrow(
      'テキストを入力してください。',
    );
  });
});
