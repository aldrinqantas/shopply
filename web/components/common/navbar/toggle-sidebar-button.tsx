import { IconButton, IconButtonProps } from '@chakra-ui/react';
import React from 'react';
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';

interface ToggleButtonProps extends IconButtonProps {
  isOpen: boolean;
}

export const ToggleSidebarButton = (props: ToggleButtonProps) => {
  const { isOpen, ...iconButtonProps } = props;
  return (
    <IconButton
      // color={isOpen ? 'white' : 'muted'}
      // zIndex="skipLink"
      variant="ghost"
      fontSize="lg"
      icon={<FiMenu />}
      {...iconButtonProps}
    />
  );
};
