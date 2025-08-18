# Google Analytics & AdSense 빠른 시작 가이드

## 프로젝트 설정

### 1. 환경 변수 설정
`.env` 파일 생성:
```env
# Google Analytics
VITE_GA_MEASUREMENT_ID=G-YOUR_MEASUREMENT_ID

# Google AdSense
VITE_ADSENSE_CLIENT_ID=ca-pub-YOUR_PUBLISHER_ID
VITE_ADSENSE_SLOT_DISPLAY=YOUR_DISPLAY_SLOT
VITE_ADSENSE_SLOT_INFEED=YOUR_INFEED_SLOT
```

### 2. 프로젝트 실행
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## Google Analytics 특징

✅ **로컬 개발 환경에서 즉시 작동**
- localhost에서도 데이터 수집 가능
- 실시간 리포트로 즉시 확인
- 디버그 모드 자동 활성화

### 추적되는 주요 이벤트
- 페이지뷰 (자동)
- 뉴스 클릭
- 광고 클릭
- 스크롤 깊이 (25%, 50%, 75%, 100%)
- 페이지 체류 시간
- 카테고리 변경

### 확인 방법
1. [Google Analytics](https://analytics.google.com) 접속
2. 실시간 > 이벤트 메뉴 확인
3. 로컬에서 액션 수행 시 즉시 표시

## Google AdSense 특징

❌ **배포 필수**
- 실제 도메인 필요
- HTTPS 필수
- 도메인 승인 후 광고 표시

### 빠른 배포 (Vercel)
```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel --prod
```

### 개발 중 확인
- 플레이스홀더로 광고 위치 확인
- 반응형 레이아웃 테스트
- 광고 간격 조정

## 주요 파일 구조

```
src/
├── components/
│   └── AdBanner.jsx          # 광고 컴포넌트
├── hooks/
│   ├── useAdSense.js         # AdSense 훅
│   └── useAnalytics.js       # Analytics 훅
├── utils/
│   └── analytics.js          # GA 유틸리티
├── pages/
│   └── TopNews3.jsx          # 광고 통합 페이지
└── App.jsx                   # GA 초기화
```

## 다음 단계

1. **Google Analytics**
   - 계정 생성 → 측정 ID 획득
   - `.env` 파일에 ID 입력
   - 로컬에서 바로 테스트

2. **Google AdSense**
   - Vercel/Netlify 배포
   - AdSense 계정 신청
   - 도메인 승인 대기 (1-14일)

자세한 내용은 `GA_GUIDE.md`와 `ADSENSE_GUIDE.md` 참조
