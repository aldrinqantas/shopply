import React, { useState, useEffect, useMemo } from 'react';
import { Stack, Tag, Text } from '@chakra-ui/react';
import { format } from 'date-fns';

import { DataGrid, ColumnDef, DataGridPagination } from '@components/common/data-grid';
import { Order, Retailer } from '@shared/types';
import { supplierGetOrdersApiMethod } from '@lib/api';
import { message } from '@lib/message';
import { getOrderStatusTagColor } from '@lib/common';

export interface OrdersTabProps {
  initFilters?: Record<string, unknown>;
}
export const OrdersTab = (props: OrdersTabProps) => {
  const { initFilters = {} } = props;
  const [orders, setOrders] = useState<Order[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  const [filters, setFilters] = useState({
    ...initFilters,
  });

  useEffect(() => {
    setIsFetching(true);
    supplierGetOrdersApiMethod(filters)
      .then((result) => {
        setOrders(result);
        setIsFetching(false);
      })
      .catch((err) => {
        message.error(err.message);
        setIsFetching(false);
      });
  }, [filters]);

  const columns: ColumnDef<Order>[] = useMemo(
    () => [
      {
        id: 'retailer',
        header: 'Retailer',
        cell: (cellProps) => cellProps.getValue<Retailer>().tradingName,
      },
      {
        id: 'items',
        header: 'Items',
        cell: (cellProps) => {
          const total = cellProps.row.original.products.reduce(
            (result, item) => result + item.quantity,
            0,
          );
          return total;
        },
      },
      {
        id: 'total',
        header: 'Total',
        cell: (cellProps) => {
          const total = cellProps.row.original.products.reduce(
            (result, item) => result + item.sellPrice * item.quantity,
            0,
          );
          return `$${total.toFixed(2)}`;
        },
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
        cell: (cellProps) => format(new Date(cellProps.getValue<Date>()), 'dd/MM/yyyy'),
      },
      {
        id: 'createdAt',
        header: 'Creation Date',
        cell: (cellProps) => format(new Date(cellProps.getValue<Date>()), "dd/MM/yyyy 'at' HH:mm"),
      },
    ],
    [],
  );
  return (
    <Stack>
      <DataGrid
        columns={columns}
        data={orders}
        isSortable
        isSelectable
        isLoading={isFetching}
        onSelectedRowsChange={(rows) => console.log(rows)}
      >
        <DataGridPagination />
      </DataGrid>
    </Stack>
  );
};
