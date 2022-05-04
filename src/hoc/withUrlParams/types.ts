import { ComponentType } from 'react';

interface UrlParamsVerifyProps {
  cancellingAction?: () => void;
}
interface UrlParamsVerifyConfig {
  params: string[];
}
type UPVCallback<P> = (props: P) => JSX.Element | null;
export type WithUrlParamsVerify = <P extends object>(Component: ComponentType<Omit<P, keyof UrlParamsVerifyProps>>, config: UrlParamsVerifyConfig) => UPVCallback<P & UrlParamsVerifyProps>;