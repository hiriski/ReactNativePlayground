/**
 * @format
 */

import { AppRegistry } from 'react-native'
import { name as appName } from './app.json'
import {
  messagingBackgroundMessageHandler,
  messagingForegroundMessageHandler,
  messagingGetInitialNotification,
  messagingOnNotificationOpenedApp,
  notifeeOnBackgroundEvent,
} from '@/services/notification.service'
import ReactNativePlayground from './src/app'

// rn screens
import { enableScreens } from 'react-native-screens'

enableScreens(true)

// Android background handler
messagingBackgroundMessageHandler()

// On notification opened app
messagingOnNotificationOpenedApp()

// Get initial notification
messagingGetInitialNotification()

// Notification foreground handler
messagingForegroundMessageHandler()

// notifee background event
notifeeOnBackgroundEvent()

const HeadlessCheck = ({ isHeadless }) => {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null
  }
  return <ReactNativePlayground />
}

AppRegistry.registerComponent(appName, () => HeadlessCheck)
