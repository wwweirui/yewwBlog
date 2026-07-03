---
title: "博客内容系统"
status: active
tags: [core, content]
created: "2026-07-03"
---

## Problem

Central content management for MDX-based blog posts and static pages with automatic type generation.

## Solution

Content Collections — MDX-based CMS with auto-generated TypeScript types.

## Implementation

- **Collections**: `posts` (articles) and `pages` (static pages)
- **Transform Output**: Each post gets `slug`, `mdx`, `tagSlugs`, `readTimeMinutes`, `headings`
- **Image Components**: Custom MDX components for Image, Tweet, YouTubeVideo
- **Frontmatter**: YAML with title, dates, tags, series, author, status fields

## Tasks

- [x] Define content collections with Zod schemas
- [x] Configure remark/rehype plugins (GFM, math, syntax highlighting, anchor links)
- [x] Post detail page with TOC, series box, social sharing, JSON-LD
- [x] Tag filtering and pagination
- [x] Draft vs published status handling
