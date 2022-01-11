import qs from 'qs';

export const queryParse = (queryUrl: string) => {
  return qs.parse(queryUrl, { ignoreQueryPrefix: true });
};

export const queryStringify = (obj: any) => {
  return qs.stringify(obj, { encode: false });
};