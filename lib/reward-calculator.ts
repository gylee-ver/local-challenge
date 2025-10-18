/**
 * NH 로컬챌린지 리워드 계산 유틸리티
 * 기획안: 기본 5% + 성과보너스(최대 10%) + 참여보너스(최대 5%) = 6~20%
 */

export interface RewardCalculationParams {
  depositAmount: number
  performanceIncrease: number // 전월 대비 결제액 증가율 (%)
  participationRate: number // 목표 대비 참여율 (%)
}

export interface RewardResult {
  baseReward: number
  performanceBonus: number
  participationBonus: number
  totalRewardAmount: number
  totalRewardRate: number
  breakdown: {
    baseRate: number
    performanceBonusRate: number
    participationBonusRate: number
  }
}

/**
 * 성과보너스 계산
 * 결제액 증가율에 따라 1~10% 추가
 */
function calculatePerformanceBonus(performanceIncrease: number): number {
  if (performanceIncrease >= 50) return 10
  if (performanceIncrease >= 30) return 7
  if (performanceIncrease >= 10) return 4
  if (performanceIncrease > 0) return 1
  return 0
}

/**
 * 참여보너스 계산
 * 목표 대비 참여율에 따라 0~5% 추가
 */
function calculateParticipationBonus(participationRate: number): number {
  if (participationRate >= 200) return 5
  if (participationRate >= 150) return 3
  if (participationRate >= 120) return 1
  return 0
}

/**
 * 전체 리워드 계산
 */
export function calculateReward(params: RewardCalculationParams): RewardResult {
  const { depositAmount, performanceIncrease, participationRate } = params

  // 기본 리워드 (5%)
  const baseRate = 5
  const baseReward = Math.floor(depositAmount * (baseRate / 100))

  // 성과보너스
  const performanceBonusRate = calculatePerformanceBonus(performanceIncrease)
  const performanceBonus = Math.floor(depositAmount * (performanceBonusRate / 100))

  // 참여보너스
  const participationBonusRate = calculateParticipationBonus(participationRate)
  const participationBonus = Math.floor(depositAmount * (participationBonusRate / 100))

  // 총 리워드
  const totalRewardAmount = baseReward + performanceBonus + participationBonus
  const totalRewardRate = baseRate + performanceBonusRate + participationBonusRate

  return {
    baseReward,
    performanceBonus,
    participationBonus,
    totalRewardAmount,
    totalRewardRate,
    breakdown: {
      baseRate,
      performanceBonusRate,
      participationBonusRate,
    },
  }
}

/**
 * 예상 리워드 범위 계산 (최소~최대)
 */
export function calculateRewardRange(depositAmount: number): {
  min: number
  max: number
  minRate: number
  maxRate: number
} {
  // 최소: 기본 5% + 성과 1% = 6%
  const minRate = 6
  const min = Math.floor(depositAmount * (minRate / 100))

  // 최대: 기본 5% + 성과 10% + 참여 5% = 20%
  const maxRate = 20
  const max = Math.floor(depositAmount * (maxRate / 100))

  return { min, max, minRate, maxRate }
}

