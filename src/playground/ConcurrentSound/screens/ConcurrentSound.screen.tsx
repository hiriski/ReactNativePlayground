import { useCallback, useState } from 'react'
import { NavigationProps } from '@/navigator/navigator.type'
import { Button, StatusBar, Text } from 'react-native'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { play, pause, seek, setVolume, ConcurrentSoundEvent, load } from '@vokhuyet/react-native-concurrent-sound'

const AUDIO_URL =
  'https://finsu-images.s3.ap-south-1.amazonaws.com/image-1735585861003.+Sia+-+Unstoppable+%28Official+Video+-+Live+from+the+Nostalgic+For+The+Present+Tour%29.mp3'

const ConcurrentSound = () => {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<NavigationProps>()

  const onPressPlay = async () => {
    const duration = await load({
      key: '1',
      uri: AUDIO_URL,
      loop: false,
      volume: 1,
    })
    console.log('pick', duration)
    play({ key: '1' })
  }

  const onPressPause = () => {
    pause({ key: '1' })
  }

  useFocusEffect(
    useCallback(() => {
      return () => {
        pause({ key: '1' })
        console.log('CALL ME')
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      }
    }, [])
  )

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor='transparent' barStyle='light-content' />
      <View
        style={{
          backgroundColor: '#2F384C',
          paddingTop: insets.top + 4,
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 12,
        }}
      >
        <Text style={{ textAlign: 'center', fontWeight: 500, fontFamily: 'Jost', fontSize: 20, lineHeight: 26, color: '#ffffff' }}>
          Concurrent Sound
        </Text>
      </View>
      <View style={{}}>
        <Button title='Play' onPress={onPressPlay} />
        <Button title='Pause' onPress={onPressPause} />
      </View>
    </View>
  )
}

export default ConcurrentSound
