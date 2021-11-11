import axios from 'axios';
import store from '@/store';

import {Modal, notification} from 'ant-design-vue/es';


import {MessageBox, Message} from 'element-ui';


const url = 'https://www.fastmock.site/mock/e9a8b0d50f446fbb07651191d4a72c0b/test';
const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 5000,
});


service.interceptors.request.use(
  config => {

    // removePending(config) // 在请求开始前，对之前的请求做检查取消操作
    // addPending(config) // 将当前请求添加到 pending 中

    if (store.getters.token) {
      config.headers.Authorization = store.getters.token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    const res = response.data;
    const message =
      response.data.message || response.data.errMsg || response.data.msg || response.data.Msg;

    if (res.code === 20000) {
      return res;
    }
    if (res.code === 40003) {
      return res;
    }
    //获取用户信息状态码
    if (res.code === 40012) {
      return res;
    }

    if (res.code === '0002') {
      return Promise.reject({...response, message});
    }

    if (res.code === 40004) {
      Modal.warning({
        title: '重新登录',
        content: '登录态失效，请重新登录',
        closable: false,
        keyboard: false,
        maskClosable: false,
        okText: '确定',
        onOk: () => {
          store.dispatch('user/logout', this.$store.state['user/token'])
            .then(() => {
              window.location.reload();
            });
        }
      });
    } else {
      Message({
        message: message || 'Error',
        type: 'error',
        duration: 5 * 1000
      });
      return Promise.reject({...response, message});
    }

  },


  error => {
    console.log('err' + error); // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);


export default service;
