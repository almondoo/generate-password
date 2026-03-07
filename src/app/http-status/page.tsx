'use client';

import ToolPageLayout from '@/components/ToolPageLayout';
import { Input } from '@/components/ui/input';
import { FileText } from 'lucide-react';
import { useMemo, useState } from 'react';
import { filterStatuses } from './httpStatusData';

const colorForCode = (code: number) => {
  if (code < 200) return 'text-blue-500';
  if (code < 300) return 'text-green-500';
  if (code < 400) return 'text-yellow-500';
  if (code < 500) return 'text-orange-500';
  return 'text-red-500';
};

const HttpStatusPage = () => {
  const [query, setQuery] = useState('');
  const results = useMemo(() => filterStatuses(query), [query]);

  return (
    <ToolPageLayout icon={FileText} title="HTTPステータスコード一覧">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="コード番号 or テキストで検索..."
      />
      <div className="max-h-[600px] space-y-1 overflow-y-auto">
        {results.map((s) => (
          <div key={s.code} className="flex items-start gap-3 rounded border p-2 text-sm">
            <span className={`font-mono font-bold ${colorForCode(s.code)}`}>{s.code}</span>
            <div>
              <span className="font-medium">{s.name}</span>
              <p className="text-muted-foreground">{s.description}</p>
            </div>
          </div>
        ))}
        {results.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">該当するステータスコードが見つかりません</p>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default HttpStatusPage;
