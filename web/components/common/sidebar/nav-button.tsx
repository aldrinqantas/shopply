import {
  As,
  Button,
  ButtonProps,
  HStack,
  Icon,
  Text,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Stack,
} from '@chakra-ui/react';
import React from 'react';
import Link from 'next/link';

import { useActivePath } from '@hooks/useActivePath';

export interface NavButtonProps extends ButtonProps {
  icon: As;
  label: string;
  path: string;
  childMenu?: { label: string; path: string }[];
}

export const NavButton = (props: NavButtonProps) => {
  const { icon, label, path, childMenu, ...buttonProps } = props;

  if (childMenu && childMenu.length) {
    return (
      <Accordion allowToggle defaultIndex={[0]}>
        <AccordionItem border="0px">
          <AccordionButton justifyContent="space-between" p="0" _hover={{ bg: 'none' }}>
            <Button as="a" variant="ghost" justifyContent="start" {...buttonProps} w="full">
              <HStack justifyContent="space-between" w="full">
                <HStack spacing="3">
                  <Icon as={icon} boxSize="6" color="subtle" />
                  <Text>{label}</Text>
                </HStack>
                <AccordionIcon />
              </HStack>
            </Button>
          </AccordionButton>
          <AccordionPanel p={0} w="full">
            <Stack spacing="1">
              {childMenu.map((child) => {
                const _isActivePath = useActivePath(child.path, { end: false });
                return (
                  <Link key={child.path} href={child.path} passHref>
                    <Button
                      as="a"
                      variant="ghost"
                      justifyContent="start"
                      w="full"
                      aria-current={_isActivePath ? 'page' : 'false'}
                      {...buttonProps}
                    >
                      <HStack spacing="3" pl="6">
                        <Text>{child.label}</Text>
                      </HStack>
                    </Button>
                  </Link>
                );
              })}
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  }

  const isActivePath = useActivePath(path, { end: false });

  return (
    <Link href={path} passHref>
      <Button
        as="a"
        variant="ghost"
        justifyContent="start"
        aria-current={isActivePath ? 'page' : 'false'}
        {...buttonProps}
      >
        <HStack spacing="3">
          <Icon as={icon} boxSize="6" color="subtle" />
          <Text>{label}</Text>
        </HStack>
      </Button>
    </Link>
  );
};
