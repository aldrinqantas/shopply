import Router from 'next/router';
import React from 'react';
import { UserContext } from '@context/UserContext';

import type { User, UserRole } from '@shared/types';

export function isAuthorised(user: User, requiredRoles: any) {
  return (user && user.role === 'super') || requiredRoles.includes(user.role);
}

export default function withAuth(
  Component,
  {
    loginRequired = true,
    logoutRequired = false,
    requiredRoles = false,
  }: {
    loginRequired?: boolean;
    logoutRequired?: boolean;
    requiredRoles?: boolean | UserRole[];
  } = {},
) {
  class WithAuth extends React.Component {
    static contextType = UserContext;

    public static async getInitialProps(ctx) {
      const { req } = ctx;

      let pageComponentProps = {};

      if (Component.getInitialProps) {
        pageComponentProps = await Component.getInitialProps(ctx);
      }

      return {
        ...pageComponentProps,
        isServer: !!req,
      };
    }

    public componentDidMount() {
      // console.log('WithAuth.componentDidMount');

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      /* @ts-ignore */
      const { currentUser: user } = this.context;

      if (loginRequired && !logoutRequired && !user) {
        return Router.push('/login');
      }

      if (requiredRoles && !isAuthorised(user, requiredRoles)) {
        return Router.push('/403');
      }

      let redirectUrl = '/login';
      if (user) {
        if (user.role === 'supplier') {
          redirectUrl = '/supplier/home';
        } else {
          redirectUrl = '/retailer/suppliers';
        }
      }

      if (logoutRequired && user) {
        console.log('here');
        Router.push(redirectUrl);
      }
    }

    public render() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      /* @ts-ignore */
      const { currentUser: user } = this.context;

      if (loginRequired && !logoutRequired && !user) {
        return null;
      }

      if (requiredRoles && !isAuthorised(user, requiredRoles)) {
        return null;
      }

      if (logoutRequired && user) {
        return null;
      }

      return <Component {...this.props} />;
    }
  }

  return WithAuth;
}
