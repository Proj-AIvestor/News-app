import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Section from '../components/cardNews/Section';
import Card from '../components/cardNews/Card';
import Button from '../components/cardNews/Button';
import { getEnrichNews, getTopicEnruchTopNews } from '../apis/cardnews/newsService';

const TopNews2 = () => {
  const { topic } = useParams();
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

    const fetchNews = async () => {
      try {
        setLoading(true);
        let rawData;
        if (topic && topic !== 'all') {
          rawData = await getTopicEnruchTopNews(topic);
        } else {
          const today = new Date().toISOString().slice(0, 10);
          rawData = await getEnrichNews(today);
        }
        const processedData = processNewsData(rawData);
        setNewsData(processedData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [topic]);

  if (loading) {
    return (
      <div id="webcrumbs">
        <div className="bg-gray-50 min-h-screen max-w-screen-2xl mx-auto">
          <Navbar />
          <main className="px-8 py-8">
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
        <div className="bg-gray-50 min-h-screen max-w-screen-2xl mx-auto">
          <Navbar />
          <main className="px-8 py-8">
            <p>Error loading news: {error.message}</p>
          </main>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div id="webcrumbs">
      <div className="bg-gray-50 min-h-screen max-w-screen-2xl mx-auto">
        <Navbar />

        <main className="px-8 py-8">
          <Section
            title={topic ? `${topic} News` : "Latest News"}
            description="Stay updated with the latest developments across all topics"
          />

          <div className="grid grid-cols-3 gap-6">
            {newsData.map((newsItem, index) => (
              <Card key={index} news={newsItem} />
            ))}
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

export default TopNews2;
