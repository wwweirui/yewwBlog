import { Metadata } from "next";

import { hardware, software } from "@/lib/uses-data";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Uses",
    description: "我日常使用的工具和软件",
  };
}

export default async function UsesPage() {
  return (
    <div className="container pb-10">
      <article className="prose mx-auto max-w-5xl dark:prose-invert prose-headings:mb-3 prose-headings:mt-8 prose-headings:font-heading prose-headings:font-bold prose-headings:leading-tight hover:prose-a:text-accent-foreground prose-a:prose-headings:no-underline">
        <h1 className="mt-0">Uses</h1>
        <p className="m-0 text-xl">这些是我日常使用的工具和软件。</p>
        <hr className="my-4" />
        <h2>Software</h2>
        <ul>
          {software.map((item) => (
            <li key={item.title}>
              {item.title}
              {item.description && <p className="m-0 text-sm text-muted-foreground">{item.description}</p>}
            </li>
          ))}
        </ul>
        <h2>Hardware</h2>
        <ul>
          {hardware.map((item) => (
            <li key={item.title}>
              {item.title}
              {item.description && <p className="m-0 text-sm text-muted-foreground">{item.description}</p>}
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
