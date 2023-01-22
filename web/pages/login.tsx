import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { Logo } from '@components/common/logo';
import withAuth from '@lib/withAuth';
import { loginApiMethod } from '@lib/api/public';
import { getAppRootUrl } from '@lib/common';
import { AuthLayout } from '@components/layout/auth';
import { PasswordInput } from '@components/common/password-input';

//
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [error, setError] = useState(null);

  const handleLogin = async (data) => {
    const { email, password } = data;
    try {
      const { success, message } = await loginApiMethod({ email, password });
      if (success) {
        window.location.href = `${getAppRootUrl()}`;
      } else {
        setError(message);
      }
    } catch (error) {}
  };

  return (
    <AuthLayout pageTitle="Login">
      <Stack spacing="8">
        <Stack spacing="6">
          <Logo color="brand.500" />
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={useBreakpointValue({ base: 'md', md: 'lg' })}>
              Log in to your account
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Don't have an account?</Text>
              <Button variant="link" colorScheme="brand">
                Sign up
              </Button>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <form onSubmit={handleSubmit(handleLogin)}>
            <Stack spacing="6">
              <Stack spacing="5">
                {error && (
                  <Alert status="error" borderRadius="lg">
                    <AlertIcon />
                    {error}
                  </Alert>
                )}
                <FormControl isInvalid={!!errors.email}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input {...register('email', { required: 'Email is required' })} />

                  <FormErrorMessage>
                    <>{errors.email && errors.email.message}</>
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <PasswordInput {...register('password', { required: 'Password is required' })} />
                  <FormErrorMessage>
                    <>{errors.password && errors.password.message}</>
                  </FormErrorMessage>
                </FormControl>
              </Stack>
              <HStack justify="space-between">
                <Checkbox defaultChecked>Remember me</Checkbox>
                <Button variant="link" colorScheme="brand" size="sm">
                  Forgot password?
                </Button>
              </HStack>
              <Stack spacing="6">
                <Button variant="primary" type="submit" isLoading={isSubmitting}>
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
        <Alert status="info">
          <AlertIcon />
          <Stack spacing={0} fontSize="sm">
            <Text>Account: Email | Password</Text>
            <Text>Supplier 1: admin_supplier_1@gmail.com | ShopplyAdmin</Text>
            <Text>Supplier 2: admin_supplier_2@gmail.com | ShopplyAdmin</Text>
            <Text>Retailer 1: admin_retailer_1@gmail.com | ShopplyAdmin</Text>
          </Stack>
        </Alert>
      </Stack>
    </AuthLayout>
  );
};

export default withAuth(Login, { logoutRequired: true });
