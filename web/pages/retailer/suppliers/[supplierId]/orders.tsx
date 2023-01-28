import React from 'react';

import withAuth from '@lib/withAuth';
import { RetailerLayout } from '@components/layout/retailer';

const Page = () => {
  return <RetailerLayout pageTitle="Orders">Orders</RetailerLayout>;
};

export default withAuth(Page, { loginRequired: true });
