'use client';

import { Button } from '@/components/ui/button';
import ToolPageLayout from '@/components/ToolPageLayout';
import { Input } from '@/components/ui/input';
import { Globe } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useState } from 'react';

interface OgpData {
  title: string;
  description: string;
  image: string;
  url: string;
  siteName: string;
}

const OgpPreviewPage = () => {
  const [url, setUrl] = useState('');
  const [ogp, setOgp] = useState<OgpData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFetch = useCallback(async () => {
    setError('');
    setOgp(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/ogp?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'OGP情報の取得に失敗しました。');
        return;
      }
      setOgp(data);
    } catch {
      setError('OGP情報の取得に失敗しました。');
    } finally {
      setLoading(false);
    }
  }, [url]);

  return (
    <ToolPageLayout icon={Globe} title="OGPプレビュー">
      <div className="space-y-2">
        <label htmlFor="ogp-url" className="text-sm font-medium">
          URL
        </label>
        <Input
          id="ogp-url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
        />
      </div>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button type="button" className="w-full" onClick={handleFetch} disabled={loading}>
          {loading ? '取得中...' : 'OGP情報を取得'}
        </Button>
      </motion.div>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      <AnimatePresence>
        {ogp && (
          <motion.div
            className="space-y-3 rounded-md border p-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {ogp.image && (
              <div className="flex justify-center">
                <img src={ogp.image} alt={ogp.title} className="max-h-48 rounded" />
              </div>
            )}
            {ogp.siteName && (
              <p className="text-xs text-muted-foreground">{ogp.siteName}</p>
            )}
            {ogp.title && (
              <p className="font-medium">{ogp.title}</p>
            )}
            {ogp.description && (
              <p className="text-sm text-muted-foreground">{ogp.description}</p>
            )}
            <p className="text-xs text-muted-foreground break-all">{ogp.url}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </ToolPageLayout>
  );
};

export default OgpPreviewPage;
