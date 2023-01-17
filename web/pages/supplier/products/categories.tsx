import React from 'react';

import withAuth from '@lib/withAuth';
import { AdminLayout } from '@components/layout/supplier';

const Page = () => {
  return (
    <AdminLayout pageTitle="Categories" nestedMenu="products">
      Categories
    </AdminLayout>
  );
};

export default withAuth(Page, { loginRequired: true, requiredRoles: ['supplier'] });
