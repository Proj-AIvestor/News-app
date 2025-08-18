# 📰 News App

React 기반의 현대적인 뉴스 애플리케이션으로, 실시간 뉴스 조회, 기업별 뉴스 분석, 그리고 개인화된 뉴스레터 서비스를 제공합니다.

## 🚀 주요 기능

### 📊 톱뉴스 (Top News)
- **주제별 뉴스 분류**: 경제, 기술, 정치 등 카테고리별 뉴스 제공
- **카드형 뉴스 인터페이스**: 직관적이고 반응형 디자인
- **실시간 업데이트**: 최신 뉴스 자동 갱신

### 🏢 기업뉴스 (Company News)
- **기업별 맞춤 뉴스**: 특정 기업 관련 뉴스 모음
- **주식 정보 연동**: 기업 주가 및 기본 정보 표시
- **관련 기업 추천**: 연관 기업 뉴스 제안

### 📄 뉴스 상세
- **풍부한 콘텐츠**: 원문, 요약, 관련 기업 정보
- **소셜 공유**: 다양한 플랫폼 공유 기능
- **관련 기사 추천**: AI 기반 유사 기사 제안

### 📬 뉴스레터 구독
- **개인화된 뉴스레터**: 관심 분야 맞춤 구독
- **이메일 알림**: 정기적인 뉴스 요약 발송

## 🛠 기술 스택

### Frontend
- **React 19.1.0**: 최신 React 기능 활용
- **Vite**: 빠른 개발 환경 및 빌드
- **React Router DOM**: SPA 라우팅
- **Tailwind CSS**: 유틸리티 기반 스타일링

### HTTP & Data
- **Axios**: HTTP 클라이언트
- **RESTful API**: 백엔드 API 통신

### Analytics & Monetization
- **Google Analytics 4**: 사용자 행동 분석
- **Google AdSense**: 광고 수익화
- **커스텀 이벤트 추적**: 뉴스 클릭, 스크롤 등

## 📁 프로젝트 구조

```
src/
├── apis/                    # API 서비스
│   ├── axiosInstance.js     # Axios 설정
│   ├── cardnews/           # 카드뉴스 API
│   ├── companyNews/        # 기업뉴스 API
│   ├── newsDetail/         # 뉴스상세 API
│   └── newsLetterSubscription/ # 구독 API
├── components/             # 재사용 컴포넌트
│   ├── AdBanner.jsx        # 광고 배너
│   ├── cardNews/          # 카드뉴스 컴포넌트
│   ├── companyNews/       # 기업뉴스 컴포넌트
│   ├── layout/            # 레이아웃 컴포넌트
│   └── NewsDetailPage/    # 상세페이지 컴포넌트
├── hooks/                 # 커스텀 훅
│   ├── useAdSense.js      # AdSense 훅
│   └── useAnalytics.js    # Analytics 훅
├── pages/                 # 페이지 컴포넌트
│   ├── TopNewsPage.jsx    # 톱뉴스 페이지
│   ├── CompanyNewsPage.jsx # 기업뉴스 페이지
│   ├── ArticleDetailPage.jsx # 기사상세 페이지
│   └── NewsletterSubscriptionPage.jsx # 구독 페이지
├── routes/               # 라우팅 설정
│   ├── routesConfig.jsx  # 라우트 구성
│   └── pagePath.js       # 경로 상수
└── utils/               # 유틸리티
    └── analytics.js     # GA 유틸리티
```

## ⚙️ 설치 및 실행

### 필수 요구사항
- Node.js 18.0.0 이상
- npm 또는 yarn

### 1. 프로젝트 클론
```bash
git clone <repository-url>
cd news-app
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경 변수 설정
`.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
# Google Analytics
VITE_GA_MEASUREMENT_ID=G-YOUR_MEASUREMENT_ID

# Google AdSense
VITE_ADSENSE_CLIENT_ID=ca-pub-YOUR_PUBLISHER_ID
VITE_ADSENSE_SLOT_DISPLAY=YOUR_DISPLAY_SLOT
VITE_ADSENSE_SLOT_INFEED=YOUR_INFEED_SLOT
VITE_ADSENSE_SLOT_INARTICLE=YOUR_INARTICLE_SLOT
```

### 4. 개발 서버 실행
```bash
# 일반 개발 모드
npm run dev

# Analytics 테스트 모드
npm run dev:analytics
```

### 5. 프로덕션 빌드
```bash
npm run build
npm run preview
```

## 📊 Google Analytics 설정

### 로컬 개발에서 즉시 작동
- localhost에서도 실시간 데이터 수집
- 개발 중 이벤트 추적 가능
- 디버그 모드 자동 활성화

### 추적 이벤트
- **페이지뷰**: 자동 추적
- **뉴스 클릭**: 기사 조회 추적
- **카테고리 변경**: 주제 탐색 패턴
- **스크롤 깊이**: 25%, 50%, 75%, 100%
- **광고 인터랙션**: 클릭 및 노출

### 확인 방법
1. [Google Analytics](https://analytics.google.com) 접속
2. 실시간 > 이벤트에서 확인
3. 로컬 액션 시 즉시 데이터 표시

## 💰 Google AdSense 설정

### 배포 필수 조건
- ✅ 실제 도메인 (localhost ❌)
- ✅ HTTPS 프로토콜
- ✅ AdSense 계정 승인

### 빠른 배포 (Vercel)
```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel --prod
```

## 🔧 개발 가이드

### 새로운 페이지 추가
1. `src/pages/`에 컴포넌트 생성
2. `src/routes/pagePath.js`에 경로 추가
3. `src/routes/routesConfig.jsx`에 라우트 등록

### API 서비스 추가
1. `src/apis/`에 서비스 디렉토리 생성
2. `axiosInstance.js`를 import하여 HTTP 클라이언트 사용
3. 컴포넌트에서 서비스 함수 호출

### 컴포넌트 구조 규칙
- **pages/**: 페이지 레벨 컴포넌트
- **components/**: 재사용 가능한 UI 컴포넌트
- **layout/**: 레이아웃 관련 컴포넌트

### 상태 관리
- React Hooks (useState, useEffect) 사용
- 복잡한 상태는 useReducer 활용
- 전역 상태 필요시 Context API 고려

## 📱 반응형 디자인

Tailwind CSS를 활용한 모바일 퍼스트 디자인:
- **Mobile**: 기본 스타일
- **Tablet**: `md:` 접두사 사용
- **Desktop**: `lg:`, `xl:` 접두사 사용

## 🚀 배포 가이드

### Vercel (추천)
```bash
vercel --prod
```

### Netlify
```bash
npm run build
# dist 폴더를 Netlify에 드래그 앤 드롭
```

### GitHub Pages
```bash
npm run build
# dist 폴더 내용을 gh-pages 브랜치에 푸시
```

## 📚 추가 문서

- [QUICK_START.md](./QUICK_START.md) - Google Analytics & AdSense 빠른 시작
- [GA_GUIDE.md](./GA_GUIDE.md) - Google Analytics 상세 가이드
- [ADSENSE_GUIDE.md](./ADSENSE_GUIDE.md) - Google AdSense 상세 가이드

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 [MIT 라이선스](LICENSE)를 따릅니다.

## 📞 지원

- 이슈 리포트: [GitHub Issues](../../issues)
- 기능 요청: [GitHub Discussions](../../discussions)
- 이메일: your-email@example.com

---

**News App**으로 더 스마트한 뉴스 소비를 경험해보세요! 🚀