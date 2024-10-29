import { Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ShakeAnimationScreen = () => {
  const insets = useSafeAreaInsets()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: insets.top }}>
      <Text style={{ fontSize: 72, fontWeight: '700', color: '#333333' }}>100</Text>

      {/* button container */}
      <View style={{ position: 'absolute', bottom: 20, right: 20, flexDirection: 'row', gap: 10 }}>
        <TouchableOpacity style={{ width: 50, height: 50, borderRadius: 50, backgroundColor: '#000000' }}></TouchableOpacity>
        <TouchableOpacity style={{ width: 50, height: 50, borderRadius: 50, backgroundColor: '#000000' }}></TouchableOpacity>
      </View>
    </View>
  )
}

export default ShakeAnimationScreen
