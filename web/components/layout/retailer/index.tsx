import {
  Flex,
  useBreakpointValue,
  Box,
  Container,
  ContainerProps,
  Stack,
  Text,
  HStack,
  Button,
  Progress,
  ButtonGroup,
  IconButton,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';
import Head from 'next/head';
import React, { useMemo } from 'react';
import { FiCalendar, FiHome, FiRotateCcw, FiShoppingBag, FiSearch } from 'react-icons/fi';

import { SidebarWrapper, NavButton } from '@components/common/sidebar';
import { Navbar } from '@components/common/navbar';
import { ColorModeToggle } from '@components/common/color-mode-toggle';
import { CartNavbarIcon } from '@components/retailer/checkout/cart-navbar-icon';
import { useRetailerContext } from '@context/RetailerContext';
import { UserAvatarMenu } from '@components/common/user-avatar-menu';
import { SupplierSwitcher } from '@components/common/sidebar';
import { NavTabItemData, NestedNavTab } from '@components/common/nested-nav-tab';

export interface RetailerLayoutProps {
  children: React.ReactNode;
  bodyProps?: ContainerProps;
  pageTitle: string;
  nestedMenu?: 'history' | 'lorem';
}

export const RetailerLayout = (props: RetailerLayoutProps) => {
  const { children, pageTitle, bodyProps, nestedMenu } = props;
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  const { currentSupplier } = useRetailerContext();

  const sidebar = <RetailerSidebar />;

  const nestedMenuData: { [key: string]: NavTabItemData[] } = useMemo(
    () => ({
      history: [
        {
          href: `/retailer/suppliers/${currentSupplier._id}/history/orders`,
          label: 'Orders',
        },
        {
          href: `/retailer/suppliers/${currentSupplier._id}/history/credit-notes`,
          label: 'Credit Notes',
        },
        {
          href: `/retailer/suppliers/${currentSupplier._id}/history/disputes`,
          label: 'Disputes',
        },
      ],
    }),
    [currentSupplier],
  );

  return (
    <>
      <Head>
        <title>{`${pageTitle}`}</title>
      </Head>
      <Flex
        as="section"
        direction={{ base: 'column', lg: 'row' }}
        height="100vh"
        bg="bg-canvas"
        overflowY="auto"
      >
        {isDesktop && sidebar}

        <Box flex="1" overflow="auto">
          <Navbar
            isDesktop={isDesktop}
            sidebar={sidebar}
            rightElements={
              <ButtonGroup variant="ghost" spacing="1">
                <IconButton fontSize="lg" icon={<FiSearch />} aria-label="Search" />
                <CartNavbarIcon />
                <ColorModeToggle />
                <UserAvatarMenu />
              </ButtonGroup>
            }
          />
          {nestedMenu && <NestedNavTab menuData={nestedMenuData[nestedMenu]} />}
          <Container p={{ base: 4, md: 6 }} {...bodyProps}>
            {children}
          </Container>
        </Box>
      </Flex>
    </>
  );
};

const RetailerSidebar = () => {
  const { currentSupplier } = useRetailerContext();
  const { categories, _id: supplierId } = currentSupplier;

  const menu = useMemo(
    () => [
      {
        label: 'Home',
        path: `/retailer/suppliers/${supplierId}/home`,
        icon: FiHome,
      },
      {
        label: 'Products',
        path: `/retailer/suppliers/${supplierId}/products`,
        icon: FiShoppingBag,
        childMenu:
          categories.length &&
          categories.map((category) => ({
            label: category.name,
            path: `/retailer/suppliers/${supplierId}/products/${category.slug}`,
          })),
      },
      {
        label: 'Orders',
        path: `/retailer/suppliers/${supplierId}/orders`,
        icon: FiCalendar,
      },
      {
        label: 'History',
        path: `/retailer/suppliers/${supplierId}/history/orders`,
        icon: FiRotateCcw,
      },
    ],
    [categories],
  );

  return (
    <SidebarWrapper>
      <Stack justify="space-between" spacing="1">
        <Stack spacing={{ base: '5', sm: '6' }} shouldWrapChildren>
          <SupplierSwitcher />
          <Stack spacing="1">
            {menu.map((menuItem) => (
              <NavButton key={menuItem.path} {...menuItem} />
            ))}
          </Stack>
        </Stack>
        <Stack spacing={{ base: '5', sm: '6' }}>
          <Box bg="bg-subtle" px="4" py="5" borderRadius="lg">
            <Stack spacing="4">
              <Stack spacing="1">
                <Text fontSize="sm" fontWeight="medium">
                  Almost there
                </Text>
                <Text fontSize="sm" color="muted">
                  Fill in some more information about you and your person.
                </Text>
              </Stack>
              <Progress value={80} size="sm" aria-label="Profile Update Progress" />
              <HStack spacing="3">
                <Button variant="link" size="sm">
                  Dismiss
                </Button>
                <Button variant="link" size="sm" colorScheme="blue">
                  Update profile
                </Button>
              </HStack>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </SidebarWrapper>
  );
};
