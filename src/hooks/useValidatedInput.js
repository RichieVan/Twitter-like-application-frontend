import React, { useState, useEffect } from 'react';
import validators from '../lib/validate/validators';

function useValidatedInput(initialValue, validationProps) {
  const [value, setValue] = useState(initialValue);
  const [validated, setValidated] = useState(true);
  const [validatorsData, setValidatorsData] = useState([]);
  const inputValidators = Object.entries(validationProps).map((entry) => {
    const [index, data] = entry;
    return validators[index](data);
  });

  const getValidationData = (inputValue) => {
    const validatingResult = inputValidators.reduce((accumulator, validator) => {
      const result = accumulator;
      const isValidated = validator.validate(inputValue);
      if (accumulator && isValidated) result[0] = true;
      else result[0] = false;
      result[1].push({
        key: validator.getKey(),
        validated: isValidated,
        icon: validator.getIcon(),
        letters: validator.getLetters(inputValue),
        title: validator.getTitle(),
      });
      return result;
    }, [true, []]);
    return validatingResult;
  };

  useEffect(() => {
    if (validatorsData.length === 0) {
      const [isValidated, data] = getValidationData(value);
      setValidated(isValidated);
      setValidatorsData(data);
    }
  }, []);

  const onInput = (e) => {
    const inputValue = e.target.value;
    const [isValidated, data] = getValidationData(inputValue);
    setValue(inputValue);
    setValidated(isValidated);
    setValidatorsData(data);
  };

  return {
    value,
    onInput,
    validated,
    validatorsData,
  };
}

export default useValidatedInput;
