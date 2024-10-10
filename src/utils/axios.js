import axios from 'axios';

// api 호출 타임 아웃 설정, 20초
const TIMEOUT_API = 20000; 

const service = axios.create({
  timeout: TIMEOUT_API
});

// request 인터셉터
service.interceptors.request.use(
  config => {
    //운영 모드가 아닌 경우 사용자 아이피를 넣어서 보낸다.
    const appEnv = process.env.ENV_APP;
    if (appEnv !== 'production') {
      config.headers['X-Forwarded-For'] = '127.0.0.1';
    }

    return config;
  },
  error => {
    // 에러가 날경우 진행 부분
    Promise.reject(error);
  }
);

// response 인터셉터
service.interceptors.response.use(
  async response => {
    let res = {};
    const meta = response.config.meta;

    // axios를 통해 response 내역 중 data에 서버에서 response된 값이 들어온다.
    // 각각 중복 랩핑 된 내역을 처리한다.
    if (response.data && response.data.datas) {
      res.data = response.data.datas;
    } else if (response.data && response.data.data) {
      res.data = response.data;
    } else if (response.data && response.data.dataList) {
      res.data = response.data.dataList;
    } else {
      res.data = response.data;
    }

    // res 규격이 Object가 아닐 경우 Object로 셋팅
    if (!Array.isArray(res) && typeof res !== 'object') {
      res = {
        body: res
      };
    }
    if (response.data && response.data.result) {
      if (typeof response.data.result === 'object') {
        res.result = response.data.result;
      } else res.result = {};
    } else {
      res.result = {};
    }

    // axios 전문을 원할 경우 아래의 meta 값을 셋팅해서 사용한다.
    if (meta.useResponseAll) return response;

    return res;
  },
  async error => {
    return Promise.reject(error);
  }
);

export default service;
