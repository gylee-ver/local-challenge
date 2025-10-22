"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Heart,
  ChevronRight,
  RefreshCw,
  DollarSign,
  UsersIcon,
  Archive,
  MapPin,
  Sparkles,
  Shuffle,
} from "lucide-react"
import Link from "next/link"
import { useLeague } from "@/lib/league-context"
import { getAllShops } from "@/lib/shops-data"

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
  const [sortBy, setSortBy] = useState<"distance" | "random">("distance")

  const shops = getAllShops().map((shop, index) => ({
    id: shop.id,
    name: shop.name,
    category: shop.category,
    payment: shop.amount,
    supporters: shop.supporters,
    emoji: shop.emoji,
    isMySupport: index === 0, // 첫 번째 가게만 응원 중으로 설정
    theme: shop.theme,
    story: shop.story,
    distance: shop.distance,
    status: shop.status,
  }))

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  const sortedShops = [...shops].sort((a, b) => {
    if (sortBy === "distance") return a.distance - b.distance
    if (sortBy === "random") return Math.random() - 0.5
    return 0 // story는 원래 순서 유지
  })

  return (
    <div className="min-h-screen bg-muted/30 pb-6">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-2 -ml-2 hover:bg-accent rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="font-bold">이달의 가게들</h1>
              <p className="text-xs text-muted-foreground">{currentLeague.region}</p>
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
        {/* Hooking Message */}
        <div className="bg-gradient-to-br from-primary/8 via-success/5 to-transparent rounded-2xl p-4 border border-primary/20">
          <div className="flex items-start gap-3">
            <div className="text-2xl">💚</div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground mb-1 leading-snug">
                우리 동네 가게를 발견하고 응원해보세요
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                당신의 작은 관심이 청년 창업가에게는 큰 힘이 됩니다
              </p>
            </div>
          </div>
        </div>

        {/* Payment and Supporters Summary Cards */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 bg-card rounded-xl border border-border shadow-sm">
            <div className="flex items-center gap-1.5 mb-1">
              <DollarSign className="w-4 h-4 text-primary" />
              <div className="text-xs text-muted-foreground">총 결제액</div>
            </div>
            <div className="text-lg font-bold tabular-nums">
              {formatKoreanCurrency(shops.reduce((acc, shop) => acc + shop.payment, 0))}
            </div>
            <div className="text-xs text-success font-medium">+18.5%</div>
          </div>
          <div className="p-3 bg-card rounded-xl border border-border shadow-sm">
            <div className="flex items-center gap-1.5 mb-1">
              <UsersIcon className="w-4 h-4 text-secondary" />
              <div className="text-xs text-muted-foreground">총 응원자</div>
            </div>
            <div className="text-lg font-bold tabular-nums">
              {shops.reduce((acc, shop) => acc + shop.supporters, 0)}명
            </div>
            <div className="text-xs text-success font-medium">+12.3%</div>
          </div>
        </div>

        {/* My Support Shop */}
        <div>
          <Link href="/shop/1">
            <div className="bg-gradient-to-br from-primary/8 to-primary/4 rounded-2xl p-3.5 border border-primary/20 hover:border-primary/40 hover:shadow-md transition-all">
              <h3 className="text-lg font-bold mb-3">내가 응원하는 가게</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center text-2xl shadow-sm">
                  ☕
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm">카페 온더코너</span>
                    <Badge className="text-xs bg-success/20 text-success border-0 px-2 py-0.5">
                      💚 응원중
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">카페·디저트</div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </div>
            </div>
          </Link>
        </div>

        {/* Shop List - 큐레이션 스타일 */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-lg font-bold">강남구 가게 모아보기</h3>
          </div>
          
          {/* Sort Options - Compact */}
          <div className="flex gap-2 mb-3 px-1">
            {[
              { id: "distance", label: "가까운 순", icon: MapPin },
              { id: "random", label: "랜덤 발견", icon: Shuffle },
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => setSortBy(option.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  sortBy === option.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-card text-muted-foreground border border-border hover:border-primary/30"
                }`}
              >
                <option.icon className="w-3.5 h-3.5" />
                {option.label}
              </button>
            ))}
          </div>

          <div className="space-y-0">
            {sortedShops.map((shop, index) => (
              <div key={shop.id} className={index > 0 ? "mt-3" : ""}>
                <Link href={`/shop/${shop.id}`}>
                  <div
                    className={`rounded-2xl p-4 transition-all ${
                      shop.isMySupport
                        ? "bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30"
                        : "bg-card border-2 border-transparent"
                    } hover:border-primary/30 hover:shadow-lg active:scale-[0.99]`}
                    style={{ marginBottom: "12px" }}
                  >
                    <div className="flex gap-4">
                      {/* Shop Thumbnail */}
                      <div className="w-[72px] h-[72px] bg-gradient-to-br from-muted/60 to-muted/40 rounded-2xl flex items-center justify-center text-4xl shadow-sm flex-shrink-0">
                        {shop.emoji}
                      </div>

                      {/* Shop Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-bold text-base truncate">{shop.name}</h4>
                          {shop.isMySupport && (
                            <Heart className="w-4 h-4 fill-destructive text-destructive flex-shrink-0" />
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 mb-2.5">
                          <Badge
                            className={`text-xs font-semibold px-2.5 py-1 ${
                              shop.theme.color === "success"
                                ? "bg-success/15 text-success border-success/30"
                                : shop.theme.color === "primary"
                                  ? "bg-primary/15 text-primary border-primary/30"
                                  : shop.theme.color === "warning"
                                    ? "bg-warning/15 text-warning border-warning/30"
                                    : "bg-chart-2/15 text-chart-2 border-chart-2/30"
                            }`}
                          >
                            {shop.theme.emoji} {shop.theme.label}
                          </Badge>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed mb-2.5">
                          {shop.story}
                        </p>
                        
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-lg">
                            <MapPin className="w-3.5 h-3.5 text-primary" />
                            <span className="text-xs font-semibold text-primary">{shop.distance}m</span>
                          </div>
                          <div className="px-2 py-1 bg-muted/50 rounded-lg">
                            <span className="text-xs text-muted-foreground">{shop.category}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
            가게 정보는 10분마다 자동으로 업데이트됩니다. 모든 가게가 여러분의 응원을 기다리고 있어요!
          </p>
        </Card>
      </main>
    </div>
  )
}
