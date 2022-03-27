import React, { FC } from 'react';
import { faStream } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const SidebarNavigation: FC = () => (
  <nav className="sidebar-navigation">
    <ul className="sidebar-navigation__list">
      <li className="sidebar-navigation__item">
        <Link
          to="/feed"
          className="sidebar-navigation__link"
        >
          <FontAwesomeIcon icon={faStream} />
          <span>Главная</span>
        </Link>
      </li>
    </ul>
  </nav>

);

export default SidebarNavigation;
