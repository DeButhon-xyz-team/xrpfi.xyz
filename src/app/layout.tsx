import "@/styles/globals.css";
import { Inter } from "next/font/google";

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
        <header className="border-b border-dark-border py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="text-2xl font-bold text-neon-blue">XRPFI</div>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <a href="/" className="hover:text-neon-purple">
                    홈
                  </a>
                </li>
                <li>
                  <a href="/stake" className="hover:text-neon-purple">
                    스테이킹
                  </a>
                </li>
                <li>
                  <a href="/withdraw" className="hover:text-neon-purple">
                    해지
                  </a>
                </li>
              </ul>
            </nav>
            <button className="bg-neon-purple text-black px-4 py-1.5 rounded-md hover:bg-neon-purple/80">
              지갑 연결
            </button>
          </div>
        </header>
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
