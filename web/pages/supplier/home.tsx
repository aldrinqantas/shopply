import React from 'react';

import withAuth from '@lib/withAuth';
import { SupplierLayout } from '@components/layout/supplier';

const Admin = () => {
  return <SupplierLayout pageTitle="Admin">Admin</SupplierLayout>;
};

export default withAuth(Admin, { loginRequired: true, requiredRoles: ['supplier'] });
