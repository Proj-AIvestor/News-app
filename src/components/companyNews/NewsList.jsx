import React from 'react';
import NewsArticle from './NewsArticle';

const NewsList = ({ newsData, newsLoading, selectedCompany, formatDate }) => {
  if (newsLoading) {
    return (
      <div className="grid gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!newsData || newsData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <p className="text-gray-500">
          {selectedCompany ? `${selectedCompany}에 대한 뉴스가 없습니다.` : '회사를 선택해주세요.'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {newsData.map((news) => (
        <NewsArticle 
          key={news.id} 
          news={news} 
          selectedCompany={selectedCompany} 
          formatDate={formatDate} 
        />
      ))}
    </div>
  );
};

export default NewsList;
