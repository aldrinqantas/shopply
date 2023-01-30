import sendRequestAndGetResponse from './sendRequestAndGetResponse';

const BASE_PATH = '/api/v1/supplier';

// Sites
export const supplierGetRetailersApiMethod = () =>
  sendRequestAndGetResponse(`${BASE_PATH}/retailers`, {
    method: 'GET',
  });

export const supplierGetRetailerDetailsApiMethod = (retailerId) =>
  sendRequestAndGetResponse(`${BASE_PATH}/retailers/${retailerId}`, {
    method: 'GET',
  });

export const supplierGetProductsApiMethod = () =>
  sendRequestAndGetResponse(`${BASE_PATH}/products`, {
    method: 'GET',
  });

export const supplierGetCategoriesApiMethod = () =>
  sendRequestAndGetResponse(`${BASE_PATH}/categories`, {
    method: 'GET',
  });

export const supplierGetOrdersApiMethod = (queryString) =>
  sendRequestAndGetResponse(`${BASE_PATH}/orders`, {
    method: 'GET',
    qs: queryString,
  });
