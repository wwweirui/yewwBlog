# 黄金观察模块 — 设计文档

> 个人博客新增「黄金」板块，展示国际金价走势并收集网络研究报告。

## 1. 概述

在现有博客（Next.js 14 + Tailwind CSS + shadcn/ui）中，以与 `/projects`、`/uses` 一致的模式新增一个 `/gold` 页面。页面包含两个核心区块：嵌入 TradingView 图表的实时金价走势，以及带分页的研究报告列表。

## 2. 路由与导航

| 路由    | 说明                                   |
| ------- | -------------------------------------- |
| `/gold` | 黄金观察主页面（静态路由，无动态参数） |

导航栏新增顶级条目，与 Content / Projects / Tags 同级：

```
Content  |  黄金  |  Projects  |  Tags
```

实现：在 `lib/navigation-links.ts` 的 `navigationLinks` 数组中添加 `{ title: "黄金", href: "/gold" }`。

## 3. 页面布局

```
/gold page（服务端组件）
│
├─ H1 + 描述文案
│
├─ GoldChart（"use client" 客户端组件）
│   └─ TradingView 小部件 (OANDA:XAUUSD)
│      全宽卡片，border 圆角容器，高度 500px
│
├─ 📚 最新研究报告（Section 标题 + 分割线）
│
├─ ReportCard 列表（×N，当前页条目）
│
└─ 简单分页导航（上一页 / 页码 / 下一页）
    每页 10 条，查询参数：/gold?page=N
```

## 4. 新建文件清单

| 文件                         | 类型         | 职责                                                |
| ---------------------------- | ------------ | --------------------------------------------------- |
| `app/(site)/gold/page.tsx`   | 服务端组件   | 页面主入口，组合 GoldChart + ReportCard 列表 + 分页 |
| `components/gold-chart.tsx`  | "use client" | TradingView 图表小部件的封装                        |
| `components/report-card.tsx` | 服务端组件   | 单条研究报告卡片渲染                                |
| `lib/gold-reports.ts`        | 静态数据     | 研究报告数组数据                                    |
| `types/gold.ts`              | 类型定义     | `GoldReport` 接口                                   |

## 5. 类型定义

```typescript
// types/gold.ts
export type GoldReport = {
  id: string;
  title: string;
  date: string; // "YYYY-MM-DD"
  source: string; // 来源机构名称
  url: string; // 原文外部链接
  description: string; // 摘要
  tags?: string[];
};
```

## 6. 组件设计

### GoldChart（客户端组件）

- 通过动态加载 `<script src="https://s3.tradingview.com/tv.js">` 注入 TradingView 小部件
- `useEffect` 中初始化 `new TradingView.widget(...)`，挂载到 `ref` 容器
- 配置：symbol `OANDA:XAUUSD`（现货黄金/美元），日线 `D`，折线图，简体中文 `zh_CN`
- 隐藏顶部工具栏，保持简洁
- 容器高度 500px，自适应宽度，带 border 和 bg-card 配色
- `useEffect` 清理函数销毁小部件防止内存泄漏

### ReportCard（服务端组件）

- 与 PostPreview 保持一致的设计语言
- 展示：标题（外部链接跳转）、日期、来源机构（Badge）、标签（Badge outline）、描述摘录（line-clamp-2）
- 悬停效果复现现有 hover:bg-foreground/10 模式

### 分页逻辑

- 利用 `lib/utils.ts` 中已有的 `pageCount()` 函数
- 分页组件内联在 `app/(site)/gold/page.tsx` 底部，不抽取为新组件
- 条件渲染：`generatePaginationRange()` 辅助函数生成页码数组
- 当前页高亮，禁用边界（page=1 时「上一页」不可用）
- 使用 `<Link>` 组件导航到 `/gold?page=N`
- 默认当没有 page 参数时视为 page=1
- 只有在报告数量超过每页限制时才显示分页

## 7. 数据层

```typescript
// lib/gold-reports.ts
// 静态数据数组，类似 lib/projects-data.ts 的模式
// 后续可升级为 Content Collection 或 CMS 数据源

export const goldReports: GoldReport[] = [
  {
    id: "001",
    title: "2025年上半年黄金市场回顾与下半年展望",
    date: "2025-06-15",
    source: "世界黄金协会",
    url: "https://www.gold.org/...",
    description: "上半年国际金价突破...",
    tags: ["央行购金", "展望"],
  },
  // ... 后续手动新增
];
```

## 8. 元数据（SEO）

```typescript
export const metadata: Metadata = {
  title: "黄金观察",
  description: "关注国际金价走势与市场动态，定期收录黄金研究报告与深度分析。",
};
```

## 9. 设计原则

- **最小侵入**：不修改 Content Collections 配置，不引入新依赖（TradingView 通过 CDN script 加载）
- **模式对齐**：沿用现有 /projects 的静态数据模式、PostPreview 的卡片设计语言、现有配色方案
- **可扩展性**：未来可升级为 Content Collection 集合（goldReports）或接入价格 API，无需重写页面

## 10. 非功能性需求

- TradingView 小部件仅在客户端渲染（`"use client"` + `useEffect`），不影响 SSR/SSG 性能
- 分页采用查询参数模式，无需改动路由定义
- 所有外部链接默认新标签打开（`target="_blank" rel="noopener noreferrer"`）
