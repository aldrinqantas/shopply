import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';

const baseStyle = {
  _hover: (props: StyleFunctionProps) => ({
    bgColor: mode('blackAlpha.200', 'whiteAlpha.200')(props),
  }),
};
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
