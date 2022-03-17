import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import getClassList from '../../lib/getClassList';

function FormInput({
  type = 'text',
  name = '',
  id = null,
  value = '',
  labelText = '123',
  disabled = false,
  placeholder = null,
  required = false,
  inputValidated = true,
  validatorsData = null,
  onInput,
  textarea = false,
  textareaRows = 3,
  mods = [],
}) {
  const classList = getClassList('form-input', mods);

  const renderInput = () => {
    if (validatorsData) {
      const validatorsList = validatorsData.map((data) => {
        const {
          key,
          validated,
          title,
          letters,
          icon,
        } = data;

        return (
          <div
            key={`${name}_${key}`}
            className="form-input__requirement"
            data-validator={key}
            data-validated={validated}
            title={title}
          >
            {letters}
            {icon && <FontAwesomeIcon icon={icon} />}
          </div>
        );
      });

      if (textarea) {
        return (
          <>
            <div className="form-input__requirements-list">
              {validatorsList}
            </div>
            <textarea
              className="form-input__field"
              name={name}
              id={id}
              disabled={disabled}
              value={value}
              rows={textareaRows}
              data-validated={inputValidated}
              data-empty={value.length === 0}
              onInput={(e) => onInput(e)}
            />
          </>
        );
      }

      return (
        <>
          <div className="form-input__requirements-list">
            {validatorsList}
          </div>
          <input
            type={type}
            className="form-input__field"
            name={name}
            id={id}
            disabled={disabled}
            value={value}
            data-validated={inputValidated}
            data-empty={value.length === 0}
            onInput={(e) => onInput(e)}
          />
        </>
      );
    }

    if (textarea) {
      return (
        <textarea
          className="form-input__field"
          name={name}
          id={id}
          disabled={disabled}
          value={value}
          rows={textareaRows}
          data-empty={value.length === 0}
          onInput={(e) => onInput(e)}
        />
      );
    }

    return (
      <input
        type={type}
        className="form-input__field"
        name={name}
        id={id}
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        required={required}
        data-empty={value.length === 0}
        onInput={(e) => onInput(e)}
      />
    );
  };

  return (
    <div className={classList}>
      {renderInput()}
      <label htmlFor={id}>{labelText}</label>
    </div>
  );
}

export default FormInput;
