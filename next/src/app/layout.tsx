import Header from '@/components/Header';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import { Box } from '@mui/material';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata: Metadata = {
  title: 'パスワード生成',
  description: 'パスワードを生成する',
};

interface Props {
  children: ReactNode;
}

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="ja">
      <body className="bg-[#eee]">
        <ThemeRegistry>
          <Toaster />
          <Header />
          <Box component="main" className="w-full h-[calc(100vh-56px)] pt-14 sm:h-[calc(100vh-64px)] sm:pt-16 sm:px-[30px] lg:w-[1024px] lg:mx-auto">
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
