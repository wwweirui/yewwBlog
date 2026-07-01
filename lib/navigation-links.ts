import { ContentNavItem, NavItem } from "@/types";

const content: ContentNavItem[] = [
  {
    title: "Blog",
    href: "/posts",
    description: "技术文章，关于 Agent 大模型、全栈开发与工程实践",
  },
];

export const navigationLinks: NavItem[] = [
  {
    title: "Content",
    content,
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
