import Header from '@/components/Header';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import { Box } from '@mui/material';
import type { Metadata } from 'next';
import { FC, ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import styles from './layout.module.scss';

export const metadata: Metadata = {
  title: 'パスワード生成',
  description: 'パスワードを生成する',
};

interface Props {
  children: ReactNode;
}

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html lang="ja">
      <body className={styles.Body}>
        <ThemeRegistry>
          <Toaster />
          <Header />
          <Box component="main" className={styles.Layout}>
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
