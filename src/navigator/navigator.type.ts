import React from 'react'
import { NativeStackNavigationOptions, NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'

export type RootNavigatorParamList = {
  bottom_tab_stack: undefined
  shake_animation_screen: undefined
  bottom_sheet_screen: undefined
  wvc_screen: {
    name: string | null
    imgUrl: string | null
  }
  wvc_idle_screen: undefined
} & BottomTabNavigatorParamList

export type BottomTabNavigatorParamList = {
  playground_screen: undefined
  settings_screen: undefined
  components_screen: undefined
  library_screen: undefined
}

export type ScreenType = {
  label?: string
  name: keyof Partial<RootNavigatorParamList>
  component: React.ComponentType<object> | (() => JSX.Element)
  options?: NativeStackNavigationOptions
}

// prettier-ignore
export type NavigationProps = NativeStackNavigationProp<Partial<RootNavigatorParamList>>

// prettier-ignore
export type AppStackScreenProps<T extends keyof RootNavigatorParamList> = NativeStackScreenProps<RootNavigatorParamList, T>
