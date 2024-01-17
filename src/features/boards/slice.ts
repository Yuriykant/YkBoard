import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createBoard, fetchBoards, updateBoard } from './actions';
import { IBoard } from './types';

interface InitialState {
  boardsList: IBoard[];
  loading: boolean;
}

const initialState: InitialState = {
  boardsList: [],
  loading: false,
};

export const boardsListSlice = createSlice({
  name: 'boardList',
  initialState,
  reducers: {
    getBoardsState: (state, action: PayloadAction<IBoard[]>) => {
      state.boardsList = action.payload;
    },
    deleteBoardState: (state, action: PayloadAction<string>) => {
      state.boardsList = state.boardsList.filter((board) => board.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        boardsListSlice.caseReducers.getBoardsState(state, { type: action.type, payload: action.payload });
        state.loading = false;
      })
      .addCase(fetchBoards.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createBoard.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.boardsList = action.payload;
        state.loading = false;
      })
      .addCase(createBoard.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateBoard.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        state.boardsList = action.payload;
        state.loading = false;
      })
      .addCase(updateBoard.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { getBoardsState, deleteBoardState } = boardsListSlice.actions;
export default boardsListSlice.reducer;
