import { stats } from "@/lib/data";

export default function StatsBar() {
  return (
    <section className="bg-brand-dark py-10 text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-2xl">{s.icon}</div>
            <div className="mt-1 text-3xl font-black">
              {s.value}
              <span className="text-lg font-bold">{s.suffix}</span>
            </div>
            <div className="mt-1 text-xs font-medium text-white/80">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
