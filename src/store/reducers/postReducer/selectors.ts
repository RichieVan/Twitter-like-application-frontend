import { Selector } from '@reduxjs/toolkit';
import type { RootState } from '../../index';
import { PostState } from './types';

export const selectPost: Selector<RootState, PostState> = ({ post }) => post;
