import { observer } from 'mobx-react-lite';
import React, {
  FC, useContext, useRef, useState,
} from 'react';

import { Context } from '../../Context';

const FeedTypeChange: FC = () => {
  const { postStore } = useContext(Context);
  const [isChecked, setChecked] = useState(postStore.feedType === 'subs');
  const inputElement = useRef<HTMLInputElement>(null);

  const showAllClickHandler = () => {
    if (inputElement.current && inputElement.current.checked && postStore.canChangeFeedType) {
      postStore.setCanChangeFeedType(false);
      setChecked(false);
      postStore.setFeedType('all');
    }
  };

  const showSubsClickHandler = () => {
    if (inputElement.current && !inputElement.current.checked && postStore.canChangeFeedType) {
      postStore.setCanChangeFeedType(false);
      setChecked(true);
      postStore.setFeedType('subs');
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    postStore.setCanChangeFeedType(false);

    if (e.target.checked) postStore.setFeedType('subs');
    else postStore.setFeedType('all');

    setChecked(e.target.checked);
  };

  return (
    <div className="feed-type">
      <div className="feed-type__wrapper">
        <button
          type="button"
          className="feed-type__option"
          onClick={showAllClickHandler}
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
            onChange={(e) => onChangeHandler(e)}
          />
          <span />
        </label>
        <button
          type="button"
          className="feed-type__option"
          onClick={showSubsClickHandler}
        >
          Подписки
        </button>
      </div>
    </div>
  );
};

export default observer(FeedTypeChange);
