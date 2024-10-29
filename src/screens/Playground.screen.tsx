import { RootNavigatorParamList } from '@/navigator/navigator.type'
import { Text, TouchableOpacity } from 'react-native'
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
    name: 'Playground',
    path: 'shake_animation_screen',
    icon: SolarBoltIcon,
  },
]

const PlaygroundScreen = () => {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()

  const onPress = (path: string) => {
    navigation.navigate(path)
  }

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <Text style={{ textAlign: 'center' }}>Playground Screen</Text>
      <View>
        {listOfPlayground.map(x => (
          <TouchableOpacity onPress={() => onPress(x.path)} style={{ paddingHorizontal: 24, height: 50 }}>
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
