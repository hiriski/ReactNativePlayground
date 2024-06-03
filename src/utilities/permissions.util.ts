import notifee, { AuthorizationStatus } from '@notifee/react-native'
import { PermissionsAndroid, Platform } from 'react-native'
import { storageUtils } from './storage.util'

export async function requestUserPermission() {
  const settings = await notifee.requestPermission()
  if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
    storageUtils.save('NOTIFICATION_PERMISSION', 'granted')
  } else {
    storageUtils.save('NOTIFICATION_PERMISSION', 'denied')
  }
}

export async function checkNotificationPermission(): Promise<boolean> {
  const settings = await notifee.requestPermission({
    sound: true,
    announcement: true,
  })
  if (settings.authorizationStatus) {
    // Alert.alert('User has notification permissions enabled')
    return true
  } else {
    return false
  }
}

const requestNotificationPermissionAndroid = async () => {
  if (Platform.OS === 'android') {
    try {
      const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
      if (result === 'granted') {
        storageUtils.save('NOTIFICATION_PERMISSION', 'granted')
      } else if (result === 'denied') {
        storageUtils.save('NOTIFICATION_PERMISSION', 'denied')
      }
    } catch (error) {}
  }
}

export const PermissionUtils = {
  requestUserPermission,
  checkNotificationPermission,
  requestNotificationPermissionAndroid,
}
