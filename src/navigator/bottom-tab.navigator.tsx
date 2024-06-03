import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ScreenType } from './navigator.type'
import EmptyScreen from '@/screens/empty.screen'

const TabStack = createBottomTabNavigator()

const tabScreens: Array<ScreenType> = [
  {
    name: 'dashboard_screen',
    component: EmptyScreen,
  },
  {
    name: 'settings_screen',
    component: EmptyScreen,
  },
  {
    name: 'library_screen',
    component: EmptyScreen,
  },
]

const BottomTabNavigator = () => {
  return (
    <TabStack.Navigator initialRouteName='dashboard_screen' screenOptions={{ headerShown: false }}>
      {tabScreens.map(x => (
        <TabStack.Screen key={x.name} name={x.name} component={x.component} />
      ))}
    </TabStack.Navigator>
  )
}

export default BottomTabNavigator
