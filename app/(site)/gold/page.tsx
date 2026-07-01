import { Metadata } from "next";
import Link from "next/link";

import { goldReports, REPORTS_PER_PAGE } from "@/lib/gold-reports";
import GoldChart from "@/components/gold-chart";
import ReportCard from "@/components/report-card";

export const metadata: Metadata = {
  title: "黄金观察",
  description: "关注国际金价走势与市场动态，定期收录黄金研究报告与深度分析。",
};

function generatePaginationRange(totalPages: number, currentPage: number): (number | "...")[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [1];

  if (currentPage > 3) {
    pages.push("...");
  }

  const startNeighbor = Math.max(2, currentPage - 1);
  const endNeighbor = Math.min(totalPages - 1, currentPage + 1);

  for (let i = startNeighbor; i <= endNeighbor; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - 2) {
    pages.push("...");
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
}

export default function GoldPage({ searchParams }: { searchParams: { page?: string } }) {
  const currentPage = Math.max(1, Number(searchParams.page) || 1);
  const totalPages = Math.ceil(goldReports.length / REPORTS_PER_PAGE);
  const start = (currentPage - 1) * REPORTS_PER_PAGE;
  const pageReports = goldReports.slice(start, start + REPORTS_PER_PAGE);

  return (
    <div className="container mb-4">
      <div className="mx-auto max-w-5xl">
        <div className="prose mb-8 dark:prose-invert prose-headings:font-heading prose-headings:font-bold prose-headings:leading-tight">
          <h1 className="mt-0">🥇 黄金观察</h1>
          <p className="text-muted-foreground">关注国际金价走势与市场动态，定期收录黄金研究报告与深度分析。</p>
        </div>

        <section className="mb-10">
          <GoldChart />
        </section>

        <section>
          <div className="prose mb-4 dark:prose-invert">
            <h2 className="border-b border-border pb-2">📚 最新研究报告</h2>
          </div>

          {pageReports.length > 0 ? (
            <div className="grid grid-flow-row gap-2">
              {pageReports.map((report) => (
                <ReportCard report={report} key={report.id} />
              ))}
            </div>
          ) : (
            <p className="py-8 text-center text-muted-foreground">暂无研究报告内容。</p>
          )}

          {/* 分页导航 */}
          {totalPages > 1 && (
            <nav className="mt-8 flex items-center justify-center gap-2" aria-label="分页导航">
              <Link
                href={currentPage > 1 ? `/gold?page=${currentPage - 1}` : "#"}
                className={`inline-flex h-9 w-20 items-center justify-center rounded-md border text-sm transition-colors ${
                  currentPage <= 1
                    ? "pointer-events-none border-muted text-muted-foreground/50"
                    : "border-border text-foreground hover:bg-foreground/10"
                }`}
                aria-disabled={currentPage <= 1}
                tabIndex={currentPage <= 1 ? -1 : undefined}
              >
                上一页
              </Link>

              {generatePaginationRange(totalPages, currentPage).map((item, index) =>
                item === "..." ? (
                  <span
                    key={`ellipsis-${index}`}
                    className="flex h-9 w-9 items-center justify-center text-muted-foreground"
                  >
                    ...
                  </span>
                ) : (
                  <Link
                    key={item}
                    href={`/gold?page=${item}`}
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-md text-sm transition-colors ${
                      item === currentPage
                        ? "bg-primary text-primary-foreground"
                        : "border border-border text-foreground hover:bg-foreground/10"
                    }`}
                    aria-current={item === currentPage ? "page" : undefined}
                  >
                    {item}
                  </Link>
                )
              )}

              <Link
                href={currentPage < totalPages ? `/gold?page=${currentPage + 1}` : "#"}
                className={`inline-flex h-9 w-20 items-center justify-center rounded-md border text-sm transition-colors ${
                  currentPage >= totalPages
                    ? "pointer-events-none border-muted text-muted-foreground/50"
                    : "border-border text-foreground hover:bg-foreground/10"
                }`}
                aria-disabled={currentPage >= totalPages}
                tabIndex={currentPage >= totalPages ? -1 : undefined}
              >
                下一页
              </Link>
            </nav>
          )}
        </section>
      </div>
    </div>
  );
}
