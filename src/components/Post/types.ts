import { ReactElement } from 'react';
import { PostData } from '../../types/types';

export interface PostProps {
  id: number;
  data: PostData;
  contentArray: ReactElement[];
}
