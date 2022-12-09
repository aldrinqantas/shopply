import React, { useState } from 'react';

import { createContext } from '@chakra-ui/react-utils';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { Retailer } from '@shared/types';

import type { User } from '@shared/types';

export interface UserContextValue {
  currentUser?: User | null;
  setCurrentUser: (user: User) => void;
  activeRetailer: Retailer;
  activeRetailerId: string;
  setActiveRetailerId: (id: string) => void;
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

  const myRetailers = currentUser?.myRetailers || [];

  const [activeRetailerId, setActiveRetailerId] = useLocalStorage(
    `active-retailer-${currentUser?._id}`,
    myRetailers[0]?._id,
  );
  const activeRetailer = myRetailers.find((item) => item._id === activeRetailerId);

  return (
    <UserContextProvider
      value={{
        currentUser,
        setCurrentUser,
        activeRetailer,
        activeRetailerId,
        setActiveRetailerId,
      }}
    >
      {children}
    </UserContextProvider>
  );
};
