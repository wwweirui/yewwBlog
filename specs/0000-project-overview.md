---
title: "YewwBlog — 个人技术博客"
status: active
tags: [project]
created: "2026-07-03"
---

## Problem

Build and maintain a personal tech blog (yewwcoder) focused on **Agent LLMs** and **Full-stack Engineering**.

## Solution

Next.js 14 + Tailwind CSS + shadcn/ui + Content Collections (MDX), deployed on Vercel.

## Key Features

- **Content Management**: MDX-based blog posts and pages via Content Collections
- **Gold Observation**: Gold price charts, research reports from top institutions
- **RSS Feed**: Syndication feed at `/feed.xml`
- **Newsletter**: Email subscription via API
- **Social**: Link page at `/social`

## Specs

- [Blog System](0001-blog-system.md)
- [Gold Observation](0002-gold-observation.md)
- [RSS & Newsletter](0003-rss-newsletter.md)

## Tech Stack

| Layer           | Choice                    |
| --------------- | ------------------------- |
| Framework       | Next.js 14 (App Router)   |
| Styling         | Tailwind CSS + shadcn/ui  |
| Content         | Content Collections (MDX) |
| Deployment      | Vercel                    |
| Package Manager | pnpm                      |
