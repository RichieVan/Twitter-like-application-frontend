import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, FormEventHandler } from 'react';
import getClassList from '../../lib/getClassList/getClassList';
import { ValidationData } from '../../lib/validate/types';

// interface FormInputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>
interface FormInputProps {
  type?: 'text' | 'number' | 'password' | 'email';
  name?: string;
  id?: string;
  value?: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
  onInput: FormEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  validated?: boolean;
  validatorsData?: ValidationData[];
  textarea?: boolean;
  textareaRows?: number;
  mods?: string[];
}

const FormInput: FC<FormInputProps> = ({
  type = 'text',
  name,
  id,
  value = '',
  label = '',
  disabled,
  placeholder,
  required,
  onInput,
  validated = true,
  validatorsData = [],
  textarea = false,
  textareaRows = 3,
  mods = [],
}) => {
  const classList = getClassList('form-input', mods);

  const renderInput = () => {
    if (validatorsData.length) {
      const validatorsList = validatorsData.map((data) => {
        const {
          key,
          title,
          letters,
          icon,
        } = data;

        return (
          <div
            key={`${name}_${key}`}
            className="form-input__requirement"
            data-validator={key}
            data-validated={data.validated}
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
              data-validated={validated}
              data-empty={value.length === 0}
              onInput={onInput}
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
            data-validated={validated}
            data-empty={value.length === 0}
            onInput={onInput}
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
          onInput={onInput}
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
        onInput={onInput}
      />
    );
  };

  return (
    <div className={classList}>
      {renderInput()}
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default FormInput;
