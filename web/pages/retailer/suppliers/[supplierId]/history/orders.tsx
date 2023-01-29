import React, { useMemo, useEffect, useState } from 'react';
import { Text, Heading, Stack, SimpleGrid, As, Icon, HStack } from '@chakra-ui/react';
import Link from 'next/link';

import withAuth from '@lib/withAuth';
import { RetailerLayout } from '@components/layout/retailer';
import { Card, CardBody, CardHeader, CardTitle } from '@components/common/card';
import { ColumnDef, DataGrid, DataGridPagination } from '@components/common/data-grid';
import { Order } from '@shared/types';

const Page = () => {
  const [orders, setOrders] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const columns: ColumnDef<Order>[] = useMemo(
    () => [
      {
        id: 'name',
        header: 'Name',
      },
      {
        id: 'description',
        header: 'Description',
        cell: (cellProps) => <Text maxW={60}>{cellProps.getValue<string>()}</Text>,
      },

      {
        id: 'sellPrice',
        header: 'Price',

        cell: (cellProps) => `$${cellProps.getValue<number>()}`,
      },
    ],
    [],
  );
  return (
    <RetailerLayout pageTitle="Orders" bodyProps={{ maxW: 'container.lg' }} nestedMenu="history">
      <Card>
        <CardHeader>
          <CardTitle flex={1}>Orders</CardTitle>
        </CardHeader>
        <DataGrid
          columns={columns}
          data={orders}
          isSortable
          isLoading={isFetching}
          onSelectedRowsChange={(rows) => console.log(rows)}
        >
          <DataGridPagination />
        </DataGrid>
      </Card>
    </RetailerLayout>
  );
};

export default withAuth(Page, { loginRequired: true, requiredRoles: ['retailer'] });
