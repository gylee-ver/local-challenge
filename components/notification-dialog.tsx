"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Bell, TrendingUp, Gift, AlertCircle } from "lucide-react"

interface NotificationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NotificationDialog({ open, onOpenChange }: NotificationDialogProps) {
  const notifications = [
    {
      id: 1,
      type: "rank",
      icon: TrendingUp,
      title: "순위 변동 알림",
      message: "카페 로컬빈즈가 1위를 유지하고 있어요!",
      time: "10분 전",
      unread: true,
    },
    {
      id: 2,
      type: "reward",
      icon: Gift,
      title: "리워드 지급",
      message: "11월 챌린지 리워드 5,100원이 지급되었습니다",
      time: "2시간 전",
      unread: false,
    },
    {
      id: 3,
      type: "alert",
      icon: AlertCircle,
      title: "챌린지 종료 임박",
      message: "강남구 12월 리그가 7일 후 종료됩니다",
      time: "1일 전",
      unread: false,
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            알림
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border transition-colors cursor-pointer hover:bg-accent ${
                notification.unread ? "bg-primary/5 border-primary/20" : "bg-card border-border"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    notification.type === "rank"
                      ? "bg-primary/10"
                      : notification.type === "reward"
                        ? "bg-success/10"
                        : "bg-warning/10"
                  }`}
                >
                  <notification.icon
                    className={`w-5 h-5 ${
                      notification.type === "rank"
                        ? "text-primary"
                        : notification.type === "reward"
                          ? "text-success"
                          : "text-warning"
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm">{notification.title}</span>
                    {notification.unread && <Badge className="h-5 px-1.5 text-xs bg-primary">NEW</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{notification.message}</p>
                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
