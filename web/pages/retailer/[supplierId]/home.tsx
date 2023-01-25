import React from 'react';
import { Text, Heading, Stack, SimpleGrid, As, Icon } from '@chakra-ui/react';
import { FiPlusCircle, FiShoppingBag, FiRotateCcw, FiStar } from 'react-icons/fi';
import Link from 'next/link';

import withAuth from '@lib/withAuth';
import { RetailerLayout } from '@components/layout/retailer';
import { Card, CardBody } from '@components/common/card';
import { useUserContext } from '@context/UserContext';
import { formatAddress } from '@lib/common';

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

const menu = [
  { title: 'New Order', icon: FiPlusCircle, href: '/retailer/categories' },
  { title: 'Orders', icon: FiShoppingBag, href: '/retailer/orders' },
  { title: 'History', icon: FiRotateCcw, href: '/retailer/history' },
  { title: 'Coming Soon', icon: FiStar, href: '/retailer/home' },
];

const RetailerHome = () => {
  const { currentUser, activeRetailer } = useUserContext();

  return (
    <RetailerLayout pageTitle="Admin" bodyProps={{ maxW: 'container.md' }}>
      <Stack spacing="4">
        <Card>
          <CardBody>
            <Stack spacing="3">
              <Heading size="md">{`Welcome back ${currentUser.firstName}!`}</Heading>
              <Stack spacing="0.5">
                <Text fontWeight="medium" fontSize="lg">
                  {activeRetailer?.tradingName}
                </Text>
                <Text>{formatAddress(activeRetailer?.deliveryAddress)}</Text>
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
