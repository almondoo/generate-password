import { describe, it, expect } from 'vitest';
import { decodeJwt } from './decodeJwt';

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
const VALID_JWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

describe('decodeJwt', () => {
  it('有効なJWTをデコードできる', () => {
    const result = decodeJwt(VALID_JWT);

    expect(JSON.parse(result.header)).toEqual({
      alg: 'HS256',
      typ: 'JWT',
    });

    expect(JSON.parse(result.payload)).toEqual({
      sub: '1234567890',
      name: 'John Doe',
      iat: 1516239022,
    });

    expect(result.signature).toBe('SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
  });

  it('HeaderとPayloadが整形されたJSONである', () => {
    const result = decodeJwt(VALID_JWT);

    expect(result.header).toContain('\n');
    expect(result.header).toContain('  ');
    expect(result.payload).toContain('\n');
    expect(result.payload).toContain('  ');
  });

  it('パートが3つでないJWTはエラーになる', () => {
    expect(() => decodeJwt('abc.def')).toThrow('不正なJWT形式です');
    expect(() => decodeJwt('abc')).toThrow('不正なJWT形式です');
    expect(() => decodeJwt('a.b.c.d')).toThrow('不正なJWT形式です');
  });

  it('空文字はエラーになる', () => {
    expect(() => decodeJwt('')).toThrow('不正なJWT形式です');
  });

  it('不正なBase64URLはエラーになる', () => {
    expect(() => decodeJwt('!!!.@@@.###')).toThrow();
  });
});
