import React, { useEffect, useState } from 'react';
import './ColorSchemeSwitcher.css';
import { applyColorSceme, getColorScheme } from '@components/colorSchemeUtils';

enum colorSchemeValues {
  LIGHT = 'light',
  DARK = 'dark',
  AUTO = 'auto',
}

const matchMedia = window.matchMedia('(prefers-color-scheme:dark)');

export const ColorSchemeSwitcher: React.FC = () => {
  const [userScheme, setUserScheme] = useState<colorSchemeValues>(colorSchemeValues.AUTO);

  useEffect(() => {
    if (userScheme === colorSchemeValues.AUTO) {
      applyColorSceme(getColorScheme());
    } else {
      applyColorSceme(userScheme);
    }
  }, [userScheme]);

  useEffect(() => {
    const systemColorScheme = () => {
      if (userScheme === colorSchemeValues.AUTO) {
        applyColorSceme(getColorScheme());
      }
    };

    matchMedia.addEventListener('change', systemColorScheme);

    return () => {
      matchMedia.removeEventListener('change', systemColorScheme);
    };
  }, [userScheme]);

  return (
    <select
      className={'color-scheme-switcher'}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setUserScheme(e.target.value as colorSchemeValues)}
      value={userScheme}
    >
      <option value="dark">Dark</option>
      <option value="light">Light</option>
      <option value="auto">Auto</option>
    </select>
  );
};
