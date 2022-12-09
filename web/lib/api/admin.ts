import sendRequestAndGetResponse from './sendRequestAndGetResponse';

const BASE_PATH = '/api/v1/admin';

// Sites
export const adminGetRetailersApiMethod = () =>
  sendRequestAndGetResponse(`${BASE_PATH}/retailers/list`, {
    method: 'GET',
  });

export const adminGetRetailerDetailsApiMethod = (retailerId) =>
  sendRequestAndGetResponse(`${BASE_PATH}/retailers/${retailerId}`, {
    method: 'GET',
  });

export const addRetailerApiMethod = (body) =>
  sendRequestAndGetResponse(`${BASE_PATH}/retailers/add`, {
    body: JSON.stringify(body),
  });
