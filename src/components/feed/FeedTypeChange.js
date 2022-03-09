import { observer } from 'mobx-react-lite';
import React, { useContext, useRef, useState } from 'react';
import { Context } from '../..';

function FeedTypeChange() {
  const { postStore } = useContext(Context);
  const [isChecked, setChecked] = useState(postStore.feedType === 'subs');
  const inputElement = useRef(null);

  const allLabelClickHandler = () => {
    if (inputElement.current.checked && postStore.canChangeFeedType) {
      postStore.setCanChangeFeedType(false);
      setChecked(false);
      postStore.setFeedType('all');
    }
  };

  const subscribedLabelClickHandler = () => {
    if (!inputElement.current.checked && postStore.canChangeFeedType) {
      postStore.setCanChangeFeedType(false);
      setChecked(true);
      postStore.setFeedType('subs');
    }
  };

  return (
    <div className="feed-tc_container">
      <div className="input-container">
        <button
          type="button"
          className="feed-tc_label"
          onClick={() => allLabelClickHandler()}
        >
          Все
        </button>
        <div className="input-wrapper">
          <input
            ref={inputElement}
            type="checkbox"
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
          <label htmlFor="feedTypeChange" />
        </div>
        <button
          type="button"
          className="feed-tc_label"
          onClick={() => subscribedLabelClickHandler()}
        >
          Подписки
        </button>
      </div>
    </div>
  );
}

export default observer(FeedTypeChange);
