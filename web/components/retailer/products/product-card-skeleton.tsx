import React from 'react';
import { Skeleton, SkeletonText, Stack } from '@chakra-ui/react';

import { Card, CardBody } from '@components/common/card';

export const ProductCardSkeleton = () => {
  return (
    <Card>
      <CardBody>
        <Stack direction="column" spacing="3">
          <Stack direction="row" spacing={4}>
            <Skeleton w={{ base: '36', md: '48' }} />
            <Stack direction="column" spacing="4" w="full">
              <Skeleton height="6" />
              <SkeletonText noOfLines={3} spacing="3" />
            </Stack>
          </Stack>
          <Stack direction="row" justify="end">
            <Skeleton height="8" w="36" />
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
};
