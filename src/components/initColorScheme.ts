import { applyColorSceme, getSystemColorScheme, getSavedScheme } from '@components/colorSchemeUtils';

applyColorSceme(getSavedScheme() || getSystemColorScheme());
