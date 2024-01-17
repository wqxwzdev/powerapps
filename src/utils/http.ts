import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig
} from 'axios'
import { getToken } from './auth'
import type { ApiResType } from '../model'

// 请求配置
export class HttpServer {
  private _axios: AxiosInstance
  private msgCount: number
  // 获取axios实例
  constructor() {
    const option: AxiosRequestConfig = {
      baseURL: import.meta.env.VITE_BASE_API,
      timeout: 30 * 1000,
      method: 'post'
    }

    const service = axios.create(option)

    service.interceptors.request.use(
      function (config: InternalAxiosRequestConfig) {
        const token = getToken()
        if (token) {
          const headers = Object.assign({}, config.headers)
          headers['Authorization'] = 'bearer ' + token
          config.headers = headers
        }
        return config
      },
      function (error: any) {
        // Do something with request error
        return Promise.reject(error)
      }
    )

    // Add a response interceptor
    service.interceptors.response.use(
      function (response: AxiosResponse) {
        // Do something with response data
        if (response.status === 200) {
          return response.data
        } else {
          return Promise.reject(response.statusText)
        }
      },
      function (error: any) {
        // Do something with response error
        return Promise.reject(error)
      }
    )

    this._axios = service
    this.msgCount = 0
  }

  /**
   * 接口请求
   * @param option 请求参数
   * @param loading 是否显示loading
   * @returns
   */
  request<T = any>(option: any, loading = false): Promise<ApiResType<T>> {
    if (loading) {
      this.msgCount++
    }

    const promise = new Promise<ApiResType<T>>((resolve, reject) => {
      this._axios
        .request<ApiResType<T>, ApiResType<T>>(option)
        .then((res) => {
          resolve(res)
        })
        .catch((err: any) => {
          reject(err)
        })
        .finally(() => {
          if (loading) {
            this.msgCount--
            if (this.msgCount === 0) {
              //
            }
          }
        })
    })

    return promise
  }
}

const http = new HttpServer()
export default http
