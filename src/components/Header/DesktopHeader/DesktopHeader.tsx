import { Logo } from '@components/Logo/Logo'
import { Navigation } from '@components/Navigation/Navigation'
import { ColorSchemeSwitcherDesktop } from '../../../features/colorScheme/components/ColorSchemeSwitcher/ColorSchemeSwitcherDesktop/ColorSchemeSwitcherDesktop'

import React, { FC } from 'react'
import { LocaleSwitcherDesktop } from '@features/locale/components/LocaleSwitcherDesktop/LocaleSwitcherDesktop'

export const DesktopHeader: FC = () => {
  return (
    <header className="header">
      <div className="container header__container">
        <Logo />
        <Navigation className="header__navigation" />
        <div className="header__controls" style={{ transform: 'translateX(0)' }}>
          <LocaleSwitcherDesktop />
          <ColorSchemeSwitcherDesktop />
        </div>
      </div>
    </header>
  )
}
