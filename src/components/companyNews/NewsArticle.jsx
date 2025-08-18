import React from 'react';

const NewsArticle = ({ news, selectedCompany, formatDate }) => {
  return (
    <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="flex">
        {/* 썸네일 이미지 (있는 경우) */}
        {news.thumbnailUrl && (
          <div className="w-48 h-36 flex-shrink-0">
            <img 
              src={news.thumbnailUrl} 
              alt={news.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}
        
        {/* 뉴스 내용 */}
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-900 line-clamp-2 flex-1">
              {news.url ? (
                <a 
                  href={news.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors"
                >
                  {news.title}
                </a>
              ) : (
                news.title
              )}
            </h3>
          </div>
          
          <p className="text-sm text-gray-500 mb-3">
            {news.source && (
              <span className="font-medium">{news.source}</span>
            )}
          </p>
          
          <p className="text-gray-700 line-clamp-3 mb-3">
            {news.summary}
          </p>
          
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {formatDate(news.publicationDate)}
            </p>
            
            {news.companies && news.companies.length > 1 && (
              <div className="flex gap-2">
                {news.companies
                  .filter(company => company !== selectedCompany)
                  .slice(0, 3)
                  .map(company => (
                    <span 
                      key={company}
                      className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-full"
                    >
                      {company}
                    </span>
                  ))}
              </div>
            )}
          </div>
          
          {/* TTS 버튼 (있는 경우) */}
          {news.ttsUrl && (
            <div className="mt-3">
              <audio controls className="h-8">
                <source src={news.ttsUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default NewsArticle;
