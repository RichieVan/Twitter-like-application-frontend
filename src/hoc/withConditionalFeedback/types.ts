import { FC } from 'react';

interface ConditionalFeedbackProps<D> {
  data: D[];
  isLoading: boolean;
  emptyMessagePrimary: string;
  emptyMessageSecondary: string;
}
interface ConditionalFeedbackConfig<P> {
  propName?: keyof P;
}
type CFProps<D> = ConditionalFeedbackProps<D>;
type CFConfig<P> = ConditionalFeedbackConfig<P>;
type CFCallback<C> = (props: C) => JSX.Element;
export type ConditionalFeedback = <D, P extends object>(Component: FC<Omit<P & CFProps<D>, 'data'>>, config?: CFConfig<P>) => CFCallback<P & CFProps<D>>;
