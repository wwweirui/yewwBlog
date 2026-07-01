# yewwBlog 使用指南

欢迎使用 yewwBlog！这是一份完整的博客内容编写与功能使用说明。

---

## 目录

- [快速开始](#快速开始)
- [1. 博客文章（Posts）](#1-博客文章posts)
  - [1.1 创建文章](#11-创建文章)
  - [1.2 Frontmatter 字段说明](#12-frontmatter-字段说明)
  - [1.3 MDX 增强功能](#13-mdx-增强功能)
  - [1.4 系列文章](#14-系列文章)
  - [1.5 草稿与发布](#15-草稿与发布)
- [2. 独立页面（Pages）](#2-独立页面pages)
  - [2.1 内置页面](#21-内置页面)
  - [2.2 创建新页面](#22-创建新页面)
- [3. 项目展示（Projects）](#3-项目展示projects)
- [4. 标签系统（Tags）](#4-标签系统tags)
- [5. 社交页面（Social）](#5-社交页面social)
- [6. Uses 页面](#6-uses-页面)
- [7. 邮件订阅（Newsletter）](#7-邮件订阅newsletter)
- [8. RSS 订阅](#8-rss-订阅)
- [9. 站点配置](#9-站点配置)
  - [9.1 个人信息](#91-个人信息)
  - [9.2 导航链接](#92-导航链接)
  - [9.3 站点元数据](#93-站点元数据)
  - [9.4 环境变量](#94-环境变量)
- [10. 部署上线](#10-部署上线)

---

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器（支持热更新）
pnpm dev

# 打开浏览器访问 http://localhost:3000
```

所有内容文件修改后浏览器会自动刷新，无需手动重启。只有新增 MDX 文件时需要重启 `pnpm dev`。

---

## 1. 博客文章（Posts）

文章是博客的核心，所有文章存放在 `content/posts/` 目录下，使用 `.mdx` 格式编写。

### 1.1 创建文章

在 `content/posts/` 下新建一个 `.mdx` 文件，例如 `my-first-post.mdx`：

````mdx
---
title: "我的第一篇文章"
publishedDate: "2026-07-01"
tags:
  - AI
  - Next.js
description: "这篇文章讲的是..."
status: published
---

## 开篇

这是我的第一篇文章，使用 **Markdown** 编写，支持所有 Markdown 语法。

## 代码块

```ts
const hello = "world";
console.log(hello);
```
````

````

> **注意**：文件名（不含 `.mdx` 扩展名）就是文章的 URL slug。例如 `my-first-post.mdx` 对应的访问地址是 `/posts/my-first-post`。

### 1.2 Frontmatter 字段说明

文章文件头部的 YAML 区块称为 frontmatter，所有字段如下：

| 字段 | 必填 | 类型 | 说明 |
|---|---|---|---|
| `title` | ✅ | string | 文章标题 |
| `publishedDate` | ✅ | string | 发布日期，格式 `YYYY-MM-DD` |
| `status` | ✅ | string | `published`（发布）或 `draft`（草稿） |
| `description` | ❌ | string | 文章摘要，显示在文章卡片和 SEO 描述中 |
| `lastUpdatedDate` | ❌ | string | 最后更新日期，格式 `YYYY-MM-DD` |
| `tags` | ❌ | string[] | 标签列表，用于文章分类和筛选 |
| `series` | ❌ | object | 系列文章配置，见 [1.4 系列文章](#14-系列文章) |
| `author` | ❌ | object | 自定义作者，不填则使用默认作者 |

**tags 写法示例：**

```yaml
tags:
  - AI
  - Agent
  - 全栈
````

或者行内数组写法：

```yaml
tags: [AI, Agent, 全栈]
```

### 1.3 MDX 增强功能

除了标准 Markdown 语法外，MDX 支持在文章中直接使用 React 组件和特殊语法：

#### 数学公式（KaTeX）

```
行内公式 $E = mc^2$ 嵌入在文本中。

块级公式：

$$
\int_a^b f(x) dx = F(b) - F(a)
$$
```

#### GitHub Flavored Markdown（GFM）

支持表格、任务列表、删除线等 GFM 扩展：

```markdown
| 框架         | 用途     |
| ------------ | -------- |
| Next.js      | 前端框架 |
| Tailwind CSS | 样式     |

- [x] 已完成的任务
- [ ] 待完成的任务

~~删除线文本~~
```

#### YouTube 视频嵌入

在 MDX 中直接使用 `<YouTubeVideo>` 组件：

```mdx
<YouTubeVideo id="视频ID" />
```

其中 `id` 是 YouTube 视频 URL 中 `v=` 后面的那串字符。

#### Tweet 嵌入

```mdx
<Tweet id="推特推文ID" />
```

#### 图片

```mdx
<Image src="/your-image.png" alt="描述" width={800} height={600} />
```

将图片文件放在 `public/` 目录下，路径以 `/` 开头引用。

#### 文章中嵌入订阅 CTA

如果你希望在文章中间引导读者订阅邮件：

```mdx
<NewsletterCTA title="喜欢这篇文章？" description="订阅我的邮件列表，第一时间收到新文章通知。" buttonText="订阅" />
```

### 1.4 系列文章

如果你写了一系列相关文章，可以配置 `series` 字段将它们串联起来。在文章详情页会自动展示"系列文章导航框"，包含该系列所有文章的链接和进度。

示例：假设你写了一个"AI Agent 入门"系列，共 3 篇：

**第一篇** `ai-agent-intro.mdx`：

```yaml
series:
  title: "AI Agent 入门"
  order: 1
```

**第二篇** `ai-agent-tools.mdx`：

```yaml
series:
  title: "AI Agent 入门"
  order: 2
```

**第三篇** `ai-agent-practice.mdx`：

```yaml
series:
  title: "AI Agent 入门"
  order: 3
```

- `series.title` — 系列名称，同一系列的文章必须完全一致
- `series.order` — 在本系列中的排序（数字，从 1 开始递增）

在文章页面的 article 标签上方会自动渲染系列导航框，显示当前进度（如 "Episodes: (2/3)"），并列出该系列所有文章标题及链接。

### 1.5 草稿与发布

- `status: published` — 文章公开可见，显示在首页、列表页、RSS 中
- `status: draft` — 文章仅本地开发时可见（`NODE_ENV === "development"`），生产环境隐藏

写了一半的文章可以设为 `draft`，本地调试查看效果，等完成后改为 `published` 即可发布。

---

## 2. 独立页面（Pages）

独立页面是"非文章"类型的页面，如关于页、Now 页等。所有页面文件存放在 `content/pages/` 目录下。

### 2.1 内置页面

项目预设了两个页面：

| 文件        | URL      | 说明                                       |
| ----------- | -------- | ------------------------------------------ |
| `about.mdx` | `/about` | 关于页面，写自我介绍、博客初衷等           |
| `now.mdx`   | `/now`   | Now 页面，记录当前在做的事、学什么、坐标等 |

**编辑方式：** 直接修改 `content/pages/about.mdx` 或 `content/pages/now.mdx` 文件内容即可。

Pages 的 frontmatter 字段：

| 字段              | 必填 | 说明                   |
| ----------------- | ---- | ---------------------- |
| `title`           | ✅   | 页面标题               |
| `status`          | ✅   | `published` 或 `draft` |
| `description`     | ❌   | 页面描述（SEO）        |
| `lastUpdatedDate` | ❌   | 最后更新日期           |

### 2.2 创建新页面

在 `content/pages/` 下新建 `.mdx` 文件即可自动生成对应路由。

例如，创建 `content/pages/speaking.mdx`：

```mdx
---
title: "演讲与分享"
lastUpdatedDate: "2026-07-01"
status: published
description: "我的演讲和分享记录"
---

## 2026

- 某技术大会分享：《AI Agent 实战》
- 内部技术分享：《全栈开发最佳实践》
```

此文件会自动生成 `/speaking` 路由（文件名即 slug），可以直接访问。

---

## 3. 项目展示（Projects）

项目数据配置在 [lib/projects-data.ts](lib/projects-data.ts) 中，是一个数组，每个项目包含以下字段：

```ts
{
  title: "项目名称",
  description: "项目描述",
  href: "项目链接（GitHub 等）",
  mediaSrc: "/project-demo.mp4",  // 展示媒体文件路径
  mediaType: "video",              // "video" 或 "image"
}
```

访问路由：`/projects`

**添加新项目示例：**

```ts
export const projects = [
  {
    title: "yewwBlog",
    description: "个人技术博客，基于 Next.js + Tailwind CSS 构建。",
    href: "https://github.com/wwweirui/yewwBlog",
    mediaSrc: "/project-garden.mp4",
    mediaType: "video",
  },
  {
    title: "新项目",
    description: "项目简介",
    href: "https://github.com/you/your-project",
    mediaSrc: "/project-screenshot.png",
    mediaType: "image",
  },
];
```

首页和社交页面都会展示项目，首页展示数量由 `siteMetadata.projectsOnHomePage` 控制。

---

## 4. 标签系统（Tags）

标签是动态生成的，只需在文章的 frontmatter 中填写 `tags` 字段，系统会自动收集和统计。

访问路由：

- `/tags` — 所有标签列表，显示每个标签下的文章数量
- `/tags/标签名` — 按标签筛选的文章列表

例如，访问 `/tags/AI` 会显示所有 `tags` 中包含 `AI` 的文章。

> **提示**：标签名称不需要提前注册，直接在文章中填写即可。建议保持标签命名一致，避免出现 `AI` 和 `ai` 这样重复的标签。

---

## 5. 社交页面（Social）

访问路由：`/social`

社交页面展示三块内容：

1. **个人资料** — 头像、姓名、handle（从 `lib/metadata.ts` 的 `defaultAuthor` 读取）
2. **项目列表** — 与 Projects 页面共用同一份数据（`lib/projects-data.ts`）
3. **社交链接** — 从 `lib/social-data.ts` 读取，每个平台一个按钮

**添加社交链接**：编辑 [lib/social-data.ts](lib/social-data.ts)：

```ts
export const socialProfiles: SocialProfile[] = [
  { name: "github", link: "https://github.com/wwweirui" },
  { name: "twitter", link: "https://twitter.com/yourhandle" }, // 新增
  { name: "bilibili", link: "https://space.bilibili.com/xxx" }, // 新增
];
```

支持 `simple-icons` 图标库中的平台名称（如 github、twitter、youtube、bilibili、wechat 等）。

---

## 6. Uses 页面

访问路由：`/uses`

展示你日常使用的工具和软件，数据配置在 [lib/uses-data.ts](lib/uses-data.ts) 中：

```ts
export const software = [
  { title: "VSCode", description: "主力代码编辑器。" },
  { title: "Claude Code", description: "终端 AI 编程助手。" },
];

export const hardware = [{ title: "MacBook Pro", description: "主力开发机器。" }];
```

每个条目有 `title`（名称）和 `description`（描述），分别展示在 "Software" 和 "Hardware" 两个区块中。

---

## 7. 邮件订阅（Newsletter）

博客内置了邮件订阅功能，用户在前端输入邮箱即可订阅。

**相关文件：**

- [app/newsletter/route.ts](app/newsletter/route.ts) — 后端 API，接收邮箱并转发到邮件服务商
- [components/newsletter-subscribe.tsx](components/newsletter-subscribe.tsx) — 订阅表单组件
- [app/(site)/thank-you/page.tsx](<app/(site)/thank-you/page.tsx>) — 订阅成功后的感谢页面

**配置方式**：在 `.env.local` 中设置以下环境变量：

```bash
# 邮件订阅 API
EMAIL_API_BASE=https://your-email-api.com/
NEXT_PUBLIC_EMAIL_API_KEY=your-api-key
NEXT_PUBLIC_EMAIL_GROUP_ID=your-group-id
```

**如何开关订阅功能：**

在 [lib/metadata.ts](lib/metadata.ts) 中设置 `newsletterUrl` 字段：

```ts
// 有值 → 首页和社交页显示订阅区块
newsletterUrl: "",

// 设为空字符串 → 隐藏所有订阅区块
newsletterUrl: "",
```

如果配置了订阅功能，首页底部和社交页面底部会展示邮件订阅表单，文章页也可以通过 `<NewsletterCTA>` 组件嵌入。

---

## 8. RSS 订阅

博客自动生成 RSS 订阅源，路由为 `/feed.xml`。

RSS 包含所有 `status: published` 的文章，内容由 [app/feed.xml/route.ts](app/feed.xml/route.ts) 生成。

读者可以通过 RSS 阅读器订阅你的博客更新，无需任何额外配置。

在 `app/layout.tsx` 中已声明 RSS 链接，浏览器扩展和 RSS 阅读器可自动发现。

---

## 9. 站点配置

### 9.1 个人信息

编辑 [lib/metadata.ts](lib/metadata.ts) 中的 `defaultAuthor` 对象：

```ts
export const defaultAuthor: AuthorType = {
  name: "叶微微", // 你的名字
  handle: "@wwweirui", // 社交 handle
  socialProfiles, // 社交链接（引用 social-data.ts）
  email: "your@email.com", // 邮箱
  website: "https://your-site.com", // 个人网站
  jobTitle: "Agent大模型 & 全栈工程师", // 职位
  company: "", // 公司
  availableForWork: true, // 是否接受工作机会
  location: {
    city: "shanghai", // 城市
    media: "/losangeles.jpg", // 城市配图
  },
};
```

### 9.2 导航链接

编辑 [lib/navigation-links.ts](lib/navigation-links.ts) 可修改顶部导航栏的内容：

```ts
export const navigationLinks: NavItem[] = [
  {
    title: "Content", // 下拉菜单标题
    content: [{ title: "Blog", href: "/posts", description: "技术文章" }],
  },
  { title: "Projects", href: "/projects" },
  { title: "Tags", href: "/tags" },
];
```

你可以添加新的导航项：

```ts
{ title: "About", href: "/about" },
```

### 9.3 站点元数据

同样在 [lib/metadata.ts](lib/metadata.ts) 中，`siteMetadata` 对象控制站点全局设置：

```ts
const siteMetadata: SiteMetaData = {
  title: {
    template: `%s | ${defaultTitle}`, // 页面标题模板
    default: defaultTitle, // 默认标题
  },
  description: defaultDescription, // 站点描述（SEO）
  siteRepo: "https://github.com/...", // 仓库地址
  newsletterProvider: "mailerlite", // 邮件服务商类型
  newsletterUrl: "", // 邮件订阅链接（空则不显示订阅区块）
  analyticsProvider: "umami", // 统计：umami | vercel | plausible | google
  defaultTheme: "dark", // 默认主题：light | dark | system
  activeAnnouncement: false, // 是否显示顶部公告栏
  announcement: { buttonText: "", link: "" }, // 公告内容
  postsPerPage: 10, // 每页文章数（暂未启用分页）
  postsOnHomePage: 8, // 首页展示文章数
  projectsOnHomePage: 4, // 首页展示项目数
};
```

### 9.4 环境变量

所有环境变量配置在 [.env.local](.env.local) 中：

| 变量                           | 说明                                               |
| ------------------------------ | -------------------------------------------------- |
| `NEXT_PUBLIC_BASE_URL`         | 站点基础 URL（Vercel 部署时自动使用 `VERCEL_URL`） |
| `NEXT_PUBLIC_UMAMI_SCRIPT_URL` | Umami 统计脚本地址                                 |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Umami 站点 ID                                      |
| `EMAIL_API_BASE`               | 邮件 API 地址                                      |
| `NEXT_PUBLIC_EMAIL_API_KEY`    | 邮件 API Key                                       |
| `NEXT_PUBLIC_EMAIL_GROUP_ID`   | 邮件订阅分组 ID                                    |

---

## 10. 部署上线

项目已针对 Vercel 优化，只需将代码推送到 GitHub 并在 Vercel 中导入项目即可。

```bash
pnpm build   # 本地构建预览
```

Vercel 会自动检测 Next.js 项目并配置构建命令，无需额外设置。

> **提示**：部署前记得在 Vercel 项目设置中配置相应的环境变量。

---

## 附录：文件结构速查

```
content/posts/*.mdx       → 写文章的地方
content/pages/*.mdx       → 写独立页面的地方
lib/metadata.ts           → 修改个人信息、站点配置
lib/navigation-links.ts   → 修改导航栏
lib/projects-data.ts      → 添加项目
lib/social-data.ts        → 添加社交链接
lib/uses-data.ts          → 添加工具/装备
public/                   → 存放图片、视频等静态资源
.env.local                → 配置环境变量
```
