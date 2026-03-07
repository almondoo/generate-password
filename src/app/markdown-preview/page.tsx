'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { BookOpen } from 'lucide-react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const remarkPlugins = [remarkGfm];

const MarkdownPreviewPage = () => {
  const [markdown, setMarkdown] = useState('');

  return (
    <div className="space-y-6 py-6">
      <Card>
        <CardHeader className="text-center">
          <BookOpen className="mx-auto h-8 w-8 text-muted-foreground" />
          <CardTitle className="text-xl">Markdownプレビュー</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="md-input" className="text-sm font-medium">
                Markdown
              </label>
              <Textarea
                id="md-input"
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder="Markdownを入力..."
                rows={16}
                className="font-mono"
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">プレビュー</p>
              <div className="prose prose-sm dark:prose-invert max-w-none rounded-md border p-4 min-h-[20rem] overflow-auto">
                <ReactMarkdown remarkPlugins={remarkPlugins}>
                  {markdown}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarkdownPreviewPage;
