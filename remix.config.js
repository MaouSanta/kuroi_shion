/** @type {import('@remix-run/dev').AppConfig} */
export default {
    ignoredRouteFiles: ["**/.*"],
    publicPath: "/build/",
    serverBuildPath: "build/index.js",
    assetsBuildDirectory: "public/build",
    // 关键：启用未来特性，包括静态导出
    future: {
        v2_dev: true, // 启用 v2 开发模式
        v2_routeConvention: true, // 启用 v2 路由约定 (例如 _index.tsx)
        // 启用不稳定但可用的静态导出功能
        // 这将确保 Remix 在构建时生成静态 HTML 文件
        // 注意：Remix 的静态导出功能仍在发展中，可能会有一些限制
        unstable_static: true,
    },
// ... 其他配置
  };