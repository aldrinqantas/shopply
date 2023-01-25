import React from 'react';
import { NextPage, NextPageContext } from 'next';
import Router from 'next/router';
import { ChakraProvider } from '@chakra-ui/react';
import NProgress from 'nprogress';

import { theme } from '@lib/theme';
import { isMobile } from '@lib/isMobile';
import { UserProvider } from '@context/UserContext';
import { AppProvider } from '@context/AppContext';
import { MessageContainer } from '@lib/message';

import * as gtag from '@lib/gtag';
import { getUserApiMethod } from '@lib/api/public';

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
  initialData: any;
  user: any;
};

function MyApp({ Component, pageProps, user, initialData }: MyAppProps) {
  return (
    <ChakraProvider theme={theme}>
      <UserProvider user={user}>
        <AppProvider initialData={initialData}>
          <Component {...pageProps} />
          <MessageContainer />
        </AppProvider>
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

  let initialData;

  if (userObj) {
    try {
      initialData = {};
    } catch (error) {
      console.error(error);
    }
  }

  return {
    ...appProps,
    user: userObj,
    initialData,
  };
};

export default MyApp;
