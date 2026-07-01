// lib/gold-reports.ts
import type { GoldReport } from "@/types/gold";

export const goldReports: GoldReport[] = [
  {
    id: "001",
    title: "2025年上半年黄金市场回顾与下半年展望",
    date: "2025-06-15",
    source: "世界黄金协会",
    url: "https://www.gold.org/goldhub/gold-focus/2025/06/h1-review-h2-outlook",
    description:
      "全球央行持续购金、地缘政治不确定性加剧、美联储货币政策转向预期，多重因素推动金价创历史新高。本文回顾上半年市场表现并展望下半年趋势。",
    tags: ["央行购金", "展望"],
  },
  {
    id: "002",
    title: "美联储降息周期对金价影响的实证分析",
    date: "2025-05-20",
    source: "高盛",
    url: "https://www.goldmansachs.com/insights/gold/rate-cut-analysis",
    description:
      "分析历次美联储降息周期中黄金价格的表现模式，探讨当前宏观环境下金价的潜在走势。历史数据显示降息周期启动后12个月内金价平均上涨约15%。",
    tags: ["美联储", "利率"],
  },
  {
    id: "003",
    title: "全球央行黄金储备变化趋势报告",
    date: "2025-04-28",
    source: "国际货币基金组织",
    url: "https://www.imf.org/data/gold-reserves",
    description:
      "2025年Q1全球央行净购金量达286吨，新兴市场央行仍是主要买家。中国央行连续18个月增持黄金储备，土耳其、印度紧随其后。",
    tags: ["央行购金", "储备"],
  },
  {
    id: "004",
    title: "黄金ETF资金流向与持仓分析",
    date: "2025-04-10",
    source: "世界黄金协会",
    url: "https://www.gold.org/goldhub/data/gold-etf-holdings",
    description:
      "全球黄金ETF在2025年3月净流入约85亿美元，北美和欧洲市场为主要推动力。SPDR Gold Shares持仓量月环比增长约4.2%。",
    tags: ["ETF", "资金流向"],
  },
  {
    id: "005",
    title: "地缘政治风险与黄金避险需求研究",
    date: "2025-03-22",
    source: "瑞银",
    url: "https://www.ubs.com/global/wealth-management/gold-geopolitics",
    description:
      "当前全球地缘政治风险指数处于近十年高位，俄乌冲突持续、中东局势紧张等因素持续推升黄金避险需求。研究发现地缘政治风险每上升一个标准差，金价月均上涨约3.5%。",
    tags: ["地缘政治", "避险"],
  },
  {
    id: "006",
    title: "黄金供需基本面年度报告（2025）",
    date: "2025-03-01",
    source: "世界黄金协会",
    url: "https://www.gold.org/goldhub/data/gold-supply-demand",
    description:
      "2024年全球黄金需求总量达4,974吨，创历史新高。央行购金和珠宝需求是主要驱动因素。供给端矿产金产量同比增长约2%，回收金供应保持稳定。",
    tags: ["供需", "年度报告"],
  },
  {
    id: "007",
    title: "金价与美元指数相关性深度分析",
    date: "2025-02-14",
    source: "摩根大通",
    url: "https://www.jpmorgan.com/insights/gold/gold-dxy-correlation",
    description:
      "传统上金价与美元指数呈负相关，但近年该相关性有所减弱。本文探讨全球央行多元化储备、去美元化趋势对金价-美元关系的结构性影响。",
    tags: ["美元", "相关性"],
  },
  {
    id: "008",
    title: "技术分析：黄金当前关键支撑与阻力位",
    date: "2025-01-30",
    source: "技术分析",
    url: "https://www.tradingview.com/symbols/XAUUSD/technicals",
    description:
      "基于斐波那契回撤、移动均线系统和相对强弱指数（RSI）的综合技术分析。日线级别关键支撑位在2,150美元/盎司，阻力位在2,450美元/盎司。",
    tags: ["技术分析", "关键价位"],
  },
  {
    id: "009",
    title: "新兴市场央行购金动机与趋势",
    date: "2025-01-15",
    source: "巴克莱",
    url: "https://www.barclays.com/insights/em-central-bank-gold",
    description:
      "新兴市场央行增持黄金的主要动机包括：外汇储备多元化、降低对美元依赖、提升储备安全性。预计2025年新兴市场央行购金量将持续处于高位。",
    tags: ["新兴市场", "央行购金"],
  },
  {
    id: "010",
    title: "黄金在投资组合中的配置价值研究",
    date: "2025-01-05",
    source: "桥水基金",
    url: "https://www.bridgewater.com/research/gold-portfolio-allocation",
    description:
      "在股债相关性上升的背景下，黄金作为零相关资产的对冲价值凸显。研究表明在传统60/40组合中配置5%-15%的黄金可有效提升风险调整后收益。",
    tags: ["资产配置", "组合优化"],
  },
  {
    id: "011",
    title: "铂金 vs 黄金：贵金属投资策略对比",
    date: "2025-01-02",
    source: "渣打银行",
    url: "https://www.sc.com/insights/precious-metals-comparison",
    description:
      "铂金与黄金在工业需求、供给格局和价格驱动因素上存在显著差异。本文对比分析两种贵金属的投资逻辑，探讨当前估值差异背后的机会。",
    tags: ["铂金", "对比分析"],
  },
  {
    id: "012",
    title: "数字货币崛起对黄金的替代效应分析",
    date: "2024-12-20",
    source: "高盛",
    url: "https://www.goldmansachs.com/insights/digital-gold-comparison",
    description:
      "比特币被称为数字黄金的叙事在近年备受关注。但研究表明，黄金与比特币在波动率、流动性、机构接受度等方面差异巨大，短期内替代效应有限。",
    tags: ["比特币", "数字黄金"],
  },
];

export const REPORTS_PER_PAGE = 10;
