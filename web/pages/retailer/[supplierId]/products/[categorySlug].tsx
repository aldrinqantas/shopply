import React, { useState, useEffect } from 'react';
import { SimpleGrid } from '@chakra-ui/react';

import withAuth from '@lib/withAuth';
import { RetailerLayout } from '@components/layout/retailer';
import { ProductItemCard } from '@components/retailer/products/product-item-card';
import { ProductCardSkeleton } from '@components/retailer/products/product-card-skeleton';
import { getCategoryProductsApiMethod } from '@lib/api';

const Page = ({ categorySlug }: { categorySlug: string }) => {
  const [products, setProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    getCategoryProductsApiMethod(categorySlug)
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, [categorySlug]);

  const fetchingSkeletons = Array(8)
    .fill(0)
    .map((_, index) => <ProductCardSkeleton key={index} />);

  const productList = products.map((product) => (
    <ProductItemCard key={product._id} product={product} />
  ));

  return (
    <RetailerLayout pageTitle="Orders" bodyProps={{ maxW: 'container.lg' }}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {isFetching ? fetchingSkeletons : productList}
      </SimpleGrid>
    </RetailerLayout>
  );
};

Page.getInitialProps = async function getInitialProps({ query, req }) {
  const { categorySlug } = query;
  return { categorySlug };
};

export default withAuth(Page, { loginRequired: true });
