
import { ElMessage } from 'element-plus';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { RequestInterceptor, ResponseInterceptor } from './types';

// 通用请求配置
const commonRequestConfig: AxiosRequestConfig = {
  baseURL: '/',
  // 指定请求超时的毫秒数
  timeout: 3000,
  /*
   * 表示支持跨域请求携带cookie，默认是false，表示不携带者Cookie
   * 同时需要后端配合，返回如下字段
   * Access-Control-Allow-Credentials: true
   * Access-Control-Allow-Origin: 当前页面的域名
  */
   withCredentials: false,
};

// 通用的请求拦截器
const commonRequestInterceptors: RequestInterceptor[] = [
  {
    onFulfilled: (config: AxiosRequestConfig) => { 
      /**
       * 在这里一般会携带前台的参数发送给后台
       * const token = getToken();
       * if (token) {
       *   config.headers.token = token;
       * }
       */
      return config;
    },
    onRejected: (error: any) => { 
      const errorMsg = error?.message || "Request Error";
      ElMessage({
        message: errorMsg,
        type: 'error',
      });
      return Promise.reject(error);
    },
  },
];

// 通用响应拦截器
const commonResponseInterceptors: ResponseInterceptor[] = [
  {
    onFulfilled: (response: AxiosResponse) => {
      // 这里我们将后台返回的数据返回回来，方便后续获取
      const { data } = response;
      return data;
      /*
      这里我们还可以根据业务做其他特殊的拦截，比如根据后台返回的data固有的格式，根据后台返回的code做统一处理
      比如根据错误码请求是否成功，来处理。
      const {code, message, data } = response.data;
      if (code === 0) {
        return data;
      } else {
        // 处理业务错误
        ElMessage({
          type: 'error',
          message,
        })
        return Promise.reject(new Error(message));
      }
      */
    },
    onRejected: (error: any) => {
      const { response } = error;
      let message = '';
      // http 状态码
      const status = response?.status;
      switch (status) {
        case 401:
          message = 'token 已失效, 请重新登录';
          break;
        case 403:
          message = '拒绝访问';
          break;
        case 404:
          message = '请求地址错误';
          break;
        case 500:
          message = '服务器故障';
          break;
        default:
          message = '网络链接故障';
      }
      ElMessage({
        message,
        type: 'error'
      });
      return Promise.reject(error);
    }
  }
];

export { 
  commonRequestConfig,
  commonRequestInterceptors,
  commonResponseInterceptors,
}