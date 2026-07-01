# 黄金观察模块 — 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在博客中新增 `/gold` 页面，展示 TradingView 金价走势图 + 带分页的研究报告列表。

**Architecture:** 沿用 /projects 的静态数据模式（`lib/gold-reports.ts`），新增 `GoldChart` 客户端组件嵌入 TradingView 小部件，`ReportCard` 服务端组件渲染报告条目，页面内置分页逻辑。

**Tech Stack:** Next.js 14 App Router, TradingView CDN Widget, Tailwind CSS, shadcn/ui (Card, Badge)

---

## 文件结构

| 文件                         | 职责                                     |
| ---------------------------- | ---------------------------------------- |
| `types/gold.ts`              | `GoldReport` 类型定义                    |
| `lib/gold-reports.ts`        | 研究报告静态数据数组                     |
| `components/gold-chart.tsx`  | TradingView 图表小部件封装（客户端组件） |
| `components/report-card.tsx` | 单条研究报告卡片渲染                     |
| `app/(site)/gold/page.tsx`   | 黄金页面主入口（含分页逻辑）             |
| `lib/navigation-links.ts`    | 新增「黄金」导航条目                     |

### Task 1: 定义 GoldReport 类型

**Files:**

- Create: `types/gold.ts`

- [ ] **Step 1: 创建类型文件**

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

- [ ] **Step 2: 提交**

```bash
git add types/gold.ts
git commit -m "feat: 添加 GoldReport 类型定义"
```

### Task 2: 创建研究报告静态数据

**Files:**

- Create: `lib/gold-reports.ts`

- [ ] **Step 1: 创建数据文件**（含几条示例数据用于验证分页）

```typescript
// lib/gold-reports.ts
import type { GoldReport } from "@/types/gold";

export const goldReports: GoldReport[] = [
  {
    id: "001",
    title: "2025年上半年黄金市场回顾与下半年展望",
    date: "2025-06-15",
    source: "世界黄金协会",
    url: "https://www.gold.org/goldhub/gold-focus/2025/06/h1-review-h2-outlook",
    description:
      "全球央行持续购金、地缘政治不确定性加剧、美联储货币政策转向预期，多重因素推动金价创历史新高。本文回顾上半年市场表现并展望下半年趋势。",
    tags: ["央行购金", "展望"],
  },
  {
    id: "002",
    title: "美联储降息周期对金价影响的实证分析",
    date: "2025-05-20",
    source: "高盛",
    url: "https://www.goldmansachs.com/insights/gold/rate-cut-analysis",
    description:
      "分析历次美联储降息周期中黄金价格的表现模式，探讨当前宏观环境下金价的潜在走势。历史数据显示降息周期启动后12个月内金价平均上涨约15%。",
    tags: ["美联储", "利率"],
  },
  {
    id: "003",
    title: "全球央行黄金储备变化趋势报告",
    date: "2025-04-28",
    source: "国际货币基金组织",
    url: "https://www.imf.org/data/gold-reserves",
    description:
      "2025年Q1全球央行净购金量达286吨，新兴市场央行仍是主要买家。中国央行连续18个月增持黄金储备，土耳其、印度紧随其后。",
    tags: ["央行购金", "储备"],
  },
  {
    id: "004",
    title: "黄金ETF资金流向与持仓分析",
    date: "2025-04-10",
    source: "世界黄金协会",
    url: "https://www.gold.org/goldhub/data/gold-etf-holdings",
    description:
      "全球黄金ETF在2025年3月净流入约85亿美元，北美和欧洲市场为主要推动力。SPDR Gold Shares持仓量月环比增长约4.2%。",
    tags: ["ETF", "资金流向"],
  },
  {
    id: "005",
    title: "地缘政治风险与黄金避险需求研究",
    date: "2025-03-22",
    source: "瑞银",
    url: "https://www.ubs.com/global/wealth-management/gold-geopolitics",
    description:
      "当前全球地缘政治风险指数处于近十年高位，俄乌冲突持续、中东局势紧张等因素持续推升黄金避险需求。研究发现地缘政治风险每上升一个标准差，金价月均上涨约3.5%。",
    tags: ["地缘政治", "避险"],
  },
  {
    id: "006",
    title: "黄金供需基本面年度报告（2025）",
    date: "2025-03-01",
    source: "世界黄金协会",
    url: "https://www.gold.org/goldhub/data/gold-supply-demand",
    description:
      "2024年全球黄金需求总量达4,974吨，创历史新高。央行购金和珠宝需求是主要驱动因素。供给端矿产金产量同比增长约2%，回收金供应保持稳定。",
    tags: ["供需", "年度报告"],
  },
  {
    id: "007",
    title: "金价与美元指数相关性深度分析",
    date: "2025-02-14",
    source: "摩根大通",
    url: "https://www.jpmorgan.com/insights/gold/gold-dxy-correlation",
    description:
      "传统上金价与美元指数呈负相关，但近年该相关性有所减弱。本文探讨全球央行多元化储备、去美元化趋势对金价-美元关系的结构性影响。",
    tags: ["美元", "相关性"],
  },
  {
    id: "008",
    title: "技术分析：黄金当前关键支撑与阻力位",
    date: "2025-01-30",
    source: "技术分析",
    url: "https://www.tradingview.com/symbols/XAUUSD/technicals",
    description:
      "基于斐波那契回撤、移动均线系统和相对强弱指数（RSI）的综合技术分析。日线级别关键支撑位在2,150美元/盎司，阻力位在2,450美元/盎司。",
    tags: ["技术分析", "关键价位"],
  },
  {
    id: "009",
    title: "新兴市场央行购金动机与趋势",
    date: "2025-01-15",
    source: "巴克莱",
    url: "https://www.barclays.com/insights/em-central-bank-gold",
    description:
      "新兴市场央行增持黄金的主要动机包括：外汇储备多元化、降低对美元依赖、提升储备安全性。预计2025年新兴市场央行购金量将持续处于高位。",
    tags: ["新兴市场", "央行购金"],
  },
  {
    id: "010",
    title: "黄金在投资组合中的配置价值研究",
    date: "2025-01-05",
    source: "桥水基金",
    url: "https://www.bridgewater.com/research/gold-portfolio-allocation",
    description:
      "在股债相关性上升的背景下，黄金作为零相关资产的对冲价值凸显。研究表明在传统60/40组合中配置5%-15%的黄金可有效提升风险调整后收益。",
    tags: ["资产配置", "组合优化"],
  },
  {
    id: "011",
    title: "铂金 vs 黄金：贵金属投资策略对比",
    date: "2025-01-02",
    source: "渣打银行",
    url: "https://www.sc.com/insights/precious-metals-comparison",
    description:
      "铂金与黄金在工业需求、供给格局和价格驱动因素上存在显著差异。本文对比分析两种贵金属的投资逻辑，探讨当前估值差异背后的机会。",
    tags: ["铂金", "对比分析"],
  },
  {
    id: "012",
    title: "数字货币崛起对黄金的"替代效应"分析",
    date: "2024-12-20",
    source: "高盛",
    url: "https://www.goldmansachs.com/insights/digital-gold-comparison",
    description:
      "比特币被称为"数字黄金"的叙事在近年备受关注。但研究表明，黄金与比特币在波动率、流动性、机构接受度等方面差异巨大，短期内替代效应有限。",
    tags: ["比特币", "数字黄金"],
  },
];

export const REPORTS_PER_PAGE = 10;
```

- [ ] **Step 2: 提交**

```bash
git add lib/gold-reports.ts
git commit -m "feat: 添加黄金研究报告数据"
```

### Task 3: 实现 GoldChart 客户端组件

**Files:**

- Create: `components/gold-chart.tsx`

- [ ] **Step 1: 创建 TradingView 图表组件**

```tsx
// components/gold-chart.tsx
"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    TradingView: any;
  }
}

export default function GoldChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    if (widgetRef.current) return; // 防止 StrictMode 重复创建

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (containerRef.current && window.TradingView) {
        widgetRef.current = new window.TradingView.widget({
          container_id: containerRef.current.id,
          symbol: "OANDA:XAUUSD",
          interval: "D",
          theme: "dark",
          style: "1",
          width: "100%",
          height: 500,
          locale: "zh_CN",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          hide_top_toolbar: true,
          hide_legend: false,
          save_image: false,
          allow_symbol_change: true,
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      if (widgetRef.current) {
        try {
          widgetRef.current.remove();
        } catch {
          // ignore cleanup errors
        }
        widgetRef.current = null;
      }
      // 不移除 script（其他实例可能还在用）
    };
  }, []);

  return (
    <div
      id="tv-chart-container"
      ref={containerRef}
      className="w-full overflow-hidden rounded-lg border bg-card"
      style={{ height: 500 }}
    />
  );
}
```

- [ ] **Step 2: 提交**

```bash
git add components/gold-chart.tsx
git commit -m "feat: 实现 GoldChart 黄金走势图组件"
```

### Task 4: 实现 ReportCard 组件

**Files:**

- Create: `components/report-card.tsx`

- [ ] **Step 1: 创建研究报告卡片组件**

```tsx
// components/report-card.tsx
import { format, parseISO } from "date-fns";
import { CalendarDays, ExternalLink } from "lucide-react";

import type { GoldReport } from "@/types/gold";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type ReportCardProps = {
  report: GoldReport;
};

export default function ReportCard({ report }: ReportCardProps) {
  return (
    <article className="w-full">
      <a
        href={report.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "select-rounded-md block w-full rounded-md p-4 leading-none no-underline outline-none transition-colors hover:bg-foreground/10 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <h3 className="my-2 text-2xl font-bold text-foreground">{report.title}</h3>
          <ExternalLink size={16} className="mt-3 shrink-0 text-muted-foreground" />
        </div>
        <div className="flex flex-wrap gap-2 text-sm leading-snug text-muted-foreground">
          <div className="flex items-center gap-1">
            <CalendarDays size={16} />
            <time dateTime={report.date}>{format(parseISO(report.date), "yyyy-MM-dd")}</time>
          </div>
          <span className="opacity-50">|</span>
          <Badge variant="secondary" className="rounded-full px-2 py-0.5 text-xs">
            {report.source}
          </Badge>
        </div>
        {report.tags && report.tags.length > 0 && (
          <ul className="my-4 flex list-none flex-wrap gap-2 p-0">
            {report.tags.map((tag) => (
              <li key={tag}>
                <Badge
                  variant="outline"
                  className="inline-block rounded-full border border-muted-foreground/50 bg-muted-foreground/10 px-2 py-0.5 text-xs text-muted-foreground"
                >
                  {tag}
                </Badge>
              </li>
            ))}
          </ul>
        )}
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{report.description}</p>
      </a>
    </article>
  );
}
```

- [ ] **Step 2: 提交**

```bash
git add components/report-card.tsx
git commit -m "feat: 实现 ReportCard 研究报告卡片组件"
```

### Task 5: 实现 /gold 页面（含分页逻辑）

**Files:**

- Create: `app/(site)/gold/page.tsx`

- [ ] **Step 1: 创建黄金观察页面**

```tsx
import { Metadata } from "next";
import Link from "next/link";

import { goldReports, REPORTS_PER_PAGE } from "@/lib/gold-reports";
import GoldChart from "@/components/gold-chart";
import ReportCard from "@/components/report-card";

export const metadata: Metadata = {
  title: "黄金观察",
  description: "关注国际金价走势与市场动态，定期收录黄金研究报告与深度分析。",
};

function generatePaginationRange(totalPages: number, currentPage: number): (number | "...")[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [1];

  if (currentPage > 3) {
    pages.push("...");
  }

  const startNeighbor = Math.max(2, currentPage - 1);
  const endNeighbor = Math.min(totalPages - 1, currentPage + 1);

  for (let i = startNeighbor; i <= endNeighbor; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - 2) {
    pages.push("...");
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
}

export default function GoldPage({ searchParams }: { searchParams: { page?: string } }) {
  const currentPage = Math.max(1, Number(searchParams.page) || 1);
  const totalPages = Math.ceil(goldReports.length / REPORTS_PER_PAGE);
  const start = (currentPage - 1) * REPORTS_PER_PAGE;
  const pageReports = goldReports.slice(start, start + REPORTS_PER_PAGE);

  return (
    <div className="container mb-4">
      <div className="mx-auto max-w-5xl">
        <div className="prose mb-8 dark:prose-invert prose-headings:font-heading prose-headings:font-bold prose-headings:leading-tight">
          <h1 className="mt-0">🥇 黄金观察</h1>
          <p className="text-muted-foreground">关注国际金价走势与市场动态，定期收录黄金研究报告与深度分析。</p>
        </div>

        <section className="mb-10">
          <GoldChart />
        </section>

        <section>
          <div className="prose mb-4 dark:prose-invert">
            <h2 className="border-b border-border pb-2">📚 最新研究报告</h2>
          </div>

          {pageReports.length > 0 ? (
            <div className="grid grid-flow-row gap-2">
              {pageReports.map((report) => (
                <ReportCard report={report} key={report.id} />
              ))}
            </div>
          ) : (
            <p className="py-8 text-center text-muted-foreground">暂无研究报告内容。</p>
          )}

          {/* 分页导航 */}
          {totalPages > 1 && (
            <nav className="mt-8 flex items-center justify-center gap-2" aria-label="分页导航">
              <Link
                href={currentPage > 1 ? `/gold?page=${currentPage - 1}` : "#"}
                className={`inline-flex h-9 w-20 items-center justify-center rounded-md border text-sm transition-colors ${
                  currentPage <= 1
                    ? "pointer-events-none border-muted text-muted-foreground/50"
                    : "border-border text-foreground hover:bg-foreground/10"
                }`}
                aria-disabled={currentPage <= 1}
                tabIndex={currentPage <= 1 ? -1 : undefined}
              >
                上一页
              </Link>

              {generatePaginationRange(totalPages, currentPage).map((item, index) =>
                item === "..." ? (
                  <span
                    key={`ellipsis-${index}`}
                    className="flex h-9 w-9 items-center justify-center text-muted-foreground"
                  >
                    ...
                  </span>
                ) : (
                  <Link
                    key={item}
                    href={`/gold?page=${item}`}
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-md text-sm transition-colors ${
                      item === currentPage
                        ? "bg-primary text-primary-foreground"
                        : "border border-border text-foreground hover:bg-foreground/10"
                    }`}
                    aria-current={item === currentPage ? "page" : undefined}
                  >
                    {item}
                  </Link>
                )
              )}

              <Link
                href={currentPage < totalPages ? `/gold?page=${currentPage + 1}` : "#"}
                className={`inline-flex h-9 w-20 items-center justify-center rounded-md border text-sm transition-colors ${
                  currentPage >= totalPages
                    ? "pointer-events-none border-muted text-muted-foreground/50"
                    : "border-border text-foreground hover:bg-foreground/10"
                }`}
                aria-disabled={currentPage >= totalPages}
                tabIndex={currentPage >= totalPages ? -1 : undefined}
              >
                下一页
              </Link>
            </nav>
          )}
        </section>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 提交**

```bash
git add app/(site)/gold/page.tsx
git commit -m "feat: 实现黄金观察页面（含分页）"
```

### Task 6: 导航栏添加黄金条目

**Files:**

- Modify: `lib/navigation-links.ts`

- [ ] **Step 1: 在导航数组中插入黄金条目**

在 `navigationLinks` 数组中，在 Projects 之前新增一条：

```typescript
export const navigationLinks: NavItem[] = [
  {
    title: "Content",
    content,
  },
  {
    title: "黄金",
    href: "/gold",
  },
  {
    title: "Projects",
    href: "/projects",
  },
  {
    title: "Tags",
    href: "/tags",
  },
];
```

- [ ] **Step 2: 验证构建**

```bash
pnpm lint
pnpm build
```

Expected: Build succeeds, `/gold` 页面正常生成，导航栏出现「黄金」链接。

- [ ] **Step 3: 提交**

```bash
git add lib/navigation-links.ts
git commit -m "feat: 导航栏添加「黄金」条目"
```

### Task 7: 最终验证

- [ ] **Start dev server and verify**

```bash
pnpm dev
```

- 访问 http://localhost:3000/gold → 确认页面正常渲染
- 确认 TradingView 图表加载
- 确认研究报告列表显示
- 测试分页：/gold?page=2
- 确认导航栏显示「黄金」链接并可点击跳转
- 确认无控制台报错
