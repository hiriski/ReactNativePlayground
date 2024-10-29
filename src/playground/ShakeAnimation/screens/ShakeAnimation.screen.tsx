import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useCallback, useState } from 'react'

import PlusIcon from '@/assets/icons/material-symbols--add.svg'
import MinusIcon from '@/assets/icons/material-symbols--check-indeterminate-small.svg'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
  WithTimingConfig,
} from 'react-native-reanimated'

const ShakeAnimationScreen = () => {
  const insets = useSafeAreaInsets()

  const shakeTranslateX = useSharedValue(0)

  const [value, setValue] = useState(1)
  const [maxValue] = useState(10)

  const animatedShakeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: shakeTranslateX.value }],
    }
  }, [])

  const handleShake = useCallback(() => {
    const transitionAmoount = 20
    const timingConfig: WithTimingConfig = {
      duration: 75,
      easing: Easing.bezier(0.35, 0.7, 0.5, 0.7),
    }
    shakeTranslateX.value = withSequence(
      withTiming(transitionAmoount, timingConfig),
      withRepeat(withTiming(-transitionAmoount, timingConfig), 3, true),
      withSpring(0, { mass: 0.5 })
    )
  }, [])

  const onChangeValue = useCallback(
    (type: string) => {
      if (type === 'plus') {
        if (value >= maxValue) {
          handleShake()
        } else {
          setValue(value + 1)
        }
      } else {
        if (value < 1) {
          handleShake()
        } else {
          setValue(value - 1)
        }
      }
    },
    [value, maxValue]
  )

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: insets.top }}>
      <Animated.Text style={[styles.number, animatedShakeStyle]}>{value}</Animated.Text>
      {/* button container */}
      <View style={{ position: 'absolute', bottom: 40, right: 32, flexDirection: 'row', gap: 16 }}>
        <TouchableOpacity activeOpacity={0.85} onPress={() => onChangeValue('minus')} style={styles.btn}>
          <MinusIcon height={24} width={24} color='#ffffff' />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.85} onPress={() => onChangeValue('plus')} style={styles.btn}>
          <PlusIcon height={24} width={24} color='#ffffff' />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  number: {
    fontSize: 132,
    fontFamily: 'Jost',
    fontWeight: '600',
    color: '#333333',
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default ShakeAnimationScreen
