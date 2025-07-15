import React from 'react';
import { Link } from 'react-router-dom';

const BackButton = () => {
  return (
    <Link 
      to="/" 
      className="text-primary-600 hover:underline mb-4 inline-flex items-center group"
    >
      <span className="material-symbols-outlined mr-1 group-hover:-translate-x-1 transition-transform duration-200">arrow_back</span>
      <span>Back to News</span>
    </Link>
  );
};

export default BackButton;