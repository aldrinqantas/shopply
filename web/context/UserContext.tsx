import React, { useState } from 'react';

import { createContext } from '@chakra-ui/react-utils';

import type { User } from '@shared/types';

export interface UserContextValue {
  currentUser?: User | null;
  setCurrentUser: (user: User) => void;
}

export const [UserContextProvider, useUserContext, UserContext] = createContext<UserContextValue>({
  name: 'UserContext',
});

export interface UserProviderProps {
  children: React.ReactNode;
  user: User;
}

export const UserProvider = (props: UserProviderProps) => {
  const { children, user: userProp } = props;

  const [currentUser, setCurrentUser] = useState(userProp);

  return (
    <UserContextProvider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </UserContextProvider>
  );
};
