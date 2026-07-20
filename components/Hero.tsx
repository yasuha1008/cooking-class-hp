import { school } from "@/lib/data";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-light to-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:items-center md:py-24">
        <div>
          <p className="mb-4 inline-block rounded-full bg-white px-4 py-1 text-xs font-bold tracking-wide text-brand-dark shadow-sm">
            少人数制ハンズオンレッスン
          </p>
          <h1 className="text-4xl font-black leading-tight tracking-tight text-foreground md:text-5xl">
            {school.catchCopy}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-foreground/70 md:text-lg">
            {school.subCopy}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#courses"
              className="rounded-full bg-brand px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-brand-dark"
            >
              コース一覧を見る
            </a>
            <a
              href="#contact"
              className="rounded-full border-2 border-brand px-7 py-3.5 text-sm font-bold text-brand-dark transition hover:bg-brand-light"
            >
              無料体験レッスン予約
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-brand/20 blur-2xl" />
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 flex h-40 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-200 to-orange-300 text-6xl shadow-lg">
              🍲
            </div>
            <div className="flex h-32 items-center justify-center rounded-3xl bg-gradient-to-br from-rose-200 to-red-300 text-5xl shadow-lg">
              🍞
            </div>
            <div className="flex h-32 items-center justify-center rounded-3xl bg-gradient-to-br from-teal-200 to-emerald-300 text-5xl shadow-lg">
              🧁
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
