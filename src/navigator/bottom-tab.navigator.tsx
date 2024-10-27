import { FC } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomTabNavigatorParamList, ScreenType } from './navigator.type'
import EmptyScreen from '@/screens/empty.screen'
import PlaygroundScreen from '@/screens/Playground.screen'

import SolarBoltIcon from '@/assets/icons/solar--bolt-bold-duotone.svg'
import SolarBookmarkIcon from '@/assets/icons/solar--bookmark-opened-bold-duotone.svg'
import SolarSettingsIcon from '@/assets/icons/solar--settings-minimalistic-bold-duotone.svg'

const TabStack = createBottomTabNavigator<BottomTabNavigatorParamList>()

const tabScreens: Array<ScreenType> = [
  {
    name: 'playground_screen',
    component: PlaygroundScreen,
    label: 'Playground',
  },
  {
    name: 'library_screen',
    component: EmptyScreen,
    label: 'Library',
  },
  {
    name: 'settings_screen',
    component: EmptyScreen,
    label: 'Setting',
  },
]

type TabBarProps = BottomTabBarProps

const getTabName = (routeName: string) => {
  switch (routeName) {
    case 'playground_screen':
      return 'Playground'
    case 'settings_screen':
      return 'Settings'
    case 'library_screen':
      return 'Library'
    default:
      return 'Playground'
  }
}

const getIcon = (routeName: string, isFocused: boolean) => {
  switch (routeName) {
    case 'playground_screen':
      return <SolarBoltIcon height={20} width={20} color={isFocused ? '#3366FF' : '#9B9B9B'} />
    case 'settings_screen':
      return <SolarSettingsIcon height={20} width={20} color={isFocused ? '#3366FF' : '#9B9B9B'} />
    case 'library_screen':
      return <SolarBookmarkIcon height={20} width={20} color={isFocused ? '#3366FF' : '#9B9B9B'} />
    default:
      return 'Playground'
  }
}

const MyTabBar: FC<TabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]

        const label = getTabName(route.name)

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        return (
          <TouchableOpacity
            accessibilityRole='button'
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            activeOpacity={0.8}
            style={{ flex: 1, height: 60, alignItems: 'center', justifyContent: 'center' }}
          >
            {getIcon(route.name, isFocused)}
            <Text style={{ color: isFocused ? '#3366FF' : '#9B9B9B', fontWeight: '500' }}>{label}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const BottomTabNavigator = () => {
  return (
    <TabStack.Navigator
      initialRouteName='playground_screen'
      screenOptions={{ headerShown: false }}
      tabBar={props => <MyTabBar {...props} />}
    >
      {tabScreens.map((x, index) => (
        <TabStack.Screen key={x.name + index} name={x.name as keyof BottomTabNavigatorParamList} component={x.component} />
      ))}
    </TabStack.Navigator>
  )
}

export default BottomTabNavigator
