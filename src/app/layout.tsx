import './globals.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import { MantineProvider, ColorSchemeScript, Group, Anchor, Text } from '@mantine/core';
import { IconMail } from '@tabler/icons-react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <ColorSchemeScript />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <MantineProvider>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Main content area */}
            <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', padding: '1rem' }}>
              {children}
            </main>

            {/* --- Footer --- */}
            <footer style={{ padding: '1rem', borderTop: '1px solid var(--mantine-color-gray-2)', textAlign: 'center', background: 'var(--mantine-color-body)' }}>
              <Text size="sm" c="dimmed" mb="xs">
                © {new Date().getFullYear()} Kuroi Shion Song Set List. All rights reserved.
              </Text>
              <Anchor href="mailto:jxk706060666@gmail.com" title="作者への連絡先">
                <Group gap={4} display="inline-flex">
                  <IconMail size={14} /> <Text size="sm">連絡先：jxk706060666@gmail.com</Text>
                </Group>
              </Anchor>
            </footer>
          </div>
        </MantineProvider>
      </body>
    </html>
  );
}