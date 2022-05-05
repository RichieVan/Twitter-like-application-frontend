import { ComponentType, FC } from 'react';
import { LoadingMaskProps } from '../../components/LoadingMask/types';

interface CFHOCProps<D> {
  data: D;
  isLoading: boolean;
  loadingProps?: LoadingMaskProps;
  emptyMessagePrimary?: string;
  emptyMessageSecondary?: string;
  emptyDataCallback?: () => void;
  dataVerifyCallback: (data: D) => boolean;
}
interface CFHOCConfig<P> {
  propName: keyof P;
  showEmptyDataMessage?: boolean;
}
type CFHOCCallback<C> = (props: C) => JSX.Element;
export type ConditionalFeedbackHOC = <D, P extends object>(config: CFHOCConfig<P>) => (BaseComponent: ComponentType<Omit<P, keyof CFHOCProps<D>>>) => CFHOCCallback<P & CFHOCProps<D>>;
