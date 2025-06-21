// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import { MantineProvider, ColorSchemeScript } from '@mantine/core';

// 导入你的字体设置，确保 Noto Sans JP 被正确加载
// 如果你已经移除了 @next/font/google，并且在 <head> 中直接引入了 <link>，
// 那么这里就不用再导入字体文件了。

export const metadata: Metadata = {
  title: '黒井獅音 歌リスト記録',
  description: '獅音さんが配信で歌った曲を記録中、随時更新されます...',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <ColorSchemeScript />
        {/* 确保 Noto Sans JP 字体在这里被正确引入 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* 应用字体类，如果之前没有直接在 body 应用，这里可以添加一个 CSS 变量 */}
      <body style={{ margin: 0, padding: 0 }}>
        <MantineProvider>
          {/* 使用 Flexbox 布局，min-h-screen 让 body 至少和视口一样高 */}
          {/* flex-col 让子元素垂直排列 */}
          {/* flex-grow 让 main 内容区域填充可用空间 */}
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Header (你可以根据实际情况替换为你的 Header 组件) */}
            {/* <header style={{ padding: '1rem', borderBottom: '1px solid #eee', background: '#fff' }}>
              {/* 你可以在这里放置你的全局导航或品牌信息 */}
            {/* <h1 style={{ margin: 0, fontSize: '1.5rem', textAlign: 'center' }}>黒井獅音 歌単</h1>
            </header> */}

            {/* Main content area, will grow to fill available space */}
            <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', padding: '1rem' }}>
              {children}
            </main>

            {/* Footer (你可以根据实际情况替换为你的 Footer 组件) */}
            <footer style={{ padding: '1rem', borderTop: '1px solid #eee', textAlign: 'center', background: '#fff' }}>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#666' }}>© 2024 Kuroi Shion Song Set List. All rights reserved.</p>
            </footer>
          </div>
        </MantineProvider>
      </body>
    </html>
  );
}