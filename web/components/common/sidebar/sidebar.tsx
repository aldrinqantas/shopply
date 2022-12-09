import React from 'react';
import { Flex, useColorModeValue } from '@chakra-ui/react';

export interface SidebarProps {
  children?: React.ReactNode;
}

export const SidebarWrapper = (props: SidebarProps) => {
  const { children } = props;
  return (
    <Flex
      flex="1"
      bg="bg-surface"
      overflowY="auto"
      zIndex="docked"
      boxShadow={useColorModeValue('sm', 'sm-dark')}
      maxW={{ base: 'full', sm: 'xs' }}
      py={{ base: '6', sm: '8' }}
      px={{ base: '4', sm: '6' }}
    >
      {children}
    </Flex>
  );
};
