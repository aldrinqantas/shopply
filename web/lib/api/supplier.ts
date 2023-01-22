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
