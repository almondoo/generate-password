import QRCode from 'qrcode';

export interface QrCodeInputs {
  text: string;
  size: number;
}

export async function generateQrCodeDataUrl(
  inputs: QrCodeInputs,
): Promise<string> {
  if (!inputs.text) {
    throw new Error('テキストを入力してください。');
  }
  return QRCode.toDataURL(inputs.text, { width: inputs.size, margin: 2 });
}
