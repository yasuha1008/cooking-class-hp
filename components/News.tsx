import { news } from "@/lib/data";
import { SectionHeading } from "./Courses";

export default function News() {
  return (
    <section className="bg-brand-light/50 py-20">
      <div className="mx-auto max-w-4xl px-5">
        <SectionHeading eyebrow="NEWS" title="お知らせ" />
        <div className="mt-10 divide-y divide-brand-light rounded-2xl bg-card shadow-sm">
          {news.map((n) => (
            <div
              key={n.title}
              className="flex flex-col gap-2 p-6 sm:flex-row sm:items-start sm:gap-6"
            >
              <div className="flex shrink-0 items-center gap-3 sm:w-40">
                <span className="text-xs text-foreground/50">{n.date}</span>
                <span className="rounded-full bg-brand-light px-2.5 py-0.5 text-xs font-bold text-brand-dark">
                  {n.tag}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-foreground">{n.title}</h3>
                <p className="mt-1 text-sm text-foreground/60">{n.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
