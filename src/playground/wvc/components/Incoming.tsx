import { StyleSheet, View, Text, TouchableOpacity, Vibration, ImageBackground, Dimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// svg
import WhatsappIcon from '../assets/svg/whatsapp.svg'
import ArrowIcon from '../assets/svg/arrow.svg'
import MessageIcon from '../assets/svg/message.svg'
import AlarmIcon from '../assets/svg/alarm.svg'
import { memo, useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NavigationProps } from '@/navigator/navigator.type'
import RNSound from 'react-native-sound'

const CONTENT_WIDTH = 320

type Props = {
  name: string | null
  imgUrl: string | null
  setIsActive: (val: boolean) => void
}

const sound = new RNSound('ringtone-reflection.mp3', RNSound.MAIN_BUNDLE, error => {
  if (error) {
    return
  }
})

const WVCIncoming = (props: Props) => {
  const { name, imgUrl, setIsActive } = props
  const insets = useSafeAreaInsets()

  const navigation = useNavigation<NavigationProps>()
  const [autoEnd, setAutoEnd] = useState(true)

  const handleNavigate = useCallback(() => {
    navigation.navigate('wvc_idle_screen')
  }, [])

  const handleEnd = () => {
    sound.stop()
    Vibration.cancel()
  }

  useEffect(() => {
    if (name) {
      sound.setNumberOfLoops(3)

      if (name) {
        sound.play()
        Vibration.vibrate(3000)
      }

      const timeOut = setTimeout(() => {
        handleEnd()
        if (autoEnd) {
          handleNavigate()
        }
      }, 30000)

      return () => {
        clearTimeout(timeOut)
        sound.stop()
        Vibration.cancel()
      }
    }
  }, [name, imgUrl, autoEnd])

  const onPressSwipeBtn = useCallback(() => {
    setAutoEnd(false)
    if (typeof setIsActive === 'function') {
      setIsActive(true)
    }
  }, [setIsActive, autoEnd])

  if (name) {
    return (
      <ImageBackground style={styles.root} source={require('../assets/image/deep-blue-plain-concrete-textured-background.jpg')}>
        <View style={StyleSheet.flatten([styles.root, { paddingTop: insets.top, paddingBottom: insets.bottom }])}>
          <View style={styles.header_root}>
            <View style={styles.header_titleContainer}>
              <WhatsappIcon style={styles.header_svg} height={18} width={18} />
              <Text style={styles.header_textTitle}>Whatsapp Audio...</Text>
            </View>
            <Text style={styles.header_textName} numberOfLines={1}>
              {name}
            </Text>
          </View>

          <View style={styles.action_root}>
            <View style={styles.action_btnContainer}>
              <TouchableOpacity onPress={handleNavigate} style={styles.action_btn}>
                <MessageIcon color='#ffffff' height={22} width={22} />
              </TouchableOpacity>
              <Text style={styles.action_text}>Message</Text>
            </View>
            <View style={styles.action_btnContainer}>
              <TouchableOpacity onPress={handleNavigate} style={styles.action_btn}>
                <AlarmIcon color='#ffffff' height={22} width={22} />
              </TouchableOpacity>
              <Text style={styles.action_text}>Remind Me</Text>
            </View>
          </View>
          <TouchableOpacity activeOpacity={0.9} onPress={onPressSwipeBtn} style={styles.swipe_root}>
            <View style={styles.swipe_btn}>
              <ArrowIcon fill='#254EDB' height={34} width={34} />
            </View>
            <View style={styles.swipe_box} />
            <View style={styles.swipe_textContainer}>
              <Text style={styles.swipe_text}>slide to answer</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    )
  }

  return null
}

export default memo(WVCIncoming)

const height = Dimensions.get('screen').height
const width = Dimensions.get('screen').width

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height,
    width,
  },
  header_root: {
    marginTop: 34,
    alignItems: 'center',
  },
  header_titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  header_svg: {
    marginRight: 8,
  },
  header_textTitle: {
    fontSize: 20,
    lineHeight: 22,
    color: '#c3c3c3',
    fontWeight: '600',
  },
  header_textName: {
    fontSize: 32,
    lineHeight: 38,
    color: '#fbfbfb',
    fontWeight: '800',
  },
  action_root: {
    alignSelf: 'center',
    width: CONTENT_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
    marginBottom: 40,
  },
  action_btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  action_btn: {
    height: 44,
    width: 44,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#adadad78',
    marginBottom: 8,
  },
  action_text: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 14,
    fontWeight: '600',
    color: '#fbfbfb',
    textAlign: 'center',
  },
  swipe_root: {
    alignItems: 'center',
    position: 'relative',
    paddingBottom: 32,
  },
  swipe_box: {
    height: 80,
    width: CONTENT_WIDTH,
    backgroundColor: '#adadad78',
    borderRadius: 80,
    position: 'absolute',
  },
  swipe_textContainer: {
    width: CONTENT_WIDTH,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  swipe_text: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    marginLeft: 30,
  },
  swipe_btn: {
    height: 70,
    width: 70,
    backgroundColor: '#fff',
    borderRadius: 70,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    top: 5,
    transform: [{ translateX: -120 }],
  },
})
