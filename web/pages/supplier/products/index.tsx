import React from 'react';

import withAuth from '@lib/withAuth';
import { AdminLayout } from '@components/layout/supplier';

const Page = () => {
  return (
    <AdminLayout pageTitle="Products" nestedMenu="products">
      Products
    </AdminLayout>
  );
};

export default withAuth(Page, { loginRequired: true, requiredRoles: ['supplier'] });
