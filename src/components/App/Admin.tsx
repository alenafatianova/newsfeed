import { Page } from '../../components/Page/Page'
import { initializeAPI } from '../../components/api'
import { AdminArticles } from '../../features/admin/AdminArticles/AdminArticles'
import { AdminArticlesItem } from '../../features/admin/AdminArticlesItem/AdminArticlesItem'
import { AdminPanel } from '../../features/admin/AdminPanel/AdminPanel'
import { AuthContextProvider } from '../../features/auth/AuthContextProvider'
import { LoginContainer } from '../../features/auth/Login/LoginContainer'
import { RequireAuth } from '../../features/auth/components/RequireAuth/RequireAuth'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const Admin: React.FC = () => {
  const firebaseApp = initializeAPI()
  return (
    <AuthContextProvider firebaseApp={firebaseApp}>
      <Routes>
        <Route
          path={'/login'}
          element={
            <Page>
              <LoginContainer />
            </Page>
          }
        />

        <Route element={<RequireAuth />}>
          <Route element={<AdminPanel />}>
            <Route index element={<AdminArticles />} />
            <Route path="/admin/create" element={<AdminArticlesItem />} />
            <Route path="/admin/edit/:id" element={<AdminArticlesItem />} />
          </Route>
        </Route>
      </Routes>
    </AuthContextProvider>
  )
}

export default Admin
