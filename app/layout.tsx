import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Chatbot from "@/components/Chatbot";
import AuthProvider from "@/components/AuthProvider";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "二刀流厨房塾 | 中華と居酒屋、二刀流で「稼げる味」を教える。",
  description:
    "中華料理歴26年・居酒屋経営14年の現役店主によるオンライン料理塾。単品レシピ購入から月額コース、独立開業支援プロコースまで対応。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          {children}
          <Chatbot />
        </AuthProvider>
      </body>
    </html>
  );
}
