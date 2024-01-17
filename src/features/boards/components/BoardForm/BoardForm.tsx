import React, { FC, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

import { Dispatch } from '@app/store';
import { createBoard } from '@features/boards/actions';

export const BoardForm: FC = () => {
  const [inputvalue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');

  const dispatch = useDispatch<Dispatch>();

  const onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputvalue.trim()) {
      return setInputError('Нужен текст названия вашей доски');
    }
    setInputValue('');
    setInputError('');
    onSubmit(inputvalue);
  };

  const clearInputError = () => {
    setInputError('');
  };

  const onSubmit = async (value: string) => {
    await dispatch(createBoard({ name: value, }));
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(() => value);
  };

  return (
    <Box component="form" sx={{ display: 'flex', justifyContent: 'space-between' }} noValidate onSubmit={onSubmitForm}>
      <TextField
        value={inputvalue}
        onChange={onChange}
        onClick={clearInputError}
        label="Создать новую доску"
        variant="outlined"
        sx={{
          width: '100%',
          paddingRight: '10px',
          textAlign: 'left',
          '& fieldset': {
            // рамка в покое
            border: '1px solid var(--foreground-primary-hover)',
          },
          '& .MuiOutlinedInput-root': {
            // текст внутри input
            color: 'var(--foreground-primary)',
            '&.Mui-focused fieldset': {
              // когда уходим с поля
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
        error={!!inputError.length}
        helperText={inputError}
      />
      <Button
        type="submit"
        variant="outlined"
        sx={{
          padding: '0 25px',
          color: 'var(--foreground-primary-hover)',
          borderColor: 'lightgray',
          maxHeight: '56px',
          '&:hover': {
            backgroundColor: 'rgba(211, 211, 211, 0.212)',
            borderColor: 'var(--foreground-primary)',
            color: 'var(--foreground-primary)',
          },
        }}
        endIcon={<LibraryAddIcon fontSize="medium" />}
      >
        создать
      </Button>
    </Box>
  );
};
