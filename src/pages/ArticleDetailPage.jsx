import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import BackButton from '../components/NewsDetailPage/BackButton';
import ArticleHeader from '../components/NewsDetailPage/ArticleHeader';
import ArticleThumbnail from '../components/NewsDetailPage/ArticleThumbnail';
import ArticleContent from '../components/NewsDetailPage/ArticleContent';
import RelatedCompanies from '../components/NewsDetailPage/RelatedCompanies';
import SourceLink from '../components/NewsDetailPage/SourceLink';
import RelatedArticles from '../components/NewsDetailPage/RelatedArticles';
import { getNewsDetail } from '../apis/newsDetail/newsDetail';

const ArticleDetailPage = () => {
  const { newsId } = useParams();
  const location = useLocation(); // useLocation 훅 사용
  const { topic: initialTopic, currentListTopic } = location.state || {}; // state에서 topic과 currentListTopic 추출
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getNewsDetail(newsId);
        setArticle(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (newsId) {
      fetchArticle();
    }
  }, [newsId]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  if (!article) return <div className="text-center py-10">Article not found.</div>;

  // --- Debugging: Log the article data ---
  console.log("Article data received:", article);
  // ---------------------------------------

  const { title, topic, source, publicationDate, thumbnailUrl, content, companies, companiesInfo, url } = article;
  
  // AIvestor 자체 제작 기사인지 확인
  const isAIvestorArticle = url && url.includes('aivesor');

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-6 md:p-8">
        <BackButton topic={article.topic || initialTopic} currentListTopic={currentListTopic} />
        
        <div className="mt-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            <ArticleHeader 
              topic={topic} 
              publicationDate={publicationDate} 
              title={title} 
              source={source} 
            />
          </div>
          
          <ArticleThumbnail thumbnailUrl={thumbnailUrl} title={title} />
          
          <div className="p-6 md:p-8">
            {/* url prop을 ArticleContent에 전달 */}
            <ArticleContent content={content} url={url} />
            
            {/* 회사 정보 */}
            <RelatedCompanies companies={companies} companiesInfo={companiesInfo} />
            
            {/* AIvestor 자체 기사의 관련 링크들 */}
            <RelatedArticles content={content} url={url} />
            
            {/* AIvestor 자체 기사가 아닌 경우에만 SourceLink 표시 */}
            {!isAIvestorArticle && (
              <SourceLink url={url} source={source} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
