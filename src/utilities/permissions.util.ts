import notifee, { AuthorizationStatus } from '@notifee/react-native'
import { PermissionsAndroid, Platform } from 'react-native'

export async function requestUserPermission() {
  const settings = await notifee.requestPermission()
  if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
    // Alert.alert(`Permission settings: ${JSON.stringify(settings)}`)
  } else {
    // Alert.alert('User declined permissions')
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
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
    } catch (error) {}
  }
}

export const PermissionUtils = {
  requestUserPermission,
  checkNotificationPermission,
  requestNotificationPermissionAndroid,
}
