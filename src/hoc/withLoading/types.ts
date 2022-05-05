import { ComponentType } from 'react';
import { LoadingMaskProps } from '../../components/LoadingMask/types';

interface LHOCProps {
  isLoading: boolean;
  loadingProps?: LoadingMaskProps;
}
interface LHOCConfig<P> {
  overlap: boolean;
}
type LHOCCallback<C> = (props: C) => JSX.Element;
export type LoadingHOC = <P extends object>(config: LHOCConfig<P>) => (BaseComponent: ComponentType<Omit<P, keyof LHOCProps>>) => LHOCCallback<P & LHOCProps>;
