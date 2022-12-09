import React from 'react';

import withAuth from '@lib/withAuth';
import { AdminLayout } from '@components/layout/admin';

const Page = () => {
  return (
    <AdminLayout pageTitle="Categories" nestedMenu="products">
      Categories
    </AdminLayout>
  );
};

export default withAuth(Page, { loginRequired: true, adminRequired: true });
