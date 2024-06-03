import { Platform } from 'react-native'
import notifee, { AndroidCategory, AndroidImportance, EventType, Notification } from '@notifee/react-native'
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging'
import messaging from '@react-native-firebase/messaging'

export interface ICustomFirebaseNotificationPayload extends FirebaseMessagingTypes.RemoteMessage {
  data: {
    title: string
    body: string
    data: string
  }
}

export type DisplayNotification = {
  isForeground: boolean
  remoteMessage: ICustomFirebaseNotificationPayload
}

export async function displayNotification({ isForeground, remoteMessage }: DisplayNotification) {
  // console.log(`->>>>>>>>>>>>>>>>displayNotification params -> ${JSON.stringify(remoteMessage)}`)

  // ios notification
  if (Platform.OS === 'ios') {
    // @ts-ignore
    const remoteMessageIOS: FirebaseMessagingTypes.RemoteMessage = remoteMessage
    const title = remoteMessageIOS?.notification?.title || ''
    const body = remoteMessageIOS?.notification?.body || ''
    const imageUrl = remoteMessageIOS?.data?.imageUrl || null

    // Request permissions (required for iOS)
    await notifee.requestPermission({
      sound: true,
      announcement: true,
    })

    // Display a notification
    await notifee.displayNotification({
      title,
      body,
      ios: {
        sound: 'default',
        foregroundPresentationOptions: {
          sound: true,
        },
        ...(imageUrl && {
          attachments: [
            {
              // Remote image
              url: imageUrl,
            },
          ],
        }),
      },
    } as Notification)
  }

  // Android notification
  else if (Platform.OS === 'android') {
    const androidRemoteMessageData = JSON.parse(remoteMessage?.data?.data)

    const title = remoteMessage?.data.title || ''
    const body = remoteMessage?.data?.body || ''
    const imageUrl = androidRemoteMessageData?.imageUrl || null

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default_channel',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
      badge: true,
      vibration: true,
      sound: 'default',
    })

    // Display a notification
    await notifee.displayNotification({
      title,
      body,
      android: {
        smallIcon: 'ic_notification',

        channelId,
        // asForegroundService: true,
        colorized: true,

        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
        // sound: isForeground ? 'success' : undefined,
        sound: 'success',
        importance: AndroidImportance.HIGH,
        category: AndroidCategory.REMINDER,

        ...(imageUrl && {
          // Remote image
          largeIcon: imageUrl,
        }),
      },
    })
  } else {
    // do nothing.
  }
}

export const messagingBackgroundMessageHandler = () => {
  messaging().setBackgroundMessageHandler(async _remoteMessage => {
    console.log('->>> messagingBackgroundMessageHandler _remoteMessage', _remoteMessage)

    /**
     * if remoteMessage?.sentTime & remoteMessage?.data is null mean notification cleared in status bar android
     */
    if (_remoteMessage?.sentTime && _remoteMessage?.data) {
      // await displayNotification({
      //   isForeground: false,
      //   remoteMessage: _remoteMessage as ICustomFirebaseNotificationPayload,
      // })
    }
  })
}

export const messagingOnNotificationOpenedApp = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('->>> messagingOnNotificationOpenedApp remoteMessage', remoteMessage)
  })
}

export const messagingGetInitialNotification = async () => {
  const remoteMessage = await messaging().getInitialNotification()
  console.log('->>> messagingGetInitialNotification remoteMessage', remoteMessage)
}

export const messagingForegroundMessageHandler = () => {
  messaging().onMessage(_remoteMessage => {
    // log.info('messaging().onMessage->>>', JSON.stringify(remoteMessage))
    displayNotification({
      isForeground: true,
      remoteMessage: _remoteMessage as ICustomFirebaseNotificationPayload,
    })
  })
}

export const notifeeOnBackgroundEvent = async () => {
  notifee.onBackgroundEvent(async ({ type, detail }) => {
    console.log('->>>>>>>>>>>>>>>>>>> notifee.onBackgroundEvent', type, detail)

    const { notification } = detail

    if (type === EventType.PRESS || type === EventType.ACTION_PRESS) {
      const notifdata: any = detail.notification?.data?.data
      const data = {
        data: {
          type: detail.notification?.data?.type,
          ...JSON.parse(notifdata ?? ''),
        },
      }
      if (data.data.type === 'reminder') {
        // navigate('leader_board_screen', { data })
      } else if (data.data.type === 'leaderboard') {
        // navigate('leader_board_screen', { data })
      }
      await notifee.cancelNotification(notification?.id as string)
    }
  })
}

export const notificationForegroundEvent = async () => {
  return notifee.onForegroundEvent(({ type, detail }) => {
    // log.info('notificationForegroundEvent', JSON.stringify(detail.notification))

    if (type === EventType.PRESS || type === EventType.ACTION_PRESS) {
      const notificationData: any = detail.notification?.data?.data
      const data = {
        data: {
          type: detail.notification?.data?.type,
          ...JSON.parse(notificationData ?? ''),
        },
      }
      console.log('data', data)
    }
  })
}
