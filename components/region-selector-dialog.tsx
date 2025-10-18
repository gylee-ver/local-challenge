"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { MapPin, ChevronRight, CheckCircle2 } from "lucide-react"
import { useLeague } from "@/lib/league-context"

interface RegionSelectorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RegionSelectorDialog({ open, onOpenChange }: RegionSelectorDialogProps) {
  const { currentLeague, availableRegions, setCurrentLeague } = useLeague()

  const handleRegionSelect = (regionCode: string) => {
    // 실제로는 서버에서 해당 지역의 활성 리그를 가져와야 함
    const leagueId = `${regionCode}-dec-2025`
    setCurrentLeague(leagueId)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            리그 지역 선택
          </DialogTitle>
          <DialogDescription className="text-sm">참여하고 싶은 지역의 리그를 선택하세요</DialogDescription>
        </DialogHeader>

        <div className="space-y-2 py-4">
          {availableRegions.map((region) => {
            const isActive = currentLeague.regionCode === region.code
            return (
              <button
                key={region.code}
                onClick={() => handleRegionSelect(region.code)}
                className={`w-full p-4 rounded-2xl border-2 transition-all text-left hover:border-primary/50 ${
                  isActive ? "border-primary bg-primary/5" : "border-border bg-card"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isActive ? "bg-primary/20" : "bg-muted"
                      }`}
                    >
                      <MapPin className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold">{region.name}</span>
                        {isActive && <Badge className="h-5 px-2 text-xs bg-primary">현재 지역</Badge>}
                      </div>
                      <div className="text-xs text-muted-foreground">12월 리그 진행중</div>
                    </div>
                  </div>
                  {isActive ? (
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  )}
                </div>
              </button>
            )
          })}
        </div>

        <div className="p-4 bg-muted/30 rounded-2xl text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">안내:</strong> 지역별 리그는 독립적으로 운영되며, 각 지역의 가게에만
          응원예치를 할 수 있습니다.
        </div>
      </DialogContent>
    </Dialog>
  )
}

