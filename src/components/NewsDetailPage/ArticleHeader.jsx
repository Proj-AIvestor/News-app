import React from 'react';

const ArticleHeader = ({ title, topic, publicationDate, source }) => {
  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center mb-3">
        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
          {topic}
        </span>
        <span className="text-xs text-gray-500">{new Date(publicationDate).toLocaleDateString()}</span>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
      
      <div className="flex items-center text-sm text-gray-600 mb-6">
        <span className="flex items-center">
          <span className="material-symbols-outlined text-sm mr-1">public</span>
          {source}
        </span>
      </div>
    </div>
  );
};

export default ArticleHeader;