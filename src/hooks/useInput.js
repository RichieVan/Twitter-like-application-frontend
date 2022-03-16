import React, { useState } from 'react';

function useInput(initialValue = '') {
  const [value, setValue] = useState(initialValue);

  const onInput = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };

  return {
    value,
    onInput,
  };
}

export default useInput;
