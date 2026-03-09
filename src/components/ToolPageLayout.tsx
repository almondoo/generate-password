'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { motion } from 'motion/react';
import type { ComponentType, ReactNode } from 'react';

interface ToolPageLayoutProps {
  icon: ComponentType<{ className?: string }>;
  title: string;
  children: ReactNode;
  contentClassName?: string;
  afterCard?: ReactNode;
}

const ToolPageLayout = ({
  icon: Icon,
  title,
  children,
  contentClassName = 'space-y-4',
  afterCard,
}: ToolPageLayoutProps) => (
  <motion.div
    className="space-y-6 py-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
  >
    <Card className="shadow-md">
      <CardHeader className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <Icon className="mx-auto h-8 w-8 text-primary" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.25 }}
        >
          <CardTitle className="text-xl">{title}</CardTitle>
        </motion.div>
      </CardHeader>
      <CardContent className={contentClassName}>
        {children}
      </CardContent>
    </Card>
    {afterCard}
  </motion.div>
);

export default ToolPageLayout;
