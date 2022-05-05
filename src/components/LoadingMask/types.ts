type LoadingMaskBackground = 'main' | 'transparent' | 'inherit';
type LoadingMaskWeight = 'thin' | 'clear';

export interface LoadingMaskProps {
  size?: number;
  position?: 'absolute' | 'static' | 'relative';
  bg?: LoadingMaskBackground;
  opacity?: number;
  weight?: LoadingMaskWeight;
}
