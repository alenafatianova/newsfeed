import React from 'react'
import './LocaleSwitcherMenu.css'
import { LocaleSwitcherValues } from '@features/locale/types'
import classNames from 'classnames'

interface LocaleSwitcherMenuType {
  selectedLocale: LocaleSwitcherValues
  onChangeLocale: (value: LocaleSwitcherValues) => any
  className?: string
}

export const LocaleSwitcherMenu: React.FC<LocaleSwitcherMenuType> = ({ selectedLocale, onChangeLocale, className }) => {
  return (
    <div className={classNames('locale-switcher-menu', className)}>
      <button className="locale-switcher-menu__option" onClick={() => onChangeLocale('en')}>
        <span className="locale-switcher-menu__text">English</span>
        {selectedLocale === 'en' && (
          <img
            className="locale-switcher-menu__check"
            src={require('../../../../images/check.svg')}
            alt="Выбранная тема"
          />
        )}
      </button>

      <button className="locale-switcher-menu__option" onClick={() => onChangeLocale('ru')}>
        <span className="locale-switcher-menu__text">Русский</span>
        {selectedLocale === 'ru' && (
          <img
            className="locale-switcher-menu__check"
            src={require('../../../../images/check.svg')}
            alt="Выбранная тема"
          />
        )}
      </button>

      <button className="locale-switcher-menu__option" onClick={() => onChangeLocale('de')}>
        <span className="locale-switcher-menu__text">German</span>
        {selectedLocale === 'de' && (
          <img
            className="locale-switcher-menu__check"
            src={require('../../../../images/check.svg')}
            alt="Выбранная тема"
          />
        )}
      </button>

      <button className="locale-switcher-menu__option" onClick={() => onChangeLocale('fr')}>
        <span className="locale-switcher-menu__text">French</span>
        {selectedLocale === 'fr' && (
          <img
            className="locale-switcher-menu__check"
            src={require('../../../../images/check.svg')}
            alt="Выбранная тема"
          />
        )}
      </button>

      <button className="locale-switcher-menu__option" onClick={() => onChangeLocale('it')}>
        <span className="locale-switcher-menu__text">Italian</span>
        {selectedLocale === 'it' && (
          <img
            className="locale-switcher-menu__check"
            src={require('../../../../images/check.svg')}
            alt="Выбранная тема"
          />
        )}
      </button>
    </div>
  )
}
