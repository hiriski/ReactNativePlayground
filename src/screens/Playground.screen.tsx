import { NavigationProps, RootNavigatorParamList } from '@/navigator/navigator.type'
import { StatusBar, Text, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import SolarBoltIcon from '@/assets/icons/solar--bolt-bold-duotone.svg'
import { useNavigation } from '@react-navigation/native'

type ListOfPlayground = {
  name: string
  path: keyof Partial<RootNavigatorParamList>
  icon?: any
}

const listOfPlayground: ListOfPlayground[] = [
  {
    name: '(Reanimated) - Snake Animation',
    path: 'shake_animation_screen',
    icon: SolarBoltIcon,
  },
  {
    name: 'Bottom Sheet',
    path: 'bottom_sheet_screen',
    icon: SolarBoltIcon,
  },
  {
    name: 'WVC',
    path: 'wvc_idle_screen',
    icon: SolarBoltIcon,
  },
  {
    name: 'FlashList',
    path: 'flash_list_screen',
    icon: SolarBoltIcon,
  },
  {
    name: 'Concurrent Sound',
    path: 'concurrent_sound',
    icon: SolarBoltIcon,
  },
]

const PlaygroundScreen = () => {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<NavigationProps>()

  const onPress = (path: keyof RootNavigatorParamList) => {
    navigation.navigate(path)
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor='transparent' barStyle='dark-content' />
      <View
        style={{
          backgroundColor: '#3366FF',
          paddingTop: insets.top + 4,
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 12,
        }}
      >
        <Text style={{ textAlign: 'center', fontWeight: 500, fontFamily: 'Jost', color: '#ffffff' }}>Playground</Text>
      </View>
      <View>
        {listOfPlayground.map((x, index) => (
          <TouchableOpacity
            key={String(index)}
            activeOpacity={0.8}
            onPress={() => onPress(x.path)}
            style={{ paddingHorizontal: 24, paddingVertical: 12, borderBottomColor: '#D5D5D5', borderBottomWidth: 1 }}
          >
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
              {<x.icon height={20} width={20} color='#3366FF' />}
              <Text style={{ fontWeight: '600', marginLeft: 12 }}>{x.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default PlaygroundScreen
