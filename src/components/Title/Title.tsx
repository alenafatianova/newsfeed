import React, { ElementType } from 'react';
import './Title.css';
import classNames from 'classnames';

type TitleType = {
  Component?: ElementType;
  className?: string;
};

export const Title: React.FC<TitleType> = ({ className, Component = 'h1', children }) => {
  return <Component className={classNames('title', className)}>{children}</Component>;
};
