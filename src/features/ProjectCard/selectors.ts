import { RootState } from '@app/store';
import { createSelector } from '@reduxjs/toolkit';

// Селектор для получения конкретного проекта по projectId
export const selectProjectById = (projectId: string | undefined) =>
  createSelector(
    (state: RootState) => state.boardsListSlice.boardsList,
    (boardsList) => boardsList.find((project) => project.id === projectId)
  );
