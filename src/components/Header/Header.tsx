import React, { FC } from 'react'
import { Navigation } from '../Navigation/Navigation'
import './Header.css'

interface IHeader {
  onNavClick: (e: React.MouseEvent<HTMLElement>) => void
  category: string
}

export const Header: FC<IHeader> = ({ onNavClick, category }) => {
  return (
    <div>
          <header className="header">
          <div className="container">
            <Navigation
              placement="header"
              className="header__navigation"
              onNavClick={onNavClick}
              currentCategory={category}
            />
          </div>
        </header>
    </div>
  )
}
