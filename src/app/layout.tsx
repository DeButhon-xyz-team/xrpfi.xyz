import "@/styles/globals.css";
import { Inter } from "next/font/google";
import GlobalHeader from "@/components/global/GlobalHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "XRPFI - XRPL 사용자를 위한 멀티체인 스테이킹 수익 미러링 플랫폼",
  description:
    "XRP를 예치하면 Axelar를 통해 PoS 체인으로 자산이 브릿징되고, 스테이킹 수익이 XRPL 상에서 RLUSD 등으로 지급되는 Web3 서비스",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="dark">
      <body className={inter.className}>
        <GlobalHeader />
        {children}
        <footer className="border-t border-dark-border py-4 mt-auto">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-gray-400">
              © 2024 XRPFI. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
