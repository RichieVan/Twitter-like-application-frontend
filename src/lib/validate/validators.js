import LengthValidator from './validators/LengthValidator';
import LinebreaksValidator from './validators/LinebreaksValidator';

const validators = {
  len: (data) => new LengthValidator(data),
  linebreaks: (req) => new LinebreaksValidator(req),
};

export default validators;
