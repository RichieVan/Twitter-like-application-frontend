import React, { useState, useEffect } from 'react';
import entriesOf from '../lib/entriesOf/entriesOf';
import {
  InputValidationProps,
  LengthValidatorProps,
  ValidationData,
  ValidatorsList,
} from '../lib/validate/types';
import validators from '../lib/validate/validators';

const useValidatedInput = (initialValue: string, validationProps: InputValidationProps) => {
  const [value, setValue] = useState(initialValue);
  const [validated, setValidated] = useState(true);
  const [validatorsData, setValidatorsData] = useState<ValidationData[]>([]);
  const inputValidators = entriesOf(validationProps).reduce<ValidatorsList[]>((acc, entry) => {
    const result = acc;
    const [index, data] = entry;
    if (data) {
      if (index === 'len') {
        result.push(validators[index](data as LengthValidatorProps));
      }

      if (index === 'linebreaks') {
        result.push(validators[index](data as number));
      }
    }
    return result;
  }, []);

  const getValidationData = (inputValue: string) => {
    const validatingResult = inputValidators.reduce<[boolean, ValidationData[]]>((acc, val) => {
      const result = acc;
      const isValidated = val.validate(inputValue);
      if (acc && isValidated) result[0] = true;
      else result[0] = false;
      result[1].push({
        key: val.getKey(),
        validated: isValidated,
        icon: val.getIcon(),
        letters: val.getLetters(inputValue),
        title: val.getTitle(),
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

  const onInput = (e: React.FormEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
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
};

export default useValidatedInput;
