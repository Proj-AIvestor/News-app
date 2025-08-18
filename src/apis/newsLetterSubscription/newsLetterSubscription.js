import { axiosSBInstance } from '@apis/axiosInstance.js';

export const addSubscribeEmail = async (email) => {
  const response = await axiosSBInstance.post(
    '/newsletter/addEmail', 
    null, 
    { 
        params: { email } 
    }
);
return response.data;
};

const newsLetterSubscription = { addSubscribeEmail }

export default newsLetterSubscription;
