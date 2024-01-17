import { Page } from '@Components/Page/Page';
import { BoardPage } from '@features/boards/components/BoardPage/BoardPage';
import { ProjectCardPage } from '@features/ProjectCard/components/ProjectCardPage/ProjectCardPage';
import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

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
      <Route path="/board/:id" element={
        <Page>
          <ProjectCardPage />
        </Page>
      } />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
