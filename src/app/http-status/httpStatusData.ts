export interface HttpStatus {
  code: number;
  name: string;
  description: string;
}

export const httpStatuses: HttpStatus[] = [
  // 1xx Informational
  { code: 100, name: 'Continue', description: 'リクエストの最初の部分が受理され、クライアントはリクエストを続行できる' },
  { code: 101, name: 'Switching Protocols', description: 'サーバーがプロトコルの切り替えに同意した' },
  { code: 102, name: 'Processing', description: 'サーバーがリクエストを処理中（WebDAV）' },
  { code: 103, name: 'Early Hints', description: 'サーバーが最終レスポンス前にヒントを返す' },
  // 2xx Success
  { code: 200, name: 'OK', description: 'リクエストが成功した' },
  { code: 201, name: 'Created', description: 'リクエストが成功し、新しいリソースが作成された' },
  { code: 202, name: 'Accepted', description: 'リクエストが受理されたが、処理はまだ完了していない' },
  { code: 203, name: 'Non-Authoritative Information', description: 'オリジンサーバー以外からの情報' },
  { code: 204, name: 'No Content', description: 'リクエストは成功したが、返すコンテンツはない' },
  { code: 205, name: 'Reset Content', description: 'リクエストは成功、クライアントはビューをリセットすべき' },
  { code: 206, name: 'Partial Content', description: 'レンジリクエストに対する部分的なコンテンツ' },
  { code: 207, name: 'Multi-Status', description: '複数のステータスを含むレスポンス（WebDAV）' },
  { code: 208, name: 'Already Reported', description: '既に報告済みのメンバー（WebDAV）' },
  { code: 226, name: 'IM Used', description: 'インスタンス操作の結果が適用された' },
  // 3xx Redirection
  { code: 300, name: 'Multiple Choices', description: 'リソースに複数の選択肢がある' },
  { code: 301, name: 'Moved Permanently', description: 'リソースが恒久的に移動した' },
  { code: 302, name: 'Found', description: 'リソースが一時的に別のURIにある' },
  { code: 303, name: 'See Other', description: '別のURIでGETリクエストを行うべき' },
  { code: 304, name: 'Not Modified', description: 'リソースは変更されていない（キャッシュ利用可）' },
  { code: 307, name: 'Temporary Redirect', description: '一時的なリダイレクト（メソッドを変更しない）' },
  { code: 308, name: 'Permanent Redirect', description: '恒久的なリダイレクト（メソッドを変更しない）' },
  // 4xx Client Error
  { code: 400, name: 'Bad Request', description: 'リクエストが不正で、サーバーが処理できない' },
  { code: 401, name: 'Unauthorized', description: '認証が必要' },
  { code: 402, name: 'Payment Required', description: '将来の使用のために予約' },
  { code: 403, name: 'Forbidden', description: 'リクエストは理解したが、実行を拒否' },
  { code: 404, name: 'Not Found', description: 'リソースが見つからない' },
  { code: 405, name: 'Method Not Allowed', description: '許可されていないHTTPメソッド' },
  { code: 406, name: 'Not Acceptable', description: 'リクエストのAcceptヘッダーに合致するコンテンツがない' },
  { code: 407, name: 'Proxy Authentication Required', description: 'プロキシでの認証が必要' },
  { code: 408, name: 'Request Timeout', description: 'リクエストがタイムアウトした' },
  { code: 409, name: 'Conflict', description: 'リクエストがリソースの現在の状態と競合している' },
  { code: 410, name: 'Gone', description: 'リソースが恒久的に利用不可' },
  { code: 411, name: 'Length Required', description: 'Content-Lengthヘッダーが必要' },
  { code: 412, name: 'Precondition Failed', description: '前提条件が満たされていない' },
  { code: 413, name: 'Content Too Large', description: 'リクエストボディが大きすぎる' },
  { code: 414, name: 'URI Too Long', description: 'URIが長すぎる' },
  { code: 415, name: 'Unsupported Media Type', description: 'サポートされていないメディアタイプ' },
  { code: 416, name: 'Range Not Satisfiable', description: 'リクエストされたレンジが満たせない' },
  { code: 417, name: 'Expectation Failed', description: 'Expectヘッダーの期待に応えられない' },
  { code: 418, name: "I'm a Teapot", description: '私はティーポットです（RFC 2324）' },
  { code: 422, name: 'Unprocessable Entity', description: 'リクエストは正しいが、意味的に処理できない' },
  { code: 425, name: 'Too Early', description: 'リプレイ攻撃のリスクがあるため処理しない' },
  { code: 426, name: 'Upgrade Required', description: 'プロトコルのアップグレードが必要' },
  { code: 428, name: 'Precondition Required', description: '条件付きリクエストが必要' },
  { code: 429, name: 'Too Many Requests', description: 'レートリミットに達した' },
  { code: 431, name: 'Request Header Fields Too Large', description: 'ヘッダーフィールドが大きすぎる' },
  { code: 451, name: 'Unavailable For Legal Reasons', description: '法的な理由により利用不可' },
  // 5xx Server Error
  { code: 500, name: 'Internal Server Error', description: 'サーバー内部エラー' },
  { code: 501, name: 'Not Implemented', description: 'サーバーがリクエストメソッドをサポートしていない' },
  { code: 502, name: 'Bad Gateway', description: 'ゲートウェイが不正なレスポンスを受信した' },
  { code: 503, name: 'Service Unavailable', description: 'サーバーが一時的に利用不可' },
  { code: 504, name: 'Gateway Timeout', description: 'ゲートウェイがタイムアウトした' },
  { code: 505, name: 'HTTP Version Not Supported', description: 'HTTPバージョンがサポートされていない' },
  { code: 506, name: 'Variant Also Negotiates', description: 'サーバーの内部設定エラー' },
  { code: 507, name: 'Insufficient Storage', description: 'ストレージ不足（WebDAV）' },
  { code: 508, name: 'Loop Detected', description: 'ループが検出された（WebDAV）' },
  { code: 510, name: 'Not Extended', description: 'リクエストの拡張が必要' },
  { code: 511, name: 'Network Authentication Required', description: 'ネットワーク認証が必要' },
];

export function filterStatuses(query: string): HttpStatus[] {
  if (!query.trim()) return httpStatuses;
  const q = query.toLowerCase();
  return httpStatuses.filter(s =>
    s.code.toString().includes(q) ||
    s.name.toLowerCase().includes(q) ||
    s.description.toLowerCase().includes(q)
  );
}
