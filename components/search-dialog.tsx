"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search, TrendingUp, Clock } from "lucide-react"
import Link from "next/link"

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("")

  const recentSearches = ["카페 온더코너", "라멘야쿠모", "한신포차"]
  const popularSearches = ["카페", "일식", "한식", "브런치"]

  const shops = [
    { name: "카페 온더코너", category: "카페·디저트", emoji: "☕", id: 1 },
    { name: "라멘야쿠모", category: "일식·라멘", emoji: "🍜", id: 2 },
    { name: "한신포차 강남점", category: "한식·포차", emoji: "🍻", id: 3 },
  ]

  const filteredShops = query ? shops.filter((shop) => shop.name.toLowerCase().includes(query.toLowerCase())) : []

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0">
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="가게 이름, 카테고리 검색"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {!query && (
            <>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">최근 검색</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search) => (
                    <button
                      key={search}
                      onClick={() => setQuery(search)}
                      className="px-3 py-1.5 bg-accent rounded-full text-sm hover:bg-accent/80 transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t border-border">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">인기 검색어</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((search) => (
                    <button
                      key={search}
                      onClick={() => setQuery(search)}
                      className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {query && filteredShops.length > 0 && (
            <div className="p-2">
              {filteredShops.map((shop) => (
                <Link
                  key={shop.id}
                  href={`/shop/${shop.id}`}
                  onClick={() => onOpenChange(false)}
                  className="flex items-center gap-3 p-3 hover:bg-accent rounded-lg transition-colors"
                >
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-xl">
                    {shop.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-sm">{shop.name}</div>
                    <div className="text-xs text-muted-foreground">{shop.category}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {query && filteredShops.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-sm text-muted-foreground">검색 결과가 없습니다</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
