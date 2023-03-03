import React, { FC } from 'react'
import { Navigation } from '../Navigation/Navigation'
import './Footer.css'

interface IFooter {
  onNavClick: (e: React.MouseEvent<HTMLElement>) => void
  category: string
}

export const Footer:FC<IFooter> = ({ onNavClick, category }) => {
  return (
        <footer className="footer">
          <div className="container">
            <Navigation
              placement="footer"
              onNavClick={onNavClick}
              currentCategory={category}
              className="footer__navigation"
            />
            <div className="footer__bottom">
              <p className="footer__text">
                Сделано на Frontend курсе в{' '}
                <a rel="noreferrer" className="footer__link" href="https://karpov.courses/frontend" target="_blank">
                  Karpov.Courses
                </a>
              </p>
              <p className="footer__text footer__text--gray">© 2021</p>
            </div>
          </div>
        </footer>
  )
}
