import React from 'react';

import withAuth from '@lib/withAuth';
import { RetailerLayout } from '@components/layout/retailer';

const Page = ({ supplierId }) => {
  return (
    <RetailerLayout pageTitle="Orders" supplierId={supplierId}>
      Orders
    </RetailerLayout>
  );
};

Page.getInitialProps = async function getInitialProps({ query, req }) {
  const { supplierId } = query;
  return { supplierId };
};

export default withAuth(Page, { loginRequired: true });
