import { axiosSBInstance, axiosFlaskInstance } from '@apis/axiosInstance.js';

export const getCompanyList = async () => {
  const response = await axiosSBInstance.get('/companies/list');
  return response.data;
};

export const getCompanyNewsInfo = async (company) => {
  const response = await axiosSBInstance.get('/companies/Info', {
    params: { company },
  });
  return response.data;
};

export const getCompanyStockInfo = async (company) => {
  const response = await axiosFlaskInstance.get('/company-stockInfo', {
    params: { company },
  });
  return response.data;
};

const companeyNews = { getCompanyList, getCompanyNewsInfo, getCompanyStockInfo}

export default companeyNews;