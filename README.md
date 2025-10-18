# NH 로컬챌린지 (NH Local Challenge)

> "지역이 키운다, 청년이 만든다."

지역 청년 창업가를 응원하고 리워드를 받는 커뮤니티 기반 플랫폼

## 🎯 프로젝트 개요

NH 로컬챌린지는 지역 소상공인과 소비자를 연결하여, 월간 리그를 통해 우리 동네 가게를 응원하고 함께 성장하는 서비스입니다.

### 주요 기능

- **월간 리그 시스템**: 지역별로 10개 청년 창업 가게가 참여하는 월간 경쟁
- **응원 예치**: 5,000원부터 시작하는 소액 예치로 가게 응원
- **가변 리워드**: 6~20% 리워드 (성과보너스 + 참여보너스)
- **AI 분석**: 성장점수, 감정분석, 키워드 추출
- **지역 선택**: 강남구, 순천시, 공주시, 안동시, 진주시 등
- **리그 아카이브**: 과거 우승 가게 스토리

## 🚀 기술 스택

- **Framework**: Next.js 15.2.4 (App Router)
- **Runtime**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4.1
- **UI Components**: Radix UI + Shadcn UI
- **State Management**: React Context API
- **Analytics**: Vercel Analytics

## 📦 설치 및 실행

### 요구사항

- Node.js 18 이상
- pnpm (권장) 또는 npm

### 로컬 개발

```bash
# 의존성 설치
pnpm install

# 개발 서버 시작
pnpm dev

# 브라우저에서 열기
# http://localhost:3000
```

### 빌드

```bash
# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start
```

## 📁 프로젝트 구조

```
/app
  /league          # 리그 랭킹
    /archive       # 리그 아카이브
  /map             # 가게 지도
  /my-support      # 내 응원 내역
  /shop/[id]       # 가게 상세
  /challenges/[id] # 챌린지 상세
/components
  /ui              # Shadcn UI 컴포넌트
  charge-dialog.tsx       # 포인트 충전
  deposit-dialog.tsx      # 응원 예치
  intro-video.tsx         # 인트로 영상
  region-selector-dialog.tsx # 지역 선택
/lib
  wallet-context.tsx      # 지갑 상태 관리
  league-context.tsx      # 리그 상태 관리
  reward-calculator.ts    # 리워드 계산
  ai-scoring.ts           # AI 점수 계산
```

## 🎨 주요 기능

### 1. 포인트 지갑 시스템
- 최소 5,000원부터 최대 500,000원까지 충전
- 사용가능/예치중(잠금)/총 포인트 관리
- 리그 종료 시 자동 정산

### 2. 리워드 계산 공식
```
총 리워드 = 기본 5% + 성과보너스(최대 10%) + 참여보너스(최대 5%)
         = 6~20%
```

### 3. AI 로컬 성장 점수
- 매출 안정성 (20점)
- 고객 재방문율 (20점)
- 리뷰 감성 점수 (20점)
- SNS 언급량 (15점)
- 응원 포인트 (15점)
- ESG 지표 (10점)

## 🌐 Vercel 배포

### 배포 방법

1. [Vercel](https://vercel.com)에 로그인
2. "Import Project" 선택
3. GitHub 저장소 `gylee-ver/local-challenge` 연결
4. 자동 감지된 설정 확인:
   - Framework Preset: Next.js
   - Build Command: `pnpm build`
   - Output Directory: `.next`
5. "Deploy" 클릭

### 환경 변수 (추후 필요 시)

Vercel 대시보드에서 설정:
- `NEXT_PUBLIC_APP_URL`: 배포된 앱 URL
- 지도 API 키 (추후 연동 시)
- 백엔드 API URL (추후 연동 시)

## 📱 브라우저 지원

- Chrome/Edge (최신 버전)
- Safari (최신 버전)
- Firefox (최신 버전)
- 모바일 브라우저 (iOS Safari, Chrome Android)

## 🔧 개발 참고사항

### TypeScript 빌드 에러 무시
현재 `next.config.mjs`에서 `ignoreBuildErrors: true` 설정됨.
프로덕션 배포 전 타입 안정성 점검 권장.

### 이미지 최적화
현재 `images.unoptimized: true` 설정됨.
실제 배포 시 Next.js Image 최적화 사용 권장.

## 📄 라이선스

Private - NH 농협은행

## 🤝 기여

내부 프로젝트로, 외부 기여는 받지 않습니다.

---

**개발**: NH 디지털금융부  
**문의**: local-challenge@nh.com

