import React, { useContext, useEffect, useState } from 'react';
import { AuthContextType } from './types';
import { FirebaseApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, User, browserLocalPersistence, signOut } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

type FirebaseAppType = {
  firebaseApp: FirebaseApp;
  children: React.ReactNode;
};

const AuthContext = React.createContext<AuthContextType>({
  isAuth: null,
  loginWithEmailAndPassword: () => Promise.reject({}),
  logout: () => undefined,
});

export const useAuthContext = (): AuthContextType => {
  return useContext<AuthContextType>(AuthContext);
};

export const AuthContextProvider: React.FC<FirebaseAppType> = ({ children, firebaseApp }) => {
  const [isAuth, setIsAuth] = useState<AuthContextType['isAuth']>(null);
  const [user, setUser] = useState<User | null>(null);
  const [auth] = useState(getAuth(firebaseApp));
  const logout = () => signOut(auth);

  const isUserAdmin = async (firebaseApp: FirebaseApp) => {
    const db = getFirestore(firebaseApp);
    return await getDoc(doc(db, '/internal/auth'));
  };

  useEffect(() => {
    auth.setPersistence(browserLocalPersistence);
    auth.languageCode = 'ru';

    auth.onAuthStateChanged((user) => {
      if (user) {
        // check if user has admin's permissions
        isUserAdmin(firebaseApp)
          .then(() => {
            setUser(user);
            setIsAuth(true);
          })
          .catch(() => {
            logout();
            setUser(null);
            setIsAuth(false);
          });
      } else {
        setUser(null);
        setIsAuth(false);
      }
    });
  }, [auth]);

  const loginWithEmailAndPassword = (email: string, password: string) => {
    setUser(null);
    setIsAuth(null);
    return signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  return (
    <AuthContext.Provider value={{ isAuth, user, loginWithEmailAndPassword, logout }}>{children}</AuthContext.Provider>
  );
};
