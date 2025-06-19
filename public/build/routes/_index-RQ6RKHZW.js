import {
  Button,
  Card,
  Container,
  SimpleGrid,
  Text,
  Title
} from "/build/_shared/chunk-P73OREPH.js";
import "/build/_shared/chunk-B43JI2TA.js";
import {
  Link
} from "/build/_shared/chunk-QUUF4XWV.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  createHotContext
} from "/build/_shared/chunk-MQOGCYW3.js";
import "/build/_shared/chunk-UWV35TSL.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import "/build/_shared/chunk-7M6SC7J5.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/_index.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\_index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\_index.tsx"
  );
  import.meta.hot.lastModified = "1750344609765.151";
}
function Index() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Container, { size: "md", py: "xl", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 1, align: "center", mb: "lg", children: "\u6B22\u8FCE\u6765\u5230\u6211\u7684\u6280\u672F\u535A\u5BA2\uFF01" }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 25,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "lg", align: "center", mb: "xl", children: "\u5728\u8FD9\u91CC\uFF0C\u6211\u5C06\u5206\u4EAB\u6211\u7684\u6280\u672F\u63A2\u7D22\u3001\u5B66\u4E60\u7B14\u8BB0\u548C\u4E00\u4E9B\u6709\u8DA3\u7684\u4E2A\u4EBA\u9879\u76EE\u3002" }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 29,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SimpleGrid, { cols: {
      base: 1,
      sm: 2
    }, spacing: "lg", mb: "xl", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { shadow: "sm", padding: "lg", radius: "md", withBorder: true, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, mb: "sm", children: "\u6700\u65B0\u6587\u7AE0\uFF1A\u6784\u5EFA Remix \u9759\u6001\u535A\u5BA2" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 39,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", color: "dimmed", mb: "md", children: "\u8FD9\u7BC7\u6587\u7AE0\u5C06\u8BE6\u7EC6\u8BB0\u5F55\u6211\u5982\u4F55\u4F7F\u7528 Remix \u548C Mantine \u642D\u5EFA\u8FD9\u4E2A\u535A\u5BA2\u7684\u6574\u4E2A\u8FC7\u7A0B\u3002" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 40,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { component: Link, to: "/blog/build-remix-blog", variant: "light", fullWidth: true, radius: "md", children: "\u9605\u8BFB\u6587\u7AE0" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 43,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 38,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { shadow: "sm", padding: "lg", radius: "md", withBorder: true, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, mb: "sm", children: "\u6211\u7684\u6280\u672F\u8BCD\u5178" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 50,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", color: "dimmed", mb: "md", children: "\u4E00\u4E2A\u6301\u7EED\u66F4\u65B0\u7684\u6280\u672F\u8BCD\u6C47\u89E3\u91CA\uFF0C\u5E2E\u52A9\u4F60\u7406\u89E3\u590D\u6742\u7684\u6982\u5FF5\u3002" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 51,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { component: Link, to: "/dictionary", variant: "light", fullWidth: true, radius: "md", children: "\u524D\u5F80\u8BCD\u5178" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 54,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 49,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { shadow: "sm", padding: "lg", radius: "md", withBorder: true, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, { order: 3, mb: "sm", children: "\u6709\u8DA3\u7684\u7EC4\u4EF6\uFF1A\u5B9E\u65F6\u65F6\u949F" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 61,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { size: "sm", color: "dimmed", mb: "md", children: "\u4E00\u4E2A\u7B80\u5355\u4F46\u5B9E\u7528\u7684\u5B9E\u65F6\u65F6\u949F\u7EC4\u4EF6\uFF0C\u5C55\u793A\u4E86 React \u7684\u72B6\u6001\u7BA1\u7406\u3002" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 62,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { component: Link, to: "/clock", variant: "light", fullWidth: true, radius: "md", children: "\u67E5\u770B\u65F6\u949F" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 65,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 60,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 33,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { align: "center", mt: "xl", children: "\u7531 Remix, Mantine \u548C TypeScript \u9A71\u52A8 \u{1F389}" }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 72,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 24,
    columnNumber: 10
  }, this);
}
_c = Index;
var _c;
$RefreshReg$(_c, "Index");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Index as default
};
//# sourceMappingURL=/build/routes/_index-RQ6RKHZW.js.map
