# Google AdSense 통합 가이드

## 1. Google AdSense 계정 설정

1. [Google AdSense](https://www.google.com/adsense/)에 가입
2. 웹사이트 등록 및 승인 대기
3. 승인 후 광고 단위 생성:
   - 디스플레이 광고
   - 인피드 광고
   - 기사 내 자동 삽입 광고

## 2. 환경 변수 설정

`.env` 파일을 생성하고 다음 내용을 추가:

```env
# Google AdSense Configuration
VITE_ADSENSE_CLIENT_ID=ca-pub-YOUR_PUBLISHER_ID
VITE_ADSENSE_SLOT_DISPLAY=YOUR_DISPLAY_AD_SLOT
VITE_ADSENSE_SLOT_INFEED=YOUR_INFEED_AD_SLOT
VITE_ADSENSE_SLOT_INARTICLE=YOUR_INARTICLE_AD_SLOT
```

## 3. AdSense 스크립트 추가

### 방법 1: index.html에 추가 (권장)
`index.html`의 `<head>` 태그 내에 추가:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
     crossorigin="anonymous"></script>
```

### 방법 2: 동적 로딩
`useAdSense` 훅을 사용하여 동적으로 로드 (이미 구현됨)

## 4. 광고 사용하기

### 기본 사용법
```jsx
import AdBanner from '../components/AdBanner';

// 디스플레이 광고
<AdBanner adType="display" />

// 인피드 광고
<AdBanner adType="inFeed" />

// 기사 내 광고
<AdBanner adType="inArticle" />
```

### TopNews3에서 사용 중인 예시
```jsx
<AdBanner 
  key={`ad-${group.id}`} 
  id={group.id}
  adType="display"
  className="my-8"
/>
```

## 5. 광고 유형별 권장 사항

### 디스플레이 광고
- 크기: 728x90 (리더보드), 336x280 (큰 직사각형)
- 위치: 콘텐츠 사이, 헤더 아래

### 인피드 광고
- 뉴스 카드와 유사한 디자인
- 4-8개 카드마다 삽입

### 기사 내 자동 삽입 광고
- 긴 콘텐츠 내에 자동 삽입
- 단락 사이에 자연스럽게 배치

## 6. 테스트 및 디버깅

### 개발 환경
- 개발 모드에서는 플레이스홀더가 표시됨
- 실제 광고는 프로덕션 환경에서만 표시

### 일반적인 문제 해결
1. **광고가 표시되지 않음**
   - AdSense 계정 승인 확인
   - 광고 차단기 비활성화
   - 올바른 도메인에서 테스트

2. **콘솔 에러**
   - Publisher ID와 Slot ID 확인
   - 스크립트 로딩 확인

3. **레이아웃 문제**
   - 반응형 설정 확인
   - CSS 충돌 확인

## 7. 정책 준수

- 자체 클릭 금지
- 클릭 유도 문구 금지
- 콘텐츠 정책 준수
- 광고 배치 정책 준수

## 8. 수익 최적화

1. **광고 배치**
   - Above the fold 영역 활용
   - 사용자 경험 고려

2. **광고 크기**
   - 반응형 광고 사용
   - 다양한 크기 테스트

3. **광고 밀도**
   - 콘텐츠 대비 적절한 비율 유지
   - 모바일에서는 더 적게

## 9. 모니터링

- AdSense 대시보드에서 성과 확인
- A/B 테스트 진행
- 사용자 피드백 수집
