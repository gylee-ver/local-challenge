"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface League {
  id: string
  region: string
  regionCode: string
  month: string
  year: number
  status: "upcoming" | "active" | "ended"
  startDate: string
  endDate: string
  participantCount: number
  totalPayment: number
  shopsCount: number
  daysRemaining: number
  hoursRemaining: number
}

export interface LeagueArchive extends League {
  winnerShop: string
  winnerEmoji: string
  totalRewardPaid: number
  successStory?: string
}

interface LeagueContextType {
  currentLeague: League
  availableRegions: { code: string; name: string }[]
  archives: LeagueArchive[]
  setCurrentLeague: (leagueId: string) => void
}

const LeagueContext = createContext<LeagueContextType | undefined>(undefined)

export function LeagueProvider({ children }: { children: ReactNode }) {
  const availableRegions = [
    { code: "gangnam", name: "강남구" },
    { code: "suncheon", name: "순천시" },
    { code: "gongju", name: "공주시" },
    { code: "andong", name: "안동시" },
    { code: "jinju", name: "진주시" },
  ]

  const leagues: League[] = [
    {
      id: "gangnam-dec-2025",
      region: "강남구",
      regionCode: "gangnam",
      month: "12월",
      year: 2025,
      status: "active",
      startDate: "2025-12-01",
      endDate: "2025-12-31",
      participantCount: 1247,
      totalPayment: 2400000,
      shopsCount: 10,
      daysRemaining: 7,
      hoursRemaining: 12,
    },
    {
      id: "suncheon-dec-2025",
      region: "순천시",
      regionCode: "suncheon",
      month: "12월",
      year: 2025,
      status: "active",
      startDate: "2025-12-01",
      endDate: "2025-12-31",
      participantCount: 856,
      totalPayment: 1800000,
      shopsCount: 10,
      daysRemaining: 7,
      hoursRemaining: 12,
    },
  ]

  const archivesList: LeagueArchive[] = [
    {
      id: "gangnam-nov-2025",
      region: "강남구",
      regionCode: "gangnam",
      month: "11월",
      year: 2025,
      status: "ended",
      startDate: "2025-11-01",
      endDate: "2025-11-30",
      participantCount: 1156,
      totalPayment: 2200000,
      shopsCount: 10,
      daysRemaining: 0,
      hoursRemaining: 0,
      winnerShop: "한신포차 강남점",
      winnerEmoji: "🍻",
      totalRewardPaid: 178000,
      successStory: "11월 리그 우승 후 매출이 35% 증가했으며, 새로운 단골 고객 120명이 생겼습니다.",
    },
    {
      id: "gangnam-oct-2025",
      region: "강남구",
      regionCode: "gangnam",
      month: "10월",
      year: 2025,
      status: "ended",
      startDate: "2025-10-01",
      endDate: "2025-10-31",
      participantCount: 1089,
      totalPayment: 2100000,
      shopsCount: 10,
      daysRemaining: 0,
      hoursRemaining: 0,
      winnerShop: "라멘야쿠모",
      winnerEmoji: "🍜",
      totalRewardPaid: 165000,
      successStory: "지역 주민들의 응원으로 메뉴를 확장하고 직원 1명을 추가 고용할 수 있었습니다.",
    },
    {
      id: "gangnam-sep-2025",
      region: "강남구",
      regionCode: "gangnam",
      month: "9월",
      year: 2025,
      status: "ended",
      startDate: "2025-09-01",
      endDate: "2025-09-30",
      participantCount: 967,
      totalPayment: 1950000,
      shopsCount: 10,
      daysRemaining: 0,
      hoursRemaining: 0,
      winnerShop: "더그린테이블",
      winnerEmoji: "🥗",
      totalRewardPaid: 142000,
      successStory: "리그 참여 후 온라인 주문이 시작되어 새로운 수익 채널이 열렸습니다.",
    },
  ]

  const [currentLeague, setCurrentLeagueState] = useState<League>(leagues[0])
  const [archives] = useState<LeagueArchive[]>(archivesList)

  const setCurrentLeague = (leagueId: string) => {
    const league = leagues.find((l) => l.id === leagueId)
    if (league) {
      setCurrentLeagueState(league)
    }
  }

  return (
    <LeagueContext.Provider value={{ currentLeague, availableRegions, archives, setCurrentLeague }}>
      {children}
    </LeagueContext.Provider>
  )
}

export function useLeague() {
  const context = useContext(LeagueContext)
  if (context === undefined) {
    throw new Error("useLeague must be used within a LeagueProvider")
  }
  return context
}

