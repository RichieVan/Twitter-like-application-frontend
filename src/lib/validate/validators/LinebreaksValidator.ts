import { faLevelDownAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ILinebreaksValidator } from '../types';

class LinebreaksValidator implements ILinebreaksValidator {
  req: number;

  icon: IconDefinition = faLevelDownAlt;

  key = 'linebreaks';

  constructor(req: number) {
    this.req = req;
  }

  getTitle(): string {
    return `Не больше ${this.req} переносов строки`;
  }

  getIcon(): IconDefinition {
    return this.icon;
  }

  getLetters(value: string): number {
    return this.req - this.val(value);
  }

  getKey(): string {
    return this.key;
  }

  val(value: string): number {
    const matchedArray = value.match(/(\n)/g);
    return (matchedArray !== null ? matchedArray.length : 0);
  }

  validate(value: string): boolean {
    const validated = this.val(value) <= this.req;
    return validated;
  }
}

export default LinebreaksValidator;
