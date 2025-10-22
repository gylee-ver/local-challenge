"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MapPin, Search, Store, Heart, Award, ChevronRight, X, Locate, Home } from "lucide-react"
import Link from "next/link"
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

const allShops = getAllShops()

const categories = ["전체", ...Array.from(new Set(allShops.map((shop) => shop.category)))]

export default function MapPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("전체")
  const [selectedShop, setSelectedShop] = useState<number | null>(null)

  const shops = allShops.map((shop, index) => ({
    ...shop,
    rank: index + 1,
    image: shop.emoji,
    distance: `${shop.distance}m`,
  }))

  const filteredShops = shops.filter((shop) => {
    const matchesSearch = shop.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "전체" || shop.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <header className="sticky top-0 z-40 glass shadow-soft">
        <div className="px-5 py-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-soft">
              <MapPin className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">지도</span>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="가게 이름으로 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-12 h-12 rounded-2xl card-glass border-border/50 shadow-soft"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted/50 rounded-full transition-all"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Map Container */}
      <div className="relative">
        <div className="h-[400px] bg-gradient-to-br from-muted/30 via-muted/20 to-muted/10 relative overflow-hidden">
          {/* Map API Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-3xl flex items-center justify-center mx-auto shadow-soft">
                <MapPin className="w-10 h-10 text-primary" />
              </div>
              <div>
                <p className="text-lg font-bold mb-1">지도 API 연동 영역</p>
                <p className="text-sm text-muted-foreground">
                  카카오맵, 네이버맵 등의 지도 API가
                  <br />
                  이곳에 표시됩니다
                </p>
              </div>
            </div>
          </div>

          {/* Current Location Button */}
          <button className="absolute bottom-4 right-4 w-12 h-12 bg-card/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-soft-lg hover:scale-105 transition-all active:scale-95">
            <Locate className="w-5 h-5 text-primary" />
          </button>
        </div>

        {/* Category Filter */}
        <div className="px-5 py-4 bg-background/80 backdrop-blur-sm border-b border-border/50">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`flex-shrink-0 rounded-full px-4 h-9 font-semibold transition-all ${
                  selectedCategory === category ? "shadow-soft" : "card-glass border-border/50 hover:border-primary/50"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Shop List */}
      <main className="px-5 py-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">
            주변 가게 <span className="text-primary">{filteredShops.length}</span>
          </h3>
          <Button variant="ghost" size="sm" className="text-sm font-semibold">
            거리순
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {filteredShops.map((shop) => (
            <Link key={shop.id} href={`/shop/${shop.id}`}>
              <Card
                className={`p-4 card-glass hover:shadow-soft-lg transition-all active:scale-[0.98] ${
                  selectedShop === shop.id ? "ring-2 ring-primary shadow-soft-lg" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-muted/50 to-muted/30 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 shadow-soft">
                    {shop.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Badge
                        variant="outline"
                        className="text-xs border-primary/50 text-primary font-bold flex-shrink-0 px-2"
                      >
                        {shop.rank}위
                      </Badge>
                      <span className="font-bold text-base truncate">{shop.name}</span>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">{shop.category}</div>
                    <div className="flex items-center gap-3 text-xs">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="font-semibold text-primary">{shop.distance}</span>
                      </div>
                      <span className="text-muted-foreground">•</span>
                      <div className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 text-destructive" />
                        <span className="font-semibold">{shop.supporters}명</span>
                      </div>
                      <span className="text-muted-foreground">•</span>
                      <span className="font-bold text-primary">{formatKoreanCurrency(shop.amount)}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {filteredShops.length === 0 && (
          <Card className="p-12 card-glass text-center">
            <div className="w-16 h-16 bg-muted/30 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="font-bold text-lg mb-2">검색 결과가 없습니다</p>
            <p className="text-sm text-muted-foreground">다른 검색어나 카테고리를 시도해보세요</p>
          </Card>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 glass shadow-soft-lg rounded-t-[32px]">
        <div className="flex items-center justify-around py-3 px-2">
          {[
            { icon: Home, label: "홈", active: false, href: "/" },
            { icon: Store, label: "가게들", active: false, href: "/league" },
            { icon: MapPin, label: "지도", active: true, href: "/map" },
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
    </div>
  )
}
