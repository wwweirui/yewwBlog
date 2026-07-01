export type GoldReport = {
  id: string;
  title: string;
  date: string; // "YYYY-MM-DD"
  source: string; // 来源机构名称
  url: string; // 原文外部链接
  description: string; // 摘要
  tags?: string[];
};
