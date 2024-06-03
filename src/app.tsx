import React, { useEffect } from 'react'

import { Alert, Platform } from 'react-native'

// gesture handler root view.
import { GestureHandlerRootView } from 'react-native-gesture-handler'

// safe area provider
import { SafeAreaProvider } from 'react-native-safe-area-context'

// bottom sheet modal provider.
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

// react native screens.
import { enableScreens } from 'react-native-screens'

enableScreens()

// navigator container
import AppNavigatorContainer from './app-navigator-container'
import { PermissionUtils } from './utilities/permissions.util'
import { storageUtils } from './utilities'

const ReactNativePlayground = (): JSX.Element => {
  const prevNotificationPermission = storageUtils.get('NOTIFICATION_PERMISSION')

  const initialRequestPermissions = async () => {
    Alert.alert(
      'Fingo needs to send you notification.',
      "The app will send you reminder so you don't miss your lessons.",
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

  useEffect(() => {
    if (!prevNotificationPermission || prevNotificationPermission === 'denied') {
      initialRequestPermissions()
    }
  }, [prevNotificationPermission])

  return (
    <BottomSheetModalProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <AppNavigatorContainer />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </BottomSheetModalProvider>
  )
}

export default ReactNativePlayground
