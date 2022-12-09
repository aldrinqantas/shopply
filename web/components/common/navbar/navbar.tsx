import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  useColorModeValue,
  useDisclosure,
  HStack,
} from '@chakra-ui/react';
import React from 'react';

import { ToggleSidebarButton } from './toggle-sidebar-button';

export interface NavbarProps {
  isDesktop: boolean;
  sidebar: React.ReactNode;
  rightElements?: React.ReactNode;
}
export const Navbar = (props: NavbarProps) => {
  const { isDesktop, sidebar, rightElements } = props;
  const { isOpen, onToggle, onClose } = useDisclosure();
  return (
    <Box as="nav" py="2" px="4" bg="bg-surface" boxShadow={useColorModeValue('sm', 'sm-dark')}>
      <Flex justify="space-between">
        <HStack>
          {!isDesktop && (
            <ToggleSidebarButton isOpen={isOpen} aria-label="Open Menu" onClick={onToggle} />
          )}
        </HStack>
        {rightElements}
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          isFullHeight
          preserveScrollBarGap
          // Only disabled for showcase
          trapFocus={false}
        >
          <DrawerOverlay />
          <DrawerContent>{sidebar}</DrawerContent>
        </Drawer>
      </Flex>
    </Box>
  );
};
