# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

个人技术博客（yewwcoder），基于 **Next.js 14** + **Tailwind CSS** + **shadcn/ui**，使用 **Content Collections** 进行 MDX 内容管理。部署在 **Vercel**。

## 常用命令

```bash
pnpm install          # 安装依赖
pnpm dev              # 启动开发服务器 (localhost:3000)
pnpm build            # 生产构建
pnpm start            # 启动生产服务器
pnpm lint             # 运行 ESLint
pnpm format           # 使用 Prettier 格式化代码
```

## 架构

### 内容系统（项目核心）

本项目使用 [Content Collections](https://www.content-collections.dev/) — 一个基于 MDX 的 CMS，可自动生成 TypeScript 类型。

- **内容定义**：[content-collections.ts](content-collections.ts) — 定义了两个集合：`posts`（文章）和 `pages`（页面），每个都配有 Zod schema 和 MDX 编译配置（remark/rehype 插件，用于 GFM、数学公式、语法高亮、标题锚点链接）。
- **内容文件**：`content/posts/*.mdx` 和 `content/pages/*.mdx` — frontmatter + Markdown 正文。
- **生成产物**：`.content-collections/generated/` — 自动生成的类型。`allPosts` 和 `allPages` 数组从 `"content-collections"` 导入（通过 tsconfig 路径映射到此目录）。
- 每个 MDX 文件会生成一个 `slug`（不含扩展名的文件名）和编译后的 `mdx` 代码。

### 路由结构（App Router）

| 路由            | 文件                                                                   | 说明                                                    |
| --------------- | ---------------------------------------------------------------------- | ------------------------------------------------------- |
| `/`             | [app/(site)/page.tsx](<app/(site)/page.tsx>)                           | 首页：Hero、最新文章、侧边栏、关于区块、订阅 CTA        |
| `/posts`        | [app/(site)/posts/page.tsx](<app/(site)/posts/page.tsx>)               | 所有已发布文章，带分页                                  |
| `/posts/[slug]` | [app/(site)/posts/[slug]/page.tsx](<app/(site)/posts/[slug]/page.tsx>) | 文章详情：目录、系列文章、社交分享、JSON-LD             |
| `/tags`         | [app/(site)/tags/page.tsx](<app/(site)/tags/page.tsx>)                 | 所有标签                                                |
| `/tags/[slug]`  | [app/(site)/tags/[slug]/page.tsx](<app/(site)/tags/[slug]/page.tsx>)   | 按标签筛选的文章列表                                    |
| `/[slug]`       | [app/(site)/[slug]/page.tsx](<app/(site)/[slug]/page.tsx>)             | 动态页面（渲染 `allPages` 中的条目，如 "about"、"now"） |
| `/projects`     | [app/(site)/projects/page.tsx](<app/(site)/projects/page.tsx>)         | 项目展示                                                |
| `/uses`         | [app/(site)/uses/page.tsx](<app/(site)/uses/page.tsx>)                 | 工具/装备页面                                           |
| `/social`       | [app/(social)/social/page.tsx](<app/(social)/social/page.tsx>)         | 社交链接页                                              |
| `/feed.xml`     | [app/feed.xml/route.ts](app/feed.xml/route.ts)                         | RSS 订阅源                                              |
| `/gold`         | [app/(site)/gold/page.tsx](<app/(site)/gold/page.tsx>)                 | 黄金观察页：黄金走势图、研究报告卡片、分页导航          |
| `/newsletter`   | [app/newsletter/route.ts](app/newsletter/route.ts)                     | 邮件订阅 API 端点                                       |

根布局（[app/layout.tsx](app/layout.tsx)）负责字体（Space Grotesk + Inter）、主题提供者、统计分析和全局样式。站点布局（[app/(site)/layout.tsx](<app/(site)/layout.tsx>)）添加导航栏、页脚、跳过内容链接和装饰性渐变背景。

### 关键目录

- **[lib/](lib/)** — 业务逻辑与配置：
  - `metadata.ts` — 站点元数据、作者信息、BASE_URL 解析（Vercel → 环境变量 → localhost）
  - `utils.ts` — `cn()`（tailwind-merge + clsx）、`sortByDate()`、`calculateReadingTime()`、`debounce()`、分页辅助函数
  - `content-types.ts` — 从 Content Collections 输出中提取的 `Post` 和 `Page` 类型（含 `readTimeMinutes`、`headings`、`tagSlugs` 等 transform 输出字段）
  - `gold-reports.ts` — 黄金研究报告数据数组（来源：世界黄金协会、中金、高盛等），含 `REPORTS_PER_PAGE` 常量
  - `navigation-links.ts` — 导航栏链接定义
  - `projects-data.ts`、`social-data.ts`、`tag-options.ts`、`uses-data.ts` — 静态数据数组
- **[components/](components/)** — React 组件：
  - `mdx/index.tsx` — MDX 组件渲染器，包含自定义组件（Image、Tweet、YouTubeVideo、NewsletterCTA）
  - `ui/` — shadcn/ui 基础组件（accordion、badge、button、card、dialog 等）
  - 页面级组件：`post-preview.tsx`、`table-of-contents.tsx`、`post-series-box.tsx`、`social-share.tsx`、`newsletter-subscribe.tsx`、Hero 变体等
  - `analytics.tsx` — 多提供商统计分析（umami、vercel、plausible、google），仅在生产环境加载
  - `theme-provider.tsx` — next-themes 封装
- **[types/](types/)** — 共享 TypeScript 类型（`SiteMetaData`、`AuthorType`、`NavItem`、`PostHeading`、`GoldReport` 等）
- **[.claude/](.claude/)** — Claude Code 配置：
  - `skills/new-blog-post/` — 自定义技能，用于快速创建新博客文章
  - `projects/.../memory/` — 持久会话记忆文件（用户偏好、项目上下文、关注点记录）

### Content Collections Frontmatter

**文章** (`content/posts/*.mdx`):

```yaml
---
title: "标题"
publishedDate: "YYYY-MM-DD"
lastUpdatedDate: "YYYY-MM-DD" # 可选
tags: [标签1, 标签2] # 可选
description: "描述" # 可选
series: { title: "系列名称", order: 1 } # 可选
author: { name: "名称", image: "/avatar.png" } # 可选
status: published | draft
---
```

**页面** (`content/pages/*.mdx`):

```yaml
---
title: "标题"
description: "描述" # 可选
lastUpdatedDate: "YYYY-MM-DD" # 可选
status: published | draft
---
```

### 环境变量 ([.env.local](.env.local))

- `NEXT_PUBLIC_BASE_URL` — 站点基础 URL（默认使用 VERCEL_URL 或 localhost:3000）
- `NEXT_PUBLIC_UMAMI_SCRIPT_URL` / `NEXT_PUBLIC_UMAMI_WEBSITE_ID` — Umami 统计分析
- `EMAIL_API_BASE` / `NEXT_PUBLIC_EMAIL_API_KEY` / `NEXT_PUBLIC_EMAIL_GROUP_ID` — 邮件订阅 API

### Spec-Driven Development (LeanSpec)

本项目使用 [LeanSpec](https://github.com/codervisor/leanspec) 进行 **Spec-Driven Development (SDD)**。

- **Specs 存放**：[specs/](specs/) — 每个特性对应一个 markdown spec 文件
- **配置**：[leanspec.provider.yaml](leanspec.provider.yaml) — `provider: markdown`
- **Lifecycle**: Draft → Review → Active → Done → Deprecated

```bash
npx leanspec board       # 看板视图
npx leanspec stats       # 项目健康度
npx leanspec ui          # Web UI (localhost:3000)
```

## 重要说明

- **草稿文章在生产环境隐藏**，但在开发模式下可见。检查逻辑是 `post.status !== "published"` 配合 `NODE_ENV === "development"`。
- Content Collections 在构建/开发时生成类型。如果新增 MDX 文件，需要重启开发服务器以更新类型。
- `content-collections` 导入通过 tsconfig 路径别名解析到 `.content-collections/generated/`。
- `@/*` 路径别名映射到项目根目录。
- 项目使用 `pnpm` 作为包管理器。
