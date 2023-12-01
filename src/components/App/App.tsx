import React, { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Homepage } from '../../features/articlesList/components/Homepage/Homepage'
import { Article } from '../../features/articleItem/components/ArticlePage/ArticlesPage'
import { Page } from '../Page/Page'
import { CategoryPage } from '../../features/categoryArticles/CategoryPage/CategoryPage'

const Admin = React.lazy(() => import('./Admin'))

export const App: React.FC = () => {
  const location = useLocation()
  const { pathname } = location
  const prevPathname = useRef(pathname)

  useEffect(() => {
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return (
    <React.Fragment>
      <Routes location={location}>
        <Route
          path="/:category"
          element={
            <Page>
              <CategoryPage />
            </Page>
          }
        />
        <Route
          path="/"
          element={
            <Page>
              <Homepage />
            </Page>
          }
        />
        <Route
          path="/article/:id"
          element={
            <Page>
              <Article />
            </Page>
          }
        />
        <Route
          path="/admin/*"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <Admin />
            </React.Suspense>
          }
        />
      </Routes>
    </React.Fragment>
  )
}
