import React from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStream } from '@fortawesome/free-solid-svg-icons';

import './style.css';

function SidebarLeft() {
  return (
    <div className="sidebar-left">
      <div className="sb-block_container">
        <ul className="links-list">
          <li>
            <Link to="/feed">
              <FontAwesomeIcon icon={faStream} />
              <span>Главная</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default observer(SidebarLeft);
