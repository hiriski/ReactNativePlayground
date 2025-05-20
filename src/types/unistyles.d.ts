import { ThemeBreakpoints, Themes } from '@kujang/uniui'

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends Themes {}
  export interface UnistylesBreakpoints extends ThemeBreakpoints {}
}
