/**
 * @format
 */

import { AppRegistry } from 'react-native'
import { name as appName } from './app.json'
import {
  messagingBackgroundMessageHandler,
  messagingForegroundMessageHandler,
  notifeeOnBackgroundEvent,
} from '@/services/notification.service'
import ReactNativePlayground from './src/app'

// Android background handler
messagingBackgroundMessageHandler()

// Android & ios foreground
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
