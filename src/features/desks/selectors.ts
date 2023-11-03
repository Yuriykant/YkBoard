import { RootState } from '@app/store';
import { IBoard } from './types';

export const getBoards = (state: RootState): IBoard[] | null => {
  return state.boardsListSlice.boardsList;
};

export const setLoading = (state: RootState) => state.boardsListSlice.loading;
