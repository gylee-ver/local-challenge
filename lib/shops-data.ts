export interface Shop {
  id: number
  name: string
  category: string
  address: string
  distance: number
  supporters: number
  amount: number
  emoji: string
  lat?: number
  lng?: number
  theme: {
    label: string
    emoji: string
    color: string
  }
  story: string
  status: "popular" | "growing" | "needSupport"
  phone: string
  hours: {
    weekday: string
    weekend: string
    closed: string
  }
  description: string
  ownerQuote: string
  menu: Array<{
    name: string
    price: string
    emoji: string
  }>
  localConnection: Array<{
    title: string
    description: string
    emoji: string
  }>
  interview: Array<{
    question: string
    answer: string
  }>
}

export const shops: Shop[] = [
  {
    id: 1,
    name: "카페 온더코너",
    category: "카페·디저트",
    address: "서울 강남구 논현로 123",
    distance: 250,
    supporters: 156,
    amount: 842000,
    emoji: "☕",
    lat: 37.5012,
    lng: 127.0396,
    theme: { label: "지속가능", emoji: "💚", color: "success" },
    story: "논현동에서 10년째 로컬 원두로 따뜻한 커피를 전합니다",
    status: "popular",
    phone: "02-1234-5678",
    hours: {
      weekday: "평일 08:00 - 22:00",
      weekend: "주말 10:00 - 20:00",
      closed: "월요일 휴무",
    },
    description: "논현동에서 오랜 시간 사랑받은 동네 카페",
    ownerQuote: "논현동 주민들의 일상이 되는 카페가 되고 싶습니다 ☕",
    menu: [
      { name: "시그니처 라떼", price: "5,500원", emoji: "☕" },
      { name: "수제 티라미수", price: "6,500원", emoji: "🍰" },
      { name: "콜드브루", price: "5,000원", emoji: "🧊" },
      { name: "크로플", price: "6,000원", emoji: "🧇" },
    ],
    localConnection: [
      {
        title: "지역 농산물 사용",
        description: "경기도 양평 농협에서 공급받는 유기농 우유를 사용합니다",
        emoji: "🌾",
      },
      {
        title: "동네 협업",
        description: "옆 동네 베이커리와 협업하여 신선한 빵을 매일 공급받습니다",
        emoji: "🤝",
      },
    ],
    interview: [
      {
        question: "가장 인기 있는 메뉴는?",
        answer: "시그니처 라떼와 수제 티라미수가 단연 1위예요. 직접 만든 마스카포네 크림이 비결입니다.",
      },
      {
        question: "추천하고 싶은 시간대는?",
        answer: "오후 3-5시가 가장 여유로워요. 창가 자리에서 책 읽기 좋은 시간입니다.",
      },
    ],
  },
  {
    id: 2,
    name: "라멘야쿠모",
    category: "일식·라멘",
    address: "서울 강남구 역삼동 456",
    distance: 380,
    supporters: 142,
    amount: 756000,
    emoji: "🍜",
    lat: 37.5002,
    lng: 127.0386,
    theme: { label: "스태프 픽", emoji: "🌟", color: "primary" },
    story: "정통 일본식 라멘과 지역 농산물이 만나는 곳",
    status: "popular",
    phone: "02-2345-6789",
    hours: {
      weekday: "평일 11:00 - 21:30",
      weekend: "주말 11:00 - 21:00",
      closed: "매주 화요일 휴무",
    },
    description: "역삼동에서 정통 일본식 라멘을 선보이는 맛집",
    ownerQuote: "진한 육수와 쫄깃한 면발로 행복을 전합니다 🍜",
    menu: [
      { name: "돈코츠 라멘", price: "9,500원", emoji: "🍜" },
      { name: "미소 라멘", price: "9,000원", emoji: "🍲" },
      { name: "차슈동", price: "8,500원", emoji: "🍚" },
      { name: "교자", price: "5,000원", emoji: "🥟" },
    ],
    localConnection: [
      {
        title: "국내산 재료",
        description: "국내산 돼지고기와 닭고기만을 사용합니다",
        emoji: "🇰🇷",
      },
      {
        title: "지역 농가 협력",
        description: "강남 인근 농가에서 매일 아침 신선한 야채를 공급받습니다",
        emoji: "🥬",
      },
    ],
    interview: [
      {
        question: "라멘의 비법은 무엇인가요?",
        answer: "12시간 이상 끓인 진한 육수가 비결입니다. 매일 새벽부터 준비해요.",
      },
      {
        question: "일본에서 배우셨나요?",
        answer: "일본 후쿠오카에서 3년간 수련한 후 한국에서 개업했습니다.",
      },
    ],
  },
  {
    id: 3,
    name: "한신포차 강남점",
    category: "한식·포차",
    address: "서울 강남구 테헤란로 789",
    distance: 520,
    supporters: 98,
    amount: 523000,
    emoji: "🍻",
    lat: 37.4992,
    lng: 127.0406,
    theme: { label: "응원 급증", emoji: "🔥", color: "warning" },
    story: "퇴근 후 동네 사람들이 모이는 따뜻한 공간",
    status: "growing",
    phone: "02-3456-7890",
    hours: {
      weekday: "평일 17:00 - 02:00",
      weekend: "주말 17:00 - 02:00",
      closed: "연중무휴",
    },
    description: "직장인들의 퇴근 후 힐링 공간",
    ownerQuote: "한 잔의 술과 따뜻한 안주로 하루의 피로를 풀어드립니다 🍻",
    menu: [
      { name: "부대찌개", price: "9,000원", emoji: "🍲" },
      { name: "김치전", price: "12,000원", emoji: "🥘" },
      { name: "해물파전", price: "15,000원", emoji: "🦐" },
      { name: "닭발", price: "16,000원", emoji: "🍗" },
    ],
    localConnection: [
      {
        title: "로컬 술집",
        description: "강남 지역 직장인들의 단골 포차로 자리잡았습니다",
        emoji: "👔",
      },
      {
        title: "신선한 안주",
        description: "매일 아침 강남시장에서 신선한 재료를 구매합니다",
        emoji: "🛒",
      },
    ],
    interview: [
      {
        question: "가장 인기 있는 안주는?",
        answer: "김치전과 해물파전이 인기 메뉴입니다. 바삭하고 속은 촉촉해요.",
      },
      {
        question: "단골손님들이 많은 이유는?",
        answer: "편안한 분위기와 푸짐한 안주 때문인 것 같아요. 집처럼 편하게 와주세요.",
      },
    ],
  },
  {
    id: 4,
    name: "더그린테이블",
    category: "샐러드·브런치",
    address: "서울 강남구 청담동 321",
    distance: 680,
    supporters: 89,
    amount: 487000,
    emoji: "🥗",
    lat: 37.5022,
    lng: 127.0376,
    theme: { label: "건강한 식탁", emoji: "🥗", color: "success" },
    story: "유기농 채소로 만드는 건강한 한 끼",
    status: "popular",
    phone: "02-4567-8901",
    hours: {
      weekday: "평일 09:00 - 21:00",
      weekend: "주말 10:00 - 20:00",
      closed: "둘째, 넷째 월요일 휴무",
    },
    description: "건강을 생각하는 샐러드 전문점",
    ownerQuote: "건강한 한 끼로 여러분의 일상을 응원합니다 🥗",
    menu: [
      { name: "시저 샐러드", price: "11,000원", emoji: "🥗" },
      { name: "그릴 치킨 샐러드", price: "13,000원", emoji: "🍗" },
      { name: "연어 포케볼", price: "14,500원", emoji: "🐟" },
      { name: "아보카도 토스트", price: "9,500원", emoji: "🥑" },
    ],
    localConnection: [
      {
        title: "유기농 채소",
        description: "경기도 일대의 유기농 농장에서 매일 신선한 채소를 공급받습니다",
        emoji: "🌱",
      },
      {
        title: "친환경 포장",
        description: "모든 포장재는 생분해성 친환경 소재를 사용합니다",
        emoji: "♻️",
      },
    ],
    interview: [
      {
        question: "가장 신경쓰는 부분은?",
        answer: "신선도입니다. 매일 아침 직접 농장을 방문해 채소를 선별합니다.",
      },
      {
        question: "건강식을 시작하게 된 계기는?",
        answer: "제 자신이 건강을 되찾은 경험을 많은 분들과 나누고 싶었어요.",
      },
    ],
  },
  {
    id: 5,
    name: "미스터피자 삼성점",
    category: "양식·피자",
    address: "서울 강남구 삼성동 654",
    distance: 750,
    supporters: 76,
    amount: 412000,
    emoji: "🍕",
    lat: 37.4982,
    lng: 127.0416,
    theme: { label: "가족 친화", emoji: "👨‍👩‍👧", color: "primary" },
    story: "가족 단위 고객들의 단골 피자집",
    status: "popular",
    phone: "02-5678-9012",
    hours: {
      weekday: "평일 11:00 - 22:00",
      weekend: "주말 11:00 - 22:00",
      closed: "연중무휴",
    },
    description: "가족이 함께 즐기는 프리미엄 피자",
    ownerQuote: "가족의 행복한 식사 시간을 책임집니다 🍕",
    menu: [
      { name: "불고기 피자", price: "19,000원", emoji: "🍕" },
      { name: "페퍼로니 피자", price: "18,000원", emoji: "🍕" },
      { name: "치즈 크러스트", price: "21,000원", emoji: "🧀" },
      { name: "감자튀김", price: "5,000원", emoji: "🍟" },
    ],
    localConnection: [
      {
        title: "가족 친화 공간",
        description: "어린이 놀이방과 키즈 메뉴를 제공합니다",
        emoji: "👶",
      },
      {
        title: "지역 행사 참여",
        description: "매월 지역 아동센터에 피자를 기부하고 있습니다",
        emoji: "🎁",
      },
    ],
    interview: [
      {
        question: "인기 메뉴는 무엇인가요?",
        answer: "불고기 피자가 압도적 1위입니다. 한국인 입맛에 딱 맞아요.",
      },
      {
        question: "가족 단위 고객이 많은 이유는?",
        answer: "어린이들이 안전하게 놀 수 있는 공간이 있어서 부모님들이 편하게 식사하실 수 있어요.",
      },
    ],
  },
  {
    id: 6,
    name: "봉추찜닭 강남점",
    category: "한식·찜닭",
    address: "서울 강남구 강남대로 258",
    distance: 820,
    supporters: 71,
    amount: 398000,
    emoji: "🍗",
    lat: 37.4988,
    lng: 127.0428,
    theme: { label: "응원 필요", emoji: "💪", color: "chart-2" },
    story: "푸짐한 한 끼로 지역 주민을 행복하게",
    status: "needSupport",
    phone: "02-6789-0123",
    hours: {
      weekday: "평일 11:00 - 22:00",
      weekend: "주말 11:00 - 22:00",
      closed: "연중무휴",
    },
    description: "매콤달콤 중독성 있는 찜닭 전문점",
    ownerQuote: "한 그릇에 담긴 정성으로 마음까지 따뜻하게 🍗",
    menu: [
      { name: "봉추찜닭 (중)", price: "22,000원", emoji: "🍗" },
      { name: "봉추찜닭 (대)", price: "28,000원", emoji: "🍗" },
      { name: "치즈찜닭", price: "25,000원", emoji: "🧀" },
      { name: "밥 추가", price: "1,000원", emoji: "🍚" },
    ],
    localConnection: [
      {
        title: "국내산 닭고기",
        description: "100% 국내산 닭고기만을 사용합니다",
        emoji: "🐔",
      },
      {
        title: "푸짐한 양",
        description: "혼자 먹기엔 많고, 둘이 먹기 딱 좋은 푸짐한 양",
        emoji: "🍽️",
      },
    ],
    interview: [
      {
        question: "찜닭의 비법이 있나요?",
        answer: "직접 만든 특제 소스가 비결입니다. 달콤하면서도 깊은 맛이 나요.",
      },
      {
        question: "주문이 많은 시간은?",
        answer: "저녁 6시부터 8시까지가 피크타임입니다. 예약을 추천드려요.",
      },
    ],
  },
  {
    id: 7,
    name: "카페드림",
    category: "카페·디저트",
    address: "서울 강남구 신사동 147",
    distance: 950,
    supporters: 64,
    amount: 356000,
    emoji: "☕",
    lat: 37.5035,
    lng: 127.0355,
    theme: { label: "신규 오픈", emoji: "✨", color: "primary" },
    story: "신사동에 새로 오픈한 감성 카페",
    status: "growing",
    phone: "02-7890-1234",
    hours: {
      weekday: "평일 10:00 - 22:00",
      weekend: "주말 10:00 - 23:00",
      closed: "연중무휴",
    },
    description: "감성 가득한 인테리어와 맛있는 커피",
    ownerQuote: "커피 한 잔에 담긴 여유와 힐링 ☕",
    menu: [
      { name: "카페 라떼", price: "5,000원", emoji: "☕" },
      { name: "아인슈페너", price: "6,000원", emoji: "☕" },
      { name: "말차 라떼", price: "6,500원", emoji: "🍵" },
      { name: "치즈케이크", price: "7,000원", emoji: "🍰" },
    ],
    localConnection: [
      {
        title: "감성 공간",
        description: "인스타그램에서 핫한 포토존이 있는 감성 카페",
        emoji: "📸",
      },
      {
        title: "청년 창업",
        description: "20대 청년 사장님이 운영하는 신생 카페입니다",
        emoji: "💼",
      },
    ],
    interview: [
      {
        question: "카페를 오픈하게 된 계기는?",
        answer: "바리스타로 5년 일하며 꿈꿔온 제 공간을 만들었어요.",
      },
      {
        question: "특별히 신경쓰는 부분은?",
        answer: "원두 선택과 추출 온도에 가장 신경씁니다. 매일 테스트해요.",
      },
    ],
  },
  {
    id: 8,
    name: "본죽 역삼점",
    category: "한식·죽",
    address: "서울 강남구 역삼로 369",
    distance: 450,
    supporters: 58,
    amount: 312000,
    emoji: "🥣",
    lat: 37.5008,
    lng: 127.0395,
    theme: { label: "건강 밥상", emoji: "🌾", color: "success" },
    story: "바쁜 직장인들의 건강한 한 끼",
    status: "needSupport",
    phone: "02-8901-2345",
    hours: {
      weekday: "평일 07:00 - 21:00",
      weekend: "주말 08:00 - 20:00",
      closed: "연중무휴",
    },
    description: "건강을 생각하는 영양 가득 죽 전문점",
    ownerQuote: "따뜻한 한 그릇으로 하루를 시작하세요 🥣",
    menu: [
      { name: "전복죽", price: "8,500원", emoji: "🦞" },
      { name: "야채죽", price: "6,500원", emoji: "🥬" },
      { name: "단호박죽", price: "7,000원", emoji: "🎃" },
      { name: "흑임자죽", price: "6,500원", emoji: "🥣" },
    ],
    localConnection: [
      {
        title: "아침 메뉴",
        description: "아침 7시부터 오픈하여 출근하는 직장인들의 아침을 책임집니다",
        emoji: "🌅",
      },
      {
        title: "건강식",
        description: "소화가 잘 되고 영양 가득한 죽으로 건강을 지킵니다",
        emoji: "💚",
      },
    ],
    interview: [
      {
        question: "가장 인기 있는 메뉴는?",
        answer: "전복죽이 압도적으로 인기가 많습니다. 전복이 통으로 들어가요.",
      },
      {
        question: "새벽 일찍 여는 이유는?",
        answer: "바쁜 아침에 간편하게 든든한 한 끼를 드실 수 있도록 하기 위해서예요.",
      },
    ],
  },
  {
    id: 9,
    name: "피자스쿨 대치점",
    category: "양식·피자",
    address: "서울 강남구 대치동 892",
    distance: 1100,
    supporters: 52,
    amount: 287000,
    emoji: "🍕",
    lat: 37.4955,
    lng: 127.0625,
    theme: { label: "응원 필요", emoji: "💪", color: "chart-2" },
    story: "학생들과 함께 성장하는 동네 피자집",
    status: "needSupport",
    phone: "02-9012-3456",
    hours: {
      weekday: "평일 11:00 - 22:00",
      weekend: "주말 11:00 - 22:00",
      closed: "연중무휴",
    },
    description: "가성비 좋은 학생들의 피자 맛집",
    ownerQuote: "저렴한 가격에 맛있는 피자를! 🍕",
    menu: [
      { name: "콤비네이션", price: "12,900원", emoji: "🍕" },
      { name: "불고기", price: "12,900원", emoji: "🍕" },
      { name: "포테이토", price: "11,900원", emoji: "🥔" },
      { name: "콜라 (1.5L)", price: "2,000원", emoji: "🥤" },
    ],
    localConnection: [
      {
        title: "학생 할인",
        description: "학생증 제시 시 10% 할인 혜택을 제공합니다",
        emoji: "🎓",
      },
      {
        title: "가성비",
        description: "저렴한 가격으로 맛있는 피자를 제공합니다",
        emoji: "💰",
      },
    ],
    interview: [
      {
        question: "학생들에게 인기가 많은 이유는?",
        answer: "가성비가 좋고, 양도 푸짐해서 학생들이 많이 찾아주세요.",
      },
      {
        question: "추천 메뉴는?",
        answer: "콤비네이션 피자가 가장 인기 있습니다. 다양한 토핑이 들어가 있어요.",
      },
    ],
  },
  {
    id: 10,
    name: "맘스터치 강남역점",
    category: "패스트푸드·버거",
    address: "서울 강남구 강남대로 428",
    distance: 600,
    supporters: 47,
    amount: 245000,
    emoji: "🍔",
    lat: 37.4979,
    lng: 127.0276,
    theme: { label: "첫 응원", emoji: "❤️", color: "destructive" },
    story: "따뜻한 첫 응원이 필요합니다",
    status: "needSupport",
    phone: "02-0123-4567",
    hours: {
      weekday: "평일 10:00 - 23:00",
      weekend: "주말 10:00 - 23:00",
      closed: "연중무휴",
    },
    description: "프리미엄 국내산 치킨버거 전문점",
    ownerQuote: "국내산 치킨으로 만든 프리미엄 버거 🍔",
    menu: [
      { name: "싸이버거", price: "4,500원", emoji: "🍔" },
      { name: "언빌리버블버거", price: "6,300원", emoji: "🍔" },
      { name: "치킨너겟", price: "3,500원", emoji: "🍗" },
      { name: "케이준 감자튀김", price: "2,000원", emoji: "🍟" },
    ],
    localConnection: [
      {
        title: "국내산 닭고기",
        description: "100% 국내산 닭가슴살을 사용합니다",
        emoji: "🐔",
      },
      {
        title: "빠른 서비스",
        description: "바쁜 직장인들을 위한 빠른 주문 시스템",
        emoji: "⚡",
      },
    ],
    interview: [
      {
        question: "맘스터치만의 특징은?",
        answer: "100% 국내산 닭고기를 사용하고, 주문 후 바로 조리해서 신선해요.",
      },
      {
        question: "가장 인기 있는 메뉴는?",
        answer: "싸이버거가 가장 인기 있고, 언빌리버블버거도 많이 찾으세요.",
      },
    ],
  },
]

export function getShopById(id: number): Shop | undefined {
  return shops.find((shop) => shop.id === id)
}

export function getAllShops(): Shop[] {
  return shops
}

