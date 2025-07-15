import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const topics = [
    { name: 'All Topics', path: 'all' },
    { name: '경제', path: '경제' },
    { name: '과학·기술', path: '과학·기술' },
    { name: '금융', path: '금융' },
    { name: '노동·고용', path: '노동·고용' },
    { name: '범죄·법·사법', path: '범죄·법·사법' },
    { name: '보건·의료', path: '보건·의료' },
    { name: '분쟁·전쟁·평화', path: '분쟁·전쟁·평화' },
    { name: '산업', path: '산업' },
    { name: '재난·사고', path: '재난·사고' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-primary-600 text-2xl">newspaper</span>
            <h1 className="text-xl font-bold text-gray-900">NewsHub</h1>
          </div>
          <div className="flex items-center space-x-6">
            {topics.map((topic) => (
              <Link
                key={topic.path}
                to={`/topnews/list/${topic.path}`}
                className={`px-4 py-2 text-sm font-medium ${
                  topic.path === 'all'
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                } rounded-lg transition-colors duration-200`}
              >
                {topic.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;