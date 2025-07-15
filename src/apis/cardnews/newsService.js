import { axiosSBInstance, axiosFlaskInstance } from '@apis/axiosInstance.js';

/**
 * 날짜에 따른 Top News 조회
 * @param {string} date YYYY-MM-DD 형식의 날짜 문자열
 * @returns {Promise<object>} { "경제·산업·금융": […], … }
 */
export const getTopNews = async (date) => {
  const response = await axiosSBInstance.get('/news/top', {
    params: { date },
  });
  return response.data;
};

export const getEnrichNews = async (date) => {
  const response = await axiosFlaskInstance.get('/news-with-stock', {
    params: { date },
  });
  return response.data;
};

export const getTopicTopNews = async (topic) => {
  const response = await axiosSBInstance.get('/news/list', {
    params: { topic },
  });
  return response.data;
};

export const getTopicEnruchTopNews = async (topic) => {
  const response = await axiosFlaskInstance.get('/news-by-topic-with-stock', {
    params: { topic },
  });
  return response.data;
};


const newsService = { getTopNews, getEnrichNews, getTopicTopNews, getTopicEnruchTopNews }

export default newsService;