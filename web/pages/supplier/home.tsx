import React from 'react';

import withAuth from '@lib/withAuth';
import { AdminLayout } from '@components/layout/admin';

const Admin = () => {
  return <AdminLayout pageTitle="Admin">Admin</AdminLayout>;
};

export default withAuth(Admin, { loginRequired: true, adminRequired: true });
