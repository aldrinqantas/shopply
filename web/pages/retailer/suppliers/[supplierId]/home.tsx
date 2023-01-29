import React, { useMemo } from 'react';
import { Text, Heading, Stack, SimpleGrid, As, Icon } from '@chakra-ui/react';
import { FiPlusCircle, FiShoppingBag, FiRotateCcw, FiStar } from 'react-icons/fi';
import Link from 'next/link';

import withAuth from '@lib/withAuth';
import { RetailerLayout } from '@components/layout/retailer';
import { Card, CardBody } from '@components/common/card';
import { useUserContext } from '@context/UserContext';
import { useRetailerContext } from '@context/RetailerContext';

const HomeMenuItem = ({ title, icon, href }: { title: string; icon: As; href?: string }) => {
  return (
    <Link href={href} passHref>
      <Card as="a" isHoverable cursor="pointer">
        <CardBody>
          <Stack marginY="auto">
            <Icon as={icon} boxSize="6" textAlign="center" marginX="auto" />
            <Text textAlign="center">{title}</Text>
          </Stack>
        </CardBody>
      </Card>
    </Link>
  );
};

const RetailerHome = () => {
  const { currentUser } = useUserContext();
  const { currentSupplier } = useRetailerContext();
  const { _id: supplierId } = currentSupplier;

  const menu = useMemo(
    () => [
      {
        title: 'New Order',
        icon: FiPlusCircle,
        href: `/retailer/suppliers/${supplierId}/categories`,
      },
      { title: 'Orders', icon: FiShoppingBag, href: `/retailer/suppliers/${supplierId}/orders` },
      {
        title: 'History',
        icon: FiRotateCcw,
        href: `/retailer/suppliers/${supplierId}/history/orders`,
      },
      { title: 'Coming Soon', icon: FiStar, href: `/retailer/suppliers/${supplierId}/home` },
    ],
    [supplierId],
  );

  return (
    <RetailerLayout pageTitle="Admin" bodyProps={{ maxW: 'container.md' }}>
      <Stack spacing="4">
        <Card>
          <CardBody>
            <Stack spacing="3">
              <Heading size="md">{`Welcome back ${currentUser.firstName}!`}</Heading>
              <Stack spacing="0.5">
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </Text>
              </Stack>
            </Stack>
          </CardBody>
        </Card>
        <SimpleGrid columns={{ base: 2, sm: 4 }} spacing={{ base: 3, sm: 4 }}>
          {menu.map((item) => (
            <HomeMenuItem key={item.href} {...item} />
          ))}
        </SimpleGrid>
      </Stack>
    </RetailerLayout>
  );
};

export default withAuth(RetailerHome, { loginRequired: true });
