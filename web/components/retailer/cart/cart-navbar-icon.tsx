import React, { useState, useEffect } from 'react';
import { IconButton, Circle } from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import Router from 'next/router';

import { useCartContext } from '@context/CartContext';

export const CartNavbarIcon = () => {
  const { cart } = useCartContext();

  const [count, setCount] = useState(0);

  // Move setCount to useEffect to avoid React Hydration Error
  useEffect(() => {
    const _count = cart.reduce((result, product) => {
      return result + product.quantity;
    }, 0);
    setCount(_count);
  }, [cart]);

  return (
    <IconButton
      fontSize="lg"
      aria-label="Cart"
      onClick={() => Router.push('/retailer/checkout')}
      icon={
        <>
          <FiShoppingCart />
          {count > 0 && (
            <Circle
              as={'span'}
              position={'absolute'}
              color="white"
              top="0"
              right="0"
              fontSize="0.7rem"
              bgColor="red"
              zIndex="overlay"
              p="0.5"
              minW="5"
            >
              {count}
            </Circle>
          )}
        </>
      }
    />
  );
};
