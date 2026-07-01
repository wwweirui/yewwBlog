import { AuthorType, SiteMetaData } from "@/types";

import { socialProfiles } from "./social-data";

export const BASE_URL =
  `https://${process.env.VERCEL_URL}` ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  `http://localhost:${process.env.PORT || 3000}`;

export const defaultAuthor: AuthorType = {
  name: "叶微微",
  handle: "@wwweirui",
  socialProfiles,
  email: "1207536154@qq.com",
  website: "https://yewwcoder.vercel.app",
  jobTitle: "Agent大模型 & 全栈工程师",
  company: "",
  availableForWork: true,
  location: {
    city: "shanghai",
    media: "/losangeles.jpg",
  },
};

const defaultTitle = `yewwcoder`;
const defaultDescription = `我是叶微微，专注 Agent 大模型与全栈工程，记录技术探索与成长之路。`;

const siteMetadata: SiteMetaData = {
  title: {
    template: `%s | ${defaultTitle}`,
    default: defaultTitle,
  },
  description: defaultDescription,
  siteRepo: "https://github.com/wwweirui/yewwBlog",
  newsletterProvider: "mailerlite",
  newsletterUrl: "",
  analyticsProvider: "umami",
  defaultTheme: "dark",
  activeAnnouncement: false,
  announcement: {
    buttonText: "",
    link: "",
  },
  postsPerPage: 10,
  postsOnHomePage: 8,
  projectsOnHomePage: 4,
};

export default siteMetadata;
