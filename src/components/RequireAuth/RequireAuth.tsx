import React from 'react'
import { RouteProps, useLocation } from 'react-router-dom'
import { Navigate } from "react-router-dom";
import { useAuth } from '../../Features/Auth/AuthContextProvider';

type PrivateRoutesType = {
  children?: React.ReactNode
} & RouteProps

export const RequireAuth: React.FC<PrivateRoutesType> = ({ children }) => {
 
  const { isAuth } = useAuth();
  const location = useLocation();

  return (
  <React.Fragment>
    {!isAuth ? <Navigate to={'/login'} state={{from: location}} replace /> : children}
  </React.Fragment>
  )
}
