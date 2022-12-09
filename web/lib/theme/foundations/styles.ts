import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';

export default {
  global: (props: StyleFunctionProps) => ({
    body: {
      color: 'emphasized',
      bg: 'bg-canvas',
    },
    '*::placeholder': {
      opacity: 1,
      color: 'muted',
    },
    '*, *::before, &::after': {
      borderColor: mode('gray.200', 'whiteAlpha.200')(props),
    },
  }),
};
