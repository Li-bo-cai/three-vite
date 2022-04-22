'use strict';
import axios from 'axios';
import { locStorage } from './storage'
import { ElMessage, ElMessageBox } from 'element-plus'
import { showLoading, hideLoading } from './loading'
import { router } from '../route/index'
axios.defaults.baseURL = process.env.VUE_APP_URL;

let timer = null
let pending = []
const cancelToken = axios.CancelToken;
const source = cancelToken.source();

let removeRepeatUrl = (ever) => {
  for (let p in pending) {
    // 判断是否存在重复请求
    if (
      pending[p].config &&
      pending[p].config.url === ever.url &&
      pending[p].config.method === ever.method
    ) {
      if ((isObjectValueEqual(pending[p].config), ever))
        //当当前请求在数组中存在时执行函数体
        pending[p].cancle(); //执行取消操作
      pending.splice(p, 1); //把这条记录从数组中移除
    }
  }
};

// 添加请求拦截器
axios.interceptors.request.use(config => {

  removeRepeatUrl({
    method: config.method,
    url: config.url,
    params: config.params,
    data: config.data
  });
  // 创建cancleToken和cancle取消请求方法, 每个请求都不一样的哦
  config.cancelToken = new cancelToken(c => {
    // 自定义唯一标识
    pending.push({
      config: {
        method: config.method,
        url: config.url,
        params: config.params,
        data: config.data
      },
      cancle: c // 
    });
  });

  if (config.params && config.params.isShowLoading) {
    showLoading()
  }
  // 请求拦截进来调用显示loading效果
  // showLoading()
  // 断网提示
  if (!navigator.onLine) {
    ElMessageBox.alert(
      '您的网络故障，请检查!',
      '温馨提示',
      {
        confirmButtonText: '好的',
        type: 'warning'
      }
    )
  }
  // 判断是否存在token，如果存在将每个页面header都添加token
  let userInfo = locStorage('userInfo')
  if (userInfo.access_token) {
    config.headers.Authorization = `Bearer ${userInfo.access_token}`
  }
  return config;
}, error => {
  console.log('请求拦截error', error)
  // 对请求错误做些什么
  return Promise.reject(error)
});

const checkStatus = response => {
  if (!response) {
    //请求failed,返回response为undefined
    return {
      data: {
        code: -408,
        msg: '请求失败',
        data: '请求失败',
      }
    }
  } else if (response.status === 200 || response.status === 304) {
    // 如果 http 状态码正常, 则直接返回数据
    // 请求接口成功
    return response
  }
  // 错误扶正, 不然像 404, 500 这样的错误是走不到这里的
  return {
    data: {
      code: -404,
      msg: response.statusText,
      data: response.statusText,
    }
  }
}

const checkCode = res => {
  if (res.data.code == 402 || res.data.code == 401 || res.data.code == 403 || res.data.code == 44455) {
    /*ElMessageBox.alert(
      '你已被登出，需要重新登录',
      '温馨提示',
      {
        confirmButtonText: '重新登录',
        type: 'warning',
        showClose: false
      }
    )*/
    ElMessage({
      message: '登录过期，请重新登录',
      type: 'error',
    })
    locStorage('userInfo', '')
    router.replace('/login');
  } else if (res.data.code == 408) {
    //请求错误(code)
    console.log('登录问题')
  }
  return res
}


axios.interceptors.response.use(res => {
  // 响应拦截进来隐藏loading效果，此处采用延时处理是合并loading请求效果，避免多次请求loading关闭又开启
  setTimeout(() => {
    hideLoading()
  }, 200)
  let resStatus = checkStatus(res);
  let resCode = checkCode(resStatus);
  return resCode.data;
}, async error => {
  // 响应拦截进来隐藏loading效果，此处采用延时处理是合并loading请求效果，避免多次请求loading关闭又开启
  setTimeout(() => {
    hideLoading()
  }, 200)
  console.log('http response - err', error)
  // console.log(error.toString());

  if (error.toString() == 'Cancel') {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      ElMessage({
        message: '请勿重复提交',
        type: 'error',
        duration: 2 * 1000
      })
    }, 500);
    return Promise.reject(error)
  }
  ElMessage({
    message: '服务器异常，请稍后再试',
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(new Error('error'))
});

function post(urlData, paramsData) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: urlData,
      data: paramsData
    })
      .then(
        res => {
          resolve(res);
        },
        error => {
          reject(error);
        }
      )
      .catch(error => {
        reject(error);
      });
  });
}
function get(urlData, paramsData) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: urlData,
      params: paramsData,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(
        res => {
          resolve(res);
        },
        error => {
          reject(error);
        }
      )
  });
}
function postFormData(urlData, paramsData) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: urlData,
      data: paramsData,
      headers: {
        "Content-Type": "multipart/form-data; charset=utf-8"
      }
    })
      .then(
        res => {
          resolve(res);
        },
        error => {
          reject(error);
        }
      )
      .catch(error => {
        reject(error);
      });
  });
}
export default { postFormData, get, post };

/**
 *比较两个对象是否相等
 * @method isObjectValueEqual
 * @param {Object} a 对象a
 * @param {Object} b 对象b
 * @return {Boolean}
 */
function isObjectValueEqual(a, b) {
  console.log(a, b);
  // 判断两个对象是否指向同一内存，指向同一内存返回true,同时比较null和undefined情况
  if (a == b) return true;
  if (a == null || a == undefined || b == null || b == undefined) {
    return false;
  }
  // 获取两个对象键值数组
  let aProps = Object.getOwnPropertyNames(a);
  let bProps = Object.getOwnPropertyNames(b);
  // 判断两个对象键值数组长度是否一致，不一致返回false
  if (aProps.length !== bProps.length) return false;
  // 遍历对象的键值
  for (let prop in a) {
    // 判断a的键值，在b中是否存在，不存在，返回false
    if (b.hasOwnProperty(prop)) {
      // 判断a的键值是否为对象，是则递归，不是对象直接判断键值是否相等，不相等返回false
      if (typeof a[prop] === "object") {
        if (!isObjectValueEqual(a[prop], b[prop])) return false;
      } else if (a[prop] !== b[prop]) {
        return false;
      }
    } else {
      return false;
    }
  }
  return true;
}
