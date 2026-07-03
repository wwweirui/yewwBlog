---
title: "RSS 订阅与 Newsletter"
status: active
tags: [feature, syndication]
created: "2026-07-03"
---

## Problem

Content syndication via RSS and email newsletter subscription.

## Solution

- RSS: Dynamic XML feed at `/feed.xml` listing all published posts
- Newsletter: API endpoint at `/newsletter` for email subscriptions

## Implementation

- **RSS**: Uses `rss` npm package to generate XML feed
- **Newsletter**: POST endpoint with email validation and external API integration
- **Environment**: `EMAIL_API_BASE`, `EMAIL_API_KEY`, `EMAIL_GROUP_ID` for email service

## Tasks

- [x] RSS feed route with published posts
- [x] Newsletter API endpoint
- [x] Subscribe CTA on homepage and blog posts
