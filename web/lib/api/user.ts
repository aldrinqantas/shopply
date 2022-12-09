import sendRequestAndGetResponse from './sendRequestAndGetResponse';

const BASE_PATH = '/api/v1/user';

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

export const getAllProductsApiMethod = () =>
  sendRequestAndGetResponse(`${BASE_PATH}/products`, {
    method: 'GET',
  });

export const getCategoryProductsApiMethod = (categorySlug) =>
  sendRequestAndGetResponse(`${BASE_PATH}/products/category/${categorySlug}`, {
    method: 'GET',
  });
