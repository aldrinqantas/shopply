import React, { useEffect, useState } from 'react';
import { Text, Stack, Button, Textarea, StackDivider, Box, Divider } from '@chakra-ui/react';
import Router from 'next/router';

import withAuth from '@lib/withAuth';
import { RetailerLayout } from '@components/layout/retailer';
import { Card, CardBody } from '@components/common/card';
import { useUserContext } from '@context/UserContext';
import { useRetailerContext } from '@context/RetailerContext';
import { formatAddress } from '@lib/common';
import { useCartContext } from '@context/CartContext';
import { ReviewProductItem } from '@components/retailer/checkout/review-product-item';
import { placeOrderApiMethod } from '@lib/api';
import { message } from '@lib/message';

const Page = () => {
  const { currentUser } = useUserContext();
  const { currentSupplier } = useRetailerContext();
  const { myRetailer } = currentUser;

  const { cart, setCart } = useCartContext();
  const [products, setProducts] = useState([]);

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // To avoid React Hydration Error
  useEffect(() => {
    setProducts(cart);
  }, [cart]);

  const total = products.reduce((result, item) => result + item.sellPrice * item.quantity, 0);

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);
    placeOrderApiMethod({ supplier: currentSupplier._id, products, deliveryDate: new Date() })
      .then((result) => {
        message.success('Order was placed successfully');
        setCart(undefined);

        Router.push(
          '/retailer/suppliers/[supplierId]/orders/[orderId]',
          `/retailer/suppliers/${currentSupplier._id}/orders/${result._id}`,
        );
      })
      .catch((err) => {
        message.error(err.message);
        setIsPlacingOrder(false);
      });
  };

  return (
    <RetailerLayout pageTitle="Checkout">
      <Stack direction={{ base: 'column', xl: 'row' }} spacing="4">
        <Stack spacing="4" flex={1}>
          <Card>
            <CardBody>
              <Stack spacing={0}>
                <Text fontWeight="semibold">Delivery for</Text>
                <Text fontWeight="semibold" fontSize="xl">
                  {myRetailer.tradingName}
                </Text>
                <Text>{formatAddress(myRetailer.deliveryAddress)}</Text>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Stack>
                <Text fontWeight="semibold">Review your order</Text>
                <Stack direction="column" divider={<StackDivider />}>
                  {products.map((item) => (
                    <ReviewProductItem key={item._id} product={item} />
                  ))}
                </Stack>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Stack>
                <Text fontWeight="semibold">Comments, notes</Text>
                <Textarea placeholder="Add comment or note" />
              </Stack>
            </CardBody>
          </Card>
        </Stack>
        <Stack minW={{ base: 'max', xl: 'sm' }}>
          <Card>
            <CardBody>
              <Stack spacing="3">
                <Box>
                  <Stack direction="row" justify="space-between">
                    <Text>Subtotal</Text>
                    <Text>{`$${total.toFixed(2)}`}</Text>
                  </Stack>
                  <Stack direction="row" justify="space-between">
                    <Text>GST</Text>
                    <Text>---</Text>
                  </Stack>
                </Box>
                <Divider />
                <Stack direction="row" justify="space-between" fontWeight="semibold">
                  <Text>Order total</Text>
                  <Text>{`$${total.toFixed(2)}`}</Text>
                </Stack>
                <Button variant="primary" isLoading={isPlacingOrder} onClick={handlePlaceOrder}>
                  Place order
                </Button>
              </Stack>
            </CardBody>
          </Card>
        </Stack>
      </Stack>
    </RetailerLayout>
  );
};

export default withAuth(Page, { loginRequired: true });
