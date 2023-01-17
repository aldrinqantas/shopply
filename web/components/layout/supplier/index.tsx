import {
  Flex,
  useBreakpointValue,
  Box,
  Container,
  ContainerProps,
  Stack,
  ButtonGroup,
  IconButton,
} from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import { FiLayers, FiHome, FiUsers, FiGrid, FiUserCheck, FiSearch } from 'react-icons/fi';

import { SidebarWrapper, NavButton } from '@components/common/sidebar';
import { Navbar } from '@components/common/navbar';
import { Logo } from '@components/common/logo';
import { NavTabItemData, NestedNavTab } from '@components/common/nested-nav-tab';
import { ColorModeToggle } from '@components/common/color-mode-toggle';

const nestedMenuData: { [key: string]: NavTabItemData[] } = {
  products: [
    {
      href: '/supplier/products',
      label: 'Products',
    },
    {
      href: '/supplier/products/categories',
      label: 'Categories',
    },
  ],
};

export interface AdminLayoutProps {
  children: React.ReactNode;
  bodyProps?: ContainerProps;
  pageTitle: string;
  nestedMenu?: 'products' | 'users';
}

export const AdminLayout = (props: AdminLayoutProps) => {
  const { children, pageTitle, nestedMenu, bodyProps } = props;
  const isDesktop = useBreakpointValue({ base: false, lg: true });

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
        {isDesktop && <AdminSidebar />}

        <Box flex="1" overflow="auto">
          <Navbar
            isDesktop={isDesktop}
            sidebar={<AdminSidebar />}
            rightElements={
              <ButtonGroup variant="ghost" spacing="1">
                <IconButton fontSize="lg" icon={<FiSearch />} aria-label="Search" />
                <ColorModeToggle />
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

const menu = [
  {
    label: 'Home',
    path: '/supplier/home',
    icon: FiHome,
  },
  {
    label: 'Orders',
    path: '/supplier/orders',
    icon: FiLayers,
  },
  {
    label: 'Retailers',
    path: '/supplier/retailers',
    icon: FiUsers,
  },
  {
    label: 'Products',
    path: '/supplier/products',
    icon: FiGrid,
  },
  {
    label: 'Users',
    path: '/supplier/users',
    icon: FiUserCheck,
  },
];

const AdminSidebar = () => {
  return (
    <SidebarWrapper>
      <Stack justify="space-between" spacing="1" w="full">
        <Stack spacing={{ base: '5', sm: '6' }} shouldWrapChildren>
          <Logo />
          <Stack spacing="1">
            {menu.map((menuItem) => (
              <NavButton key={menuItem.path} {...menuItem} />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </SidebarWrapper>
  );
};
