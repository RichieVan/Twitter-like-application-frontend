import { InputValidators, LengthValidatorProps } from './types';
import LengthValidator from './validators/LengthValidator';
import LinebreaksValidator from './validators/LinebreaksValidator';

const validators: InputValidators = {
  len: (data: LengthValidatorProps) => new LengthValidator(data),
  linebreaks: (req: number) => new LinebreaksValidator(req),
};

export default validators;
