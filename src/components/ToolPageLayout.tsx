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
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.4 }}
  >
    <Card>
      <CardHeader className="text-center">
        <Icon className="mx-auto h-8 w-8 text-muted-foreground" />
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className={contentClassName}>
        {children}
      </CardContent>
    </Card>
    {afterCard}
  </motion.div>
);

export default ToolPageLayout;
