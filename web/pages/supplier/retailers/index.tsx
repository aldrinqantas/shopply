import React, { useState, useEffect, useMemo } from 'react';
import { HStack, Button, Tag, IconButton } from '@chakra-ui/react';
import Router from 'next/router';
import { FiEdit, FiEye } from 'react-icons/fi';

import withAuth from '@lib/withAuth';
import { SupplierLayout } from '@components/layout/supplier';
import { Card, CardHeader, CardTitle } from '@components/common/card';
import { SearchInput } from '@components/common/search-input';
import { DataGrid, ColumnDef } from '@components/common/data-grid';
import { supplierGetRetailersApiMethod } from '@lib/api';
import { Retailer } from '@shared/types';
import { message } from '@lib/message';

const Page = () => {
  const [sites, setSites] = useState<Retailer[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    setIsFetching(true);
    supplierGetRetailersApiMethod()
      .then((result) => {
        setSites(result);
        setIsFetching(false);
      })
      .catch((err) => {
        message.error(err.message);
        setIsFetching(false);
      });
  }, []);

  const columns: ColumnDef<Retailer>[] = useMemo(
    () => [
      {
        id: 'tradingName',
        header: 'Name',
      },
      {
        id: 'emailAddress',
        header: 'Email',
      },
      {
        id: 'phoneNumber',
        header: 'Phone',
      },
      {
        id: 'status',
        header: 'Status',
        cell: (cellProps) => <Tag colorScheme="green">{cellProps.getValue<string>()}</Tag>,
      },
      {
        id: 'actions',
        header: null,
        cell: (cellProps) => (
          <HStack>
            <IconButton aria-label="Update retailer" size="xs" icon={<FiEdit />} />
            <IconButton aria-label="View retailer" size="xs" icon={<FiEye />} />
          </HStack>
        ),
      },
    ],
    [],
  );

  return (
    <SupplierLayout pageTitle="Retailers">
      <Card>
        <CardHeader>
          <CardTitle flex={1}>Retailers</CardTitle>
          <HStack>
            <SearchInput />
          </HStack>
        </CardHeader>
        <DataGrid
          columns={columns}
          data={sites}
          isSortable
          isLoading={isFetching}
          onSelectedRowsChange={(rows) => console.log(rows)}
        />
      </Card>
    </SupplierLayout>
  );
};

export default withAuth(Page, { loginRequired: true, requiredRoles: ['supplier'] });
