import { extendTheme, theme as baseTheme, ThemeConfig } from '@chakra-ui/react';
import * as components from './components';
import * as foundations from './foundations';

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
};

export const theme: Record<string, any> = extendTheme({
  config,
  ...foundations,
  components: { ...components },
  colors: { ...baseTheme.colors, brand: baseTheme.colors.blue },
  space: {
    '4.5': '1.125rem',
    'form-items-spacing': '1rem',
  },
});
