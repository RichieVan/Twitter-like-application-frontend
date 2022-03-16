import { faPenAlt } from '@fortawesome/free-solid-svg-icons';

class LengthValidator {
  min;

  max;

  icon = faPenAlt;

  key = 'len';

  constructor(data) {
    const [min, max] = data;
    this.min = min;
    this.max = max;
  }

  getTitle() {
    let result;
    if (this.min > 0 && this.max > 0) {
      result = `От ${this.min} до ${this.max} символов`;
    } else if (this.max > 0) {
      result = `Не больше ${this.max} символов`;
    } else {
      result = 'Поле должно быть пустым';
    }
    return result;
  }

  getIcon() {
    return this.icon;
  }

  getLetters(value) {
    return this.max - this.val(value).length;
  }

  getKey() {
    return this.key;
  }

  val(value) {
    return value;
  }

  validate(value) {
    const isHigherOrEqualMin = this.val(value).length >= this.min;
    const isLowerOrEqualMax = this.val(value).length <= this.max;
    const validated = isHigherOrEqualMin && isLowerOrEqualMax;

    return validated;
  }
}

export default LengthValidator;
