import { Burger } from '@components/Icons/Burger'
import { Cross } from '@components/Icons/Cross'
import { Logo } from '@components/Logo/Logo'
import { Navigation } from '@components/Navigation/Navigation'
import classNames from 'classnames'
import { ColorSchemeSwitcherMobile } from '@features/colorScheme/components/ColorSchemeSwitcher/ColorSchemeSwitcherMobile/ColorSchemeSwitcherMobile'
import React, { FC, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

export const MobileHeader: FC = () => {
  const [isOpenMenu, toggleMenu] = useState(false)
  const [isOpenSubMenu, toggleSubMenu] = useState(false)

  return (
    <header className="header">
      <div className="container header__mobile-container">
        <Logo />
        <button className="header__mobile-button" onClick={() => toggleMenu(!isOpenMenu)}>
          {isOpenMenu ? <Cross /> : <Burger />}
        </button>
      </div>
      <CSSTransition in={isOpenMenu} mountOnEnter unmountOnExit timeout={200} classNames="header-mobile-menu-animation">
        <div className="header__mobile-menu">
          {isOpenSubMenu ? (
            <button className="header__mobile-back-button" onClick={() => toggleSubMenu(false)}>
              К меню
            </button>
          ) : (
            <Navigation className="header__mobile-navigation" />
          )}

          <div className={classNames('header__mobile-controls', { 'header__mobile-controls--hasMenu': isOpenSubMenu })}>
            <ColorSchemeSwitcherMobile isMenuActive={isOpenSubMenu} onClickSchemeButton={() => toggleSubMenu(true)} />
          </div>
        </div>
      </CSSTransition>
    </header>
  )
}
