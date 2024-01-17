import React, { useEffect, useState, ChangeEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import { selectProjectById } from '@features/ProjectCard/selectors';
import { useSelector } from 'react-redux';
import { IBoard } from '@features/boards/types';
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import './ProjectCardPage.css';


export const ProjectCardPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const boardData: IBoard | undefined = useSelector(selectProjectById(params.id));
  const [savedBoardData, setSavedBoardData] = useState<IBoard | null>(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (boardData) {
      localStorage.setItem('boardData', JSON.stringify(boardData));
      setSavedBoardData(boardData);
    }
  }, [boardData]);

  useEffect(() => {
    const data = localStorage.getItem('boardData');
    if (data) {
      setSavedBoardData(JSON.parse(data));
    }
  }, []);


  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    // Дополнительная логика поиска
  };


  return (
    <Box className="container">
      <div className="page-header">
        <button onClick={() => navigate(-1)} > <ArrowBackIcon fontSize='large' /></button>
        <Typography variant="h2">{savedBoardData?.name}</Typography>
        <div>
          <Typography variant="h6" >проект создан в {savedBoardData?.createdAt}</Typography>
          {savedBoardData?.updatedAt && <Typography variant="h6" > обновлен был в {savedBoardData?.updatedAt}</Typography>}
        </div>
        <TextField
          label="Поиск"
          variant="outlined"
          value={searchText}
          onChange={handleSearchChange}
          sx={{
            paddingRight: '10px',
            textAlign: 'left',
            '& fieldset': {
              border: '1px solid var(--foreground-primary-hover)',
            },
            '& .MuiOutlinedInput-root': {
              color: 'var(--foreground-primary)',
              '&.Mui-focused fieldset': {
                borderColor: 'var(--foreground-primary-hover)',
                color: 'var(--foreground-primary)',
              },
              '&:hover fieldset': {
                borderColor: 'var(--foreground-primary)',
                backgroundColor: 'rgba(211, 211, 211, 0.212)',
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'var(--foreground-primary)',
              borderColor: 'var(--foreground-primary)',
            },
            '&  .MuiInputLabel-outlined ': {
              color: 'var(--foreground-primary-hover)',
              transition: 'color 0.3s ease-in-out',
            },
            '&:hover  .MuiInputLabel-outlined ': {
              color: 'var(--foreground-primary)',
              transition: 'color 0.3s ease-in-out',
            },
          }}
        />
      </div>
    </Box>
  )
}
