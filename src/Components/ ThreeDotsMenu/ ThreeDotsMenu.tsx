import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Dispatch } from '@app/store';
import { deleteBoard, updateBoard } from '@features/desks/actions';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { Timestamp } from 'firebase/firestore';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface ThreeDotsMenuProps {
  deleteType: 'board' | 'card';
  id: string;
  deskName: string;
  createdAt?: any;
  updatedAt?: any;
}

export const ThreeDotsMenu: FC<ThreeDotsMenuProps> = ({ deleteType, id, deskName, createdAt, updatedAt }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState(deskName);
  const [createdDate, setCreatedDate] = useState('');
  const [updatedDate, setUpdatedDate] = useState('');

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch<Dispatch>();

  const formatDate = (timestamp: Timestamp) => {
    if (timestamp && timestamp.seconds) {
      const milliseconds = timestamp.seconds * 1000;
      const date = new Date(milliseconds);
      return format(date, 'HH:mm dd MMMM yyyy', { locale: ru });
    }
    return null;
  };

  useEffect(() => {
    const updatedFormattedDate = formatDate(updatedAt);
    if (updatedFormattedDate) {
      setUpdatedDate(updatedFormattedDate);
    }
  }, [updatedAt]);

  useEffect(() => {
    if (createdAt) {
      const createdFormattedDate = formatDate(createdAt);
      if (createdFormattedDate) {
        setCreatedDate(createdFormattedDate);
      }
    }
  }, [createdAt]);

  const removeBoard = async () => {
    if (!id) {
      return;
    }
    await dispatch(deleteBoard(id))
      .then(() => {
        console.log(`🗑️ Доска удалена`);
      })
      .catch((error) => {
        console.log(`❌ ${error.message}`);
      });
  };

  const onSaveEdit = async () => {
    if (deskName !== editValue) {
      try {
        dispatch(updateBoard({ id, name: editValue }));
      } catch (error) {
        console.log(error);
      } finally {
        setIsEdit(false);
      }
    }
    setIsEdit(false);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      {isEdit && (
        <TextField
          size="small"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          sx={{
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
          }}
        />
      )}
      {isEdit && (
        <>
          <IconButton
            sx={{ fontSize: '18px', margin: '0 5px 0 20px', color: 'var(--foreground-primary)' }}
            edge="end"
            onClick={onSaveEdit}
          >
            Сохранить
          </IconButton>
          <IconButton
            sx={{ fontSize: '18px', color: 'var(--foreground-primary)' }}
            edge="end"
            onClick={() => {
              setIsEdit(false), setEditValue(deskName);
            }}
          >
            Отменить
          </IconButton>
        </>
      )}
      <Typography
        variant="body2"
        sx={{
          position: 'absolute',
          bottom: '-15px',
          right: '5px',
          width: '250px',
          textAlign: 'left',
          color: 'var(--foreground-primary-hover)',
        }}
      >
        {updatedAt ? `обновлена в: ${updatedDate}` : `создана: ${createdDate}`}
      </Typography>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls="long-menu"
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ color: 'var(--foreground-primary)' }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          '& div>ul': {
            background: 'var(--background-primary)',
            border: '2px solid var( --color-scheme-border-treedot)',
          },
        }}
      >
        <MenuItem
          sx={{
            background: 'var(--background-primary)',
            color: 'var(--foreground-primary-hover)',
            '&:hover': {
              // определение стилей для hover
              background: 'var(--background-primary)',
              color: 'var(--foreground-primary)',
            },
          }}
          onClick={removeBoard}
        >
          Удалить {deleteType == 'board' ? 'доску' : 'карточку'}
        </MenuItem>
        <MenuItem
          sx={{
            background: 'var(--background-primary)',
            color: 'var(--foreground-primary-hover)',
            '&:hover': {
              // определение стилей для hover
              background: 'var(--background-primary)',
              color: 'var(--foreground-primary)',
            },
          }}
          onClick={() => setIsEdit(true)}
        >
          Редактировать
        </MenuItem>
      </Menu>
    </Box>
  );
};
