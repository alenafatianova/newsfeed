import React, { useContext, useEffect, useState } from 'react';
import { AuthContextType } from './types';
import { FirebaseApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, User, browserLocalPersistence } from 'firebase/auth';

type FirebaseAppType = {
  firebaseApp: FirebaseApp;
  children: React.ReactNode;
};

const AuthContext = React.createContext<AuthContextType>({
  isAuth: null,
  loginWithEmailAndPassword: () => Promise.reject({}),
});

export const useAuthContext = (): AuthContextType => {
  return useContext<AuthContextType>(AuthContext);
};

export const AuthContextProvider: React.FC<FirebaseAppType> = ({ children, firebaseApp }) => {
  const [isAuth, setIsAuth] = useState<AuthContextType['isAuth']>(null);
  const [user, setUser] = useState<User | null>(null);
  const [auth] = useState(getAuth(firebaseApp));

  useEffect(() => {
    // if (!isAuth) {
    //   return
    // }
    auth.setPersistence(browserLocalPersistence);
    auth.languageCode = 'ru';

    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setIsAuth(true);
      } else {
        setUser(null);
        setIsAuth(false);
      }
    });
  }, [auth]);

  const loginWithEmailAndPassword = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  return <AuthContext.Provider value={{ isAuth, user, loginWithEmailAndPassword }}>{children}</AuthContext.Provider>;
};
