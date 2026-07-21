export default function ContactCTA() {
  return (
    <section className="bg-brand py-16 text-white">
      <div className="mx-auto max-w-4xl px-5 text-center">
        <p className="text-xs font-bold tracking-widest text-white/80">
          GET STARTED
        </p>
        <h2 className="mt-2 text-3xl font-black md:text-4xl">
          あなたの「稼げる味」を、
          <br className="sm:hidden" />
          二刀流厨房塾で見つけませんか？
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-white/85">
          まずは無料相談で、あなたの目的(趣味/独立開業)に合ったコースをご案内します。
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-white/10 p-6 text-left backdrop-blur">
            <h3 className="font-bold">趣味・スキルアップの方</h3>
            <p className="mt-1 text-xs text-white/75">
              単品レシピ購入や月額コースから、気軽に始められます
            </p>
            <a
              href="#contact-form"
              className="mt-4 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-bold text-brand-dark"
            >
              無料相談を予約
            </a>
          </div>
          <div className="rounded-2xl bg-white/10 p-6 text-left backdrop-blur">
            <h3 className="font-bold">独立開業をお考えの方</h3>
            <p className="mt-1 text-xs text-white/75">
              開業支援プロコース(中華部門・居酒屋部門)についてのご相談はこちら
            </p>
            <a
              href="#contact-form"
              className="mt-4 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-bold text-brand-dark"
            >
              開業について相談する
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
