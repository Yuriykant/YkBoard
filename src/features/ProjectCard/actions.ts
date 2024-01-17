import { createAsyncThunk } from '@reduxjs/toolkit';
import { createDeskApi, deleteDeskApi, getDesksApi, updateDeskApi } from '@app/api';
import { getBoardsState, deleteBoardState } from '@features/boards/slice';
import { IBoard } from './types';

export const fetchBoards = createAsyncThunk('boardList/getBoards', async (_, thunk) => {
  const boardsList = await getDesksApi();
  thunk.dispatch(getBoardsState(boardsList));
  return boardsList;
});

export const createBoard = createAsyncThunk('boardList/createBoard', async (board: Omit<IBoard, 'id'>) => {
  await createDeskApi(board);
  const boardsList = await getDesksApi();
  return boardsList;
});

export const deleteBoard = createAsyncThunk('boardList/deleteBoard', async (id: string, thunk) => {
  const deletedBoard = await deleteDeskApi(id);
  thunk.dispatch(deleteBoardState(id));
  return deletedBoard;
});

export const updateBoard = createAsyncThunk('boardList/updateBoard', async (newBoard: IBoard) => {
  await updateDeskApi(newBoard);
  const boardsList = getDesksApi();
  return boardsList;
});
