import React from 'react';
import Head from 'next/head';
import { Box, Container, useColorModeValue } from '@chakra-ui/react';

import { ColorModeToggle } from '@components/common/color-mode-toggle';

export interface AuthLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
}
export const AuthLayout = (props: AuthLayoutProps) => {
  const { children, pageTitle } = props;
  return (
    <Box backgroundColor={useColorModeValue('gray.50', 'gray.900')} minHeight="100vh">
      <Head>
        <title>{`${pageTitle}`}</title>
      </Head>
      <Box position="absolute" right="2" top="2">
        <ColorModeToggle />
      </Box>
      <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
        {children}
      </Container>
    </Box>
  );
};
