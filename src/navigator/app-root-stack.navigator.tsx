import { Fragment, useEffect, useState, JSX } from 'react'

// react navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// interfaces
import { RootNavigatorParamList, ScreenType } from './navigator.type'

import { LOG } from '@/utilities'

import BottomTabNavigator from './bottom-tab.navigator'
import ShakeAnimationScreen from '@/playground/ShakeAnimation/screens/ShakeAnimation.screen'
import BottomSheetScreen from '@/playground/BottomSheet/screens/BottomSheet.screen'
import FlashListScreen from '@/playground/FlashList/screens/FlashList.screen'
import ConcurrentSound from '@/playground/ConcurrentSound/screens/ConcurrentSound.screen'
import ReactHookFormScreen from '@/playground/ReactHookForm/screens/ReactHookForm.screen'
import SplashScreen from '@/screens/Splash.screen'
import FlatlistGalleryImageScreen from '@/playground/FlatlistGalleryImage/screens/FlatlistGalleryImage.screen'

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
    name: 'flash_list_screen',
    component: FlashListScreen,
  },
  {
    name: 'concurrent_sound',
    component: ConcurrentSound,
  },
  {
    name: 'react_hook_form',
    component: ReactHookFormScreen,
  },
  {
    name: 'flatlist_gallery_image_screen',
    component: FlatlistGalleryImageScreen,
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
          setTimeout(() => {
            setIsAppLoaded(true)
          }, 6250)
          //  do something
        })
    })()
  }, [])

  if (!isAppLoaded) {
    return <SplashScreen />
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
