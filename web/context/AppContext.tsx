import React, { useState } from 'react';

import { createContext } from '@chakra-ui/react-utils';
import { Category } from '@shared/types';

export interface AppContextValue {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
}

export const [AppContextProvider, useAppContext, AppContext] = createContext<AppContextValue>({
  name: 'AppContext',
});

export interface AppProviderProps {
  children: React.ReactNode;
  initialData: { categories: Category[] };
}

export const AppProvider = (props: AppProviderProps) => {
  const { children, initialData } = props;

  const [categories, setCategories] = useState(initialData?.categories);

  return (
    <AppContextProvider
      value={{
        categories,
        setCategories,
      }}
    >
      {children}
    </AppContextProvider>
  );
};
