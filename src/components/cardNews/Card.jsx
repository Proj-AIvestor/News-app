import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ news }) => {
  const { id, thumbnailUrl, imageAlt, category, timeAgo, title, summary, companiesInfo, source } = news;

  const categoryStyles = {
    "경제": "bg-emerald-100 text-emerald-800",
    "과학·기술": "bg-green-100 text-green-800",
    "금융": "bg-blue-100 text-blue-800",
    "노동·고용": "bg-primary-100 text-primary-800",
    "범죄·법·사법": "bg-purple-100 text-purple-800",
    "보건·의료": "bg-orange-100 text-orange-800",
    "분쟁·전쟁·평화": "bg-red-100 text-red-800",
    "산업": "bg-indigo-100 text-indigo-800",
    "재난·사고": "bg-yellow-100 text-yellow-800",
  };

  const currentCategoryStyle = categoryStyles[category] || "bg-gray-100 text-gray-800"; // Default style
  const newsId = news.id; // Use the 'id' from the news object

  return (
    <Link to={`/detail/${newsId}`} className="block w-full h-full">
      <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
        <div className="w-full h-64 bg-gray-200 overflow-hidden">
          <img
            src={thumbnailUrl || '/NoImage.svg'}
            alt={imageAlt || 'Placeholder Image'}
            className="w-full h-full object-contain rounded-t-lg"
          />
        </div>
        <div className="p-6 flex-grow flex flex-col">
          <div className="flex items-center space-x-2 mb-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${currentCategoryStyle}`}>{category}</span>
            {source && <span className="text-xs text-gray-500">Source: {source}</span>}
            {timeAgo && <span className="text-xs text-gray-500">{timeAgo}</span>}
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-primary-600 transition-colors duration-200">{title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed flex-grow">{summary}</p>

          {news.companies && news.companies.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Companies:</h4>
              <p className="text-gray-600 text-sm">{news.companies.join(', ')}</p>
            </div>
          )}

          {companiesInfo && Object.keys(companiesInfo).length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Related Companies Info:</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(companiesInfo).map(([ticker, info]) => (
                  <span
                    key={ticker}
                    className={`px-3 py-1 text-xs font-medium rounded-full ${info.isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                  >
                    {ticker}: {info.price} ({info.changePercent}%) {info.isPositive ? '▲' : '▼'}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
};

export default Card;