import React from 'react'
import { pagePath } from '@routes/pagePath.js'
import { Navigate } from 'react-router-dom'
import RootLayout from '@layout/RootLayout.jsx'
import TopNews from '@pages/TopNewsPage.jsx';
import ArticleDetailPage from '@pages/ArticleDetailPage.jsx';
import CompanyNewsPage from '@pages/CompanyNewsPage.jsx';
import NewsletterSubscriptionPage from '@pages/NewsletterSubscriptionPage.jsx';

const routesConfig = [
  {
    element: <RootLayout />,
    children: [
      {
        path: pagePath.TOPNEWS,
        element: <TopNews />,
      },
      {
        path: `${pagePath.TOPNEWS}/list/:topic`,
        element: <TopNews />,
      },
      {
        path: `${pagePath.NEWSDETAIL}`,
        element: <ArticleDetailPage />,
      },
      {
        path: `${pagePath.SUBSCRIBE}`,
        element: <NewsletterSubscriptionPage />,
      },
      {
        path: `${pagePath.COMPANYNEWS}`,
        element: <CompanyNewsPage />,
      },
      {
        path: '/',
        element: <Navigate to={pagePath.TOPNEWS} replace />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={pagePath.TOPNEWS} replace />,
  },
];

export default routesConfig