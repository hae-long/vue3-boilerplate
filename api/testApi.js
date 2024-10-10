import request from '@/utils/axios';
import * as api from './path';

const SAMPLE = api.path.SAMPLE;

const _getTest = (id = null) => {
  return request({
    url: api.toRestApi(SAMPLE.TEST, { componentId: id }),
    method: 'get'
  });
};

export const getTestAPI = (id = null) => {
  return _getTest(id)
    .then((res) => {
      if (!res || !res.data) {
        throw new Error();
      }
      return { response: res.data, error: null };
    })
    .catch(err => {
      console.log(err);
      return { response: null, error: true };
    });
};