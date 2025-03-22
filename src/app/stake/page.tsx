import React from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function Stake() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">XRP 스테이킹</h1>
      <Card className="max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">스테이킹 입력</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            스테이킹 수량 (XRP)
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 bg-dark-background border border-dark-border rounded-md focus:outline-none focus:ring-1 focus:ring-neon-purple"
            placeholder="0.0"
          />
        </div>
        <div className="p-3 bg-dark-background/40 rounded-md mb-4">
          <p className="text-sm font-medium">
            예상 일일 보상: <span className="text-neon-green">0.00 RLUSD</span>
          </p>
          <p className="text-sm font-medium">
            예상 연간 수익률: <span className="text-neon-green">0.00%</span>
          </p>
        </div>
        <Button className="w-full">지갑 연결</Button>
      </Card>
    </main>
  );
}
