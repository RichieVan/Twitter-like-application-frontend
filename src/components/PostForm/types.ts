import { UserData } from '../../types/types';

export type SubmitActionData = {
  textContent: string;
  userId: number;
};

export interface PostFormProps {
  userData: UserData;
  submitAction: (data: SubmitActionData) => Promise<void>;
  placeholder?: string;
}
