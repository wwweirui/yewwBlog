import { format, parseISO } from "date-fns";
import { CalendarDays, ExternalLink } from "lucide-react";

import type { GoldReport } from "@/types/gold";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type ReportCardProps = {
  report: GoldReport;
};

export default function ReportCard({ report }: ReportCardProps) {
  return (
    <article className="w-full">
      <a
        href={report.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "select-rounded-md block w-full rounded-md p-4 leading-none no-underline outline-none transition-colors hover:bg-foreground/10 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <h3 className="my-2 text-2xl font-bold text-foreground">{report.title}</h3>
          <ExternalLink size={16} className="mt-3 shrink-0 text-muted-foreground" />
        </div>
        <div className="flex flex-wrap gap-2 text-sm leading-snug text-muted-foreground">
          <div className="flex items-center gap-1">
            <CalendarDays size={16} />
            <time dateTime={report.date}>{format(parseISO(report.date), "yyyy-MM-dd")}</time>
          </div>
          <span className="opacity-50">|</span>
          <Badge variant="secondary" className="rounded-full px-2 py-0.5 text-xs">
            {report.source}
          </Badge>
        </div>
        {report.tags && report.tags.length > 0 && (
          <ul className="my-4 flex list-none flex-wrap gap-2 p-0">
            {report.tags.map((tag) => (
              <li key={tag}>
                <Badge
                  variant="outline"
                  className="inline-block rounded-full border border-muted-foreground/50 bg-muted-foreground/10 px-2 py-0.5 text-xs text-muted-foreground"
                >
                  {tag}
                </Badge>
              </li>
            ))}
          </ul>
        )}
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{report.description}</p>
      </a>
    </article>
  );
}
