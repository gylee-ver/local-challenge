"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface WalletState {
  totalBalance: number // 총 포인트
  availableBalance: number // 사용 가능
  lockedBalance: number // 예치 중 (잠금)
}

export interface DepositHistory {
  id: string
  shopName: string
  shopEmoji: string
  amount: number
  status: "locked" | "completed" | "refunded"
  rank?: number
  rewardAmount?: number
  depositDate: string
  settlementDate?: string
  leagueName: string
}

interface WalletContextType {
  wallet: WalletState
  deposits: DepositHistory[]
  addDeposit: (deposit: Omit<DepositHistory, "id" | "depositDate">) => void
  chargePoints: (amount: number) => void
  settleDeposit: (depositId: string, won: boolean, rewardAmount?: number) => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<WalletState>({
    totalBalance: 125000,
    availableBalance: 75000,
    lockedBalance: 50000,
  })

  const [deposits, setDeposits] = useState<DepositHistory[]>([
    {
      id: "dep-1",
      shopName: "카페 온더코너",
      shopEmoji: "☕",
      amount: 50000,
      status: "locked",
      depositDate: "2025-10-11",
      leagueName: "강남구 12월 리그",
    },
    {
      id: "dep-2",
      shopName: "한신포차 강남점",
      shopEmoji: "🍻",
      amount: 30000,
      status: "completed",
      rank: 2,
      rewardAmount: 5100,
      depositDate: "2025-09-15",
      settlementDate: "2025-10-15",
      leagueName: "강남구 11월 리그",
    },
    {
      id: "dep-3",
      shopName: "미스터피자 삼성점",
      shopEmoji: "🍕",
      amount: 50000,
      status: "refunded",
      rank: 5,
      rewardAmount: 0,
      depositDate: "2025-08-20",
      settlementDate: "2025-09-20",
      leagueName: "강남구 10월 리그",
    },
    {
      id: "dep-4",
      shopName: "라멘야쿠모",
      shopEmoji: "🍜",
      amount: 20000,
      status: "completed",
      rank: 1,
      rewardAmount: 3200,
      depositDate: "2025-07-18",
      settlementDate: "2025-08-18",
      leagueName: "강남구 9월 리그",
    },
  ])

  const addDeposit = (deposit: Omit<DepositHistory, "id" | "depositDate">) => {
    const newDeposit: DepositHistory = {
      ...deposit,
      id: `dep-${Date.now()}`,
      depositDate: new Date().toISOString().split("T")[0],
      status: "locked",
    }

    setDeposits((prev) => [newDeposit, ...prev])
    setWallet((prev) => ({
      totalBalance: prev.totalBalance,
      availableBalance: prev.availableBalance - deposit.amount,
      lockedBalance: prev.lockedBalance + deposit.amount,
    }))
  }

  const chargePoints = (amount: number) => {
    setWallet((prev) => ({
      totalBalance: prev.totalBalance + amount,
      availableBalance: prev.availableBalance + amount,
      lockedBalance: prev.lockedBalance,
    }))
  }

  const settleDeposit = (depositId: string, won: boolean, rewardAmount = 0) => {
    setDeposits((prev) =>
      prev.map((dep) =>
        dep.id === depositId
          ? {
              ...dep,
              status: won ? "completed" : "refunded",
              rewardAmount: won ? rewardAmount : 0,
              settlementDate: new Date().toISOString().split("T")[0],
            }
          : dep
      )
    )

    const deposit = deposits.find((d) => d.id === depositId)
    if (deposit) {
      const returnAmount = won ? deposit.amount + rewardAmount : deposit.amount

      setWallet((prev) => ({
        totalBalance: prev.totalBalance + rewardAmount,
        availableBalance: prev.availableBalance + returnAmount,
        lockedBalance: prev.lockedBalance - deposit.amount,
      }))
    }
  }

  return (
    <WalletContext.Provider value={{ wallet, deposits, addDeposit, chargePoints, settleDeposit }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

