import { ButtonHTMLAttributes } from 'react';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  mods?: string[],
  type?: 'button' | 'submit'
}

export default IButtonProps;
