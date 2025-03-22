import React from "react";
import Card from "@/components/ui/Card";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">XRPFI 대시보드</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="스테이킹 개요">
          <p>
            연결된 지갑이 없습니다. 지갑을 연결하여 스테이킹 정보를 확인하세요.
          </p>
        </Card>
        <Card title="자산 추이">
          <p>연결된 지갑이 없습니다. 지갑을 연결하여 자산 추이를 확인하세요.</p>
        </Card>
        <Card title="빠른 링크">
          <div className="flex flex-col space-y-2">
            <a href="/stake" className="text-neon-blue hover:underline">
              스테이킹 하기
            </a>
            <a href="/withdraw" className="text-neon-blue hover:underline">
              스테이킹 해지하기
            </a>
          </div>
        </Card>
      </div>
    </main>
  );
}
