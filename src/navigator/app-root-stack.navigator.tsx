import { Fragment, useEffect, useState } from 'react'
import { Text } from 'react-native'

// react navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// interfaces
import { RootNavigatorParamList, ScreenType } from './navigator.type'

import { LOG } from '@/utilities'

import BottomTabNavigator from './bottom-tab.navigator'
import { InstagramIOSPageTransitionsContextProvider } from '@/playground/InstagramIOSPageTransitions/context/InstagramIOSPageTransitions.context'
import InstagramIOSPageTransitionsDetailScreen from '@/playground/InstagramIOSPageTransitions/screens/InstagramIOSPageTransitionsDetailScreen'
import useAnimatedValues from '@/playground/InstagramIOSPageTransitions/hooks/useAnimatedValues.hook'
import InstagramIOSPageTransitionsHomeScreen from '@/playground/InstagramIOSPageTransitions/screens/InstagramIOSPageTransitionsHomeScreen'

const rootScreen: Array<ScreenType> = [{ name: 'bottom_tab_stack', component: BottomTabNavigator }]

const RootStack = createNativeStackNavigator<RootNavigatorParamList>()

const RootStackNavigator = (): JSX.Element | null => {
  const [isAppLoaded, setIsAppLoaded] = useState(false)

  const { animatedRef, pageX, pageY, active, headerHeight } = useAnimatedValues()

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
    <Fragment>
      <InstagramIOSPageTransitionsContextProvider>
        <RootStack.Navigator screenOptions={{ headerShown: false, gestureEnabled: true }}>
          <RootStack.Screen
            name='InstagramIOSPageTransitionsHomeScreen'
            // eslint-disable-next-line react/no-unstable-nested-components
            component={() => (
              <InstagramIOSPageTransitionsHomeScreen
                {...{
                  animatedRef,
                  active,
                  pageX,
                  pageY,
                  headerHeight,
                }}
              />
            )}
          />
          {rootScreen.map(x => {
            return <RootStack.Screen key={x.name} component={x.component} name={x.name} options={x.options} />
          })}
        </RootStack.Navigator>

        <InstagramIOSPageTransitionsDetailScreen
          {...{
            active,
            pageX,
            pageY,
            headerHeight,
          }}
        />
      </InstagramIOSPageTransitionsContextProvider>
    </Fragment>
  )
}

export default RootStackNavigator
