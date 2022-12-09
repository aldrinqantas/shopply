import React, { useState } from 'react';
import Router from 'next/router';

import withAuth from '@lib/withAuth';
import { AdminLayout } from '@components/layout/admin';
import { RetailerForm } from '@components/admin/retailers';
import { SubmitButton } from '@components/common/form';
import { Card, CardBody } from '@components/common/card';
import { addRetailerApiMethod } from '@lib/api';
import { message } from '@lib/message';

const RetailersAdd = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = (data) => {
    setIsLoading(true);
    const {
      tradingName,
      corporateEntity,
      abn,
      emailAddress,
      phoneNumber,
      deliveryLine1,
      deliveryLine2,
      deliverySuburd,
      deliveryState,
      deliveryPostcode,
    } = data;
    addRetailerApiMethod({
      tradingName,
      corporateEntity,
      abn,
      emailAddress,
      phoneNumber,
      deliveryAddress: {
        line1: deliveryLine1,
        line2: deliveryLine2,
        suburb: deliverySuburd,
        state: deliveryState,
        postcode: deliveryPostcode,
      },
    })
      .then(() => {
        message.success('Retailer added successfully');
        setIsLoading(false);
        Router.push('/admin/retailers');
      })
      .catch((err) => {
        message.error(err.message);
        setIsLoading(false);
      });
  };

  return (
    <AdminLayout pageTitle="Add Retailer" bodyProps={{ maxW: 'container.md' }}>
      <Card>
        <CardBody>
          <RetailerForm onSubmit={handleAdd}>
            <SubmitButton disableIfUntouched isLoading={isLoading}>
              Add
            </SubmitButton>
          </RetailerForm>
        </CardBody>
      </Card>
    </AdminLayout>
  );
};

export default withAuth(RetailersAdd, { loginRequired: true, adminRequired: true });
