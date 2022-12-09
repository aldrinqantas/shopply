import React from 'react';

import withAuth from '@lib/withAuth';
import { RetailerLayout } from '@components/layout/retailer';

const RetailerOrders = () => {
  return <RetailerLayout pageTitle="Orders">Orders</RetailerLayout>;
};

export default withAuth(RetailerOrders, { loginRequired: true });
