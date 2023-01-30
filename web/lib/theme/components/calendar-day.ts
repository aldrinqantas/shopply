import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';

const baseStyle = (props: StyleFunctionProps) => ({
  _hover: {
    bgColor: mode('blackAlpha.100', 'whiteAlpha.100')(props),
  },
  _disabled: {
    color: mode('gray.200', 'gray.700')(props),
  },
});

const variants = {
  selected: (props: StyleFunctionProps) => ({
    bgColor: mode('brand.500', 'brand.200')(props),
    color: mode('white', 'gray.800')(props),

    _hover: {
      bgColor: 'brand.500',
    },
  }),
};

export default {
  baseStyle,
  variants,
};
