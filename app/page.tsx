"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Bell, MapPin, Users, ChevronRight, Heart, Store, Award, DollarSign, Home } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { DepositDialog } from "@/components/deposit-dialog"
import { SearchDialog } from "@/components/search-dialog"
import { NotificationDialog } from "@/components/notification-dialog"
import { RegionSelectorDialog } from "@/components/region-selector-dialog"
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

export default function HomePage() {
  const router = useRouter()
  const { currentLeague } = useLeague()
  const allShops = getAllShops()
  const [notificationCount, setNotificationCount] = useState(1)
  const [depositDialogOpen, setDepositDialogOpen] = useState(false)
  const [searchDialogOpen, setSearchDialogOpen] = useState(false)
  const [notificationDialogOpen, setNotificationDialogOpen] = useState(false)
  const [regionDialogOpen, setRegionDialogOpen] = useState(false)
  const [selectedShop, setSelectedShop] = useState<{ name: string; emoji: string } | null>(null)

  const handleSupportClick = (shopName: string, shopEmoji: string) => {
    setSelectedShop({ name: shopName, emoji: shopEmoji })
    setDepositDialogOpen(true)
  }

  const handleDepositSuccess = () => {
    setNotificationCount((prev) => prev + 1)
  }

  const totalParticipants = allShops.reduce((acc, shop) => acc + shop.supporters, 0)
  const totalAmount = allShops.reduce((acc, shop) => acc + shop.amount, 0)

  return (
    <div className="min-h-screen bg-background pb-28">
      <main className="px-5 pt-6 space-y-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <img src="/local-challenge-logo.png" alt="로컬챌린지" className="h-10 w-auto object-contain" />
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchDialogOpen(true)}
              className="p-2.5 hover:bg-muted/50 rounded-2xl transition-all active:scale-95"
              aria-label="검색"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                setNotificationDialogOpen(true)
                setNotificationCount(0)
              }}
              className="p-2.5 hover:bg-muted/50 rounded-2xl transition-all active:scale-95 relative"
              aria-label="알림"
            >
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full ring-2 ring-card animate-pulse" />
              )}
            </button>
          </div>
        </div>

        <Card className="p-6 card-glass bg-gradient-to-br from-primary/10 via-primary/5 to-transparent shadow-soft-lg">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <Badge className="mb-3 bg-primary/20 text-primary border-0 font-semibold px-3 py-1.5 rounded-full">
                이달의 챌린지
              </Badge>
              <h2 className="text-2xl font-bold mb-2 leading-tight break-keep">
                우리 동네 가게를
                <br />
                응원하고 리워드 받기
              </h2>
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                NH pay로 결제하고 최대 20% 리워드 포인트를 받아보세요
              </p>
              <button
                onClick={() => setRegionDialogOpen(true)}
                className="flex items-center gap-2 text-sm font-medium hover:bg-primary/10 px-3 py-2 -ml-3 rounded-xl transition-all"
              >
                <MapPin className="w-4 h-4 text-primary" />
                <span>{currentLeague.region}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <img src="/winnercup-nh.png" alt="우승컵" className="w-16 h-16 sm:w-20 sm:h-20 object-contain flex-shrink-0" />
          </div>
        </Card>

        <Card className="p-4 card-glass shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-lg">내가 응원하는 가게</h3>
            <Link href="/my-support" className="text-sm text-primary font-semibold hover:underline">
              전체보기
            </Link>
          </div>

          <Link href="/shop/1" className="block">
            <div className="p-4 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent rounded-2xl border border-primary/10 hover:border-primary/20 hover:shadow-soft transition-all active:scale-[0.98]">
              {/* Shop Header */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center text-white font-bold shadow-soft flex-shrink-0">
                  1위
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-base">카페 온더코너</span>
                    <Badge className="bg-success/10 text-success border-success/20 text-xs font-semibold px-2 py-0.5">
                      응원중
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-muted-foreground">
                      응원금 <span className="font-bold text-foreground">{formatKoreanCurrency(50000)}</span>
                    </span>
                    <span className="text-success font-bold">+{formatKoreanCurrency(8500)}</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
              </div>

              {/* Progress Section */}
              <div className="pt-3 border-t border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground font-medium">챌린지 종료까지</span>
                  <span className="font-bold text-primary text-sm tabular-nums">7일 12시간</span>
                </div>
                <div className="relative w-full bg-muted/30 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary/90 rounded-full transition-all duration-500 shadow-sm"
                    style={{ width: "65%" }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-xs text-muted-foreground">진행률</span>
                  <span className="text-xs font-bold text-primary tabular-nums">65%</span>
                </div>
              </div>
            </div>
          </Link>
        </Card>

        <div className="relative">
          <div className="flex gap-2.5 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
            <Card className="p-3.5 card-glass shadow-soft flex-shrink-0 w-[150px] snap-start">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-primary" />
                <div className="text-xs text-muted-foreground font-medium">참여자</div>
              </div>
              <div className="text-2xl font-bold tabular-nums mb-0.5">{totalParticipants}명</div>
              <div className="text-xs text-success font-medium">+8.3%</div>
            </Card>
            <Card className="p-3.5 card-glass shadow-soft flex-shrink-0 w-[150px] snap-start">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-secondary" />
                <div className="text-xs text-muted-foreground font-medium">총 응원금</div>
              </div>
              <div className="text-2xl font-bold tabular-nums mb-0.5">{formatKoreanCurrency(totalAmount)}</div>
              <div className="text-xs text-success font-medium">+18.5%</div>
            </Card>
            <Card className="p-3.5 card-glass shadow-soft flex-shrink-0 w-[150px] snap-start">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-chart-3" />
                <div className="text-xs text-muted-foreground font-medium">참여 가게</div>
              </div>
              <div className="text-2xl font-bold tabular-nums mb-0.5">{allShops.length}개</div>
              <div className="text-xs text-success font-medium">+2개</div>
            </Card>
          </div>
          <div className="absolute right-0 top-0 bottom-2 w-16 bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none" />
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">이달의 추천 가게</h3>
            <Link href="/league" className="text-sm text-primary font-semibold flex items-center gap-1">
              전체 보기
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="relative">
            <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
              {allShops.slice(0, 3).map((shop) => {
                const bgColors = [
                  "from-emerald-400 to-emerald-500",
                  "from-blue-400 to-blue-500",
                  "from-orange-400 to-orange-500",
                ]
                return (
                  <Link key={shop.id} href={`/shop/${shop.id}`} className="flex-shrink-0 snap-start">
                    <Card className="w-[170px] card-glass hover:shadow-soft-lg transition-all active:scale-[0.98] overflow-hidden p-0">
                      <div
                        className={`h-[140px] flex items-center justify-center text-6xl bg-gradient-to-br ${bgColors[shop.id - 1] || "from-primary/20 to-primary/10"}`}
                      >
                        {shop.emoji}
                      </div>
                      <div className="p-3.5">
                        <div className="flex items-center gap-1.5 mb-2">
                          <Badge
                            className={`text-xs font-semibold px-2 py-0.5 border-0 ${
                              shop.theme.color === "success"
                                ? "bg-success/10 text-success"
                                : shop.theme.color === "primary"
                                  ? "bg-primary/10 text-primary"
                                  : "bg-warning/10 text-warning"
                            }`}
                          >
                            {shop.theme.emoji} {shop.theme.label}
                          </Badge>
                        </div>
                        <div className="text-sm font-bold mb-1 break-words leading-tight">{shop.name}</div>
                        <div className="text-xs text-muted-foreground mb-2">{shop.category}</div>
                        <div className="text-xs">
                          <span className="font-bold text-primary tabular-nums">
                            {formatKoreanCurrency(shop.amount)}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                )
              })}
            </div>
            <div className="absolute right-0 top-0 bottom-2 w-16 bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none" />
          </div>
        </div>

        <Card className="p-6 card-glass shadow-soft backdrop-blur-sm">
          <h3 className="font-bold text-lg mb-5">로컬챌린지 참여 방법</h3>
          <div className="space-y-5">
            {[
              { step: 1, title: "가게 선택", desc: "응원하고 싶은 우리 동네 가게를 선택하세요", icon: "🏪" },
              { step: 2, title: "응원 예치", desc: "포인트로 응원금을 예치합니다 (최소 1만원)", icon: "💰" },
              { step: 3, title: "현장 결제", desc: "NH pay로 가게에서 결제하면 점수가 올라가요", icon: "💳" },
              { step: 4, title: "리워드 받기", desc: "우승 가게 응원자는 최대 20% 리워드!", icon: "🎁" },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl shadow-soft">
                  {item.icon}
                </div>
                <div className="flex-1 pt-1.5">
                  <div className="font-bold text-base mb-1.5">
                    {item.step}. {item.title}
                  </div>
                  <div className="text-sm text-muted-foreground leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <Button
            className="w-full mt-6 h-12 text-base font-semibold rounded-2xl shadow-soft"
            onClick={() => router.push("/league")}
          >
            지금 시작하기
          </Button>
        </Card>

        <Card className="p-5 card-glass shadow-soft">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground font-semibold">응원예치 안내:</strong> 응원예치는 증권형 크라우드펀딩이
            아니며, 예치금은 챌린지 기간 동안 잠금됩니다. 비우승 가게 응원자는 예치금 100% 환급, 우승 가게 응원자는
            리워드 포인트를 지급받습니다. 리워드는 현금 전환 시 1~2% 수수료가 발생하며, 연간 환급액에 따라 과세될 수
            있습니다.
          </p>
        </Card>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 glass shadow-soft-lg rounded-t-[32px]">
        <div className="flex items-center justify-around py-3 px-2">
          {[
            { icon: Home, label: "홈", active: true, href: "/" },
            { icon: Store, label: "가게들", active: false, href: "/league" },
            { icon: MapPin, label: "지도", active: false, href: "/map" },
            { icon: Heart, label: "내 응원", active: false, href: "/my-support" },
          ].map((item, i) => (
            <Link key={i} href={item.href}>
              <button
                className={`flex flex-col items-center gap-1.5 px-4 py-2 rounded-2xl transition-all active:scale-95 min-h-[44px] ${
                  item.active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <item.icon className="w-6 h-6" strokeWidth={item.active ? 2.5 : 2} />
                <span className={`text-xs ${item.active ? "font-semibold" : "font-medium"}`}>{item.label}</span>
              </button>
            </Link>
          ))}
        </div>
      </nav>

      {selectedShop && (
        <DepositDialog
          open={depositDialogOpen}
          onOpenChange={setDepositDialogOpen}
          shopName={selectedShop.name}
          shopEmoji={selectedShop.emoji}
          onSuccess={handleDepositSuccess}
        />
      )}
      <SearchDialog open={searchDialogOpen} onOpenChange={setSearchDialogOpen} />
      <NotificationDialog open={notificationDialogOpen} onOpenChange={setNotificationDialogOpen} />
      <RegionSelectorDialog open={regionDialogOpen} onOpenChange={setRegionDialogOpen} />
    </div>
  )
}
