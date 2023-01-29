import {
  Menu,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorModeValue,
  Box,
  Flex,
  FlexProps,
  HStack,
  useMenuButton,
  Avatar,
} from '@chakra-ui/react';
import { HiSelector } from 'react-icons/hi';
import React from 'react';
import Router from 'next/router';

import { useRetailerContext } from '@context/RetailerContext';

import { Supplier } from '@shared/types';

export interface SwitcherButtonProps extends FlexProps {
  supplier: Supplier;
}

export const SwitcherButton = (props: SwitcherButtonProps) => {
  const { supplier, ...restProps } = props;
  const buttonProps = useMenuButton(restProps);

  return (
    <Flex
      as="button"
      {...buttonProps}
      w="full"
      display="flex"
      alignItems="center"
      rounded="lg"
      bg={useColorModeValue('gray.100', 'gray.700')}
      boxShadow={useColorModeValue('sm', 'sm-dark')}
      px="3"
      py="2"
      fontSize="sm"
      userSelect="none"
      cursor="pointer"
      outline="0"
      transition="all 0.2s"
      _active={{ bg: useColorModeValue('gray.300', 'gray.600') }}
      _focus={{ shadow: 'outline' }}
    >
      <HStack flex="1" spacing="3">
        <Avatar
          w="8"
          h="8"
          size="sm"
          borderRadius="md"
          src={supplier.logo}
          name={supplier.tradingName}
        />
        <Box textAlign="start">
          <Box noOfLines={1} fontWeight="semibold">
            {supplier.tradingName}
          </Box>
          <Box fontSize="xs">Lorem ipsum</Box>
        </Box>
      </HStack>
      <Box fontSize="lg" color="gray.500">
        <HiSelector />
      </Box>
    </Flex>
  );
};

export const SupplierSwitcher = () => {
  const { currentSupplier } = useRetailerContext();

  return (
    <Menu>
      <SwitcherButton supplier={currentSupplier} />
      <MenuList shadow="lg" py="4" px="3">
        <MenuItem rounded="md">Contact us</MenuItem>
        <MenuItem rounded="md">Refer us</MenuItem>
        <MenuDivider />
        <MenuItem rounded="md" onClick={() => Router.push('/retailer/suppliers')}>
          Switch supplier
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
