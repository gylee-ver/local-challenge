"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle2, Wallet, Info } from "lucide-react"
import { calculateRewardRange } from "@/lib/reward-calculator"
import { useWallet } from "@/lib/wallet-context"

interface DepositDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  shopName: string
  shopEmoji: string
  onSuccess?: () => void
}

export function DepositDialog({ open, onOpenChange, shopName, shopEmoji, onSuccess }: DepositDialogProps) {
  const { wallet, addDeposit } = useWallet()
  const [step, setStep] = useState<"amount" | "confirm" | "success">("amount")
  const [amount, setAmount] = useState(50000)
  const [customAmount, setCustomAmount] = useState("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  // 가변 리워드 범위 계산 (6~20%)
  const rewardRange = calculateRewardRange(amount)
  const expectedRewardMin = rewardRange.min
  const expectedRewardMax = rewardRange.max

  const handleAmountSelect = (value: number) => {
    setAmount(value)
    setCustomAmount("")
  }

  const handleCustomAmountChange = (value: string) => {
    const numValue = Number.parseInt(value.replace(/,/g, ""))
    if (!isNaN(numValue) && numValue >= 5000) {
      setAmount(numValue)
    }
    setCustomAmount(value)
  }

  const handleConfirm = () => {
    if (amount < 5000) {
      alert("최소 응원금은 5,000원입니다.")
      return
    }
    if (amount > wallet.availableBalance) {
      alert("사용 가능한 포인트가 부족합니다.")
      return
    }
    if (!agreedToTerms) {
      alert("약관에 동의해주세요.")
      return
    }
    setStep("confirm")
  }

  const handleDeposit = () => {
    // 예치 처리
    addDeposit({
      shopName,
      shopEmoji,
      amount,
      leagueName: "강남구 12월 리그",
    })

    setTimeout(() => {
      setStep("success")
      setTimeout(() => {
        onOpenChange(false)
        onSuccess?.()
        // Reset state
        setTimeout(() => {
          setStep("amount")
          setAmount(50000)
          setCustomAmount("")
          setAgreedToTerms(false)
        }, 300)
      }, 2000)
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-3xl">
        {step === "amount" && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-xl">
                <span className="text-3xl">{shopEmoji}</span>
                {shopName} 응원하기
              </DialogTitle>
              <DialogDescription className="text-sm">응원금을 선택하고 예상 리워드를 확인하세요</DialogDescription>
            </DialogHeader>

            <div className="space-y-5 py-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold">응원금 선택</label>
                  <div className="text-xs text-muted-foreground">
                    사용가능: <span className="font-bold text-primary">{wallet.availableBalance.toLocaleString()}P</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[5000, 30000, 50000].map((value) => (
                    <Button
                      key={value}
                      variant={amount === value && !customAmount ? "default" : "outline"}
                      size="lg"
                      onClick={() => handleAmountSelect(value)}
                      className="font-semibold rounded-xl h-12"
                    >
                      {(value / 1000).toFixed(0)}천원
                    </Button>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="직접 입력 (최소 5,000원)"
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  className="w-full px-4 py-3.5 bg-muted border-0 rounded-xl text-sm font-medium placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <div className="p-5 bg-gradient-to-br from-muted/80 to-muted/40 rounded-2xl space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground font-medium">응원 예치금</span>
                  <span className="font-bold text-base tabular-nums">{amount.toLocaleString()}원</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground font-medium">예상 리워드</span>
                    <Info className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                  <span className="font-bold text-success text-base tabular-nums">
                    +{expectedRewardMin.toLocaleString()}원 ~ +{expectedRewardMax.toLocaleString()}원
                  </span>
                </div>
                <div className="h-px bg-border my-2" />
                <div className="flex items-center justify-between">
                  <span className="font-bold">예상 총액 범위</span>
                  <span className="text-base font-bold text-primary tabular-nums">
                    {(amount + expectedRewardMin).toLocaleString()}원 ~ {(amount + expectedRewardMax).toLocaleString()}원
                  </span>
                </div>
              </div>

              <div className="p-4 bg-warning/10 border border-warning/20 rounded-2xl">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-foreground leading-relaxed font-medium space-y-1">
                    <p>• 리워드는 기본 5% + 성과보너스(최대 10%) + 참여보너스(최대 5%) = 6~20%로 산정됩니다.</p>
                    <p>• 예치금은 리그 기간 동안 잠금되며, 우승 시 리워드와 함께, 비우승 시 100% 환급됩니다.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-2 border-input checked:bg-primary checked:border-primary transition-all"
                  />
                  <span className="text-xs text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                    응원예치는 증권형 크라우드펀딩이 아니며, 예치금은 챌린지 기간 동안 잠금됩니다. 비우승 시 100% 환급,
                    우승 시 리워드 지급에 동의합니다.
                  </span>
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1 h-12 rounded-xl font-semibold"
              >
                취소
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={!agreedToTerms}
                className="flex-1 h-12 rounded-xl font-semibold"
              >
                다음
              </Button>
            </div>
          </>
        )}

        {step === "confirm" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">응원 예치 확인</DialogTitle>
              <DialogDescription className="text-sm">아래 내용을 확인하고 응원을 완료하세요</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4 p-5 bg-muted/50 rounded-2xl">
                <div className="text-4xl">{shopEmoji}</div>
                <div className="flex-1">
                  <div className="font-bold text-base mb-1">{shopName}</div>
                  <div className="text-xs text-muted-foreground font-medium">강남구 12월 리그</div>
                </div>
              </div>

              <div className="p-5 bg-gradient-to-br from-muted/80 to-muted/40 rounded-2xl space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground font-medium">응원 예치금</span>
                  <span className="font-bold text-base tabular-nums">{amount.toLocaleString()}원</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground font-medium">예상 리워드</span>
                  <span className="font-bold text-success text-base tabular-nums">
                    +{expectedRewardMin.toLocaleString()}원 ~ +{expectedRewardMax.toLocaleString()}원
                  </span>
                </div>
              </div>

              <div className="p-4 bg-primary/10 border border-primary/20 rounded-2xl">
                <div className="flex items-start gap-3">
                  <Wallet className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-primary mb-1">포인트 차감</div>
                    <div className="text-xs text-muted-foreground leading-relaxed">
                      보유 포인트에서 {amount.toLocaleString()}원이 차감됩니다.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep("amount")}
                className="flex-1 h-12 rounded-xl font-semibold"
              >
                이전
              </Button>
              <Button onClick={handleDeposit} className="flex-1 h-12 rounded-xl font-semibold">
                응원하기
              </Button>
            </div>
          </>
        )}

        {step === "success" && (
          <div className="py-10 text-center">
            <div className="w-20 h-20 bg-success/10 rounded-3xl flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-10 h-10 text-success" />
            </div>
            <h3 className="text-2xl font-bold mb-3">응원 완료!</h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              {shopName}에 {amount.toLocaleString()}원을 응원했습니다.
            </p>
            <Badge className="bg-primary/10 text-primary border-0 px-4 py-2 text-sm font-semibold">
              내 응원 내역에서 확인하기
            </Badge>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
