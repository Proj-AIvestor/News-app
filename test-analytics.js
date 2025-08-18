// Google Analytics 테스트 스크립트
// 브라우저 콘솔에서 실행하여 이벤트 전송 테스트

// 1. Google Analytics 로드 확인
console.log('GA Loaded:', typeof window.gtag !== 'undefined');

// 2. 테스트 이벤트 전송
if (window.gtag) {
  // 페이지뷰 테스트
  window.gtag('event', 'page_view', {
    page_title: 'Test Page',
    page_location: window.location.href,
    page_path: '/test'
  });
  
  // 커스텀 이벤트 테스트
  window.gtag('event', 'test_event', {
    event_category: 'test',
    event_label: 'console_test',
    value: 123
  });
  
  console.log('Test events sent! Check GA Real-time reports.');
} else {
  console.error('Google Analytics not loaded. Check your configuration.');
}

// 3. 현재 설정 확인
console.log('Current dataLayer:', window.dataLayer);
