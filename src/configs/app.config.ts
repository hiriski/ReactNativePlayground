import Config from 'react-native-config'

export const AppConfig = {
  API_BASE_URL: Config.API_BASE_URL || 'https://apiplayground.riski.me',
  PUSHER_API_KEY: '160f37db81478749ac60',
  PUSHER_CLUSTER: 'ap1',
  PEXEL_API_KEY: Config.PEXEL_API_KEY,
}
