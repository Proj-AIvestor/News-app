import { useEffect, useState } from 'react';
import { trackEvents } from '../utils/analytics';

// 스크롤 깊이를 추적하는 커스텀 훅
export const useScrollTracking = () => {
  const [scrollPercentages, setScrollPercentages] = useState(new Set());

  useEffect(() => {
    let ticking = false;
    const percentageMilestones = [25, 50, 75, 100];

    const updateScrollPercentage = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = Math.round((scrollTop / documentHeight) * 100);

      percentageMilestones.forEach(milestone => {
        if (scrollPercentage >= milestone && !scrollPercentages.has(milestone)) {
          trackEvents.scrollDepth(milestone);
          setScrollPercentages(prev => new Set(prev).add(milestone));
        }
      });

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollPercentage);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollPercentages]);

  return scrollPercentages;
};

// 페이지 체류 시간 추적
export const useTimeOnPage = (pageName) => {
  useEffect(() => {
    const startTime = Date.now();

    return () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000); // seconds
      if (timeSpent > 3) { // 3초 이상 체류한 경우만 기록
        trackEvents.timeOnPage(pageName, timeSpent);
      }
    };
  }, [pageName]);
};

// 가시성 추적 (Intersection Observer 사용)
export const useVisibilityTracking = (elementRef, eventName, threshold = 0.5) => {
  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            trackEvents.elementVisible(eventName);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(elementRef.current);

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [elementRef, eventName, threshold]);
};
