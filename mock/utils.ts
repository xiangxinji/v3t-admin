/* eslint-disable no-underscore-dangle */

// eslint-disable-next-line import/prefer-default-export
export const builder = (data : any, message : string, code = 0, headers = {}) => {
  const responseBody = {
    message: '',
    timestamp: 0,
    result: null,
    code: 0,
    _status: 0,
    _headers: {},
  };
  responseBody.result = data;
  if (message !== undefined && message !== null) {
    responseBody.message = message;
  }
  if (code !== undefined && code !== 0) {
    responseBody.code = code;
    responseBody._status = code;
  }
  if (headers !== null && typeof headers === 'object' && Object.keys(headers).length > 0) {
    responseBody._headers = headers;
  }
  responseBody.timestamp = new Date().getTime();
  return responseBody;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const queryList = <S> (data : Array<S>) :PageResult <any> => ({
  totalElements: 0,
  current: 1,
  size: 10,
  content: data,
});
