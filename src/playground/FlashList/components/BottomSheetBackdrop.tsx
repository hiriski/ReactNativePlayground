import React, { FC } from 'react'
import { StyleSheet } from 'react-native'

// bottom sheet backdrop
import { BottomSheetBackdrop as BaseBackdrop } from '@gorhom/bottom-sheet'

// interfaces
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types'

interface Props extends BottomSheetDefaultBackdropProps {
  opacity?: number
}
const BottomSheetBackdrop: FC<Props> = ({ opacity = 0.6, appearsOnIndex = 0, disappearsOnIndex = -1, ...rest }) => {
  return (
    <BaseBackdrop
      {...rest}
      opacity={opacity}
      appearsOnIndex={appearsOnIndex}
      disappearsOnIndex={disappearsOnIndex}
      style={[StyleSheet.absoluteFill, styles.root]}
    />
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#000000',
    flex: 1,
  },
})

export default BottomSheetBackdrop
