import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import { PostActionsProps } from './types';
import getClassList from '../../lib/getClassList/getClassList';

const PostActions: FC<PostActionsProps> = ({
  actions,
  show,
  showHandler,
  showButtonMods = [],
  mods = [],
}) => {
  const containerClassList = getClassList('post-actions', mods);
  const listContainerMods = show ? ['active'] : [];
  const listContainerClassList = getClassList('post-actions__list-container', listContainerMods);

  return (
    <div className={containerClassList}>
      <div className="post-actions__wrapper">
        <button
          type="button"
          className={getClassList('post-actions__open', showButtonMods)}
          onClick={(e) => {
            e.stopPropagation();
            showHandler();
          }}
        >
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>
        <div
          className={listContainerClassList}
          role="presentation"
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="post-actions__list">
            {actions.map(({
              name,
              handler,
              icon,
              type = 'default',
            }) => {
              const actionMods = [];
              if (type !== 'default') actionMods.push(`type_${type}`);
              const actionClassList = getClassList('post-actions__button', actionMods);

              return (
                <li className="post-actions__option" key={name}>
                  <button
                    type="button"
                    className={actionClassList}
                    onClick={handler}
                  >
                    {typeof icon !== 'undefined' && (
                      <i className="post-actions__option-icon icon">
                        <FontAwesomeIcon icon={icon} />
                      </i>
                    )}
                    <span>{name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostActions;
