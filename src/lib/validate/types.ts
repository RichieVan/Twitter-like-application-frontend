import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface ILengthValidator {
  getTitle(): string;
  getIcon(): IconDefinition;
  getLetters(value: string): number;
  getKey(): string;
  val(value: string): string;
  validate(value: string): boolean;
}

export interface ILinebreaksValidator {
  getTitle(): string;
  getIcon(): IconDefinition;
  getLetters(value: string): number;
  getKey(): string;
  val(value: string): number;
  validate(value: string): boolean;
}

export type ValidatorsList = ILengthValidator | ILinebreaksValidator;

export type LengthValidatorProps = {
  min: number;
  max: number;
};

export type ValidationData = {
  key: string;
  validated: boolean;
  icon: IconDefinition;
  letters: number;
  title: string;
};

export type InputValidationProps = {
  len?: LengthValidatorProps;
  linebreaks?: number;
};

export interface InputValidators {
  len: (data: LengthValidatorProps) => ILengthValidator;
  linebreaks: (req: number) => ILinebreaksValidator;
}
