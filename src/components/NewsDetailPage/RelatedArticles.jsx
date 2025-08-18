import React from 'react';

const RelatedArticles = ({ content, url }) => {
  // AIvestor 자체 제작 기사인지 확인
  const isAIvestorArticle = url && url.includes('aivesor');
  
  if (!isAIvestorArticle) {
    return null; // AIvestor 기사가 아니면 컴포넌트를 렌더링하지 않음
  }
  
  // URL 패턴을 찾기 위한 정규식
  const urlPattern = /https?:\/\/[^\s]+/g;
  
  let relatedUrls = [];
  
  // content를 줄바꿈으로 분리
  const lines = content.split('\n').filter(line => line.trim());
  
  // "관련 기사 URL" 텍스트를 찾고, 그 이후의 URL들을 추출
  const urlSectionIndex = lines.findIndex(line => 
    line.includes('관련 기사 URL') || 
    line.includes('관련기사') || 
    line.includes('출처') ||
    line.includes('관련 기사')
  );
  
  if (urlSectionIndex !== -1) {
    // URL 섹션 이후의 모든 URL 추출
    const urlSection = lines.slice(urlSectionIndex + 1).join('\n');
    const extractedUrls = urlSection.match(urlPattern) || [];
    relatedUrls = extractedUrls;
  } else {
    // "관련 기사 URL" 텍스트가 없더라도 마지막 부분에서 URL들 찾기
    const allUrls = content.match(urlPattern) || [];
    if (allUrls.length > 0) {
      // 마지막 몇 줄에서 URL이 연속으로 나오는지 확인
      const lastFewLines = lines.slice(-5); // 마지막 5줄 확인
      const urlLinesCount = lastFewLines.filter(line => urlPattern.test(line)).length;
      
      // 마지막 줄들 중 2개 이상이 URL이면 관련 링크로 간주
      if (urlLinesCount >= 2) {
        relatedUrls = lastFewLines
          .map(line => line.match(urlPattern))
          .flat()
          .filter(Boolean);
      }
    }
  }
  
  // 관련 URL이 없으면 렌더링하지 않음
  if (relatedUrls.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <div className="flex items-center mb-4">
        <div className="flex items-center space-x-2">
          <svg 
            className="w-5 h-5 text-blue-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" 
            />
          </svg>
          <h4 className="text-base font-semibold text-gray-800">
            관련 기사
          </h4>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="space-y-3">
          {relatedUrls.map((relatedUrl, index) => {
            try {
              // URL에서 도메인명과 경로 추출하여 표시명으로 사용
              const urlObj = new URL(relatedUrl);
              let displayName = urlObj.hostname;
              
              // 잘 알려진 사이트들의 표시명 개선
              if (urlObj.hostname.includes('cnbc.com')) {
                displayName = 'CNBC';
              } else if (urlObj.hostname.includes('reuters.com')) {
                displayName = 'Reuters';
              } else if (urlObj.hostname.includes('bloomberg.com')) {
                displayName = 'Bloomberg';
              } else if (urlObj.hostname.includes('wsj.com')) {
                displayName = 'Wall Street Journal';
              } else if (urlObj.hostname.includes('ft.com')) {
                displayName = 'Financial Times';
              } else {
                displayName = urlObj.hostname.replace('www.', '');
              }
              
              return (
                <div key={index} className="flex items-start space-x-3 group">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-blue-600 text-xs font-medium">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <a 
                      href={relatedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200 group-hover:underline"
                    >
                      {displayName}
                    </a>
                    <p className="text-xs text-gray-500 mt-1 break-all">
                      {relatedUrl}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <svg 
                      className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                      />
                    </svg>
                  </div>
                </div>
              );
            } catch (error) {
              // 잘못된 URL인 경우 간단하게 표시
              return (
                <div key={index} className="flex items-start space-x-3">
                  <span className="text-gray-400 text-sm mt-1">•</span>
                  <a 
                    href={relatedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline text-sm transition-colors duration-200 break-all"
                  >
                    {relatedUrl}
                  </a>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default RelatedArticles;