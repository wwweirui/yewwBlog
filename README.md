# yewwcoder Blog 🚀

个人技术博客，专注 **Agent 大模型** 与 **全栈工程**。

基于 [Digital Garden](https://github.com/thedevdavid/digital-garden) 模板改造。

**技术栈：** Next.js 14 + Tailwind CSS + shadcn/ui + Content Collections

**部署：** Vercel

---

## 本地开发

```bash
pnpm install
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看。

## 写文章

在 `content/posts/` 下创建 `.mdx` 文件：

```yaml
---
title: "文章标题"
publishedDate: "2026-07-01"
tags:
  - tag1
description: "文章描述"
status: published
---
```

## 构建

```bash
pnpm build
pnpm start
```
