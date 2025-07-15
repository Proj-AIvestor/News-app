import React from 'react'
import { useRoutes } from 'react-router-dom'
import routesConfig from './routes/routesConfig.jsx'

export default function App() {
  const router = useRoutes(routesConfig)
  return (
    <div>
      {router}
    </div>
  )
}
