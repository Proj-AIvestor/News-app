const ArticleContent = ({ content, url }) => {
  // AIvestor 자체 제작 기사인지 확인
  const isAIvestorArticle = url && url.includes('aivesor');
  
  let cleanContent = content;
  
  if (isAIvestorArticle) {
    // URL 패턴을 찾기 위한 정규식
    const urlPattern = /https?:\/\/[^\s]+/g;
    
    // content를 줄바꿈으로 분리
    const lines = content.split('\n').filter(line => line.trim());
    
    // "관련 기사 URL" 텍스트를 찾고, 그 이전까지만 메인 컨텐츠로 사용
    const urlSectionIndex = lines.findIndex(line => 
      line.includes('관련 기사 URL') || 
      line.includes('관련기사') || 
      line.includes('출처') ||
      line.includes('관련 기사')
    );
    
    if (urlSectionIndex !== -1) {
      // URL 섹션 이전까지가 메인 컨텐츠
      cleanContent = lines.slice(0, urlSectionIndex).join('\n\n');
    } else {
      // "관련 기사 URL" 텍스트가 없더라도 마지막 부분의 연속된 URL들 제거
      const allUrls = content.match(urlPattern) || [];
      if (allUrls.length > 0) {
        // 마지막 몇 줄에서 URL이 연속으로 나오는지 확인
        const lastFewLines = lines.slice(-5); // 마지막 5줄 확인
        const urlLinesCount = lastFewLines.filter(line => urlPattern.test(line)).length;
        
        // 마지막 줄들 중 2개 이상이 URL이면 제거
        if (urlLinesCount >= 2) {
          // URL이 시작되는 지점을 찾아서 그 이전까지만 사용
          let cutIndex = lines.length;
          for (let i = lines.length - 1; i >= 0; i--) {
            if (urlPattern.test(lines[i])) {
              cutIndex = i;
            } else if (cutIndex < lines.length) {
              // URL이 아닌 줄을 만나면 중단
              break;
            }
          }
          cleanContent = lines.slice(0, cutIndex).join('\n\n');
        }
      }
    }
    
    // 마지막에 남은 빈 줄들 정리
    cleanContent = cleanContent.trim();
  }
  
  // 메인 컨텐츠를 단락으로 분리
  const paragraphs = cleanContent.split('\n\n').filter(p => p.trim());
  
  return (
    <div className="text-lg text-gray-800 leading-relaxed space-y-6">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="text-justify">
          {paragraph}
        </p>
      ))}
    </div>
  );
};

export default ArticleContent;