"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Trophy, TrendingUp, Users, DollarSign } from "lucide-react"
import Link from "next/link"
import { useLeague } from "@/lib/league-context"

const formatKoreanCurrency = (amount: number): string => {
  if (amount >= 10000) {
    const man = Math.floor(amount / 10000)
    const remainder = amount % 10000
    if (remainder === 0) return `${man}만원`
    if (remainder >= 1000) {
      const cheon = Math.floor(remainder / 1000)
      return `${man}만 ${cheon}천원`
    }
    return `${man}만원`
  } else if (amount >= 1000) {
    const cheon = Math.floor(amount / 1000)
    return `${cheon}천원`
  } else if (amount >= 100) {
    const baek = Math.floor(amount / 100)
    return `${baek}백원`
  }
  return `${amount}원`
}

export default function ArchivePage() {
  const { archives } = useLeague()

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border glass shadow-soft">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link href="/league" className="p-2 -ml-2 hover:bg-accent rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-bold">리그 아카이브</h1>
            <p className="text-xs text-muted-foreground">지난 리그 우승 가게</p>
          </div>
        </div>
      </header>

      <main className="px-4 pt-4 space-y-4">
        {/* Summary Stats */}
        <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 card-glass shadow-soft">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <Trophy className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-bold text-sm">총 {archives.length}개 리그 완료</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="text-xl font-bold text-primary">
                {archives.reduce((sum, a) => sum + a.participantCount, 0).toLocaleString()}명
              </div>
              <div className="text-xs text-muted-foreground mt-1">총 참여자</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-success">
                {formatKoreanCurrency(archives.reduce((sum, a) => sum + a.totalRewardPaid, 0))}
              </div>
              <div className="text-xs text-muted-foreground mt-1">총 리워드</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-chart-3">{archives.length * 10}개</div>
              <div className="text-xs text-muted-foreground mt-1">참여 가게</div>
            </div>
          </div>
        </Card>

        {/* Archives List */}
        <div className="space-y-3">
          {archives.map((archive) => (
            <Card key={archive.id} className="p-4 card-glass shadow-soft hover:shadow-soft-lg transition-all">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center text-3xl shadow-sm">
                  {archive.winnerEmoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 border-0 text-xs font-bold">
                      🏆 우승
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {archive.region} {archive.month} 리그
                    </Badge>
                  </div>
                  <div className="font-bold text-base mb-1">{archive.winnerShop}</div>
                  <div className="text-xs text-muted-foreground">{archive.successStory}</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border/50">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">참여자</div>
                    <div className="font-bold text-sm tabular-nums">{archive.participantCount}명</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">결제액</div>
                    <div className="font-bold text-sm tabular-nums">{formatKoreanCurrency(archive.totalPayment)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <div>
                    <div className="text-xs text-muted-foreground">리워드</div>
                    <div className="font-bold text-sm tabular-nums text-success">
                      {formatKoreanCurrency(archive.totalRewardPaid)}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

