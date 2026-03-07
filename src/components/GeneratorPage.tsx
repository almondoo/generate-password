'use client';

import { Button } from '@/components/ui/button';
import ToolPageLayout from '@/components/ToolPageLayout';
import ResultListCard from '@/components/ResultListCard';
import useResultList from '@/app/useResultList';
import { motion } from 'motion/react';
import type { ComponentType, ReactNode } from 'react';

interface GeneratorPageProps {
  icon: ComponentType<{ className?: string }>;
  title: string;
  buttonLabel: string;
  results: string[];
  onSubmit: (e: React.FormEvent) => void;
  children: ReactNode;
  notice?: ReactNode;
}

const GeneratorPage = ({
  icon: Icon,
  title,
  buttonLabel,
  results,
  onSubmit,
  children,
  notice,
}: GeneratorPageProps) => {
  const { resultRef, copiedIndex, handleCopy } = useResultList(results);

  return (
    <ToolPageLayout
      icon={Icon}
      title={title}
      afterCard={
        <ResultListCard
          results={results}
          resultRef={resultRef}
          copiedIndex={copiedIndex}
          onCopy={handleCopy}
          notice={notice}
        />
      }
    >
      <form onSubmit={onSubmit} className="space-y-6">
        {children}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button type="submit" className="w-full">
            {buttonLabel}
          </Button>
        </motion.div>
      </form>
    </ToolPageLayout>
  );
};

export default GeneratorPage;
