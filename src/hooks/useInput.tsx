import React, { useState } from 'react';

function useInput(initialValue = '') {
  const [value, setValue] = useState(initialValue);

  const onInput = (e: React.FormEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    setValue(inputValue);
  };

  return {
    value,
    onInput,
  };
}

export default useInput;
