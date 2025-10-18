"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Minus,
  Heart,
  ChevronRight,
  RefreshCw,
  DollarSign,
  UsersIcon,
  Archive,
} from "lucide-react"
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

export default function LeagueRankingPage() {
  const { currentLeague } = useLeague()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const shops = [
    {
      rank: 1,
      prevRank: 1,
      name: "카페 온더코너",
      category: "카페·디저트",
      payment: 842000,
      supporters: 156,
      score: 87.5,
      change: 0,
      emoji: "☕",
      isMySupport: true,
    },
    {
      rank: 2,
      prevRank: 3,
      name: "라멘야쿠모",
      category: "일식·라멘",
      payment: 756000,
      supporters: 142,
      score: 82.3,
      change: 1,
      emoji: "🍜",
      isMySupport: false,
    },
    {
      rank: 3,
      prevRank: 2,
      name: "한신포차 강남점",
      category: "한식·포차",
      payment: 523000,
      supporters: 98,
      score: 71.8,
      change: -1,
      emoji: "🍻",
      isMySupport: false,
    },
    {
      rank: 4,
      prevRank: 4,
      name: "더그린테이블",
      category: "샐러드·브런치",
      payment: 487000,
      supporters: 89,
      score: 68.2,
      change: 0,
      emoji: "🥗",
      isMySupport: false,
    },
    {
      rank: 5,
      prevRank: 6,
      name: "미스터피자 삼성점",
      category: "양식·피자",
      payment: 412000,
      supporters: 76,
      score: 62.5,
      change: 1,
      emoji: "🍕",
      isMySupport: false,
    },
    {
      rank: 6,
      prevRank: 5,
      name: "봉추찜닭 강남점",
      category: "한식·찜닭",
      payment: 398000,
      supporters: 71,
      score: 59.8,
      change: -1,
      emoji: "🍗",
      isMySupport: false,
    },
    {
      rank: 7,
      prevRank: 7,
      name: "카페드림",
      category: "카페·디저트",
      payment: 356000,
      supporters: 64,
      score: 55.2,
      change: 0,
      emoji: "☕",
      isMySupport: false,
    },
    {
      rank: 8,
      prevRank: 9,
      name: "본죽 역삼점",
      category: "한식·죽",
      payment: 312000,
      supporters: 58,
      score: 51.7,
      change: 1,
      emoji: "🥣",
      isMySupport: false,
    },
    {
      rank: 9,
      prevRank: 8,
      name: "피자스쿨 대치점",
      category: "양식·피자",
      payment: 287000,
      supporters: 52,
      score: 48.3,
      change: -1,
      emoji: "🍕",
      isMySupport: false,
    },
    {
      rank: 10,
      prevRank: 10,
      name: "맘스터치 강남역점",
      category: "패스트푸드·버거",
      payment: 245000,
      supporters: 47,
      score: 44.9,
      change: 0,
      emoji: "🍔",
      isMySupport: false,
    },
  ]

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border glass shadow-soft">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-2 -ml-2 hover:bg-accent rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="font-bold">강남구 10월 리그</h1>
              <p className="text-xs text-muted-foreground">실시간 랭킹</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/league/archive" className="p-2 hover:bg-accent rounded-lg transition-colors">
              <Archive className="w-5 h-5" />
            </Link>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2 hover:bg-accent rounded-lg transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`} />
            </button>
            <Badge variant="outline" className="text-xs">
              {currentLeague.daysRemaining}일 {currentLeague.hoursRemaining}시간 남음
            </Badge>
          </div>
        </div>
      </header>

      <main className="px-4 pt-4 space-y-4">
        {/* Ranking Calculation Info */}
        <Card className="p-4 bg-primary/5 border-primary/20 card-glass shadow-soft">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm mb-1">우승 기준</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                NH pay 오프라인 결제액 70% + 응원 참여자 수 30%를 합산하여 순위가 결정됩니다. 실시간 업데이트는 10분마다
                반영됩니다.
              </p>
            </div>
          </div>
        </Card>

        {/* Payment and Supporters Summary Cards */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 card-glass shadow-soft">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <div className="text-xs text-muted-foreground font-medium">총 결제액</div>
            </div>
            <div className="text-2xl font-bold tabular-nums">{formatKoreanCurrency(3020000)}</div>
            <div className="text-xs text-success font-semibold mt-1">+18.5% 증가</div>
          </Card>
          <Card className="p-4 card-glass shadow-soft">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-xl flex items-center justify-center">
                <UsersIcon className="w-5 h-5 text-secondary" />
              </div>
              <div className="text-xs text-muted-foreground font-medium">총 응원자</div>
            </div>
            <div className="text-2xl font-bold tabular-nums">561명</div>
            <div className="text-xs text-success font-semibold mt-1">+12.3% 증가</div>
          </Card>
        </div>

        {/* My Support Shop */}
        <div>
          <h3 className="text-sm font-bold mb-2 px-1">내가 응원하는 가게</h3>
          <Link href="/shop/1">
            <Card className="p-3.5 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30 hover:shadow-md transition-shadow card-glass shadow-soft">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center text-3xl">
                    ☕
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold break-words">카페 온더코너</span>
                    <Badge variant="outline" className="text-xs border-success text-success">
                      응원중
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mb-1.5">카페·디저트</div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="font-medium">점수 87.5</span>
                    <span className="text-muted-foreground">{formatKoreanCurrency(842000)}</span>
                    <span className="text-muted-foreground">156명</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              </div>
            </Card>
          </Link>
        </div>

        {/* Ranking List */}
        <div>
          <h3 className="text-sm font-bold mb-3 px-1">전체 순위</h3>
          <div className="space-y-4">
            {shops.map((shop) => (
              <div key={shop.rank} className="mb-3">
                <Link href={`/shop/${shop.rank}`}>
                  <Card
                    className={`p-4 hover:shadow-lg transition-all duration-200 ${
                      shop.isMySupport
                        ? "border-primary/40 bg-primary/10 backdrop-blur-md"
                        : "bg-card/95 backdrop-blur-md border-border/50"
                    } shadow-md hover:scale-[1.01] active:scale-[0.99]`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Rank Badge */}
                      <div className="relative flex-shrink-0">
                        <div
                          className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-sm ${
                            shop.rank === 1
                              ? "bg-gradient-to-br from-yellow-400 to-yellow-500"
                              : shop.rank === 2
                                ? "bg-gradient-to-br from-gray-300 to-gray-400"
                                : shop.rank === 3
                                  ? "bg-gradient-to-br from-orange-400 to-orange-500"
                                  : "bg-accent"
                          }`}
                        >
                          {shop.emoji}
                        </div>
                        <div
                          className={`absolute -top-1 -left-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-sm ${
                            shop.rank <= 3 ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {shop.rank}
                        </div>
                      </div>

                      {/* Shop Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold truncate">{shop.name}</span>
                          {shop.isMySupport && (
                            <Heart className="w-4 h-4 fill-destructive text-destructive flex-shrink-0" />
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground mb-1.5">{shop.category}</div>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="font-bold text-primary">점수 {shop.score}</span>
                          <span className="text-muted-foreground">{formatKoreanCurrency(shop.payment)}</span>
                          <span className="text-muted-foreground">{shop.supporters}명</span>
                        </div>
                      </div>

                      {/* Rank Change */}
                      <div className="flex flex-col items-center gap-1 flex-shrink-0">
                        {shop.change > 0 ? (
                          <>
                            <TrendingUp className="w-5 h-5 text-success" />
                            <span className="text-xs font-bold text-success">+{shop.change}</span>
                          </>
                        ) : shop.change < 0 ? (
                          <>
                            <TrendingDown className="w-5 h-5 text-destructive" />
                            <span className="text-xs font-bold text-destructive">{shop.change}</span>
                          </>
                        ) : (
                          <>
                            <Minus className="w-5 h-5 text-muted-foreground" />
                            <span className="text-xs font-bold text-muted-foreground">-</span>
                          </>
                        )}
                      </div>
                    </div>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Update Info */}
        <Card className="p-4 bg-muted/30 card-glass shadow-soft">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">마지막 업데이트</span>
            <span className="font-medium">5분 전</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
            순위는 10분마다 자동으로 업데이트됩니다. 실제 결제 반영까지 최대 30분이 소요될 수 있습니다.
          </p>
        </Card>
      </main>
    </div>
  )
}
