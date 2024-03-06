import React from 'react'
import './Error.css'

export const Error: React.FC = () => {
  return (
    <div className="error__wrapper">
      <h1 className="error__title">Oops! Something gone wrong</h1>

      <div className="error__text_wrapper">
        <p className="error__text">Don&#39;t worry, we already are working on it </p>
      </div>
      <div className="error__image_wrapper">
        <img className="error__image" src={require('../../images/categories/Socket.jpg')} />
      </div>
    </div>
  )
}
