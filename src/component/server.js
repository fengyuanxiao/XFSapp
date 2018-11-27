import axios from 'axios';
import qs from 'qs';

axios.defaults.baseURL = '/api';

// post方法
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// get方法
export function post(url, data) {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }
    ).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export default http
