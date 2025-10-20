"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, Share2, MapPin, Clock, Phone, MessageCircle, TrendingUp, Sparkles } from "lucide-react"
import Link from "next/link"
import { DepositDialog } from "@/components/deposit-dialog"
import {
  calculateLocalGrowthScore,
  analyzeSentiment,
  getScoreColor,
  getScoreBgColor,
} from "@/lib/ai-scoring"

export default function ShopDetailPage() {
  const [currentTab, setCurrentTab] = useState<"look" | "learn" | "love">("look")
  const [isSupporting, setIsSupporting] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)
  const [depositDialogOpen, setDepositDialogOpen] = useState(false)

  // AI 분석 데이터
  const growthScore = calculateLocalGrowthScore("shop-1")
  const sentiment = analyzeSentiment("shop-1")

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "카페 로컬빈즈",
          text: "로컬챌린지에서 카페 로컬빈즈를 응원해주세요!",
          url: window.location.href,
        })
      } catch (err) {
        console.log("[v0] Share cancelled")
      }
    } else {
      alert("공유 기능이 지원되지 않는 브라우저입니다.")
    }
  }

  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited)
  }

  const handleSupportSuccess = () => {
    setIsSupporting(true)
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="p-2 -ml-2 hover:bg-accent rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <button onClick={handleShare} className="p-2 hover:bg-accent rounded-lg transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button onClick={handleFavoriteToggle} className="p-2 hover:bg-accent rounded-lg transition-colors">
              <Heart
                className={`w-5 h-5 transition-colors ${isFavorited ? "fill-destructive text-destructive" : ""}`}
              />
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Image */}
        <div className="relative h-64 bg-gradient-to-br from-emerald-400/20 to-emerald-500/10">
          <div className="absolute inset-0 flex items-center justify-center text-8xl">☕</div>
          <div className="absolute top-4 left-4">
            <Badge className="bg-success/10 text-success border-success/30 font-bold backdrop-blur-sm">
              💚 지속가능
            </Badge>
          </div>
        </div>

        {/* Shop Info Header */}
        <div className="px-4 py-5 bg-card">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">카페 온더코너</h1>
              <p className="text-sm text-muted-foreground mb-3">논현동에서 오랜 시간 사랑받은 동네 카페</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">
                  카페·디저트
                </Badge>
                <Badge variant="outline" className="text-xs">
                  강남구 논현동
                </Badge>
                <Badge variant="outline" className="text-xs border-success text-success">
                  NH pay 가능
                </Badge>
              </div>
            </div>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="text-center">
              <div className="text-xl font-bold text-primary mb-1">₩842K</div>
              <div className="text-xs text-muted-foreground">결제액</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-chart-2 mb-1">156명</div>
              <div className="text-xs text-muted-foreground">응원자</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-success mb-1">+12.3%</div>
              <div className="text-xs text-muted-foreground">증가율</div>
            </div>
          </div>
        </div>

        {/* 3L Tabs */}
        <div className="sticky top-[57px] z-40 bg-card border-b border-border">
          <div className="flex items-center px-4">
            {[
              { id: "look", label: "LOOK", desc: "둘러보기" },
              { id: "learn", label: "LEARN", desc: "알아보기" },
              { id: "love", label: "LOVE", desc: "응원하기" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id as any)}
                className={`flex-1 py-4 text-center border-b-2 transition-colors ${
                  currentTab === tab.id
                    ? "border-primary text-primary font-bold"
                    : "border-transparent text-muted-foreground"
                }`}
              >
                <div className="text-sm font-bold">{tab.label}</div>
                <div className="text-xs mt-0.5">{tab.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="px-4 py-5 space-y-4">
          {currentTab === "look" && (
            <>
              <Card className="p-5">
                <h3 className="font-bold mb-3">대표 메뉴</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "시그니처 라떼", price: "5,500원", emoji: "☕" },
                    { name: "수제 티라미수", price: "6,500원", emoji: "🍰" },
                    { name: "콜드브루", price: "5,000원", emoji: "🧊" },
                    { name: "크로플", price: "6,000원", emoji: "🧇" },
                  ].map((menu, i) => (
                    <div key={i} className="p-4 bg-accent/50 rounded-xl text-center">
                      <div className="text-4xl mb-2">{menu.emoji}</div>
                      <div className="font-bold text-sm mb-1">{menu.name}</div>
                      <div className="text-xs text-muted-foreground">{menu.price}</div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="font-bold mb-3">가게 정보</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-sm">서울 강남구 논현로 123</div>
                      <div className="text-xs text-muted-foreground mt-1">논현역 2번 출구 도보 3분</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-sm">평일 08:00 - 22:00</div>
                      <div className="text-xs text-muted-foreground mt-1">주말 10:00 - 20:00 (월요일 휴무)</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-sm">02-1234-5678</div>
                    </div>
                  </div>
                </div>
              </Card>
            </>
          )}

          {currentTab === "learn" && (
            <>
              {/* AI 성장 분석 위젯 */}
              <Card className="p-5 bg-gradient-to-br from-success/10 to-success/5 border-success/20">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-success" />
                  <h3 className="font-bold">AI 성장 분석</h3>
                </div>

                <div className="space-y-4">
                  {/* 서술형 지표 */}
                  <div className="p-3 bg-card/50 rounded-xl">
                    <div className="flex items-start gap-2 mb-2">
                      <div className="text-lg">📈</div>
                      <div className="flex-1">
                        <div className="text-sm font-bold mb-1">매출 성장세</div>
                        <div className="text-xs text-muted-foreground leading-relaxed">
                          지난 3개월간 꾸준한 성장세를 보이고 있으며, 매출 변동성이 낮아 안정적입니다.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-card/50 rounded-xl">
                    <div className="flex items-start gap-2 mb-2">
                      <div className="text-lg">💬</div>
                      <div className="flex-1">
                        <div className="text-sm font-bold mb-1">고객 만족도</div>
                        <div className="text-xs text-muted-foreground leading-relaxed">
                          재방문 고객 비율이 높으며, 리뷰 긍정도가 {sentiment.positive}%로 매우 우수합니다.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-card/50 rounded-xl">
                    <div className="flex items-start gap-2 mb-2">
                      <div className="text-lg">🌱</div>
                      <div className="flex-1">
                        <div className="text-sm font-bold mb-1">지역 기여도</div>
                        <div className="text-xs text-muted-foreground leading-relaxed">
                          로컬 원두 사용, 지역 고용 창출 등 ESG 실천으로 지역사회에 긍정적 영향을 주고 있습니다.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-card/50 rounded-xl">
                    <div className="flex items-start gap-2 mb-2">
                      <div className="text-lg">📱</div>
                      <div className="flex-1">
                        <div className="text-sm font-bold mb-1">온라인 입소문</div>
                        <div className="text-xs text-muted-foreground leading-relaxed">
                          SNS에서 자주 언급되며, 방문 후기가 활발하게 공유되고 있습니다.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-success/10 rounded-xl">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-success" />
                    <span className="text-xs font-bold text-success">
                      종합 평가: 지속 가능한 성장이 기대되는 가게입니다
                    </span>
                  </div>
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="font-bold mb-3">창업 스토리</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  "논현동에서 10년째 카페를 운영하고 있습니다. 처음엔 작은 테이크아웃 전문점으로 시작했지만, 
                  단골손님들의 사랑 덕분에 지금의 공간으로 확장할 수 있었어요. 매일 신선한 원두와 수제 베이커리로 
                  이웃분들을 맞이하는 게 가장 큰 보람입니다."
                </p>
                <div className="mt-4 p-3 bg-primary/5 rounded-lg">
                  <div className="text-xs text-primary font-medium mb-1">사장님 한마디</div>
                  <div className="text-sm">"논현동 주민들의 일상이 되는 카페가 되고 싶습니다 ☕"</div>
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="font-bold mb-3">로컬 연결성</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-accent/50 rounded-lg">
                    <div className="text-2xl">🌾</div>
                    <div className="flex-1">
                      <div className="font-bold text-sm mb-1">지역 농산물 사용</div>
                      <div className="text-xs text-muted-foreground">
                        경기도 양평 농협에서 공급받는 유기농 우유를 사용합니다
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-accent/50 rounded-lg">
                    <div className="text-2xl">🤝</div>
                    <div className="flex-1">
                      <div className="font-bold text-sm mb-1">동네 협업</div>
                      <div className="text-xs text-muted-foreground">
                        옆 동네 베이커리와 협업하여 신선한 빵을 매일 공급받습니다
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="font-bold mb-3">인터뷰 Q&A</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-bold mb-2 text-primary">Q. 가장 인기 있는 메뉴는?</div>
                    <div className="text-sm text-muted-foreground pl-4">
                      시그니처 라떼와 수제 티라미수가 단연 1위예요. 직접 만든 마스카포네 크림이 비결입니다.
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-bold mb-2 text-primary">Q. 추천하고 싶은 시간대는?</div>
                    <div className="text-sm text-muted-foreground pl-4">
                      오후 3-5시가 가장 여유로워요. 창가 자리에서 책 읽기 좋은 시간입니다.
                    </div>
                  </div>
                </div>
              </Card>
            </>
          )}

          {currentTab === "love" && (
            <>
              {/* Support Simulator */}
              <Card className="p-5 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <h3 className="font-bold mb-4">응원 시뮬레이터</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">응원금 선택</label>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {["10,000원", "30,000원", "50,000원"].map((amount) => (
                        <Button key={amount} variant="outline" size="sm" className="font-medium bg-transparent">
                          {amount}
                        </Button>
                      ))}
                    </div>
                    <input
                      type="number"
                      placeholder="직접 입력 (최소 10,000원)"
                      className="w-full px-4 py-3 bg-card border border-input rounded-lg text-sm"
                    />
                  </div>

                  <div className="p-4 bg-card rounded-lg space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">예치금</span>
                      <span className="font-bold">50,000원</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">예상 리워드 (17%)</span>
                      <span className="font-bold text-success">+8,500원</span>
                    </div>
                    <div className="h-px bg-border my-2" />
                    <div className="flex items-center justify-between">
                      <span className="font-bold">예상 총액</span>
                      <span className="text-lg font-bold text-primary">58,500원</span>
                    </div>
                  </div>

                  <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                    <p className="text-xs text-warning-foreground leading-relaxed">
                      <strong>안내:</strong> 예상 리워드는 현재 순위 기준이며, 실제 리워드는 챌린지 종료 후 최종 순위에
                      따라 달라질 수 있습니다. 비우승 시 예치금 100% 환급됩니다.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Support Comments */}
              <Card className="p-5">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  응원 메시지 (24)
                </h3>
                <div className="space-y-3">
                  {[
                    { user: "김*진", message: "매일 출근길에 들러요! 응원합니다 💪", time: "2시간 전" },
                    { user: "이*수", message: "커피 맛이 정말 좋아요. 우승 가즈아!", time: "5시간 전" },
                    { user: "박*영", message: "사장님 항상 친절하셔서 좋아요 ☕", time: "1일 전" },
                  ].map((comment, i) => (
                    <div key={i} className="p-3 bg-accent/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold">{comment.user}</span>
                        <span className="text-xs text-muted-foreground">{comment.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{comment.message}</p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-3 bg-transparent">
                  전체 메시지 보기
                </Button>
              </Card>

              {/* AI 감정 온도 */}
              <Card className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-chart-2" />
                  <h3 className="font-bold">AI 감정 분석</h3>
                </div>

                {/* 감정 온도계 */}
                <div className="mb-4 p-4 bg-gradient-to-r from-success/10 to-success/5 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">감정 온도</span>
                    <span className="text-2xl font-bold text-success">{sentiment.temperature}°C</span>
                  </div>
                  <div className="w-full bg-muted/30 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-success to-success/80 h-3 rounded-full transition-all"
                      style={{ width: `${sentiment.temperature}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    리뷰와 응원 메시지를 AI가 분석한 종합 긍정도입니다
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-success">긍정 😊</span>
                      <span className="font-bold">{sentiment.positive}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-success h-2 rounded-full" style={{ width: `${sentiment.positive}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">중립 😐</span>
                      <span className="font-bold">{sentiment.neutral}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-muted-foreground h-2 rounded-full" style={{ width: `${sentiment.neutral}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-destructive">부정 😔</span>
                      <span className="font-bold">{sentiment.negative}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-destructive h-2 rounded-full" style={{ width: `${sentiment.negative}%` }} />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-sm font-medium mb-2">응원 키워드 (AI 추출)</div>
                  <div className="flex flex-wrap gap-2">
                    {sentiment.keywords.slice(0, 8).map((item) => (
                      <Badge
                        key={item.word}
                        variant="outline"
                        className={`text-xs ${
                          item.sentiment === "positive"
                            ? "border-success/50 text-success"
                            : item.sentiment === "negative"
                              ? "border-destructive/50 text-destructive"
                              : ""
                        }`}
                      >
                        {item.word} ({item.count})
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>
      </main>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <div className="flex gap-3">
          <Button variant="outline" size="lg" className="flex-1 bg-transparent" onClick={handleFavoriteToggle}>
            <Heart className={`w-5 h-5 mr-2 ${isFavorited ? "fill-destructive text-destructive" : ""}`} />
            찜하기
          </Button>
          <Button
            size="lg"
            className="flex-1 bg-primary hover:bg-primary/90"
            onClick={() => setDepositDialogOpen(true)}
          >
            {isSupporting ? "응원 추가하기" : "지금 응원하기"}
          </Button>
        </div>
      </div>

      <DepositDialog
        open={depositDialogOpen}
        onOpenChange={setDepositDialogOpen}
        shopName="카페 로컬빈즈"
        shopEmoji="☕"
        onSuccess={handleSupportSuccess}
      />
    </div>
  )
}
