import type { Metadata } from "next";
import "./globals.css";
import GlobalHeader from "@/components/global/GlobalHeader";
export const metadata: Metadata = {
  title: "XRPFI",
  description: "Staking on XRP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GlobalHeader />
        {children}
      </body>
    </html>
  );
}
