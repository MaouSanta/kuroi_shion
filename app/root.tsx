import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { MantineProvider, ColorSchemeScript } from '@mantine/core'; // 导入 MantineProvider 和 ColorSchemeScript
import '@mantine/core/styles.css'; // 导入 Mantine 全局样式

// 如果您有自己的全局 CSS 文件，也在这里导入
// import appStylesHref from "./app.css?url"; // 示例

export const links: LinksFunction = () => [
  // { rel: "stylesheet", href: appStylesHref }, // 如果有自己的 CSS
];

export default function App() {
  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {/* 确保 ColorSchemeScript 在 <head> 中，用于主题管理 */}
        <ColorSchemeScript />
      </head>
      <body>
        {/* 用 MantineProvider 包裹整个应用 */}
        <MantineProvider withGlobalClasses withNormalizeCSS>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </MantineProvider>
      </body>
    </html>
  );
}