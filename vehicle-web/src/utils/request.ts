import axios from 'axios'
import {baseUrl_test} from '../config/config.ts'
// create an axios instance
const service = axios.create({
  baseURL: baseUrl_test, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
});
export const $get = async(url:string,params:object={})=>{
	let data = await service.get(url,{params})
	return data;
}
export const $post = async(url:string,params:object={})=>{
	let data = service.post(url,params);
	return data;
}
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
   let jwtToken = sessionStorage.getItem("token");
	config.headers["Authorization"] = "Bearer "+jwtToken;
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么

    return response.data;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });
