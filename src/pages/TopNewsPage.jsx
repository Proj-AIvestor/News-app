import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Section from '../components/cardNews/Section';
import Card from '../components/cardNews/Card';
import Button from '../components/cardNews/Button';
import AdBanner from '../components/AdBanner';
import { getTopNews, getTopicTopNews, getEnrichNews, getTopicEnruchTopNews } from '../apis/cardnews/newsService';
import { useScrollTracking, useTimeOnPage } from '../hooks/useAnalytics';
import { pagePath } from '../routes/pagePath';

const TopNewsPage = () => {
  const { topic } = useParams();
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrichLoading, setEnrichLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // 팟캐스트 재생 관련 상태
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(-1);
  const [showNoTtsAlert, setShowNoTtsAlert] = useState(false);
  const playbackQueueRef = useRef([]);

  // Analytics 훅 사용
  useScrollTracking();
  useTimeOnPage(topic ? `TopNews-${topic}` : 'TopNews-All');

  // 화면 크기에 따라 광고 삽입 간격 결정
  const getAdInterval = () => {
    const width = window.innerWidth;
    if (width < 768) return 4;   // 모바일: 4개마다
    if (width < 1024) return 6;  // 태블릿: 6개마다
    return 8; // 데스크톱: 8개마다
  };

  // 뉴스 데이터에 광고 배너 삽입
  const insertAdsIntoNews = (newsArray) => {
    const itemsWithAds = [];
    const adInterval = getAdInterval();
    let adCount = 0;

    newsArray.forEach((item, index) => {
      itemsWithAds.push({ type: 'news', data: item });
      
      // 지정된 간격마다 광고 삽입
      if ((index + 1) % adInterval === 0 && index !== newsArray.length - 1) {
        itemsWithAds.push({ 
          type: 'ad', 
          id: `ad-${adCount++}`,
          data: null 
        });
      }
    });

    return itemsWithAds;
  };

  // 전체 재생 버튼 클릭 핸들러
  const handlePlayAll = () => {
    if (isPlayingAll) {
      // 재생 중지
      setIsPlayingAll(false);
      setCurrentPlayingIndex(-1);
    } else {
      // TTS가 있는 뉴스만 필터링
      const playableNews = newsData
        .map((news, index) => ({ news, index }))
        .filter(item => item.news.ttsUrl);
      
      if (playableNews.length === 0) {
        setShowNoTtsAlert(true);
        setTimeout(() => setShowNoTtsAlert(false), 3000);
        return;
      }

      playbackQueueRef.current = playableNews;
      setIsPlayingAll(true);
      setCurrentPlayingIndex(playableNews[0].index);
    }
  };

  // 현재 재생 중인 오디오가 끝났을 때
  const handleAudioEnd = (newsIndex) => {
    if (!isPlayingAll) return;

    const currentQueueIndex = playbackQueueRef.current.findIndex(item => item.index === newsIndex);
    
    if (currentQueueIndex !== -1 && currentQueueIndex < playbackQueueRef.current.length - 1) {
      // 다음 뉴스 재생
      const nextItem = playbackQueueRef.current[currentQueueIndex + 1];
      setCurrentPlayingIndex(nextItem.index);
    } else {
      // 재생 목록 끝
      setIsPlayingAll(false);
      setCurrentPlayingIndex(-1);
    }
  };

  // 개별 카드의 재생 상태 변경 핸들러
  const handleCardPlayingStateChange = (newsIndex, isPlaying) => {
    if (!isPlaying) {
      // 개별 카드에서 재생을 중지한 경우
      if (isPlayingAll && currentPlayingIndex === newsIndex) {
        setIsPlayingAll(false);
        setCurrentPlayingIndex(-1);
      } else if (currentPlayingIndex === newsIndex) {
        setCurrentPlayingIndex(-1);
      }
    } else {
      // 개별 카드에서 재생을 시작한 경우
      setCurrentPlayingIndex(newsIndex);
      setIsPlayingAll(false); // 전체 재생 모드 해제
    }
  };

  useEffect(() => {
    const processNewsData = (newsDataObject) => {
      const allNews = [];
      for (const categoryName in newsDataObject) {
        if (Object.hasOwnProperty.call(newsDataObject, categoryName)) {
          const newsItems = newsDataObject[categoryName];
          if (Array.isArray(newsItems)) {
            newsItems.forEach(item => {
              allNews.push({ ...item, category: categoryName });
            });
          }
        }
      }
      return allNews;
    };

    const processBasicNewsData = (newsData) => {
      // API 응답이 배열인지 객체인지 확인하고 처리
      let newsArray = [];
      
      try {
        if (Array.isArray(newsData)) {
          // response2.txt 형태의 배열 데이터
          const categoryName = topic && topic !== 'all' ? topic : '경제';
          newsArray = newsData.map(item => ({
            ...item,
            category: categoryName,
            companiesInfo: {} // 초기에는 빈 객체로 설정
          }));
        } else if (typeof newsData === 'object' && newsData !== null) {
          // response.txt 형태의 객체 데이터일 경우 처리
          newsArray = processNewsData(newsData).map(item => ({
            ...item,
            companiesInfo: {} // 초기에는 빈 객체로 설정
          }));
        }
        
        // 빈 배열인 경우 체크
        if (!Array.isArray(newsArray) || newsArray.length === 0) {
          console.warn('No news data found or invalid format');
          return [];
        }
        return newsArray;
      } catch (error) {
        console.error('Error processing basic news data:', error);
        return [];
      }
    };

    const processEnrichedNewsData = (newsDataObject) => {
      // response.txt 형태의 객체 데이터를 processNewsData 함수로 처리
      return processNewsData(newsDataObject);
    };

    const fetchBasicNews = async () => {
      try {
        setLoading(true);
        let basicData;
        
        // 먼저 빠른 기본 데이터를 가져옴
        if (topic && topic !== 'all') {
          basicData = await getTopicTopNews(topic);
        } else {
          const today = new Date().toISOString().slice(0, 10);
          basicData = await getTopNews(today);
        }
        
        console.log('Basic data received:', basicData); // 디버깅용
        
        const processedBasicData = processBasicNewsData(basicData);
        console.log('Processed basic data:', processedBasicData); // 디버깅용
        
        setNewsData(processedBasicData);
        setLoading(false);

        // 기본 데이터 로드 후 enriched 데이터를 백그라운드에서 가져옴
        fetchEnrichedData(processedBasicData);
      } catch (err) {
        console.error('Error fetching basic news:', err);
        setError(err);
        setLoading(false);
      }
    };

    const fetchEnrichedData = async (basicNewsData) => {
      try {
        setEnrichLoading(true);
        let enrichedRawData;
        
        if (topic && topic !== 'all') {
          enrichedRawData = await getTopicEnruchTopNews(topic);
        } else {
          const today = new Date().toISOString().slice(0, 10);
          enrichedRawData = await getEnrichNews(today);
        }
        
        const enrichedData = processEnrichedNewsData(enrichedRawData);
        
        // 기존 기본 데이터와 enriched 데이터를 병합
        const mergedData = basicNewsData.map(basicItem => {
          const enrichedItem = enrichedData.find(enriched => enriched.id === basicItem.id);
          if (enrichedItem) {
            return {
              ...basicItem,
              category: enrichedItem.category || basicItem.category,
              companiesInfo: enrichedItem.companiesInfo || {},
              companies: enrichedItem.companies || basicItem.companies || [],
              ttsUrl: enrichedItem.ttsUrl || basicItem.ttsUrl || null
            };
          }
          return basicItem;
        });
        
        setNewsData(mergedData);
      } catch (err) {
        console.error('Failed to load enriched data:', err);
        // enriched 데이터 로드 실패해도 기본 데이터는 유지
      } finally {
        setEnrichLoading(false);
      }
    };

    fetchBasicNews();

    // 윈도우 리사이즈 시 광고 간격 재조정을 위한 이벤트 리스너
    const handleResize = () => {
      // 필요시 리렌더링을 위한 로직 추가
      // 현재는 getAdInterval()이 렌더링 시마다 호출되므로 별도 처리 불필요
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [topic]);

  // 재생 상태가 변경될 때 재생 목록 정리
  useEffect(() => {
    if (!isPlayingAll) {
      playbackQueueRef.current = [];
    }
  }, [isPlayingAll]);

  if (loading) {
    return (
      <div id="webcrumbs">
        <div className="bg-gray-50 min-h-screen">
          <Navbar />
          <main className="container mx-auto px-4 py-8 max-w-full">
            <p>Loading news...</p>
          </main>
          <Footer />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="webcrumbs">
        <div className="bg-gray-50 min-h-screen">
          <Navbar />
          <main className="container mx-auto px-4 py-8 max-w-full">
            <p>Error loading news: {error.message}</p>
          </main>
          <Footer />
        </div>
      </div>
    );
  }

  // 뉴스 데이터에 광고 삽입
  const itemsWithAds = insertAdsIntoNews(newsData);

  return (
    <div id="webcrumbs">
      <div className="bg-gray-50 min-h-screen">
        <Navbar />

        <main className="container mx-auto px-4 py-8 max-w-full">
          {/* TTS 없음 알림 */}
          {showNoTtsAlert && (
            <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg">
              <p className="text-sm">재생 가능한 TTS가 없습니다</p>
            </div>
          )}

          <div className="flex justify-between items-start mb-8">
            <div className="flex-grow">
              <Section
                title={topic && topic !== "all" ? `${topic} News` : "오늘의 Top News"}
                description={
                  topic && topic !== "all" 
                    ? `${topic}의 최신 뉴스`
                    : "오늘 뉴스 중 분야별 변동성이 가장 높았던 뉴스 Top5"
                  }
              />
            </div>
            
            {/* 버튼 그룹 */}
            <div className="flex items-center space-x-2">
              {/* 전체 재생 버튼 */}
              <button
                onClick={handlePlayAll}
                className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
                  isPlayingAll 
                    ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg'
                }`}
              >
                {isPlayingAll ? (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <rect x="5" y="4" width="3" height="12" />
                      <rect x="12" y="4" width="3" height="12" />
                    </svg>
                    전체 재생 중지
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                    전체 재생
                  </>
                )}
              </button>

              {/* 뉴스레터 구독 버튼 */}
              <button
                onClick={() => navigate(pagePath.SUBSCRIBE)} 
                className="px-6 py-3 rounded-full font-medium text-sm transition-all duration-200 flex items-center gap-2 whitespace-nowrap bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                뉴스레터 구독
              </button>
            </div>
          </div>

          {/* 회사 정보 로딩 상태 표시 */}
          {enrichLoading && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-700 text-sm">Loading company information...</p>
            </div>
          )}

          {/* 뉴스와 광고를 그룹화하여 렌더링 */}
          <div className="news-and-ads-container">
            {(() => {
              const groups = [];
              let currentNewsGroup = [];
              let globalNewsIndex = 0;
              
              itemsWithAds.forEach((item, index) => {
                if (item.type === 'news') {
                  currentNewsGroup.push({ ...item.data, globalIndex: globalNewsIndex++ });
                } else if (item.type === 'ad') {
                  // 이전 뉴스 그룹을 추가
                  if (currentNewsGroup.length > 0) {
                    groups.push({ type: 'news-group', items: currentNewsGroup });
                    currentNewsGroup = [];
                  }
                  // 광고 추가
                  groups.push({ type: 'ad', id: item.id });
                }
              });
              
              // 마지막 뉴스 그룹 추가
              if (currentNewsGroup.length > 0) {
                groups.push({ type: 'news-group', items: currentNewsGroup });
              }
              
              return groups.map((group, groupIndex) => {
                if (group.type === 'ad') {
                  return (
                    <AdBanner 
                      key={`ad-${group.id}`} 
                      id={group.id}
                      className="my-8"
                    />
                  );
                } else {
                  // 뉴스 그룹을 그리드로 렌더링
                  return (
                    <div 
                      key={`news-group-${groupIndex}`}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
                        gap: '1rem',
                        maxWidth: '1800px',
                        margin: '0 auto',
                        marginBottom: group === groups[groups.length - 1] ? '0' : '2rem'
                      }}
                    >
                      {group.items.map((newsItem) => (
                        <Card 
                          key={newsItem.id || newsItem.globalIndex} 
                          news={newsItem} 
                          isEnrichLoading={enrichLoading}
                          isPlaying={currentPlayingIndex === newsItem.globalIndex}
                          onPlayingStateChange={(isPlaying) => 
                            handleCardPlayingStateChange(newsItem.globalIndex, isPlaying)
                          }
                          onAudioEnd={() => handleAudioEnd(newsItem.globalIndex)}
                        />
                      ))}
                    </div>
                  );
                }
              });
            })()}
          </div>

          <div className="mt-12 text-center">
            <Button className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center mx-auto space-x-2">
              <span>Load More Articles</span>
              <span className="material-symbols-outlined">arrow_downward</span>
            </Button>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default TopNewsPage;