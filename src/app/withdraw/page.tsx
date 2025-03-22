import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function Withdraw() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">스테이킹 해지</h1>
      <Card className="max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">해지 수량 입력</h2>
        <div className="p-3 bg-dark-background/40 rounded-md mb-4">
          <p className="text-sm font-medium">
            현재 스테이킹 수량: <span className="text-white">0.00 XRP</span>
          </p>
          <p className="text-sm font-medium">
            누적 보상: <span className="text-neon-green">0.00 RLUSD</span>
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            해지 수량 (XRP)
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 bg-dark-background border border-dark-border rounded-md focus:outline-none focus:ring-1 focus:ring-neon-purple"
            placeholder="0.0"
          />
        </div>
        <Button className="w-full">지갑 연결</Button>
      </Card>
    </main>
  );
}
