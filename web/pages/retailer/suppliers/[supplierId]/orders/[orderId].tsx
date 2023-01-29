import React, { useEffect, useState } from 'react';
import { Heading, Stack, Text, Button, StackDivider, Box, Tag } from '@chakra-ui/react';
import { format } from 'date-fns';
import _get from 'lodash/get';

import withAuth from '@lib/withAuth';
import { RetailerLayout } from '@components/layout/retailer';
import { Card, CardBody } from '@components/common/card';
import { ReviewProductItem } from '@components/retailer/checkout/review-product-item';
import { getOrderDetailsApiMethod } from '@lib/api';
import { useRetailerContext } from '@context/RetailerContext';
import { Loader } from '@components/common/loader';
import { Order } from '@shared/types';
import { getOrderStatusTagColor } from '@lib/common';

const Content = ({ order }: { order: Order }) => {
  const total = order.products.reduce((result, item) => result + item.sellPrice * item.quantity, 0);
  return (
    <Stack spacing="4">
      <Stack direction="row" justify="space-between">
        <Heading size={{ base: 'sm', lg: 'md' }} fontWeight="medium">
          Order Details
        </Heading>
        <Button variant="link" colorScheme="brand">
          Invoice
        </Button>
      </Stack>

      <Card>
        <CardBody>
          <Stack direction={{ base: 'column', md: 'row' }} justify="space-between">
            <Stack spacing="4">
              <Stack spacing="1">
                <Text fontWeight="semibold" fontSize="sm">
                  Order Info
                </Text>
                <Box>
                  <Text>
                    Status:{' '}
                    <Tag colorScheme={getOrderStatusTagColor(order.status)}>{order.status}</Tag>
                  </Text>

                  <Text>{`Order#: ${order._id}`}</Text>
                  <Text>{`Placed on: ${format(new Date(order.createdAt), 'dd MMMM yyyy')}`}</Text>
                  <Text>{`Placed by: ${order.orderBy.firstName} ${order.orderBy.lastName}`}</Text>
                </Box>
              </Stack>
              <Stack spacing="1">
                <Text fontWeight="semibold" fontSize="sm">
                  Delivery for
                </Text>
                <Box>
                  <Text>{order.retailer.tradingName}</Text>
                  <Text>{_get(order, 'retailer.deliveryAddress.line1')}</Text>
                  <Text>{_get(order, 'retailer.deliveryAddress.line2')}</Text>
                  <Text>{`${_get(order, 'retailer.deliveryAddress.suburb')}, ${_get(
                    order,
                    'retailer.deliveryAddress.state',
                  )} ${_get(order, 'retailer.deliveryAddress.postcode')}`}</Text>
                </Box>
              </Stack>
            </Stack>

            <Stack spacing="1" minW="56">
              <Text fontWeight="semibold" fontSize="sm">
                Order Summary
              </Text>
              <Box>
                <Stack direction="row" justify="space-between">
                  <Text>Subtotal</Text>
                  <Text>{`$${total}`}</Text>
                </Stack>
                <Stack direction="row" justify="space-between">
                  <Text>GST</Text>
                  <Text>---</Text>
                </Stack>
                <Stack direction="row" justify="space-between" fontWeight="semibold">
                  <Text>Total</Text>
                  <Text>{`$${total}`}</Text>
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <Stack spacing="4">
            <Text fontWeight="semibold">Items</Text>
            <Stack direction="column" divider={<StackDivider />}>
              {order.products?.map((item) => (
                <ReviewProductItem key={item._id} product={item} />
              ))}
            </Stack>
          </Stack>
        </CardBody>
      </Card>
    </Stack>
  );
};
const Page = ({ orderId }: { orderId: string }) => {
  const { currentSupplier } = useRetailerContext();

  const [order, setOrder] = useState<Order | undefined>();

  useEffect(() => {
    getOrderDetailsApiMethod(currentSupplier._id, orderId).then((result) => {
      setOrder(result);
    });
  }, [orderId]);

  return (
    <RetailerLayout pageTitle="Orders" bodyProps={{ maxW: 'container.md' }}>
      {order ? <Content order={order} /> : <Loader />}
    </RetailerLayout>
  );
};

Page.getInitialProps = async function getInitialProps({ query, req }) {
  const { orderId } = query;
  return { orderId };
};

export default withAuth(Page, { loginRequired: true, requiredRoles: ['retailer'] });
