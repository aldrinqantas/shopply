import React from 'react';
import { NextPage, NextPageContext } from 'next';
import Router from 'next/router';
import { ChakraProvider } from '@chakra-ui/react';
import NProgress from 'nprogress';

import { theme } from '@lib/theme';
import { isMobile } from '@lib/isMobile';
import { UserProvider } from '@context/UserContext';

import { RetailerProvider } from '@context/RetailerContext';
import { CartProvider } from '@context/CartContext';
import { MessageContainer } from '@lib/message';

import * as gtag from '@lib/gtag';
import { getUserApiMethod } from '@lib/api/public';
import { getSupplierApiMethod } from '@lib/api';

import '../public/static/nprogress.css';

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});

Router.events.on('routeChangeComplete', (url) => {
  NProgress.done();
  gtag.pageview(url);
});

Router.events.on('routeChangeError', () => NProgress.done());

type MyAppProps = {
  Component: NextPage;
  pageProps: any;
  supplierInitialData: any;
  user: any;
};

function MyApp({ Component, pageProps, user, supplierInitialData }: MyAppProps) {
  return (
    <ChakraProvider theme={theme}>
      <UserProvider user={user}>
        <RetailerProvider initialData={supplierInitialData}>
          <CartProvider>
            <Component {...pageProps} />
            <MessageContainer />
          </CartProvider>
        </RetailerProvider>
      </UserProvider>
    </ChakraProvider>
  );
}

MyApp.getInitialProps = async ({
  Component,
  ctx,
}: {
  Component: NextPage;
  ctx: NextPageContext;
}) => {
  const pageProps = {
    isMobile: isMobile({ req: ctx.req }),
  };

  if (Component.getInitialProps) {
    Object.assign(pageProps, await Component.getInitialProps(ctx));
  }

  const appProps = { pageProps };

  // if from client
  if (!ctx.req) {
    return appProps;
  }

  let userObj = null;
  try {
    const { user } = await getUserApiMethod(ctx.req);
    userObj = user;
  } catch (error) {
    console.log(error);
  }

  let supplierInitialData;

  if (userObj) {
    const { supplierId } = ctx.query;
    if (supplierId) {
      try {
        const supplier = await getSupplierApiMethod({
          request: ctx.req,
          supplierId: supplierId,
        });

        supplierInitialData = { supplier };
      } catch (error) {
        console.error(error);
      }
    }
  }

  return {
    ...appProps,
    user: userObj,
    supplierInitialData,
  };
};

export default MyApp;
