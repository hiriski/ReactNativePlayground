import { NavigationProps } from '@/navigator/navigator.type'
import { pusher } from '@/services/pusher.service'
import { storageUtils } from '@/utilities'
import { PusherEvent } from '@pusher/pusher-websocket-react-native'
import { useNavigation } from '@react-navigation/native'
import { useCallback, useEffect, useRef, useState } from 'react'
import { StatusBar, StyleSheet, View, Text } from 'react-native'
import { HandlerStateChangeEvent, LongPressGestureHandler, State } from 'react-native-gesture-handler'

const WVCIdleScreen = () => {
  const navigation = useNavigation<NavigationProps>()
  const btnRef = useRef(null)
  const [isAuto, setIsAuto] = useState(false)

  // @ts-ignore
  const prevData = storageUtils.get('WVC')

  console.log('prevData->>>>>>>>', prevData)

  useEffect(() => {
    pusher.subscribe({
      channelName: 'my-channel',
      onEvent: (event: PusherEvent) => {
        console.log(`Event received: ${event}`)
        const data = JSON.parse(event.data)

        // @ts-ignore
        storageUtils.save('WVC', data)

        if (event.channelName === 'my-channel' && event.eventName === 'wvc') {
          const TIMEOUT = data?.waitSeconds || 3000
          setTimeout(() => {
            navigation.navigate('wvc_screen', {
              name: data?.name || null,
              imgUrl: data?.imgUrl || null,
            })
          }, TIMEOUT)
        }
      },
    })
  }, [])

  useEffect(() => {
    if (prevData?.name && isAuto) {
      const TIMEOUT = prevData?.waitSeconds || 10000
      setTimeout(() => {
        navigation.navigate('wvc_screen', {
          name: prevData?.name || null,
          imgUrl: prevData?.imgUrl || null,
        })
      }, TIMEOUT)
    }
  }, [prevData, isAuto])

  const onHandleLongPress = useCallback(
    (event: HandlerStateChangeEvent<unknown>) => {
      if (event.nativeEvent.state === State.ACTIVE) {
        setIsAuto(true)
      }
    },
    [isAuto]
  )

  return (
    <View style={styles.root}>
      <StatusBar hidden />
      <LongPressGestureHandler ref={btnRef} onHandlerStateChange={onHandleLongPress} minDurationMs={5000}>
        <View
          style={StyleSheet.flatten([
            styles.viewBtn,
            {
              ...(isAuto && {
                backgroundColor: '#000000',
              }),
            },
          ])}
        >
          <Text>.</Text>
        </View>
      </LongPressGestureHandler>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
  },
  viewBtn: {
    marginTop: 'auto',
    marginLeft: 'auto',
    marginBottom: 24,
    marginRight: 20,
    borderRadius: 20,
    height: 20,
    width: 20,
    backgroundColor: '#161616',
  },
})

export default WVCIdleScreen
