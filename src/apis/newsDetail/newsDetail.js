import { axiosSBInstance, axiosFlaskInstance } from '@apis/axiosInstance.js';

export const getNewsDetail = async (newsId) => {
    const response = await axiosFlaskInstance.get('/news-content-with-stock', {
      params: { newsId },
    });
    return response.data;
  };

  const newsDetail = { getNewsDetail }

  export default newsDetail;