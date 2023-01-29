import React from 'react';

import { createContext } from '@chakra-ui/react-utils';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { useUserContext } from './UserContext';
import { useRetailerContext } from './RetailerContext';
import { ProductItem } from '@components/retailer/products/product-item-card';

export interface CartContextValue {
  cart: ProductItem[];
  setCart: (id: ProductItem[]) => void;
}

export const [CartContextProvider, useCartContext, CartContext] = createContext<CartContextValue>({
  name: 'CartContext',
});

export interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider = (props: CartProviderProps) => {
  const { children } = props;

  const { currentUser } = useUserContext();
  const { currentSupplier } = useRetailerContext();

  const [cart, setCart] = useLocalStorage(
    `retailer-cart-${currentUser?._id}-${currentSupplier?._id}`,
    [],
  );

  return (
    <CartContextProvider
      value={{
        cart,
        setCart,
      }}
    >
      {children}
    </CartContextProvider>
  );
};
