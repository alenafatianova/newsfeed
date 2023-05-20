import React, { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Homepage } from '../../features/articlesList/components/Homepage/Homepage'
import { Article } from '../../features/articleItem/components/ArticlePage/ArticlesPage'
import { AdminPanel } from '../../features/admin/AdminPanel/AdminPanel'
import { Page } from '../Page/Page'
import { AdminArticlesItem } from '../../features/admin/AdminArticlesItem/AdminArticlesItem'
import { AdminArticles } from '../../features/admin/AdminArticles/AdminArticles'
import { RequireAuth } from '../../features/auth/components/RequireAuth/RequireAuth'
import { CategoryPage } from '../../features/categoryArticles/CategoryPage/CategoryPage'
import { LoginContainer } from '../../features/auth/Login/LoginContainer'

export const App: React.FC = () => {
  const { pathname } = useLocation()
  const prevPathname = useRef(pathname)

  useEffect(() => {
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return (
    <React.Fragment>
      <Routes>
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
          path="/admin"
          element={
            <RequireAuth>
              <AdminPanel>
                <AdminArticles />
              </AdminPanel>
            </RequireAuth>
          }
        />
        <Route
          path="/admin/create"
          element={
            <RequireAuth>
              <AdminPanel>
                <AdminArticlesItem />
              </AdminPanel>
            </RequireAuth>
          }
        />
        <Route
          path="/admin/edit/:id"
          element={
            <RequireAuth>
              <AdminPanel>
                <AdminArticlesItem />
              </AdminPanel>
            </RequireAuth>
          }
        />
        <Route
          path={'/login'}
          element={
            <Page>
              <LoginContainer />
            </Page>
          }
        />
      </Routes>
    </React.Fragment>
  )
}
