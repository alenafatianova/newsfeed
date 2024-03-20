import React, { ButtonHTMLAttributes } from 'react'
import './Button.css'
import { useTranslation } from 'react-i18next'

interface ButtonType extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
}

export const Button: React.FC<ButtonType> = ({ children, loading = true, onClick, ...rest }) => {
  const { t } = useTranslation()
  return (
    <button role="button" className="button" {...rest} onClick={loading ? undefined : onClick} disabled={loading}>
      {children}
      {loading && (
        <span className="button__loading">
          <img src={require('../../images/loader.svg')} alt={t(`button_spinner`)} className="button__spinner" />
        </span>
      )}
    </button>
  )
}
