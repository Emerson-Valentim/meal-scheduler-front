import axios, { Method, AxiosResponse } from 'axios'
import { Credentials } from '../hooks/User'

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
})

api.interceptors.request.use(async (config) => {
  const ipDataStorage = window.sessionStorage.getItem('ipData') || '{}'
  let ipData = JSON.parse(ipDataStorage)
  if (!Object.keys(ipData)) {
    const request = await fetch('https://geolocation-db.com/json/')
    ipData = await request.json()
    window.sessionStorage.setItem('ipData', JSON.stringify(ipData))
  }

  config.headers['user-ip'] = ipData.IPv4
  config.headers['user-location'] = ipData.state

  return config
})

export type HttpData<T> = {
  data: T
  state: 'ok' | 'error' | 'notFound' | 'pending'
}

type RequestData = {
  params?: any
  data?: any
}

export const request = <T>(
  method: Method,
  url: string,
  { params, data }: RequestData = { params: undefined, data: undefined }
): Promise<AxiosResponse<T>> => {
  return api.request<T>({
    method,
    url,
    params,
    data
  })
}

export const authRequest = <T>(
  method: Method,
  url: string,
  { params, data }: RequestData = { params: undefined, data: undefined }
): Promise<AxiosResponse<T>> => {
  const { cnpj, password }: Credentials = JSON.parse(window.localStorage.getItem('credentials')!)
  return api.request<T>({
    method,
    url,
    params,
    data,
    auth: {
      username: cnpj,
      password: password
    }
  })
}
