# Google Analytics 4 (GA4) 통합 가이드

## 개요
Google Analytics는 **로컬 개발 환경에서도 작동**하므로 배포 전에 테스트가 가능합니다!

## 1. GA4 계정 설정

### 1.1 계정 생성
1. [Google Analytics](https://analytics.google.com/) 접속
2. "관리" → "계정 만들기" 클릭
3. 계정 정보 입력:
   - 계정 이름: 회사/프로젝트명
   - 데이터 공유 설정: 기본값 유지

### 1.2 속성 생성
1. 속성 이름 입력 (예: "News App")
2. 시간대: "대한민국"
3. 통화: "대한민국 원 (₩)"
4. 비즈니스 정보 입력

### 1.3 데이터 스트림 설정
1. 플랫폼 선택: "웹"
2. 웹사이트 URL 입력:
   - 개발: `http://localhost:5173`
   - 프로덕션: `https://your-domain.com`
3. 스트림 이름 입력
4. **측정 ID 복사** (G-XXXXXXXXXX 형태)

## 2. 환경 변수 설정

`.env` 파일 생성 및 설정:
```env
# Google Analytics
VITE_GA_MEASUREMENT_ID=G-YOUR_MEASUREMENT_ID
```

## 3. 구현된 추적 기능

### 3.1 자동 추적
- **페이지뷰**: 모든 페이지 이동 자동 추적
- **세션 시간**: 사용자 체류 시간
- **이탈률**: 페이지별 이탈률

### 3.2 커스텀 이벤트
```javascript
// 뉴스 클릭
trackEvents.clickNews(newsId, newsTitle, category)

// 광고 클릭
trackEvents.clickAd(adId, adType)

// 카테고리 변경
trackEvents.changeCategory(category)

// 검색
trackEvents.search(searchTerm)

// 공유
trackEvents.share(platform, newsId)
```

## 4. 개발 환경에서 테스트

### 4.1 디버그 모드
개발 환경에서는 자동으로 디버그 모드가 활성화됩니다.

### 4.2 실시간 확인
1. GA4 대시보드 → "실시간" 메뉴
2. 로컬 사이트에서 액션 수행
3. 실시간으로 이벤트 확인

### 4.3 Chrome 확장 프로그램
- [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna) 설치
- 콘솔에서 상세 로그 확인

## 5. 주요 리포트 활용

### 5.1 사용자 획득
- 트래픽 소스 분석
- 신규 vs 재방문자
- 디바이스별 사용자

### 5.2 참여도
- 평균 참여 시간
- 페이지별 조회수
- 이벤트 수

### 5.3 수익화
- 광고 클릭률
- 카테고리별 광고 성과
- 사용자별 광고 노출 수

## 6. 고급 설정

### 6.1 사용자 속성 설정
```javascript
setUserProperties({
  user_type: 'premium',
  preferred_category: 'tech'
})
```

### 6.2 전환 추적
```javascript
// 뉴스레터 구독
trackConversion('newsletter_signup', 1000)
```

### 6.3 맞춤 측정기준/측정항목
GA4 대시보드에서 설정 후 코드에서 전송

## 7. 프라이버시 고려사항

### 7.1 GDPR 준수
```javascript
// 사용자 동의 후 추적 시작
if (userConsent) {
  initGA()
}
```

### 7.2 IP 익명화
자동으로 적용됨 (GA4 기본값)

## 8. 문제 해결

### 이벤트가 보이지 않을 때
1. 측정 ID 확인
2. 광고 차단기 비활성화
3. 콘솔 에러 확인
4. 24시간 대기 (첫 데이터)

### 실시간 데이터만 보일 때
- 일반 리포트는 24-48시간 지연
- 실시간 리포트로 즉시 확인 가능

## 9. 유용한 리소스

- [GA4 공식 문서](https://support.google.com/analytics/answer/9304153)
- [측정 프로토콜](https://developers.google.com/analytics/devguides/collection/protocol/ga4)
- [이벤트 빌더](https://ga-dev-tools.google/ga4/event-builder/)

## 10. 다음 단계

1. **목표 설정**: 주요 KPI 정의
2. **대시보드 구성**: 맞춤 보고서 생성
3. **알림 설정**: 이상 징후 감지
4. **A/B 테스트**: 콘텐츠 최적화
