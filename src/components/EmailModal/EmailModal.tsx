import React from 'react'
import './EmailModal.css'
import cross from '../../images/cross.svg'
import { ModalWrapper } from '@components/ModalWrapper/ModalWrapper'

interface EmailModalType {
  onModalClose: VoidFunction
}

export const EmailModal: React.FC<EmailModalType> = ({ onModalClose }) => {
  return (
    <>
    <ModalWrapper onModalClose={onModalClose}>
    <div className='email-modal'>
      <h2 className='email-modal__title'>
        Хотите получать последние новости от <a href='https://karpov.courses/new' target='_blank' rel="noreferrer" className='email-modal__link'>Karpov.Courses</a>?
      </h2>
      <p className='email-modal__text'>Оставьте свой e-mail и будем на связи! </p>
     <form className='email-modal__form'>
     <input type="text" className='email-modal__input' placeholder='Введите вашу почту' />
     <button className='email-modal__submit'>Подписаться</button>
     </form>
     <button className="email-modal__cross" onClick={onModalClose}>
      <img src={cross} alt="Закрытие модального окна" />
     </button>
    </div>
    </ModalWrapper>
    </>
  )
}
