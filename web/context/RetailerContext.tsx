import React, { useState, useEffect } from 'react';

import { createContext } from '@chakra-ui/react-utils';
import { Category } from '@shared/types';
import { getSupplierApiMethod } from '@lib/api';
import { message } from '@lib/message';
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
  supplierId: string;
}

export const RetailerProvider = (props: RetailerProviderProps) => {
  const { children, supplierId } = props;

  const [currentSupplier, setCurrentSupplier] = useState({ categories: [] });

  useEffect(() => {
    getSupplierApiMethod(supplierId)
      .then((result) => {
        setCurrentSupplier(result);
      })
      .catch((error) => {
        message.error(error.message);
      });
  }, [supplierId]);

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
