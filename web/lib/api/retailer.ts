import sendRequestAndGetResponse from './sendRequestAndGetResponse';

const BASE_PATH = '/api/v1/retailer';

export const getInitialDataApiMethod = (options: any = {}) =>
  sendRequestAndGetResponse(
    `${BASE_PATH}/get-initial-data`,
    Object.assign(
      {
        body: JSON.stringify(options.data || {}),
      },
      options,
    ),
  );

export const getMySuppliersApiMethod = (options: any = {}) =>
  sendRequestAndGetResponse(
    `${BASE_PATH}/my-suppliers`,
    Object.assign(
      {
        method: 'GET',
      },
      options,
    ),
  );

export const getSupplierApiMethod = (options: any = {}) =>
  sendRequestAndGetResponse(
    `${BASE_PATH}/suppliers/${options.supplierId}`,
    Object.assign(
      {
        method: 'GET',
      },
      options,
    ),
  );

export const getCategoryProductsApiMethod = (supplierId, categorySlug) =>
  sendRequestAndGetResponse(`${BASE_PATH}/suppliers/${supplierId}/products`, {
    method: 'GET',
    qs: { categorySlug },
  });

export const getOrdersApiMethod = (supplierId) =>
  sendRequestAndGetResponse(`${BASE_PATH}/suppliers/${supplierId}/orders`, {
    method: 'GET',
  });

export const getOrderDetailsApiMethod = (supplierId, orderId) =>
  sendRequestAndGetResponse(`${BASE_PATH}/suppliers/${supplierId}/orders/${orderId}`, {
    method: 'GET',
  });

export const placeOrderApiMethod = (body) =>
  sendRequestAndGetResponse(`${BASE_PATH}/place-order`, {
    body: JSON.stringify(body),
  });
