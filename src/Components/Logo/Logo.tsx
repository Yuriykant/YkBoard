import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/Logo.svg';
import './Logo.css';

export const Logo: FC = () => {
  return (
    <NavLink to="/" className="logo">
      <img src={logo} alt="Логотип" className="logo__image" />
    </NavLink>
  );
};
