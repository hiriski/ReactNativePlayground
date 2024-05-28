import React from 'react'

// gesture handler root view.
import { GestureHandlerRootView } from 'react-native-gesture-handler'

// safe area provider
import { SafeAreaProvider } from 'react-native-safe-area-context'

// bottom sheet modal provider.
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

// react native screens.
import { enableScreens } from 'react-native-screens'

enableScreens()

// navigator container
import AppNavigatorContainer from './app-navigator-container'

const ReactNativePlayground = (): JSX.Element => {
  return (
    <BottomSheetModalProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <AppNavigatorContainer />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </BottomSheetModalProvider>
  )
}

export default ReactNativePlayground
