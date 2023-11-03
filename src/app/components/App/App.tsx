import { Page } from '@Components/Page/Page';
import { BoardPage } from '@features/desks/components/BoardPage/BoardPage';
import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

export const App: FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Page>
            <BoardPage />
          </Page>
        }
      />
    </Routes>
  );
};
