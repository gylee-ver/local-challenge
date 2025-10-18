"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle2, CreditCard } from "lucide-react"
import { useWallet } from "@/lib/wallet-context"

interface ChargeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ChargeDialog({ open, onOpenChange }: ChargeDialogProps) {
  const { chargePoints } = useWallet()
  const [step, setStep] = useState<"amount" | "confirm" | "success">("amount")
  const [amount, setAmount] = useState(50000)
  const [customAmount, setCustomAmount] = useState("")

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
      alert("최소 충전 금액은 5,000원입니다.")
      return
    }
    if (amount > 500000) {
      alert("최대 충전 금액은 500,000원입니다.")
      return
    }
    setStep("confirm")
  }

  const handleCharge = () => {
    // 충전 처리 시뮬레이션
    setTimeout(() => {
      chargePoints(amount)
      setStep("success")
      setTimeout(() => {
        onOpenChange(false)
        // Reset state
        setTimeout(() => {
          setStep("amount")
          setAmount(50000)
          setCustomAmount("")
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
                <CreditCard className="w-6 h-6 text-primary" />
                포인트 충전
              </DialogTitle>
              <DialogDescription className="text-sm">
                로컬챌린지 참여용 포인트를 충전하세요 (1P = 1원)
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 py-4">
              <div>
                <label className="text-sm font-semibold mb-3 block">충전 금액 선택</label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[10000, 50000, 100000].map((value) => (
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
                  placeholder="직접 입력 (5,000~500,000원)"
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  className="w-full px-4 py-3.5 bg-muted border-0 rounded-xl text-sm font-medium placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <div className="p-5 bg-gradient-to-br from-muted/80 to-muted/40 rounded-2xl space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground font-medium">충전 금액</span>
                  <span className="font-bold text-base tabular-nums">{amount.toLocaleString()}원</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground font-medium">충전 후 포인트</span>
                  <span className="font-bold text-primary text-base tabular-nums">
                    {amount.toLocaleString()}P
                  </span>
                </div>
              </div>

              <div className="p-4 bg-primary/10 border border-primary/20 rounded-2xl">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-foreground leading-relaxed font-medium space-y-1">
                    <p>• 포인트는 NH페이 또는 연결계좌에서 충전됩니다</p>
                    <p>• 최소 5,000원부터 최대 500,000원까지 충전 가능</p>
                    <p>• 1P = 1원으로 환산되며 응원예치에 사용됩니다</p>
                  </div>
                </div>
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
              <Button onClick={handleConfirm} className="flex-1 h-12 rounded-xl font-semibold">
                다음
              </Button>
            </div>
          </>
        )}

        {step === "confirm" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">충전 확인</DialogTitle>
              <DialogDescription className="text-sm">아래 내용을 확인하고 충전을 완료하세요</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="p-5 bg-gradient-to-br from-muted/80 to-muted/40 rounded-2xl space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground font-medium">충전 금액</span>
                  <span className="font-bold text-base tabular-nums">{amount.toLocaleString()}원</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground font-medium">결제 수단</span>
                  <span className="font-medium text-sm">NH페이</span>
                </div>
              </div>

              <div className="p-4 bg-warning/10 border border-warning/20 rounded-2xl">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-foreground leading-relaxed">
                    NH페이 잔액에서 {amount.toLocaleString()}원이 차감되어 로컬챌린지 포인트로 전환됩니다.
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
              <Button onClick={handleCharge} className="flex-1 h-12 rounded-xl font-semibold">
                충전하기
              </Button>
            </div>
          </>
        )}

        {step === "success" && (
          <div className="py-10 text-center">
            <div className="w-20 h-20 bg-success/10 rounded-3xl flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-10 h-10 text-success" />
            </div>
            <h3 className="text-2xl font-bold mb-3">충전 완료!</h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              {amount.toLocaleString()}P가 충전되었습니다.
            </p>
            <div className="text-sm text-muted-foreground">지금 바로 응원예치에 사용하세요!</div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

