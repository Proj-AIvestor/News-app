import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { trackEvents } from '../../utils/analytics';

const Card = ({ 
  news, 
  currentListTopic, 
  isEnrichLoading,
  isPlaying: externalIsPlaying,
  onPlayingStateChange,
  onAudioEnd
}) => {
  const { 
    id, 
    thumbnailUrl, 
    imageAlt, 
    category, 
    title, 
    summary, 
    companiesInfo, 
    companies, 
    source, 
    publicationDate,
    ttsUrl 
  } = news;

  const [isPlaying, setIsPlaying] = useState(false);
  const [showNoTtsAlert, setShowNoTtsAlert] = useState(false);
  const audioRef = useRef(null);

  const categoryStyles = {
    "경제": "bg-yellow-100 text-yellow-800",
    "과학·기술": "bg-blue-100 text-green-800",
    "금융": "bg-lime-100 text-lime-800",
    "노동·고용": "bg-amber-100 text-amber-800",
    "범죄·법·사법": "bg-purple-100 text-purple-800",
    "보건·의료": "bg-orange-100 text-orange-800",
    "분쟁·전쟁·평화": "bg-red-100 text-red-800",
    "산업": "bg-slate-100 text-slate-800",
    "재난·사고": "bg-rose-100 text-orange-800",
  };

  const currentCategoryStyle = categoryStyles[category] || "bg-gray-100 text-gray-800";
  const newsId = news.id;
  
  // companiesInfo가 있는지 확인
  const hasCompaniesInfo = companiesInfo && Object.keys(companiesInfo).length > 0;
  const hasCompanies = companies && companies.length > 0;

  // 외부에서 제어하는 재생 상태 관리
  useEffect(() => {
    if (externalIsPlaying !== undefined) {
      setIsPlaying(externalIsPlaying);
      
      if (externalIsPlaying && ttsUrl && audioRef.current) {
        audioRef.current.play().catch(err => {
          console.error('Audio play failed:', err);
          setIsPlaying(false);
          if (onPlayingStateChange) {
            onPlayingStateChange(false);
          }
        });
      } else if (!externalIsPlaying && audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [externalIsPlaying, ttsUrl, onPlayingStateChange]);

  const handlePlayClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!ttsUrl) {
      setShowNoTtsAlert(true);
      setTimeout(() => setShowNoTtsAlert(false), 3000);
      return;
    }

    if (isPlaying) {
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (onPlayingStateChange) {
        onPlayingStateChange(false);
      }
    } else {
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.play().catch(err => {
          console.error('Audio play failed:', err);
          setIsPlaying(false);
        });
      }
      if (onPlayingStateChange) {
        onPlayingStateChange(true);
      }
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
    if (onPlayingStateChange) {
      onPlayingStateChange(false);
    }
    if (onAudioEnd) {
      onAudioEnd();
    }
  };

  const handleClick = () => {
    // Google Analytics에 뉴스 클릭 이벤트 전송
    trackEvents.clickNews(newsId, title, category);
  };

  return (
    <div className="relative h-full">
      {/* TTS 없음 알림 */}
      {showNoTtsAlert && (
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-50 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg">
          <p className="text-sm">TTS를 사용할 수 없습니다</p>
        </div>
      )}

      {/* Hidden audio element */}
      {ttsUrl && (
        <audio
          ref={audioRef}
          src={ttsUrl}
          onEnded={handleAudioEnd}
          preload="none"
        />
      )}

      <Link 
        to={`/detail/${newsId}`} 
        state={{ topic: news.topic, currentListTopic: currentListTopic }} 
        className="block h-full"
        onClick={handleClick}
      >
        <article className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 h-full flex flex-col ${
          isPlaying ? 'shadow-lg -translate-y-1 ring-2 ring-blue-500 ring-opacity-50' : 'hover:shadow-lg hover:-translate-y-1'
        }`}>
          <div className="w-full h-64 bg-gray-200 overflow-hidden">
            <img
              src={thumbnailUrl || '/NoImage.svg'}
              alt={imageAlt || 'Placeholder Image'}
              className="w-full h-full object-contain rounded-t-lg"
            />
          </div>
          <div className="p-6 flex-grow flex flex-col">
            <div className="flex items-center mb-3">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${currentCategoryStyle}`}>{category}</span>
              {source && <span className="text-xs text-gray-700 ml-2">Source: {source}</span>}
              {publicationDate && <span className="text-xs text-gray-700 ml-4">{publicationDate}</span>}
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-primary-600 transition-colors duration-200">{title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed flex-grow">{summary}</p>

            {/* 재생 버튼 */}
            <div className="mt-4 flex justify-center">
              <button
                onClick={handlePlayClick}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
                  ttsUrl 
                    ? isPlaying 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!ttsUrl}
              >
                {isPlaying ? (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <rect x="5" y="4" width="3" height="12" />
                      <rect x="12" y="4" width="3" height="12" />
                    </svg>
                    일시정지
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                    {ttsUrl ? '재생' : 'TTS 없음'}
                  </>
                )}
              </button>
            </div>

            {/* 기본 회사 목록 (companies 배열) */}
            {hasCompanies && !hasCompaniesInfo && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Companies:</h4>
                <div className="flex flex-wrap gap-2">
                  {companies.map((company, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700"
                    >
                      {company}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 회사 정보 로딩 중 표시 */}
            {isEnrichLoading && hasCompanies && !hasCompaniesInfo && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Loading company info...</h4>
                <div className="flex flex-wrap gap-2">
                  {companies.map((company, index) => (
                    <div
                      key={index}
                      className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-500 animate-pulse"
                    >
                      {company} • Loading...
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 풍부한 회사 정보 (companiesInfo 객체) */}
            {hasCompaniesInfo && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Related Companies Info:</h4>
                <div className="flex flex-col gap-2">
                  {Object.entries(companiesInfo).map(([ticker, info]) => (
                    <div
                      key={ticker}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                        info.isPositive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">{ticker}</span>
                        <div className="flex items-center gap-2">
                          <span>${info.price}</span>
                          <span className={`font-bold ${info.isPositive ? 'text-green-700' : 'text-red-700'}`}>
                            {info.changePercent}% {info.isPositive ? '▲' : '▼'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </Link>
    </div>
  );
};

export default Card;