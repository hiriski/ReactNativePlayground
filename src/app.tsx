import React, { JSX, useCallback, useEffect } from 'react'

import { Alert, Platform, StatusBar } from 'react-native'

// gesture handler root view.
import { GestureHandlerRootView } from 'react-native-gesture-handler'

// safe area provider
import { SafeAreaProvider } from 'react-native-safe-area-context'

// bottom sheet modal provider.
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

// react native screens.
import { enableScreens } from 'react-native-screens'

// messaging
import messaging from '@react-native-firebase/messaging'

// portal
import { PortalProvider } from '@gorhom/portal'

// navigator container
import AppNavigatorContainer from './app-navigator-container'
import { PermissionUtils } from './utilities/permissions.util'
import { storageUtils } from './utilities'
import { UserAPI } from './api'
import initPusher from './services/pusher.service'
import { AppConfig } from './configs'

enableScreens()
initPusher()

const ReactNativePlayground = (): JSX.Element => {
  const prevNotificationPermission = storageUtils.get('NOTIFICATION_PERMISSION')
  console.log('prevNotificationPermission', prevNotificationPermission)

  const initialRequestPermissions = async () => {
    Alert.alert(
      'This app needs to send you notification.',
      '',
      [
        {
          text: 'No',
          onPress: () => {
            storageUtils.save('NOTIFICATION_PERMISSION', 'denied')
          },
        },
        {
          text: 'Yes',
          onPress: async () => {
            if (Platform.OS === 'ios') {
              await PermissionUtils.requestUserPermission()
            }
            if (Platform.OS === 'android') {
              await PermissionUtils.requestNotificationPermissionAndroid()
            }
          },
        },
      ],
      { cancelable: false }
    )
  }

  const registerFCMToken = useCallback(async () => {
    try {
      // Register the device with FCM
      await messaging().registerDeviceForRemoteMessages()

      // Get the token
      const fcmToken = await messaging().getToken()
      console.log('fcmToken', fcmToken)

      if (fcmToken) {
        try {
          await UserAPI.createUser({ username: Platform.OS, fcmToken })
          console.info('register token success')
        } catch (e) {
          console.info('failed to register token')
        }
      } else {
      }
    } catch (e) {}
  }, [])

  useEffect(() => {
    if (!prevNotificationPermission || prevNotificationPermission === 'denied') {
      initialRequestPermissions()
    }
  }, [prevNotificationPermission])

  useEffect(() => {
    registerFCMToken()
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PortalProvider>
        <BottomSheetModalProvider>
          <SafeAreaProvider>
            <StatusBar translucent backgroundColor='transparent' />
            <AppNavigatorContainer />
          </SafeAreaProvider>
        </BottomSheetModalProvider>
      </PortalProvider>
    </GestureHandlerRootView>
  )
}

export default ReactNativePlayground
