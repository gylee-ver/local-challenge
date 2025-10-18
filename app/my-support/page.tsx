"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Wallet, TrendingUp, Clock, CheckCircle2, AlertCircle, ChevronRight, Lock } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useWallet } from "@/lib/wallet-context"
import { ChargeDialog } from "@/components/charge-dialog"

export default function MySupportPage() {
  const router = useRouter()
  const { wallet, deposits } = useWallet()
  const [activeTab, setActiveTab] = useState<"active" | "history">("active")
  const [chargeDialogOpen, setChargeDialogOpen] = useState(false)

  const activeDeposits = deposits.filter((d) => d.status === "locked")
  const historyDeposits = deposits.filter((d) => d.status !== "locked")

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link href="/" className="p-2 -ml-2 hover:bg-accent rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-bold">내 응원 내역</h1>
        </div>
      </header>

      <main className="px-4 pt-4 space-y-4">
        {/* Balance Card */}
        <Card className="p-5 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-primary" />
              <span className="font-bold">내 포인트</span>
            </div>
            <Button size="sm" variant="outline" onClick={() => setChargeDialogOpen(true)}>
              충전하기
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{wallet.totalBalance.toLocaleString()}</span>
              <span className="text-muted-foreground">P</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-warning" />
                <span className="text-muted-foreground">예치중 {wallet.lockedBalance.toLocaleString()}P</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <span className="text-success font-medium">사용가능 {wallet.availableBalance.toLocaleString()}P</span>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-border">
          <button
            onClick={() => setActiveTab("active")}
            className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${
              activeTab === "active" ? "border-primary text-primary" : "border-transparent text-muted-foreground"
            }`}
          >
            진행중 ({activeDeposits.length})
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${
              activeTab === "history" ? "border-primary text-primary" : "border-transparent text-muted-foreground"
            }`}
          >
            완료 내역 ({historyDeposits.length})
          </button>
        </div>

        {/* Active Supports */}
        {activeTab === "active" && (
          <div className="space-y-4">
            {activeDeposits.map((deposit) => (
              <Card key={deposit.id} className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center text-2xl">
                    {deposit.shopEmoji}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold">{deposit.shopName}</span>
                      <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 border-0 text-xs">
                        1위
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">{deposit.leagueName}</div>
                  </div>
                </div>
                <Link href="/shop/1">
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </Link>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-warning" />
                    <span className="text-sm text-muted-foreground">응원 예치금 (잠금)</span>
                  </div>
                  <span className="font-bold">{deposit.amount.toLocaleString()}원</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                  <span className="text-sm text-muted-foreground">예상 리워드 (6~20%)</span>
                  <span className="font-bold text-success">
                    +{Math.floor(deposit.amount * 0.06).toLocaleString()}원 ~ +
                    {Math.floor(deposit.amount * 0.2).toLocaleString()}원
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                  <span className="text-sm font-medium">예상 총액 범위</span>
                  <span className="text-base font-bold text-primary">
                    {(deposit.amount + Math.floor(deposit.amount * 0.06)).toLocaleString()}원 ~{" "}
                    {(deposit.amount + Math.floor(deposit.amount * 0.2)).toLocaleString()}원
                  </span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between text-sm mb-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="font-medium">챌린지 종료까지</span>
                  </div>
                  <span className="font-bold text-primary">7일 12시간</span>
                </div>
                <div className="w-full bg-background rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "65%" }} />
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => router.push("/shop/1")}>
                  응원 추가
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => alert("친구 초대 기능은 준비 중입니다.")}
                >
                  친구 초대
                </Button>
              </div>
            </Card>
            ))}

            {activeDeposits.length === 0 && (
              <Card className="p-12 text-center">
                <div className="w-16 h-16 bg-muted/30 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <Wallet className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="font-bold text-lg mb-2">진행 중인 응원이 없습니다</p>
                <p className="text-sm text-muted-foreground mb-4">지금 바로 로컬 가게를 응원해보세요!</p>
                <Button onClick={() => router.push("/league")}>가게 둘러보기</Button>
              </Card>
            )}

            {/* Payment Encouragement */}
            <Card className="p-4 bg-gradient-to-br from-chart-2/10 to-chart-2/5 border-chart-2/20">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-chart-2/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-chart-2" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm mb-1">순위 상승 팁!</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                    카페 로컬빈즈에서 NH pay로 결제하면 순위 점수가 올라갑니다. 결제액의 70%가 순위에 반영돼요!
                  </p>
                  <Button size="sm" className="w-full" onClick={() => alert("지도 기능은 준비 중입니다.")}>
                    가게 위치 보기
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* History */}
        {activeTab === "history" && (
          <div className="space-y-3">
            {historyDeposits.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                    {item.shopEmoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-sm truncate">{item.shopName}</span>
                      {item.rank && (
                        <Badge variant="outline" className="text-xs">
                          {item.rank}위
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mb-3">{item.leagueName}</div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">응원 예치금</span>
                        <span className="font-medium">{item.amount.toLocaleString()}원</span>
                      </div>
                      {item.status === "completed" ? (
                        <>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">리워드</span>
                            <span className="font-bold text-success">+{item.rewardAmount?.toLocaleString()}원</span>
                          </div>
                          <div className="flex items-center justify-between text-xs pt-1 border-t border-border">
                            <span className="font-medium">총 지급액</span>
                            <span className="font-bold text-primary">
                              {(item.amount + (item.rewardAmount || 0)).toLocaleString()}원
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">환급</span>
                          <span className="font-medium">{item.amount.toLocaleString()}원</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      {item.status === "completed" ? (
                        <Badge variant="outline" className="text-xs border-success text-success">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          리워드 지급완료
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          환급 완료
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">{item.settlementDate}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            
            {historyDeposits.length === 0 && (
              <Card className="p-12 text-center">
                <div className="w-16 h-16 bg-muted/30 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="font-bold text-lg mb-2">완료된 응원 내역이 없습니다</p>
                <p className="text-sm text-muted-foreground">리그 종료 후 내역이 표시됩니다</p>
              </Card>
            )}
          </div>
        )}

        {/* Legal Notice */}
        <Card className="p-4 bg-muted/30">
          <h4 className="text-xs font-bold mb-2">응원예치 안내</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            • 응원예치는 증권형 크라우드펀딩이 아니며, 예치금은 챌린지 기간 동안 잠금됩니다.
            <br />• 비우승 가게 응원자는 예치금 100% 환급됩니다.
            <br />• 우승 가게 응원자는 리워드 포인트(최대 20%)를 지급받습니다.
            <br />• 리워드는 현금 전환 시 1~2% 수수료가 발생하며, 연간 환급액에 따라 과세될 수 있습니다.
          </p>
        </Card>
      </main>

      <ChargeDialog open={chargeDialogOpen} onOpenChange={setChargeDialogOpen} />
    </div>
  )
}
