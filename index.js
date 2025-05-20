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
import { StyleSheet } from 'react-native-unistyles'

import { theme_breakpoints, themes } from '@kujang/uniui'

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

StyleSheet.configure({
  settings: {
    // adaptiveThemes: true,
    initialTheme: 'light',
  },
  breakpoints: theme_breakpoints,
  themes: themes,
})

const HeadlessCheck = ({ isHeadless }) => {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null
  }
  return <ReactNativePlayground />
}

AppRegistry.registerComponent(appName, () => HeadlessCheck)
