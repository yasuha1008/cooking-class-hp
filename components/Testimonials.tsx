import { testimonials } from "@/lib/data";
import { SectionHeading } from "./Courses";

export default function Testimonials() {
  return (
    <section id="testimonials" className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeading eyebrow="TESTIMONIALS" title="生徒の声" />
      <p className="mx-auto -mt-4 mb-12 max-w-xl text-center text-sm text-foreground/60">
        ことこと料理教室で学び、暮らしが変わった方々のリアルな声
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="flex flex-col rounded-2xl border border-brand-light bg-white p-6 shadow-sm"
          >
            <p className="flex-1 text-sm leading-relaxed text-foreground/70">
              &ldquo;{t.comment}&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                {t.initial}
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">{t.name}</p>
                <p className="text-xs text-foreground/50">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
