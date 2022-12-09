import * as React from 'react';

import { chakra, HTMLChakraProps, IconButton } from '@chakra-ui/react';

import { useDataGridContext } from './data-grid';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { ButtonGroup, FormControl, FormLabel, Input } from '@chakra-ui/react';

export interface DataGridPaginationProps extends Omit<HTMLChakraProps<'div'>, 'onChange'> {
  onChange?(props: { pageIndex: number; pageSize: number }): void;
}

export const DataGridPagination: React.FC<DataGridPaginationProps> = (props) => {
  const { onChange, ...rest } = props;
  const { instance } = useDataGridContext();

  const state = instance.getState();

  const {
    pagination: { pageIndex, pageSize },
  } = state;

  const { nextPage, previousPage } = instance;

  const pageCount = instance.getPageCount();

  const containerStyles = {
    px: { base: '3', md: '5' },
    py: 2,
    display: 'flex',
    flexDirection: 'row',
    fontSize: 'sm',
  };

  React.useEffect(() => {
    onChange?.({ pageIndex, pageSize });
  }, [pageIndex, pageSize]);

  return (
    <chakra.div __css={containerStyles} {...rest}>
      <FormControl display="flex" flexDirection="row" alignItems="center">
        <FormLabel mb="0">Page</FormLabel>
        <Input
          type="number"
          value={pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            instance.setPageIndex(page);
          }}
          onFocus={(e) => e.target.select()}
          w="20"
          size="sm"
          isDisabled={pageCount === 0}
        />
        <chakra.span ms="2"> of {pageCount}</chakra.span>
      </FormControl>

      <ButtonGroup ms="2">
        <IconButton
          size="sm"
          onClick={previousPage}
          isDisabled={!instance.getCanPreviousPage()}
          icon={<FiChevronLeft />}
          aria-label="Previous page"
        />
        <IconButton
          size="sm"
          onClick={nextPage}
          isDisabled={!instance.getCanNextPage()}
          icon={<FiChevronRight />}
          aria-label="Next page"
        />
      </ButtonGroup>
    </chakra.div>
  );
};
