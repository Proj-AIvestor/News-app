// Google Analytics 설정 및 유틸리티 함수들

// GA4 측정 ID (환경 변수에서 가져오기)
export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

// Google Analytics 초기화
export const initGA = () => {
  // 개발 환경에서도 작동하도록 설정
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    // gtag 스크립트 동적 로드
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    // gtag 초기화
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      // 개발 환경에서 디버그 모드 활성화
      debug_mode: import.meta.env.DEV
    });

    if (import.meta.env.DEV) {
      console.log('Google Analytics initialized in debug mode');
    }
  }
};

// 페이지뷰 추적
export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// 이벤트 추적
export const event = ({ action, category, label, value }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// 사용자 정의 이벤트들
export const trackEvents = {
  // 뉴스 클릭 추적
  clickNews: (newsId, newsTitle, category) => {
    event({
      action: 'click_news',
      category: 'engagement',
      label: `${category} - ${newsTitle}`,
      value: newsId
    });
  },

  // 광고 클릭 추적
  clickAd: (adId, adType) => {
    event({
      action: 'click_ad',
      category: 'monetization',
      label: adType,
      value: adId
    });
  },

  // 카테고리 변경 추적
  changeCategory: (category) => {
    event({
      action: 'change_category',
      category: 'navigation',
      label: category
    });
  },

  // 스크롤 깊이 추적
  scrollDepth: (percentage) => {
    event({
      action: 'scroll',
      category: 'engagement',
      label: `${percentage}%`,
      value: percentage
    });
  },

  // 검색 추적
  search: (searchTerm) => {
    event({
      action: 'search',
      category: 'engagement',
      label: searchTerm
    });
  },

  // 공유 추적
  share: (platform, newsId) => {
    event({
      action: 'share',
      category: 'social',
      label: platform,
      value: newsId
    });
  },

  // 페이지 체류 시간 추적
  timeOnPage: (pageName, seconds) => {
    event({
      action: 'time_on_page',
      category: 'engagement',
      label: pageName,
      value: seconds
    });
  },

  // 요소 가시성 추적
  elementVisible: (elementName) => {
    event({
      action: 'element_visible',
      category: 'engagement',
      label: elementName
    });
  }
};

// 사용자 속성 설정
export const setUserProperties = (properties) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('set', 'user_properties', properties);
  }
};

// 전환 추적 (예: 뉴스레터 구독)
export const trackConversion = (conversionId, value) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: `${GA_MEASUREMENT_ID}/${conversionId}`,
      value: value,
      currency: 'KRW'
    });
  }
};
