import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IBoard } from '@features/boards/types';
import { BoardForm } from '../BoardForm/BoardForm';
import { ThreeDotsMenu } from '@Components/ ThreeDotsMenu/ ThreeDotsMenu';
import { useNavigate } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import './BoardPage.css';

import { Dispatch } from '@app/store';
import { fetchBoards } from '@features/boards/actions';
import { getBoards, setLoading } from '@features/boards/selectors';

export const BoardPage = () => {
  const dispatch = useDispatch<Dispatch>();
  const desks = useSelector(getBoards);
  const loading = useSelector(setLoading);
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(fetchBoards());
  }, []);

  return (
    <Box className="container">
      <Paper
        elevation={6}
        sx={{
          padding: '25px 30px',
          borderRadius: 5,
          margin: '50px auto 0',
          textAlign: 'center',
          background: 'var(--background-primary)',
          marginBottom: '45px',
        }}
      >
        <BoardForm />
        {loading && (
          <Box sx={{ p: 5, textAlign: 'center' }}>
            <CircularProgress />
          </Box>
        )}
        {desks &&
          desks.map((desk: IBoard) => (
            <Paper
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                cursor: 'pointer',
                m: '10px 0',
                p: '15px 20px',
                background: 'var(--background-zero)',
              }}
              elevation={2}
              key={desk.id}
              onClick={(e) => {
                const target = e.target as HTMLElement;
                if (target.classList.contains('MuiPaper-root') || target.classList.contains('MuiTypography-root')) {
                  navigate((`/board/${desk.id}`));
                }
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ color: 'var(--foreground-primary)' }}>
                {desk.name}
              </Typography>
              <ThreeDotsMenu
                id={desk.id}
                deleteType={'board'}
                deskName={desk.name}
                createdAt={desk.createdAt}
                updatedAt={desk.updatedAt}
              />
            </Paper>
          ))}
      </Paper>
    </Box>
  );
};
