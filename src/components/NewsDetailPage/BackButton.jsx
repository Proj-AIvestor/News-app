import React from 'react';
import { useNavigate } from 'react-router-dom';
import { pagePath } from '../../routes/pagePath'; // pagePath import

const BackButton = ({ topic, currentListTopic }) => { // topic, currentListTopic prop 받기
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (currentListTopic) {
      navigate(`${pagePath.TOPNEWS}/list/${currentListTopic}`); // currentListTopic 경로로 이동
    } else if (topic) {
      navigate(`${pagePath.TOPNEWS}/list/${topic}`); // topic 경로로 이동
    } else {
      navigate(-1); // 이전 페이지로 이동 (fallback)
    }
  };

  return (
    <button
      onClick={handleBackClick}
      className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
    >
      <span className="material-symbols-outlined mr-2">arrow_back</span>
      Back
    </button>
  );
};

export default BackButton;