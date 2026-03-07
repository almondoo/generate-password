'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
  <div className="space-y-6 py-6">
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
  </div>
);

export default ToolPageLayout;
