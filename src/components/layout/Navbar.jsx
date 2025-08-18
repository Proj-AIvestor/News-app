import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../../assets/Icon.png';

const Navbar = () => {
  const location = useLocation();
  
  const topics = [
    { name: '오늘의 Top 뉴스', path: 'all' },
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
            <img src={Icon} alt="AIvestor icon" className="w-6 h-6" />
            <h1 className="text-xl font-bold text-gray-900">AIvestor</h1>
          </div>
          <div className="flex items-center space-x-6">
            {/* 회사별 뉴스 링크 추가 */}
            <Link
              to="/companynews"
              className={`px-4 py-2 text-sm font-medium ${
                location.pathname === '/companynews'
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
              } rounded-lg transition-colors duration-200`}
            >
              회사별 뉴스
            </Link>
            
            {/* 구분선 */}
            <div className="h-6 w-px bg-gray-300"></div>
            
            {/* 토픽별 뉴스 링크들 */}
            {topics.map((topic) => (
              <Link
                key={topic.path}
                to={`/topnews/list/${topic.path}`}
                className={`px-4 py-2 text-sm font-medium ${
                  location.pathname === `/topnews/list/${topic.path}`
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