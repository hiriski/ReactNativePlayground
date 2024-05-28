import { useEffect, useState } from 'react'
import { Text } from 'react-native'

// react navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// interfaces
import { RootNavigatorParamList, ScreenType } from './navigator.type'

import { LOG } from '@/utilities'

import BottomTabNavigator from './bottom-tab.navigator'

const rootScreen: Array<ScreenType> = [{ name: 'bottom_tab_stack', component: BottomTabNavigator }]

const RootStack = createNativeStackNavigator<RootNavigatorParamList>()

const RootStackNavigator = (): JSX.Element | null => {
  const [isAppLoaded, setIsAppLoaded] = useState(false)

  const initApp = async (): Promise<void> => {
    return
  }

  useEffect(() => {
    ;(async () => {
      initApp()
        .then()
        .catch(reason => {
          LOG.error(`initApp error  -> ${JSON.stringify(reason)}`)
        })
        .finally(() => {
          setIsAppLoaded(true)
          //  do something
        })
    })()
  }, [])

  if (!isAppLoaded) {
    return <Text>Initializing...</Text>
  }

  return (
    <RootStack.Navigator initialRouteName={'bottom_tab_stack'} screenOptions={{ headerShown: false }}>
      {rootScreen.map(x => {
        return <RootStack.Screen key={x.name} component={x.component} name={x.name} options={x.options} />
      })}
    </RootStack.Navigator>
  )
}

export default RootStackNavigator
