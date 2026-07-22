export default function ContactCTA() {
  return (
    <section className="border-y border-brand/20 bg-brand-light/40 py-16">
      <div className="mx-auto max-w-4xl px-5 text-center">
        <p className="text-xs font-bold tracking-widest text-brand">
          GET STARTED
        </p>
        <h2 className="mt-2 text-3xl font-black text-foreground md:text-4xl">
          あなたの「稼げる味」を、
          <br className="sm:hidden" />
          二刀流厨房塾で見つけませんか？
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-foreground/70">
          まずは無料相談で、あなたの目的(趣味/独立開業)に合ったコースをご案内します。
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-brand/20 bg-card p-6 text-left">
            <h3 className="font-bold text-foreground">趣味・スキルアップの方</h3>
            <p className="mt-1 text-xs text-foreground/60">
              単品レシピ購入や月額コースから、気軽に始められます
            </p>
            <a
              href="#contact-form"
              className="mt-4 inline-block rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-neutral-900"
            >
              無料相談を予約
            </a>
          </div>
          <div className="rounded-2xl border border-brand/20 bg-card p-6 text-left">
            <h3 className="font-bold text-foreground">独立開業をお考えの方</h3>
            <p className="mt-1 text-xs text-foreground/60">
              開業支援プロコース(中華部門・居酒屋部門)についてのご相談はこちら
            </p>
            <a
              href="#contact-form"
              className="mt-4 inline-block rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-neutral-900"
            >
              開業について相談する
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
