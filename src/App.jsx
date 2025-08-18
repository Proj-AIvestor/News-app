import React, { useEffect } from 'react'
import { useRoutes, useLocation } from 'react-router-dom'
import routesConfig from './routes/routesConfig.jsx'
import { initGA, pageview } from './utils/analytics'

export default function App() {
  const router = useRoutes(routesConfig)
  const location = useLocation()

  // Google Analytics 초기화
  useEffect(() => {
    initGA()
  }, [])

  // 페이지 변경 추적
  useEffect(() => {
    pageview(location.pathname + location.search)
  }, [location])

  return (
    <div>
      {router}
    </div>
  )
}
