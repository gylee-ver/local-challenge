import { notFound } from "next/navigation"
import { ArrowLeft, MapPin, Calendar, Users, Trophy } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

// Mock data - replace with actual data fetching
const challenges = {
  "1": {
    id: "1",
    title: "강남 러닝 챌린지",
    description:
      "강남구 일대를 달리며 건강도 챙기고 지역 상권도 활성화하는 챌린지입니다. 매주 5km 이상 달리고 인증샷을 올려주세요!",
    fullDescription: `이 챌린지는 강남구 지역 상권 활성화와 건강한 라이프스타일을 동시에 추구합니다. 

**참여 방법:**
1. 매주 강남구 내에서 5km 이상 러닝
2. 러닝 앱 스크린샷과 함께 지역 상점 방문 인증
3. 주간 미션 완료 시 포인트 적립

**혜택:**
- 완주 시 10,000 포인트 지급
- 주간 우수 참여자 추가 보너스
- 지역 제휴 상점 할인 쿠폰`,
    category: "운동",
    location: "강남구",
    startDate: "2025-01-15",
    endDate: "2025-02-15",
    participants: 234,
    maxParticipants: 500,
    reward: 10000,
    difficulty: "중급",
    status: "진행중",
    image: "/people-running-in-gangnam-seoul.jpg",
    organizer: {
      name: "강남구청",
      avatar: "/gangnam-district-office-logo.jpg",
    },
    missions: [
      { id: 1, title: "첫 5km 달리기", completed: true },
      { id: 2, title: "지역 카페 방문", completed: true },
      { id: 3, title: "10km 달리기", completed: false },
      { id: 4, title: "친구와 함께 러닝", completed: false },
    ],
  },
  "2": {
    id: "2",
    title: "제로 웨이스트 챌린지",
    description: "일회용품 사용을 줄이고 환경을 보호하는 챌린지입니다.",
    fullDescription: `한 달 동안 일회용품 사용을 최소화하고 친환경 생활을 실천하는 챌린지입니다.

**참여 방법:**
1. 텀블러, 에코백 사용 인증
2. 재활용 및 분리수거 실천
3. 친환경 제품 구매 인증

**혜택:**
- 완주 시 15,000 포인트
- 친환경 제품 할인 쿠폰
- 우수 참여자 친환경 굿즈 증정`,
    category: "환경",
    location: "서울 전역",
    startDate: "2025-01-10",
    endDate: "2025-02-10",
    participants: 456,
    maxParticipants: 1000,
    reward: 15000,
    difficulty: "초급",
    status: "진행중",
    image: "/zero-waste-eco-friendly-lifestyle.jpg",
    organizer: {
      name: "서울시 환경국",
      avatar: "/seoul-environment-office-logo.jpg",
    },
    missions: [
      { id: 1, title: "텀블러 사용 5회", completed: false },
      { id: 2, title: "에코백 사용 10회", completed: false },
      { id: 3, title: "분리수거 인증", completed: false },
      { id: 4, title: "친환경 제품 구매", completed: false },
    ],
  },
}

export default function ChallengePage({
  params,
}: {
  params: { id: string }
}) {
  const challenge = challenges[params.id as keyof typeof challenges]

  if (!challenge) {
    notFound()
  }

  const progress = (challenge.participants / challenge.maxParticipants) * 100
  const completedMissions = challenge.missions.filter((m) => m.completed).length
  const missionProgress = (completedMissions / challenge.missions.length) * 100

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              돌아가기
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img src={challenge.image || "/placeholder.svg"} alt={challenge.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Title Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary">{challenge.category}</Badge>
            <Badge variant={challenge.status === "진행중" ? "default" : "outline"}>{challenge.status}</Badge>
            <Badge variant="outline">{challenge.difficulty}</Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{challenge.title}</h1>
          <p className="text-lg text-muted-foreground">{challenge.description}</p>
        </div>

        {/* Key Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">위치</span>
            </div>
            <p className="font-semibold">{challenge.location}</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">기간</span>
            </div>
            <p className="font-semibold text-sm">
              {new Date(challenge.startDate).toLocaleDateString("ko-KR", {
                month: "short",
                day: "numeric",
              })}{" "}
              ~{" "}
              {new Date(challenge.endDate).toLocaleDateString("ko-KR", {
                month: "short",
                day: "numeric",
              })}
            </p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Users className="h-4 w-4" />
              <span className="text-sm">참여자</span>
            </div>
            <p className="font-semibold">
              {challenge.participants}/{challenge.maxParticipants}
            </p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Trophy className="h-4 w-4" />
              <span className="text-sm">보상</span>
            </div>
            <p className="font-semibold text-primary">{challenge.reward.toLocaleString()}P</p>
          </Card>
        </div>

        {/* Participation Progress */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">참여 현황</h3>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2">
            {challenge.maxParticipants - challenge.participants}명 더 참여 가능
          </p>
        </Card>

        {/* Organizer */}
        <Card className="p-6 mb-8">
          <h3 className="font-semibold mb-4">주최자</h3>
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={challenge.organizer.avatar || "/placeholder.svg"} />
              <AvatarFallback>{challenge.organizer.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{challenge.organizer.name}</p>
              <p className="text-sm text-muted-foreground">공식 주최</p>
            </div>
          </div>
        </Card>

        {/* Full Description */}
        <Card className="p-6 mb-8">
          <h3 className="font-semibold mb-4">챌린지 상세</h3>
          <div className="prose prose-sm max-w-none text-foreground">
            {challenge.fullDescription.split("\n").map((line, i) => (
              <p key={i} className="mb-2 whitespace-pre-wrap">
                {line}
              </p>
            ))}
          </div>
        </Card>

        {/* Missions */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">미션 진행 상황</h3>
            <span className="text-sm text-muted-foreground">
              {completedMissions}/{challenge.missions.length} 완료
            </span>
          </div>
          <Progress value={missionProgress} className="h-2 mb-6" />
          <div className="space-y-3">
            {challenge.missions.map((mission) => (
              <div key={mission.id} className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                <div
                  className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                    mission.completed ? "bg-primary border-primary" : "border-muted-foreground"
                  }`}
                >
                  {mission.completed && (
                    <svg
                      className="h-3 w-3 text-primary-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className={mission.completed ? "text-muted-foreground line-through" : "font-medium"}>
                  {mission.title}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* CTA Button */}
        <div className="sticky bottom-0 bg-background border-t py-4 -mx-4 px-4">
          <Button size="lg" className="w-full">
            챌린지 참여하기
          </Button>
        </div>
      </div>
    </div>
  )
}
