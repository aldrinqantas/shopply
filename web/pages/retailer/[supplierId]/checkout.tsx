import React from 'react';
import { Text, Stack, Button, Textarea } from '@chakra-ui/react';

import withAuth from '@lib/withAuth';
import { RetailerLayout } from '@components/layout/retailer';
import { Card, CardBody } from '@components/common/card';
import { useUserContext } from '@context/UserContext';
import { formatAddress } from '@lib/common';

const Page = () => {
  const { currentUser } = useUserContext();
  const { myRetailer } = currentUser;

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
            <CardBody>das</CardBody>
          </Card>
        </Stack>
      </Stack>
    </RetailerLayout>
  );
};

export default withAuth(Page, { loginRequired: true });
