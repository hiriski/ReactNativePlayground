import { useEffect } from 'react'
import { View } from 'react-native'
import { Alert, StatusBar, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ScreenshotAware from 'react-native-screenshot-aware'

const ScreenshotAwareScreen = () => {
  const insets = useSafeAreaInsets()

  useEffect(() => {
    const listener = ScreenshotAware.addListener(() => {
      Alert.alert('Screenshot taken!')
    })

    return () => {
      listener.remove()
    }
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor='transparent' barStyle='light-content' />
      <View
        style={{
          backgroundColor: '#FF631C',
          paddingTop: insets.top + 4,
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 12,
        }}
      >
        <Text style={{ textAlign: 'center', fontWeight: 500, fontFamily: 'Jost', fontSize: 20, lineHeight: 26, color: '#ffffff' }}>
          Screenshot Aware
        </Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Screenshot Aware</Text>
      </View>
    </View>
  )
}

export default ScreenshotAwareScreen
