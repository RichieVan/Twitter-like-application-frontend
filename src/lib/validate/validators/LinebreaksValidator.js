import { faLevelDownAlt } from '@fortawesome/free-solid-svg-icons';

class LinebreaksValidator {
  req;

  icon = faLevelDownAlt;

  key = 'linebreaks';

  constructor(req) {
    this.req = req;
  }

  getTitle() {
    return `Не больше ${this.req} переносов строки`;
  }

  getIcon() {
    return this.icon;
  }

  getLetters(value) {
    return this.req - this.val(value);
  }

  getKey() {
    return this.key;
  }

  val(value) {
    return (value.match(/(\n)/g) !== null ? value.match(/(\n)/g).length : 0);
  }

  validate(value) {
    const validated = this.val(value) <= this.req;
    return validated;
  }
}

export default LinebreaksValidator;
