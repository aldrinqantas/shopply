import React from 'react';
import { Menu, MenuItem, MenuButton, MenuDivider, MenuList, Avatar } from '@chakra-ui/react';
import Router from 'next/router';

import { useUserContext } from '@context/UserContext';
import { API_URL } from '@lib/api/sendRequestAndGetResponse';

export const UserAvatarMenu = () => {
  const { currentUser } = useUserContext();

  const fullName = `${currentUser.firstName} ${currentUser.lastName}`;
  return (
    <Menu>
      <MenuButton>
        <Avatar size="sm" name={fullName} src="" />
      </MenuButton>

      <MenuList>
        <MenuItem>{fullName}</MenuItem>
        <MenuDivider />
        <MenuItem
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
