import axios from 'axios';
import { getToken, getUsername } from "./cookies"

//第一步创建实例
const service = axios.create({
    baseURL: process.env.REACT_APP_API,
    timeout: 5000,
  });


  // 第二部请求拦截
  service.interceptors.request.use(function (config) {
    
    //请求头添加token
    config.headers['Token'] = getToken();
    config.headers['Username'] = getUsername();

    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// 第三部响应拦截
service.interceptors.response.use(function (response) {
    console.log(3333333333)
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });

  export default service;