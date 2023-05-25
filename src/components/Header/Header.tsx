import React, { FC } from 'react'
import './Header.css'
import { useAdaptive } from '@components/customHooks'
import { DesktopHeader } from './DesktopHeader/DesktopHeader'
import { MobileHeader } from './MobileHeader/MobileHeader'

export const Header: FC = () => {
  const { isMobile } = useAdaptive()

  return isMobile ? <MobileHeader /> : <DesktopHeader />
}
