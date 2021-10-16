'use strict'

import axios from 'axios'
import qs from 'qs'
import config from './config'


axios.interceptors.request.use(config => {
    //  let token = store.state.count;
    //       // 1. 请求开始的时候可以结合 vuex 开启全屏 loading 动画
    //       // console.log(store.state.loading)
    //       // console.log('准备发送请求...')
    //       // 2. 带上token
    //       if (token) {
    //         config.headers.accessToken = token
    //       } else {
    //         // 重定向到登录页面
    //         router.push('/login')
    //       }
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.resolve(error.response)
})

function checkStatus(response) {
    // loading
    // 如果http状态码正常，则直接返回数据
    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
        return response.data
            // 如果不需要除了data之外的数据，可以直接 return response.data
    }
    // 异常状态下，把错误信息返回去
    return {
        status: -404,
        msg: '网络异常'
    }
}

function checkCode(res) {
    // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
    if (res.status === -404) {
        //alert(res.msg)
    }
    //   if (res.data && (!res.data.success)) {
    //     alert(res.data.error_msg)
    //   }
    return res
}

export default {

    async post(url, data) {
        return axios({
            method: 'post',
            baseURL: config.baseURL,
            url,
            data: qs.stringify(data),
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(
            (response) => {
                return checkStatus(response)
            }
        ).then(
            (res) => {
                return checkCode(res)
            }
        )
    },
    async get(url, params) {
        return axios({
            method: 'get',
            baseURL: config.baseURL,
            url,
            params, // get 请求时带的参数
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(
            (response) => {
                return checkStatus(response)
            }
        ).then(
            (res) => {
                return checkCode(res)
            }
        )
    }
}