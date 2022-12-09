const dev = process.env.NODE_ENV !== 'production';

export const getAppRootUrl = () =>
  dev ? process.env.NEXT_PUBLIC_URL_APP : process.env.NEXT_PUBLIC_PRODUCTION_URL_APP;

export const getApiRootUrl = () =>
  dev ? process.env.NEXT_PUBLIC_URL_API : process.env.NEXT_PUBLIC_PRODUCTION_URL_API;

export const formatAddress = (addressObj) => {
  if (!addressObj) return '';

  const { line1, line2, suburb, state, postcode } = addressObj;

  return `${line1}${line2 ? ` ${line2}` : ''}, ${suburb}, ${state} ${postcode}`;
};
