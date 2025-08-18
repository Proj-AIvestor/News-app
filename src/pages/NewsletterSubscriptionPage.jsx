import React, { useState } from 'react';
import {addSubscribeEmail} from '../apis/newsLetterSubscription/newsLetterSubscription';

const NewsletterSubscriptionPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages

    if (!email) {
      setMessage('이메일 주소를 입력해주세요.');
      setIsSuccess(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage('유효한 이메일 주소를 입력해주세요.');
      setIsSuccess(false);
      return;
    }

    console.log('Subscribing with email:', email);
    addSubscribeEmail(email);
    setMessage('뉴스레터 신청이 완료되었습니다! 감사합니다.');
    setIsSuccess(true);
    setEmail(''); // Clear the email input
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-lg shadow-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            뉴스레터 구독
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            최신 뉴스와 업데이트를 받아보세요.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                이메일 주소
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="이메일 주소를 입력해주세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {message && (
            <div className={`text-sm text-center ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              구독하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsletterSubscriptionPage;
