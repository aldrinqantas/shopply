import React, { useState } from 'react';

import { createContext } from '@chakra-ui/react-utils';
import { Category } from '@shared/types';
import { Supplier } from '@shared/types/Supplier';

export interface CurrentSupplier extends Supplier {
  categories: Category[];
}

export interface RetailerContextValue {
  currentSupplier: CurrentSupplier;
  setCurrentSupplier: (supplier: CurrentSupplier) => void;
}

export const [RetailerContextProvider, useRetailerContext, RetailerContext] =
  createContext<RetailerContextValue>({
    name: 'RetailerContext',
  });

export interface RetailerProviderProps {
  children: React.ReactNode;
  initialData: { supplier: CurrentSupplier };
}

export const RetailerProvider = (props: RetailerProviderProps) => {
  const { children, initialData } = props;

  const [currentSupplier, setCurrentSupplier] = useState<CurrentSupplier>(initialData?.supplier);

  return (
    <RetailerContextProvider
      value={{
        currentSupplier,
        setCurrentSupplier,
      }}
    >
      {children}
    </RetailerContextProvider>
  );
};
