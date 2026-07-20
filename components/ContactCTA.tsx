export default function ContactCTA() {
  return (
    <section className="bg-brand py-16 text-white">
      <div className="mx-auto max-w-4xl px-5 text-center">
        <p className="text-xs font-bold tracking-widest text-white/80">
          GET STARTED
        </p>
        <h2 className="mt-2 text-3xl font-black md:text-4xl">
          あなたの「作れた!」を、
          <br className="sm:hidden" />
          ことことで見つけませんか？
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-white/85">
          まずは無料体験レッスンで、教室の雰囲気とあなたに合ったコースをお試しください。
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-white/10 p-6 text-left backdrop-blur">
            <h3 className="font-bold">個人のお客様</h3>
            <p className="mt-1 text-xs text-white/75">
              無料体験レッスンを予約して、あなたに合ったコースを見つけましょう
            </p>
            <a
              href="#contact-form"
              className="mt-4 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-bold text-brand-dark"
            >
              体験レッスンを予約
            </a>
          </div>
          <div className="rounded-2xl bg-white/10 p-6 text-left backdrop-blur">
            <h3 className="font-bold">法人・団体のお客様</h3>
            <p className="mt-1 text-xs text-white/75">
              出張レッスンや食育イベントの導入に関するご相談はこちら
            </p>
            <a
              href="#contact-form"
              className="mt-4 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-bold text-brand-dark"
            >
              法人向けお問い合わせ
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
