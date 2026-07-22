import Image from "next/image";
import { school } from "@/lib/data";
import { SectionHeading } from "./Courses";

const infoRows: [string, string][] = [
  ["教室名", school.name + "（" + school.nameEn + "）"],
  ["代表", school.representative.name],
  ["所在地", school.address],
  ["設立", school.founded],
  ["事業内容", school.business],
  ["経歴", school.award],
  ["実績", school.achievement],
];

export default function About() {
  return (
    <section id="about" className="bg-brand-light/50 py-20">
      <div className="mx-auto max-w-5xl px-5">
        <SectionHeading eyebrow="ABOUT US" title="教室紹介" />

        <div className="mt-12 grid gap-10 md:grid-cols-2 md:items-start">
          <div>
            <p className="text-xs font-bold tracking-widest text-brand">
              OUR MISSION
            </p>
            <h3 className="mt-2 text-2xl font-black leading-snug text-foreground">
              {school.catchCopy}
            </h3>
            <div className="mt-6 flex items-start gap-4">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-brand">
                {school.representative.photo ? (
                  <Image
                    src={school.representative.photo}
                    alt={school.representative.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-lg font-bold text-neutral-900">
                    {school.representative.name[0]}
                  </span>
                )}
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">
                  {school.representative.role}
                </p>
                <p className="text-sm text-foreground/60">
                  {school.representative.name}
                  {school.representative.nameEn && (
                    <span className="ml-1 text-xs text-foreground/40">
                      ({school.representative.nameEn})
                    </span>
                  )}
                </p>
              </div>
            </div>
            <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-foreground/70">
              {school.representative.message}
            </p>
          </div>

          <div className="rounded-2xl bg-card p-6 shadow-sm">
            <h4 className="mb-4 text-sm font-bold text-foreground">
              教室情報
            </h4>
            <dl className="divide-y divide-brand-light text-sm">
              {infoRows.map(([label, value]) => (
                <div key={label} className="grid grid-cols-3 gap-4 py-3">
                  <dt className="font-bold text-foreground/50">{label}</dt>
                  <dd className="col-span-2 text-foreground/80">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
