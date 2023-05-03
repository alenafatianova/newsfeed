export const applyColorSceme = (scheme: 'light' | 'dark'): void => {
  document.documentElement.setAttribute('scheme', scheme);
};

export const getColorScheme = (): 'dark' | 'light' => {
  return window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
};
