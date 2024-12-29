import { useState } from 'react'
import { View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootNavigatorParamList } from '@/navigator/navigator.type'

import WVCIncoming from '../components/Incoming'
import WVCActive from '../components/Active'

type Props = NativeStackScreenProps<RootNavigatorParamList, 'wvc_screen'>

const WVCScreen = (props: Props) => {
  const imgUrl = props.route.params?.imgUrl || null
  const name = props.route.params?.name || null

  const [isActive, setIsActive] = useState(false)

  if (isActive) {
    return <WVCActive name={name} imgUrl={imgUrl} />
  } else if (name) {
    return <WVCIncoming name={name} imgUrl={imgUrl} setIsActive={setIsActive} />
  }
  return <View />
}

export default WVCScreen
