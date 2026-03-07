export type DecodedJwt = {
  header: string;
  payload: string;
  signature: string;
};

function decodeBase64Url(str: string): string {
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(base64);
  return decodeURIComponent(escape(binary));
}

export function decodeJwt(token: string): DecodedJwt {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('不正なJWT形式です。3つのパートが必要です。');
  }

  const header = JSON.stringify(JSON.parse(decodeBase64Url(parts[0])), null, 2);
  const payload = JSON.stringify(JSON.parse(decodeBase64Url(parts[1])), null, 2);
  const signature = parts[2];

  return { header, payload, signature };
}
