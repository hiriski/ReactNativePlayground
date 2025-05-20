import Http from '@/http'
import { AxiosResponse } from 'axios'

export interface IStoreFCMToken {
  device_name: string
  fcm_token: string
}

export const UserAPI = {
  storeFcmToken: async (body: IStoreFCMToken): Promise<AxiosResponse<unknown>> => {
    const response = await Http.post('/api/fcm-token/store', body)
    return response
  },
}
