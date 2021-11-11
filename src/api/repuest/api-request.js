import request from './api-config';


export const reqGet = (url, params, config = {}) => {
  const method = 'get';
  return {
    request() {
      return request({
        url,
        method,
        params,
        ...config
      });
    }
  };
};


export const reqPost = (url, data, config = {}) => {
  const method = 'post';
  return {
    request() {
      return request({
        url,
        method,
        data,
        ...config

      });
    }
  };
};

export const reqPut = (url, data, config = {}) => {
  const method = 'put';
  return request({
    url,
    method,
    data,
    config
  });
};