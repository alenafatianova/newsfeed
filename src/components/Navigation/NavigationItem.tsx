import React from 'react';
import { NavLink } from 'react-router-dom';

type NavigationItemType = {
  title?: string;
  name?: string;
};

export const NavigationItem: React.FC<NavigationItemType> = ({ title, name }) => {
  return (
    <li>
      <li className="navigation--item" key={name}>
        <NavLink
          to={`/${name}`}
          className={'navigation--link'}
          style={({ isActive }) => ({ color: isActive ? 'navigation--link active' : '' })}
        >
          {title}
        </NavLink>
      </li>
    </li>
  );
};
