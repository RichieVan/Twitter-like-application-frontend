import { faPenAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ILengthValidator, LengthValidatorProps } from '../types';

class LengthValidator implements ILengthValidator {
  min: number;

  max: number;

  icon: IconDefinition = faPenAlt;

  key = 'len';

  constructor({ min, max }: LengthValidatorProps) {
    this.min = min;
    this.max = max;
  }

  getTitle(): string {
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

  getIcon(): IconDefinition {
    return this.icon;
  }

  getLetters(value: string): number {
    return this.max - this.val(value).length;
  }

  getKey(): string {
    return this.key;
  }

  val(value: string): string {
    return value;
  }

  validate(value: string): boolean {
    const isHigherOrEqualMin = this.val(value).length >= this.min;
    const isLowerOrEqualMax = this.val(value).length <= this.max;
    const validated = isHigherOrEqualMin && isLowerOrEqualMax;

    return validated;
  }
}

export default LengthValidator;
