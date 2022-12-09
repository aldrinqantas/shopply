import React from 'react';
import { Box, HStack } from '@chakra-ui/react';
import NextLink from 'next/link';

import { useActivePath } from '@hooks/useActivePath';

export interface NavTabItemData {
  href: string;
  label: string;
}
export interface NestedNavTabProps {
  menuData: NavTabItemData[];
}

export const NestedNavTab = (props: NestedNavTabProps) => {
  const { menuData } = props;
  return (
    <Box as="nav" aria-label="Component navigation" mt="3" mx={{ base: 4, md: 6 }}>
      <HStack as="ul" listStyleType="none">
        {menuData.map((item) => (
          <NavItem item={item} key={item.href} />
        ))}
      </HStack>
    </Box>
  );
};

const NavItem = ({ item }: { item: NavTabItemData }) => {
  const isActivePath = useActivePath(item.href);
  return (
    <Box as="li">
      <NextLink href={item.href} passHref replace>
        <Box
          mb="-1px"
          as="a"
          display="block"
          fontSize="sm"
          px="3"
          py="2"
          fontWeight="medium"
          borderBottom="2px solid transparent"
          data-selected={isActivePath ? '' : undefined}
          _selected={{
            color: 'accent',
            borderColor: 'currentColor',
          }}
        >
          {item.label}
        </Box>
      </NextLink>
    </Box>
  );
};
