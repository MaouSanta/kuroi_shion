// src/app/layout.tsx
import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css'; // 如果使用了日期选择器，需要引入样式
import { createTheme } from '@mantine/core';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '我的 Next.js 博客',
  description: '一个使用 Next.js 和 Mantine 构建的个人博客',
};

const theme = createTheme({
  fontFamily: 'Noto Sans JP, sans-serif', // 如果需要日文字体
  primaryColor: 'violet', // 更改主色调，Mantine 会自动生成一系列深浅颜色
  // colors: {
  //   // 自定义颜色
  //   'deep-purple': ['#ede9fb', /* ...其他深浅 */ '#4a148c'],
  // },
  // primaryColor: 'deep-purple',
  spacing: { xs: '8px', sm: '12px', md: '16px', lg: '24px', xl: '32px' },
  // ... 更多主题定制选项
});

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body className={inter.className}>
        <MantineProvider theme={theme} defaultColorScheme="auto">
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     // 在 <html> 标签上添加 suppressHydrationWarning
//     <html lang="zh-CN" suppressHydrationWarning>
//       <head>
//         <ColorSchemeScript defaultColorScheme="auto" /> {/* 可以使用 auto，因为 warning 被 suppress 了 */}
//       </head>
//       <body className={inter.className}>
//         <MantineProvider defaultColorScheme="auto">
//           {children}
//         </MantineProvider>
//       </body>
//     </html>
//   );
// }