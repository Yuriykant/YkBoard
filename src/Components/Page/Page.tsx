import React, { FC, ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { ColorSchemeSwitcher } from '@features/colorScheme/components/ColorSchemeSwitcher/ColorSchemeSwitcher';

import './Page.css';
import { Logo } from '@Components/Logo/Logo';

type PageProps = {
  children: ReactNode;
};

export const Page: FC<PageProps> = ({ children }) => {
  // const [emailModalShown, setEmainModalShown] = useState(!localStorage.getItem(LS_EMAIL_SHOWN_KEY));
  return (
    <div className="page">
      <header className="header">
        <div className="container header__container">
          <Grid item container justifyContent="flex-start" alignItems="center">
            <Avatar
              src="https://otkritkis.com/wp-content/uploads/2022/01/avatarki-dlya-skype1.jpeg"
              alt="avatar"
              sx={{ marginLeft: '10px', width: 60, height: 60 }}
            />
            <Typography variant="body1" sx={{ color: 'var(--constant-accent)', marginLeft: '15px', fontSize: '20px' }}>
              Admin
            </Typography>
          </Grid>
          <Logo />
          <div className="header__controls">
            <ColorSchemeSwitcher />
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <div className="container">
          YKboard Сделано Юрием{' '}
          <a className="footer__link" href="https://github.com/Yuriykant" target="_blank" rel="noreferrer">
            Ссылка на репозиторий github
          </a>
        </div>
      </footer>
    </div>
  );
};
