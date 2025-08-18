import React, { useEffect, useRef } from 'react';
import { trackEvents } from '../utils/analytics';

// 환경 변수에서 AdSense 설정 가져오기
const ADSENSE_CLIENT_ID = import.meta.env.VITE_ADSENSE_CLIENT_ID || 'ca-pub-YOUR_PUBLISHER_ID';
const ADSENSE_SLOTS = {
  display: import.meta.env.VITE_ADSENSE_SLOT_DISPLAY || 'YOUR_DISPLAY_SLOT',
  inFeed: import.meta.env.VITE_ADSENSE_SLOT_INFEED || 'YOUR_INFEED_SLOT',
  inArticle: import.meta.env.VITE_ADSENSE_SLOT_INARTICLE || 'YOUR_INARTICLE_SLOT'
};

const AdBanner = ({ 
  id, 
  className = '', 
  format = 'auto', 
  slot,
  adType = 'display', // 'display', 'inFeed', 'inArticle'
  style = { display: 'block' },
  layout = '',
  layoutKey = '',
  responsive = true
}) => {
  const adRef = useRef(null);
  const isAdLoaded = useRef(false);

  // 광고 슬롯 결정
  const adSlot = slot || ADSENSE_SLOTS[adType] || ADSENSE_SLOTS.display;

  useEffect(() => {
    // 광고가 이미 로드되었으면 skip
    if (isAdLoaded.current) return;

    // AdSense가 로드되었는지 확인
    const loadAd = () => {
      try {
        if (window.adsbygoogle && adRef.current) {
          // 광고 컨테이너가 비어있는지 확인
          if (adRef.current.children.length === 0) {
            window.adsbygoogle.push({});
            isAdLoaded.current = true;
          }
        }
      } catch (err) {
        console.error('AdSense loading error:', err);
      }
    };

    // AdSense 스크립트가 로드되었는지 확인
    if (window.adsbygoogle) {
      loadAd();
    } else {
      // 스크립트 로드를 기다림
      const checkInterval = setInterval(() => {
        if (window.adsbygoogle) {
          clearInterval(checkInterval);
          loadAd();
        }
      }, 300);

      // 10초 후 타임아웃
      setTimeout(() => {
        clearInterval(checkInterval);
      }, 10000);
    }

    // Cleanup
    return () => {
      isAdLoaded.current = false;
    };
  }, [id, adSlot]);

  // 광고 클릭 핸들러
  const handleAdClick = () => {
    trackEvents.clickAd(id || 'default', adType);
  };

  // 개발 환경에서는 플레이스홀더 표시
  if (import.meta.env.DEV && ADSENSE_CLIENT_ID.includes('YOUR_PUBLISHER_ID')) {
    return (
      <div className={`ad-banner-container w-full my-8 ${className}`}>
        <div className="text-center mb-2">
          <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded">
            광고 (개발 모드)
          </span>
        </div>
        <div className="bg-gray-200 border-2 border-dashed border-gray-400 rounded-lg p-8 text-center">
          <p className="text-gray-600">AdSense 광고 위치</p>
          <p className="text-sm text-gray-500 mt-2">
            광고 타입: {adType} | 슬롯: {adSlot}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            .env 파일에 실제 AdSense ID를 설정하세요
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`ad-banner-container w-full my-8 ${className}`} onClick={handleAdClick}>
      {/* 광고 라벨 */}
      <div className="text-center mb-2">
        <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded">
          광고
        </span>
      </div>
      
      {/* 광고 콘텐츠 영역 */}
      <div 
        ref={adRef}
        className="ad-content flex justify-center items-center min-h-[90px] lg:min-h-[100px]"
      >
        <ins 
          className="adsbygoogle"
          style={style}
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot={adSlot}
          data-ad-format={format}
          data-ad-layout={layout}
          data-ad-layout-key={layoutKey}
          data-full-width-responsive={responsive ? "true" : "false"}
        ></ins>
      </div>
    </div>
  );
};

// 다양한 광고 형식을 위한 프리셋 컴포넌트들
export const DisplayAd = (props) => (
  <AdBanner 
    {...props}
    adType="display"
    format="auto"
    style={{ display: 'block' }}
  />
);

export const InFeedAd = (props) => (
  <AdBanner 
    {...props}
    adType="inFeed"
    format="fluid"
    layout="in-article"
    style={{ display: 'block', textAlign: 'center' }}
  />
);

export const InArticleAd = (props) => (
  <AdBanner 
    {...props}
    adType="inArticle"
    format="fluid"
    layout="in-article"
    style={{ display: 'block', textAlign: 'center' }}
  />
);

export default AdBanner;
