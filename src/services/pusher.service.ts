import { AppConfig } from '@/configs'
import { Pusher } from '@pusher/pusher-websocket-react-native'

export const pusher = Pusher.getInstance()

const initPusher = async () => {
  try {
    await pusher.init({
      apiKey: AppConfig.PUSHER_API_KEY,
      cluster: AppConfig.PUSHER_CLUSTER,
      onSubscriptionSucceeded: (channelName: string, data: any) => {
        console.log('PUSHER > onSubscriptionSucceeded', channelName, data)
      },
    })
    await pusher.connect()
  } catch (e) {
    console.log(`ERROR: ${e}`)
  }
}

export default initPusher
