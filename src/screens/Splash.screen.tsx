import { useEffect } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSpring, withTiming } from 'react-native-reanimated'
import { opacity } from 'react-native-reanimated/lib/typescript/Colors'

const logoPathBlue = require('../assets/images/blue-path.png')
const logoPathYellow = require('../assets/images/yellow-path.png')

const LOGO_SIZE = Dimensions.get('window').width / 2.6
const ANIMATED_DURATION = 650

const SplashScreen = () => {
  const animatedCircleScaleValue = useSharedValue(0)
  const animatedCircle2ScaleValue = useSharedValue(0)
  const animatedBlueScaleValue = useSharedValue(0)
  const animatedBlueRotateValue = useSharedValue(-35)
  const animatedYellowScaleValue = useSharedValue(0)
  const animatedYellowRotateValue = useSharedValue(-35)
  const animatedContainerRotateValue = useSharedValue(0)
  const animatedContainerScale = useSharedValue(1)
  const animatedContainerOpacityValue = useSharedValue(1)

  useEffect(() => {
    // circle
    animatedCircle2ScaleValue.value = withDelay(450, withSpring(1, { duration: ANIMATED_DURATION }))
    animatedCircleScaleValue.value = withDelay(650, withSpring(1, { duration: ANIMATED_DURATION }))

    animatedBlueScaleValue.value = withDelay(1200, withSpring(1, { duration: ANIMATED_DURATION + 300 }))
    animatedBlueRotateValue.value = withDelay(1200, withTiming(0, { duration: ANIMATED_DURATION + 300 }))
    animatedYellowScaleValue.value = withDelay(1675, withSpring(1, { duration: ANIMATED_DURATION + 100 }))
    animatedYellowRotateValue.value = withDelay(1675, withTiming(0, { duration: ANIMATED_DURATION + 100 }))
    animatedContainerRotateValue.value = withDelay(2000, withRepeat(withTiming(2160, { duration: 12500 }), -1))
    animatedContainerScale.value = withDelay(5650, withTiming(0, { duration: ANIMATED_DURATION - 180 }))
    animatedContainerOpacityValue.value = withDelay(5485, withTiming(0, { duration: ANIMATED_DURATION - 180 }))
  }, [])

  const animatedCircleStyles = useAnimatedStyle(() => ({
    transform: [{ scale: animatedCircleScaleValue.value }],
  }))
  const animatedCircle2Styles = useAnimatedStyle(() => ({
    transform: [{ scale: animatedCircle2ScaleValue.value }],
  }))

  const animatedImageBlueStyles = useAnimatedStyle(() => ({
    transform: [
      { scale: animatedBlueScaleValue.value },
      {
        rotate: `${animatedBlueRotateValue.value}deg`,
      },
    ],
  }))

  const animatedImageYellowStyles = useAnimatedStyle(() => ({
    transform: [
      { scale: animatedYellowScaleValue.value },
      {
        rotate: `${animatedYellowRotateValue.value}deg`,
      },
    ],
  }))

  const animatedContainerStyles = useAnimatedStyle(() => ({
    opacity: animatedContainerOpacityValue.value,
    transform: [{ rotate: `${animatedContainerRotateValue.value}deg` }, { scale: animatedContainerScale.value }],
  }))

  return (
    <View style={styles.root}>
      <Animated.View style={[styles.logoContainer, animatedContainerStyles]}>
        <Animated.View
          style={[
            animatedCircle2Styles,
            styles.circle,
            { backgroundColor: '#caccd4', width: LOGO_SIZE / 4, height: LOGO_SIZE / 4, borderRadius: 50 },
          ]}
        />
        <Animated.View
          style={[
            animatedCircleStyles,
            styles.circle,
            { backgroundColor: '#8d8f9b', width: LOGO_SIZE / 6, height: LOGO_SIZE / 6, borderRadius: 50 },
          ]}
        />
        <Animated.Image resizeMode='contain' source={logoPathBlue} style={[styles.logo, animatedImageBlueStyles]} />
        <Animated.Image resizeMode='contain' source={logoPathYellow} style={[styles.logo, animatedImageYellowStyles]} />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    position: 'absolute',
  },
  circle: {
    position: 'absolute',
  },
})

export default SplashScreen
