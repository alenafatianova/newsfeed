import React, { Reducer, useReducer, useState } from 'react';
import './LoginContainer.css';
import { LoginField, LoginForm } from '@components/LoginForm/LoginForm';
import { validateEmail } from './utils';
import { useAuthContext } from '../AuthContextProvider';
import { Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

type LoginStateType = Omit<LoginField, 'onFieldChange'>;

type LoginActionType = {
  type: 'onFieldChange' | 'error';
  value: string;
};

const reducer = (state: LoginStateType, action: LoginActionType): LoginStateType => {
  switch (action.type) {
    case 'onFieldChange':
      return {
        ...state,
        error: false,
        helperText: '',
        value: action.value,
      };
    case 'error':
      return {
        ...state,
        error: true,
        helperText: action.value,
      };
    default:
      throw new Error();
  }
};

export const LoginContainer: React.FC = () => {
  const [emailState, dispatchEmail] = useReducer<Reducer<LoginStateType, LoginActionType>>(reducer, {
    name: 'email',
    value: '',
  });
  const [passwordState, dispatchPassword] = useReducer<Reducer<LoginStateType, LoginActionType>>(reducer, {
    name: 'password',
    value: '',
  });
  const navigateState = useNavigate();
  const location = useLocation();
  const [authError, setAuthError] = useState('');
  const { loginWithEmailAndPassword } = useAuthContext();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isValid = true;
    if (!validateEmail(emailState.value)) {
      dispatchEmail({
        type: 'error',
        value: 'Введите корректный email',
      });
      isValid = false;
    }

    if (passwordState?.value?.length <= 6) {
      dispatchPassword({
        type: 'error',
        value: 'Длина пароля должна быть больше 6 символов',
      });
      isValid = false;
    }

    if (isValid) {
      loginWithEmailAndPassword(emailState?.value, passwordState?.value)
        .then(() => {
          navigateState(location?.state?.from || '/admin');
        })
        .catch((err) => {
          setAuthError(err.message || 'error');
        });
    }
  };

  return (
    <div className="login-container">
      {authError && (
        <Typography variant="subtitle2" color={'InfoText'}>
          {authError}
        </Typography>
      )}

      <LoginForm
        email={{
          ...emailState,
          onFieldChange: (e) => {
            dispatchEmail({ type: 'onFieldChange', value: e.currentTarget.value });
          },
        }}
        password={{
          ...passwordState,
          onFieldChange: (e) => {
            dispatchPassword({ type: 'onFieldChange', value: e.currentTarget.value });
          },
        }}
        className=""
        onFormSubmit={onSubmit}
      />
    </div>
  );
};
