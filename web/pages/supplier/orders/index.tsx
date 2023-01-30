import React from 'react';
import { HStack, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Router from 'next/router';
import { startOfDay, endOfDay, addDays } from 'date-fns';

import withAuth from '@lib/withAuth';
import { SupplierLayout } from '@components/layout/supplier';
import { Card, CardHeader, CardTitle } from '@components/common/card';
import { SearchInput } from '@components/common/search-input';
import { OrdersTab } from '@components/supplier/orders/orders-tab';

const Page = () => {
  const today = new Date();
  const tomorrow = addDays(today, 1);
  return (
    <SupplierLayout pageTitle="Orders">
      <Card>
        <CardHeader pb="0">
          <CardTitle flex={1}>Orders</CardTitle>
          <HStack>
            <SearchInput />
          </HStack>
        </CardHeader>
        <Tabs isLazy size="lg">
          <TabList>
            <Tab>All</Tab>
            <Tab>Today</Tab>
            <Tab>Tomorrow</Tab>
          </TabList>
          <TabPanels>
            <TabPanel p="0" pt="4">
              <OrdersTab />
            </TabPanel>
            <TabPanel p="0" pt="4">
              <OrdersTab
                initFilters={{
                  deliveryStart: startOfDay(today).toISOString(),
                  deliveryEnd: endOfDay(today).toISOString(),
                }}
              />
            </TabPanel>
            <TabPanel p="0" pt="4">
              <OrdersTab
                initFilters={{
                  deliveryStart: startOfDay(tomorrow).toISOString(),
                  deliveryEnd: endOfDay(tomorrow).toISOString(),
                }}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Card>
    </SupplierLayout>
  );
};

export default withAuth(Page, { loginRequired: true, requiredRoles: ['supplier'] });
