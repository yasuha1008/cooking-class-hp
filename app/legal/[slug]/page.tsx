import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { school } from "@/lib/data";

const pages: Record<string, { title: string; body: string }> = {
  privacy: {
    title: "プライバシーポリシー",
    body: `${school.name}(以下「当教室」といいます)は、お客様の個人情報を適切に取り扱うことを重要な責務と考え、本ポリシーに基づき管理いたします。

本ページはサンプルコンテンツです。実際の公開時には、取得する個人情報の項目・利用目的・第三者提供の有無・お問い合わせ窓口などを正式な内容に差し替えてください。`,
  },
  terms: {
    title: "利用規約",
    body: `本規約は、${school.name}が提供するレッスン・オンラインサービスのご利用にあたっての条件を定めるものです。

本ページはサンプルコンテンツです。実際の公開時には、キャンセルポリシー・返金規定・禁止事項などを正式な内容に差し替えてください。`,
  },
  tokushoho: {
    title: "特定商取引法に基づく表記",
    body: `販売事業者: ${school.name}
運営責任者: ${school.representative.name}
所在地: ${school.address}

本ページはサンプルコンテンツです。実際の公開時には、特定商取引法で定められた必要事項(価格、支払方法、引渡時期、返品特約など)を正式な内容に差し替えてください。`,
  },
};

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = pages[slug];
  if (!page) notFound();

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-5 py-16">
          <h1 className="text-2xl font-black text-foreground">
            {page.title}
          </h1>
          <p className="mt-6 whitespace-pre-line text-sm leading-relaxed text-foreground/70">
            {page.body}
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
