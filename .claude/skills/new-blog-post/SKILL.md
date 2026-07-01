---
name: new-blog-post
description: Use when creating a new blog post (MDX) in a Content Collections + Next.js blog. Covers frontmatter structure, MDX comment syntax, tags, and post lifecycle.
---

# New Blog Post

## Overview

在 Content Collections + Next.js 博客中创建新文章的标准化流程。避免常见的 MDX 编译错误和内容不显示问题。

## Frontmatter 模板

```mdx
---
title: "文章标题"
publishedDate: "2026-07-01"
lastUpdatedDate: "2026-07-01" # 可选
tags:
  - tag1
  - tag2
description: "文章描述，用于卡片展示和 SEO" # 可选
status: published # 或 draft
series: # 可选
  title: "系列名称"
  order: 1
---
```

### 字段说明

| 字段              | 必填 | 说明                                        |
| ----------------- | ---- | ------------------------------------------- |
| `title`           | ✅   | 文章标题                                    |
| `publishedDate`   | ✅   | 日期格式 `YYYY-MM-DD`                       |
| `status`          | ✅   | `published` 公开 / `draft` 仅在开发环境可见 |
| `description`     | ❌   | 文章摘要，SEO 和卡片展示用                  |
| `lastUpdatedDate` | ❌   | 最后更新日期                                |
| `tags`            | ❌   | 标签列表，自动聚合到 `/tags/[tag]`          |
| `series`          | ❌   | 系列文章，`{ title, order }`                |
| `author`          | ❌   | `{ name, image }`                           |

## 关键规则

### ⚠️ MDX 注释语法

**不要使用 HTML 注释** `<!-- -->`，MDX 编译会报错。

```
<!-- 错误 -->   → ✘ Cannot process MDX file with esbuild
{/* 正确 */}     → ✓ 使用 JSX 注释语法
```

### ⚠️ Content Collections 缓存

新增 `.mdx` 文件后，需要 **重启 `pnpm dev`** 才能被识别并生成到 `allPosts.js` 中。

如果重启后仍不生效（缓存问题），清空缓存后重启：

```bash
rm -rf .content-collections/cache/* .content-collections/generated/*
pnpm dev
```

## 文件路径

```
content/posts/your-post-slug.mdx   → 访问 /posts/your-post-slug
```

文件名（不含 `.mdx`）即 URL slug。

## 生命周期

```
新建 .mdx 文件 → 重启 pnpm dev → 生成到 allPosts.js → 页面展示

状态变更：draft（开发可见）→ published（生产可见）
```

## 常见问题

| 问题                     | 原因                      | 解决             |
| ------------------------ | ------------------------- | ---------------- |
| 页面不显示               | 未重启 dev server         | 重启 `pnpm dev`  |
| Content Collections 报错 | MDX 中用了 `<!-- -->`     | 改为 `{/* */}`   |
| 首页/列表页看不到        | `status` 不是 `published` | 改为 `published` |
| 标签页不显示             | 文件名 / slug 不一致      | 重启 dev server  |
