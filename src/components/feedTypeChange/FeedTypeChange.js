import { observer } from 'mobx-react-lite';
import React, { useContext, useRef, useState } from 'react';

import { Context } from '../../Context';

function FeedTypeChange() {
  const { postStore } = useContext(Context);
  const [isChecked, setChecked] = useState(postStore.feedType === 'subs');
  const inputElement = useRef(null);

  const showAllClickHandler = () => {
    if (inputElement.current.checked && postStore.canChangeFeedType) {
      postStore.setCanChangeFeedType(false);
      setChecked(false);
      postStore.setFeedType('all');
    }
  };

  const showSubsClickHandler = () => {
    if (!inputElement.current.checked && postStore.canChangeFeedType) {
      postStore.setCanChangeFeedType(false);
      setChecked(true);
      postStore.setFeedType('subs');
    }
  };

  return (
    <div className="feed-type">
      <div className="feed-type__wrapper">
        <button
          type="button"
          className="feed-type__option"
          onClick={() => showAllClickHandler()}
        >
          Все
        </button>
        <label
          className="feed-type__label"
          htmlFor="feedTypeChange"
        >
          <input
            ref={inputElement}
            type="checkbox"
            className="feed-type__check"
            id="feedTypeChange"
            name="feedTypeChange"
            checked={isChecked}
            disabled={!postStore.canChangeFeedType}
            onChange={(e) => {
              postStore.setCanChangeFeedType(false);

              if (e.target.checked) postStore.setFeedType('subs');
              else postStore.setFeedType('all');

              setChecked(e.target.checked);
            }}
          />
          <span />
        </label>
        <button
          type="button"
          className="feed-type__option"
          onClick={() => showSubsClickHandler()}
        >
          Подписки
        </button>
      </div>
    </div>
  );
}

export default observer(FeedTypeChange);
