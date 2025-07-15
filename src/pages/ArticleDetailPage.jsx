import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../components/NewsDetailPage/BackButton';
import ArticleHeader from '../components/NewsDetailPage/ArticleHeader';
import ArticleThumbnail from '../components/NewsDetailPage/ArticleThumbnail';
import ArticleContent from '../components/NewsDetailPage/ArticleContent';
import RelatedCompanies from '../components/NewsDetailPage/RelatedCompanies';
import SourceLink from '../components/NewsDetailPage/SourceLink';
import { getNewsDetail } from '../apis/newsDetail/newsDetail';

const ArticleDetailPage = () => {
  const { newsId } = useParams();
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

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-6 md:p-8">
        <BackButton />
        
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
            <ArticleContent content={content} />
            <RelatedCompanies companies={companies} companiesInfo={companiesInfo} />
            <SourceLink url={url} source={source} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
