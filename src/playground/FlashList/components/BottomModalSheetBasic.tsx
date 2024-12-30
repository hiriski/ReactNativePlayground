import { useCallback, useMemo, memo, forwardRef } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { BottomSheetBackdropProps, BottomSheetModal } from '@gorhom/bottom-sheet'
import CatWrySmile from '@/assets/icons/noto--cat-with-wry-smile.svg'

// config
import BottomSheetBackdrop from './BottomSheetBackdrop'

export type Ref = BottomSheetModal

interface Props {}

const BottomSheetModalBasic = forwardRef<Ref, Props>((props, ref) => {
  const snapPoints = useMemo(() => [320], [])

  // backdrop
  const renderBackdrop = useCallback(
    (backdropProps: BottomSheetBackdropProps) => <BottomSheetBackdrop {...backdropProps} pressBehavior='close' />,
    []
  )

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      stackBehavior='push'
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      enableDismissOnClose={true}
      backdropComponent={renderBackdrop}
      style={StyleSheet.flatten([styles.bottomSheet_root])}
      handleIndicatorStyle={styles.bottomSheet_handleIndicatorStyle}
      backgroundStyle={StyleSheet.flatten([styles.bottomSheet_backgroundStyle])}
      onChange={handleSheetChanges}
    >
      <View style={styles.bottomSheet_content}>
        <CatWrySmile height={100} width={100} style={{ marginBottom: 6 }} />
        <Text style={styles.text}>Hey, i am bottom sheet modal</Text>
      </View>
    </BottomSheetModal>
  )
})

const styles = StyleSheet.create({
  bottomSheet_root: {
    flex: 1,
    borderRadius: 24,
  },
  bottomSheet_backgroundStyle: { borderRadius: 24, backgroundColor: '#FFFFFF' },
  bottomSheet_handleIndicatorStyle: { height: 4, width: 32, backgroundColor: '#ececec' },
  bottomSheet_content: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 12,
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Jost',
    color: '#a7a7a7',
  },
})

export default memo(BottomSheetModalBasic)
