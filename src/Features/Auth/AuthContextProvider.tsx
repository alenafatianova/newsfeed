import React, { useContext, useEffect, useState } from 'react'
import { AuthContextType } from './types';

const AuthContext = React.createContext<AuthContextType>({
  isAuth: null
})

export const useAuth = ():AuthContextType => useContext(AuthContext)

export const AuthContextProvider: React.FC = ({children}) => {
  const [isAuth, setIsAuth] = useState<AuthContextType['isAuth']>(null);

  useEffect(() => {
    //setTimeout(() => setIsAuth(true), 2000)
  }, [])

  return (
    <AuthContext.Provider value={{isAuth}}>
      { children }
    </AuthContext.Provider>
  )
}
