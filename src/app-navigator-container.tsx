import React, { memo, useRef } from 'react'
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native'

// root stack navigator
import AppRootStackNavigator from '@/navigator/app-root-stack.navigator'

// utils
// import { LOG } from './utilities'

const AppNavigatorContainer = () => {
  const navigationRef = useNavigationContainerRef()
  const routeNameRef = useRef<string | undefined>(undefined)

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef?.getCurrentRoute()?.name
      }}
      onStateChange={async () => {
        // const previousRouteName = routeNameRef.current
        // const currentRouteName = navigationRef?.getCurrentRoute()?.name
        // LOG.info(`previousRouteName -> ${previousRouteName}`)
        // LOG.info(`currentRouteName -> ${currentRouteName}`)
      }}
    >
      <AppRootStackNavigator />
    </NavigationContainer>
  )
}

AppNavigatorContainer.displayName = 'AppNavigatorContainer'

export default memo(AppNavigatorContainer)
