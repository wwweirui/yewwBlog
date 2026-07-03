---
title: "黄金观察页面"
status: active
tags: [feature, gold]
created: "2026-07-03"
---

## Problem

Dedicated page for gold market observation — price charts and institutional research reports.

## Solution

Gold page at `/gold` with interactive chart and report cards.

## Implementation

- **GoldChart**: Recharts-based gold price chart component
- **ReportCard**: Card component for institutional research reports
- **GoldReport Type**: Structured data with id, title, date, source, url, description, tags
- **Data Source**: `lib/gold-reports.ts` with reports from WGC, 中金, 高盛, 摩根大通 etc.
- **Pagination**: 10 reports per page

## Tasks

- [x] Gold type definition
- [x] Research reports data array
- [x] Gold chart component
- [x] Report card component
- [x] Gold page with pagination
- [x] Navigation bar link
