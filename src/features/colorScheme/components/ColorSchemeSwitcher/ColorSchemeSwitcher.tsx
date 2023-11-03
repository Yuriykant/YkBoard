import React, { FC, useEffect, useRef, useState } from 'react';
import {
  applyScheme,
  getSavedScheme,
  getSystemScheme,
  removeSavedScheme,
} from '@features/colorScheme/colorSchemeUtils';
import { Auto } from '@Components/Icons/Auto';
import { Moon } from '@Components/Icons/Moon';
import { Sun } from '@Components/Icons/Sun';
import { Dropdown } from '@Components/Dropdown/Dropdown';
import './ColorSchemeSwitcher.css';

type ColorSchemeSwitcherValues = 'auto' | 'dark' | 'light';

const matchMedia = window.matchMedia('(prefers-color-scheme:dark)');

export const ColorSchemeSwitcher: FC = () => {
  const [userScheme, setUserScheme] = useState<ColorSchemeSwitcherValues>(getSavedScheme() || 'auto');
  const [dropdownShown, setDropdownShown] = useState(false);
  const targetRef = useRef<HTMLButtonElement>(null);

  // если пользователь выбрал auto то примени системную тему
  useEffect(() => {
    if (userScheme === 'auto') {
      removeSavedScheme();
      applyScheme(getSystemScheme());
    } else {
      applyScheme(userScheme, true);
    }
  }, [userScheme]);

  useEffect(() => {
    const systemColorSchemeListener = () => {
      if (userScheme === 'auto') {
        applyScheme(getSystemScheme());
      }
    };
    matchMedia.addEventListener('change', systemColorSchemeListener);

    return () => {
      matchMedia.removeEventListener('change', systemColorSchemeListener);
    };
  }, [userScheme]);

  return (
    <div className="color-scheme-switcher">
      <button
        className="color-scheme-switcher__value"
        ref={targetRef}
        onClick={() => {
          setDropdownShown(!dropdownShown);
        }}
      >
        {/* есть запись через объект можно переделать */}
        {userScheme === 'auto' && <Auto />}
        {userScheme === 'dark' && <Moon />}
        {userScheme === 'light' && <Sun />}
      </button>
      <Dropdown shown={dropdownShown} onShownChange={setDropdownShown} targetRef={targetRef}>
        <button className="color-scheme-switcher__option" onClick={() => setUserScheme('auto')}>
          <Auto />
          <span className="color-scheme-switcher__text">Авто</span>
          {userScheme === 'auto' && (
            <img
              className="color-scheme-switcher__check"
              src={require('../../../../images/check.svg')}
              alt="Выбранная тема"
            />
          )}
        </button>
        <button className="color-scheme-switcher__option" onClick={() => setUserScheme('light')}>
          <Sun />
          <span className="color-scheme-switcher__text">Светлая</span>
          {userScheme === 'light' && (
            <img
              className="color-scheme-switcher__check"
              src={require('../../../../images/check.svg')}
              alt="Выбранная тема"
            />
          )}
        </button>
        <button className="color-scheme-switcher__option" onClick={() => setUserScheme('dark')}>
          <Moon />
          <span className="color-scheme-switcher__text">Темная</span>
          {userScheme === 'dark' && (
            <img
              className="color-scheme-switcher__check"
              src={require('../../../../images/check.svg')}
              alt="Выбранная тема"
            />
          )}
        </button>
      </Dropdown>
    </div>
  );
};
