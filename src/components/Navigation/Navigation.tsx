import React, { FC } from 'react';
import { categoryNames } from '../../utils';
import './Navigation.css';
import { NavLink } from 'react-router-dom';
import { Logo } from '@components/Logo/Logo';
import classNames from 'classnames';

type NavigationType = {
  className: string;
};

export const Navigation: FC<NavigationType> = ({ className = '' }) => {
  return (
    <nav className={classNames('navigation', className)}>
      <Logo />
      <ul className="navigation--list">
        {['index', 'fashion', 'technologies', 'sport', 'karpov'].map((item) => {
          return (
            <li className="navigation--item" key={item}>
              <NavLink
                to={`/${item}`}
                className={'navigation--link'}
                style={({ isActive }) => ({ color: isActive ? 'navigation--link active' : '' })}
              >
                {categoryNames[item]}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
