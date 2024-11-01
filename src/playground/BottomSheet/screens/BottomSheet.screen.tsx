import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useCallback, useRef } from 'react'
import BottomSheetModalBasic from '../components/BottomModalSheetBasic'
import BottomSheet, { BottomSheetModal } from '@gorhom/bottom-sheet'
import BottomSheetBasic from '../components/BottomSheetBasic'

const bottomSheetTypes = ['Bottom Sheet Basic', 'Bottom Sheet Modal Basic']

const BottomSheetScreen = () => {
  const insets = useSafeAreaInsets()

  const bottomSheetBasicRef = useRef<BottomSheet>(null)
  const bottomSheetModalBasicRef = useRef<BottomSheetModal>(null)

  const onPressItem = useCallback((type: string) => {
    switch (type) {
      case 'Bottom Sheet Basic':
        bottomSheetBasicRef.current?.expand()
        break
      case 'Bottom Sheet Modal Basic':
        bottomSheetModalBasicRef?.current?.present()
        break
      default:
        // do nothing
        break
    }
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: insets.top }}>
      <View style={{ width: '100%', paddingHorizontal: 24 }}>
        {bottomSheetTypes.map((x, index) => (
          <TouchableOpacity key={String(index)} activeOpacity={0.85} onPress={() => onPressItem(x)} style={styles.btn}>
            <Text style={styles.btnText}>{x} </Text>
          </TouchableOpacity>
        ))}
      </View>
      <BottomSheetBasic ref={bottomSheetBasicRef} />
      <BottomSheetModalBasic ref={bottomSheetModalBasicRef} />
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
    width: '100%',
    height: 40,
    borderRadius: 8,
    backgroundColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  btnText: {
    fontWeight: '500',
    color: '#ffffff',
    fontFamily: 'Plus Jakarta Sans',
  },
})

export default BottomSheetScreen
