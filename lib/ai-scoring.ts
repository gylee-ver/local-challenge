/**
 * AI 로컬 성장 점수 계산 유틸리티
 * 실제로는 백엔드 AI 서비스와 연동되어야 하지만, 프론트엔드 시뮬레이션 제공
 */

export interface LocalGrowthScore {
  totalScore: number // 0-100
  breakdown: {
    salesStability: number // 매출 안정성 (0-20)
    customerRetention: number // 고객 재방문률 (0-20)
    reviewSentiment: number // 리뷰 감성 점수 (0-20)
    socialMentions: number // SNS 언급량 (0-15)
    supportPoints: number // 응원 포인트 (0-15)
    esgScore: number // ESG 지표 (0-10)
  }
  grade: "S" | "A" | "B" | "C" | "D"
  trend: "rising" | "stable" | "declining"
}

export interface SentimentAnalysis {
  positive: number // 긍정 비율 (%)
  neutral: number // 중립 비율 (%)
  negative: number // 부정 비율 (%)
  keywords: { word: string; count: number; sentiment: "positive" | "neutral" | "negative" }[]
  temperature: number // 감정 온도 (0-100)
}

/**
 * 로컬 성장 점수 계산
 */
export function calculateLocalGrowthScore(shopId: string): LocalGrowthScore {
  // 실제로는 API 호출 또는 ML 모델 사용
  // 여기서는 시뮬레이션
  const breakdown = {
    salesStability: Math.floor(Math.random() * 5) + 16, // 16-20
    customerRetention: Math.floor(Math.random() * 5) + 16, // 16-20
    reviewSentiment: Math.floor(Math.random() * 4) + 17, // 17-20
    socialMentions: Math.floor(Math.random() * 4) + 12, // 12-15
    supportPoints: Math.floor(Math.random() * 4) + 12, // 12-15
    esgScore: Math.floor(Math.random() * 3) + 8, // 8-10
  }

  const totalScore = Object.values(breakdown).reduce((sum, val) => sum + val, 0)

  let grade: "S" | "A" | "B" | "C" | "D" = "C"
  if (totalScore >= 90) grade = "S"
  else if (totalScore >= 80) grade = "A"
  else if (totalScore >= 70) grade = "B"
  else if (totalScore >= 60) grade = "C"
  else grade = "D"

  const trend: "rising" | "stable" | "declining" =
    totalScore >= 85 ? "rising" : totalScore >= 70 ? "stable" : "declining"

  return {
    totalScore,
    breakdown,
    grade,
    trend,
  }
}

/**
 * 감정 분석 (리뷰, 응원 메시지 등)
 */
export function analyzeSentiment(shopId: string): SentimentAnalysis {
  // 실제로는 NLP 모델 사용
  // 여기서는 시뮬레이션
  const positive = Math.floor(Math.random() * 10) + 85 // 85-94%
  const negative = Math.floor(Math.random() * 5) + 2 // 2-6%
  const neutral = 100 - positive - negative

  const keywords = [
    { word: "맛있어요", count: 45, sentiment: "positive" as const },
    { word: "친절해요", count: 38, sentiment: "positive" as const },
    { word: "분위기좋아요", count: 32, sentiment: "positive" as const },
    { word: "재방문의사", count: 28, sentiment: "positive" as const },
    { word: "가성비", count: 25, sentiment: "positive" as const },
    { word: "따뜻함", count: 22, sentiment: "positive" as const },
    { word: "정성", count: 18, sentiment: "positive" as const },
    { word: "응원합니다", count: 52, sentiment: "positive" as const },
  ].sort((a, b) => b.count - a.count)

  const temperature = positive // 긍정 비율을 온도로 사용

  return {
    positive,
    neutral,
    negative,
    keywords,
    temperature,
  }
}

/**
 * 성장 점수에 따른 색상 반환
 */
export function getScoreColor(score: number): string {
  if (score >= 90) return "text-primary"
  if (score >= 80) return "text-success"
  if (score >= 70) return "text-chart-2"
  if (score >= 60) return "text-warning"
  return "text-destructive"
}

/**
 * 성장 점수에 따른 배경색 반환
 */
export function getScoreBgColor(score: number): string {
  if (score >= 90) return "bg-primary/10"
  if (score >= 80) return "bg-success/10"
  if (score >= 70) return "bg-chart-2/10"
  if (score >= 60) return "bg-warning/10"
  return "bg-destructive/10"
}

