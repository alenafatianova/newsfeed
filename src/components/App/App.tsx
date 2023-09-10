import React, { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Homepage } from '../../features/articlesList/components/Homepage/Homepage'
import { Article } from '../../features/articleItem/components/ArticlePage/ArticlesPage'
import { AdminPanel } from '../../features/admin/AdminPanel/AdminPanel'
import { Page } from '../Page/Page'
import { AdminArticlesItem } from '../../features/admin/AdminArticlesItem/AdminArticlesItem'
import { AdminArticles } from '../../features/admin/AdminArticles/AdminArticles'
import { RequireAuth } from '../../features/auth/components/RequireAuth/RequireAuth'
import { LoginContainer } from '../../features/auth/Login/LoginContainer'
import { CategoryPage } from '../../features/categoryArticles/CategoryPage/CategoryPage'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './App.css'

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
    <TransitionGroup>
      <CSSTransition key={pathname} timeout={1000} classNames={'page-animation'}>
        <div>
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
                path={'/admin/login'}
                element={
                  <Page>
                    <LoginContainer />
                  </Page>
                }
              />
            </Routes>
          </React.Fragment>
        </div>
      </CSSTransition>
    </TransitionGroup>
  )
}
