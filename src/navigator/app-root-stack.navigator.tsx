import { Fragment, useEffect, useState, JSX } from 'react'
import { Text } from 'react-native'

// react navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// interfaces
import { RootNavigatorParamList, ScreenType } from './navigator.type'

import { LOG } from '@/utilities'

import BottomTabNavigator from './bottom-tab.navigator'
import ShakeAnimationScreen from '@/playground/ShakeAnimation/screens/ShakeAnimation.screen'
import BottomSheetScreen from '@/playground/BottomSheet/screens/BottomSheet.screen'
import WVCIdleScreen from '@/playground/wvc/screens/WVCIdleScreen'
import WVCScreen from '@/playground/wvc/screens/WVCScreen'

// instagram page transitions
// import { InstagramIOSPageTransitionsContextProvider } from '@/playground/InstagramIOSPageTransitions/context/InstagramIOSPageTransitions.context'
// import InstagramIOSPageTransitionsDetailScreen from '@/playground/InstagramIOSPageTransitions/screens/InstagramIOSPageTransitionsDetailScreen'
// import useAnimatedValues from '@/playground/InstagramIOSPageTransitions/hooks/useAnimatedValues.hook'
// import InstagramIOSPageTransitionsHomeScreen from '@/playground/InstagramIOSPageTransitions/screens/InstagramIOSPageTransitionsHomeScreen'

const rootScreen: Array<ScreenType> = [
  { name: 'bottom_tab_stack', component: BottomTabNavigator },
  {
    name: 'shake_animation_screen',
    component: ShakeAnimationScreen,
  },
  {
    name: 'bottom_sheet_screen',
    component: BottomSheetScreen,
  },
  {
    name: 'wvc_screen',
    component: WVCScreen as () => JSX.Element,
  },
  {
    name: 'wvc_idle_screen',
    component: WVCIdleScreen,
  },
]

const RootStack = createNativeStackNavigator<RootNavigatorParamList>()

const RootStackNavigator = (): JSX.Element | null => {
  const [isAppLoaded, setIsAppLoaded] = useState(false)

  // const { animatedRef, pageX, pageY, active, headerHeight } = useAnimatedValues()

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
      {/* <InstagramIOSPageTransitionsContextProvider> */}
      <RootStack.Navigator screenOptions={{ headerShown: false, gestureEnabled: true }}>
        {rootScreen.map(x => {
          return <RootStack.Screen key={x.name} component={x.component} name={x.name} options={x.options} />
        })}

        {/* enable this to see instagram page transitions */}
        {/* <RootStack.Screen
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
          /> */}
      </RootStack.Navigator>

      {/* enable this to see instagram page transitions */}
      {/* <InstagramIOSPageTransitionsDetailScreen
        {...{
          active,
          pageX,
          pageY,
          headerHeight,
        }}
      /> */}
      {/* </InstagramIOSPageTransitionsContextProvider>  */}
    </Fragment>
  )
}

export default RootStackNavigator
