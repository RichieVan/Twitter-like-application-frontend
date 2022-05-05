import { ComponentType } from 'react';

interface UPHOCProps {
  cancellingAction?: () => void;
}
interface UPHOCConfig {
  params: string[];
}
type UPHOCCallback<P> = (props: P) => JSX.Element | null;
export type UrlParamsHOC = <P extends object>(Component: ComponentType<Omit<P, keyof UPHOCProps>>, config: UPHOCConfig) => UPHOCCallback<P & UPHOCProps>;