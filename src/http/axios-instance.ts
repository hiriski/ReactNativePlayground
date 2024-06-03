import _axios, { AxiosError, AxiosResponse } from 'axios'
import { AppConfig } from '@/configs'

// On request rejected
const onRequestError = (axiosError: AxiosError) => {
  return axiosError
}

// On response fulfilled
const onResponseSuccess = (axiosResponse: AxiosResponse) => {
  return axiosResponse
}

// On response rejected
const onResponseError = (axiosError: AxiosError) => {
  console.log('onResponseError->>', axiosError)
  return Promise.reject(axiosError)
}

/**
 * Axios instance
 */
const Axios = _axios.create({
  baseURL: AppConfig.API_BASE_URL,
  timeout: 20000,
})

// On request
Axios.interceptors.request.use(
  async config => {
    return config
  },
  error => {
    return Promise.reject(onRequestError(error))
  }
)
// On response
Axios.interceptors.response.use(
  async response => {
    return onResponseSuccess(response)
  },
  async error => {
    return onResponseError(error)
  }
)

export default Axios
