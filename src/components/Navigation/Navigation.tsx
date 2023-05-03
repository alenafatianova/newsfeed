import React, { FC } from 'react';
import { categoryTitles } from '../../utils';
import './Navigation.css';

import { Logo } from '@components/Logo/Logo';
import classNames from 'classnames';
import { NavigationItem } from './NavigationItem';

type NavigationType = {
  className: string;
};

export const Navigation: FC<NavigationType> = ({ className = '' }) => {
  return (
    <nav className={classNames('navigation', className)}>
      <Logo />
      <ul className="navigation--list">
        <NavigationItem title="Новости" />
        {Object.entries(categoryTitles).map(([name, title]) => {
          <NavigationItem key={name} title={title} name={name} />;
        })}
      </ul>
    </nav>
  );
};
