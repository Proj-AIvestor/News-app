import React from 'react'
import { pagePath } from '@routes/pagePath.js'
import { Navigate } from 'react-router-dom'
import RootLayout from '@layout/RootLayout.jsx'
import TopNews from '@pages/TopNews2.jsx';
import ArticleDetailPage from '@pages/ArticleDetailPage.jsx';

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
        path: '/detail/:newsId',
        element: <ArticleDetailPage />,
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