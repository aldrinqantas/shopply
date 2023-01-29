import React, { useMemo, useEffect, useState } from 'react';
import { AvatarGroup, Avatar, Tag, Text } from '@chakra-ui/react';
import Router from 'next/router';
import _get from 'lodash/get';
import { format } from 'date-fns';

import withAuth from '@lib/withAuth';
import { RetailerLayout } from '@components/layout/retailer';
import { Card, CardHeader, CardTitle } from '@components/common/card';
import { ColumnDef, DataGrid, DataGridPagination } from '@components/common/data-grid';
import { Order } from '@shared/types';
import { useRetailerContext } from '@context/RetailerContext';
import { getOrdersApiMethod } from '@lib/api';
import { message } from '@lib/message';
import { getOrderStatusTagColor } from '@lib/common';

const Page = () => {
  const [orders, setOrders] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const { currentSupplier } = useRetailerContext();
  useEffect(() => {
    setIsFetching(true);
    getOrdersApiMethod(currentSupplier._id)
      .then((result) => {
        setOrders(result);
        setIsFetching(false);
      })
      .catch((err) => {
        message.error(err.message);
        setIsFetching(false);
      });
  }, [currentSupplier]);

  const columns: ColumnDef<Order>[] = useMemo(
    () => [
      {
        id: 'items',
        header: 'Items',
        cell: (cellProps) => (
          <AvatarGroup
            size="md"
            max={2}
            sx={{
              '.chakra-avatar__excess': { borderRadius: 'md' },
            }}
          >
            {cellProps.row.original.products?.map((product) => (
              <Avatar borderRadius="md" key={product._id} src={_get(product, 'images[0]')} />
            ))}
          </AvatarGroup>
        ),
      },
      {
        id: 'status',
        header: 'Status',
        cell: (cellProps) => {
          const status = cellProps.getValue<string>();
          return <Tag colorScheme={getOrderStatusTagColor(status)}>{status}</Tag>;
        },
      },
      {
        id: 'comment',
        header: 'Comment',
        cell: (cellProps) => <Text maxW={40}>{cellProps.getValue<string>()}</Text>,
      },
      {
        id: 'deliveryDate',
        header: 'Delivery Date',
        cell: (cellProps) => format(new Date(cellProps.getValue<string>()), 'dd/MM/yyyy'),
      },
      {
        id: 'total',
        header: 'Price',
        cell: (cellProps) => {
          const total = cellProps.row.original.products.reduce(
            (result, item) => result + item.sellPrice * item.quantity,
            0,
          );
          return `$${total.toFixed(2)}`;
        },
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
          onRowClick={(row) =>
            Router.push(
              '/retailer/suppliers/[supplierId]/orders/[orderId]',
              `/retailer/suppliers/${currentSupplier._id}/orders/${row.original._id}`,
            )
          }
          isHoverable
        >
          <DataGridPagination />
        </DataGrid>
      </Card>
    </RetailerLayout>
  );
};

export default withAuth(Page, { loginRequired: true, requiredRoles: ['retailer'] });
