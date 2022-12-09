import sendRequestAndGetResponse from './sendRequestAndGetResponse';

const BASE_PATH = '/api/v1/public';

// Auth
export const loginApiMethod = ({ email, password }: { email: string; password: string }) =>
  sendRequestAndGetResponse('/auth/login', {
    body: JSON.stringify({ email, password }),
  });

export const logoutApiMethod = () =>
  sendRequestAndGetResponse(`/auth/logout`, {
    method: 'GET',
  });

export const getUserApiMethod = (request) =>
  sendRequestAndGetResponse(`${BASE_PATH}/get-user`, {
    request,
    method: 'GET',
  });
