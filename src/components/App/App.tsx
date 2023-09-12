import React, { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Homepage } from '../../features/articlesList/components/Homepage/Homepage'
import { Article } from '../../features/articleItem/components/ArticlePage/ArticlesPage'
import { Page } from '../Page/Page'
import { CategoryPage } from '../../features/categoryArticles/CategoryPage/CategoryPage'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './App.css'
import { Admin } from './Admin'

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
              <Route path="/admin/*" element={<Admin />} />
            </Routes>
          </React.Fragment>
        </div>
      </CSSTransition>
    </TransitionGroup>
  )
}
