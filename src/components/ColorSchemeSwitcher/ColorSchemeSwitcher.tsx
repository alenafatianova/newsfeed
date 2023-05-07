import React, { useEffect, useRef, useState } from 'react';
import './ColorSchemeSwitcher.css';
import { applyColorSceme, getSystemColorScheme, getSavedScheme, removeSavedScheme } from '../../colorSchemeUtils';
import { AutoScheme } from '@components/Icons/AutoScheme';
import { DarkScheme } from '@components/Icons/DarkScheme';
import { LightScheme } from '@components/Icons/LightScheme';
import { Dropdown } from '@components/Dropdown/Dropdown';

type colorSchemeValues = 'dark' | 'light' | 'auto';

const matchMedia = window.matchMedia('(prefers-color-scheme:dark)');

export const ColorSchemeSwitcher: React.FC = () => {
  const [userScheme, setUserScheme] = useState<colorSchemeValues>(getSavedScheme() || 'auto');
  const targetRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (userScheme === 'auto') {
      removeSavedScheme();
      applyColorSceme(getSystemColorScheme());
    } else {
      applyColorSceme(userScheme, true);
    }
  }, [userScheme]);

  useEffect(() => {
    const systemColorScheme = () => {
      if (userScheme === 'auto') {
        applyColorSceme(getSystemColorScheme());
      }
    };

    matchMedia.addEventListener('change', systemColorScheme);

    return () => {
      matchMedia.removeEventListener('change', systemColorScheme);
    };
  }, [userScheme]);

  return (
    <div className="color-scheme-switcher">
      <button className="color-scheme-switcher__value" ref={targetRef}>
        {userScheme === 'auto' && <AutoScheme />}
        {userScheme === 'dark' && <DarkScheme />}
        {userScheme === 'light' && <LightScheme />}
      </button>
      <Dropdown targetRef={targetRef}></Dropdown>
    </div>
  );
};
