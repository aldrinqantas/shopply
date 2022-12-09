import {
  Menu,
  MenuDivider,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
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

import { useUserContext } from '@context/UserContext';
import { API_URL } from '@lib/api/sendRequestAndGetResponse';

import { User, Retailer } from '@shared/types';

export interface SwitcherButtonProps extends FlexProps {
  user: User;
  activeRetailer: Retailer;
}

export const SwitcherButton = (props: SwitcherButtonProps) => {
  const { user, activeRetailer, ...restProps } = props;
  const buttonProps = useMenuButton(restProps);

  const userName = `${user.firstName} ${user.lastName}`;
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
        <Avatar w="8" h="8" size="sm" rounded="md" name={userName} />
        <Box textAlign="start">
          <Box noOfLines={1} fontWeight="semibold">
            {userName}
          </Box>
          <Box fontSize="xs">{activeRetailer?.tradingName}</Box>
        </Box>
      </HStack>
      <Box fontSize="lg" color="gray.500">
        <HiSelector />
      </Box>
    </Flex>
  );
};

export const SiteSwitcher = () => {
  const { currentUser, activeRetailer, activeRetailerId, setActiveRetailerId } = useUserContext();
  const { myRetailers } = currentUser;

  return (
    <Menu>
      <SwitcherButton user={currentUser} activeRetailer={activeRetailer} />
      <MenuList shadow="lg" py="4" px="3">
        <Text fontWeight="medium" mb="2">
          Retailers
        </Text>
        <MenuOptionGroup
          value={activeRetailerId}
          onChange={(value: string) => setActiveRetailerId(value)}
        >
          {myRetailers.map((site) => (
            <MenuItemOption key={site._id} value={site._id} fontWeight="semibold" rounded="md">
              {site.tradingName}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
        <MenuDivider />
        <MenuItem rounded="md">Account settings</MenuItem>
        <MenuItem rounded="md">Refer us</MenuItem>
        <MenuDivider />
        <MenuItem
          rounded="md"
          onClick={async () => {
            Router.push(`${API_URL}/logout`);
          }}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
