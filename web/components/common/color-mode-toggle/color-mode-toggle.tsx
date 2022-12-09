import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IconButton, useColorMode, HTMLChakraProps, useColorModeValue } from '@chakra-ui/react';
import { FiSun, FiMoon } from 'react-icons/fi';

export type ColorModeToggleProps = HTMLChakraProps<'button'>;

export const ColorModeToggle = (props: ColorModeToggleProps) => {
  const { toggleColorMode } = useColorMode();

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <motion.div
        style={{ display: 'inline-block' }}
        key={useColorModeValue('light', 'dark')}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <IconButton
          aria-label="Toggle color mode"
          variant="ghost"
          fontSize="lg"
          color={useColorModeValue('inherit', 'yellow')}
          icon={useColorModeValue(<FiMoon />, <FiSun />)}
          onClick={toggleColorMode}
          {...props}
        />
      </motion.div>
    </AnimatePresence>
  );
};
