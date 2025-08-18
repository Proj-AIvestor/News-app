import { useEffect } from 'react';

// Google AdSense를 위한 커스텀 훅
export const useAdSense = () => {
  useEffect(() => {
    // AdSense 스크립트가 이미 로드되었는지 확인
    const script = document.querySelector('script[src*="adsbygoogle.js"]');
    
    if (!script) {
      // 동적으로 AdSense 스크립트 추가
      const adsenseScript = document.createElement('script');
      adsenseScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID';
      adsenseScript.async = true;
      adsenseScript.crossOrigin = 'anonymous';
      document.head.appendChild(adsenseScript);
    }
  }, []);
};

// 광고 새로고침 함수
export const refreshAds = () => {
  if (window.adsbygoogle) {
    window.adsbygoogle.push({});
  }
};
