import { MouseEventHandler } from 'react';

// interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
interface IButtonProps {
  mods?: string[];
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default IButtonProps;
