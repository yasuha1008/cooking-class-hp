import { stats } from "@/lib/data";

export default function StatsBar() {
  return (
    <section className="border-y border-brand/20 bg-brand-light/40 py-10">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-2xl">{s.icon}</div>
            <div className="mt-1 text-3xl font-black text-brand">
              {s.value}
              <span className="text-lg font-bold">{s.suffix}</span>
            </div>
            <div className="mt-1 text-xs font-medium text-foreground/70">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
