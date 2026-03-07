import Header from '@/components/Header';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
  title: 'Generator Tools',
  description: 'パスワード・UUID・トークン・ハッシュなどを生成する',
};

interface Props {
  children: ReactNode;
}

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Header />
        <main className="mx-auto w-full max-w-2xl px-4 pt-20 pb-10">
          {children}
        </main>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
};

export default RootLayout;
