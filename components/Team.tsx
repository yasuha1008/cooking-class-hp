import { school, team, workplaceStats } from "@/lib/data";
import { SectionHeading } from "./Courses";

export default function Team() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeading eyebrow="TEAM" title="指導するのは" />
      <p className="mx-auto -mt-4 mb-12 max-w-xl text-center text-sm text-foreground/60">
        中華料理と居酒屋、二つの現場を知る現役店主が直接指導します
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((member) => (
          <div
            key={member.name}
            className="rounded-2xl border border-brand-light bg-white p-6 text-center shadow-sm"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand text-xl font-bold text-white">
              {member.initial}
            </div>
            <h3 className="mt-4 font-bold text-foreground">{member.name}</h3>
            <p className="mt-1 text-xs font-bold text-brand-dark">
              {member.role}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-foreground/60">
              {member.bio}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-2xl bg-brand-light/60 p-8">
        <h4 className="mb-6 text-center text-sm font-bold text-foreground/70">
          数字で見る{school.name}
        </h4>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {workplaceStats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl">{s.icon}</div>
              <div className="mt-1 text-xl font-black text-foreground">
                {s.value}
              </div>
              <div className="mt-1 text-xs text-foreground/60">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
