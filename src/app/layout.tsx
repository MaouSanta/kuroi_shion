// src/app/layout.tsx
import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '我的 Next.js 博客',
  description: '一个使用 Next.js 和 Mantine 构建的个人博客',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 在 <html> 标签上添加 suppressHydrationWarning
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" /> {/* 可以使用 auto，因为 warning 被 suppress 了 */}
      </head>
      <body className={inter.className}>
        <MantineProvider defaultColorScheme="auto">
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}