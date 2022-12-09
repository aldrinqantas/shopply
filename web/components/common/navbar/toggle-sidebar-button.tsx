import { IconButton, IconButtonProps } from '@chakra-ui/react';
import React from 'react';
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from 'react-icons/ai';

interface ToggleButtonProps extends IconButtonProps {
  isOpen: boolean;
}

export const ToggleSidebarButton = (props: ToggleButtonProps) => {
  const { isOpen, ...iconButtonProps } = props;
  return (
    <IconButton
      position="relative"
      variant="unstyled"
      // color={isOpen ? 'white' : 'muted'}
      // zIndex="skipLink"
      fontSize="lg"
      icon={isOpen ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold />}
      {...iconButtonProps}
    />
  );
};
