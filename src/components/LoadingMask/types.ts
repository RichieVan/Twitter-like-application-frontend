type LoadingMaskBackground = 'main' | 'transparent' | 'inherit';
type LoadingMaskWeight = 'thin' | 'clear';

export interface LoadingMaskProps {
  size: number;
  bg: LoadingMaskBackground;
  opacity: number;
  weight?: LoadingMaskWeight;
}
