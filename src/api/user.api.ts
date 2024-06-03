import Http from '@/http'
import { AxiosResponse } from 'axios'

export interface IUser {
  username: string
  fcmToken: string
}

export const UserAPI = {
  createUser: async (body: IUser): Promise<AxiosResponse<IUser>> => {
    const response = await Http.post('/user', body)
    return response
  },
}
