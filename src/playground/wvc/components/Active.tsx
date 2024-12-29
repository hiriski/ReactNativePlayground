import { StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground, Dimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { memo, useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NavigationProps } from '@/navigator/navigator.type'

// svg
import LockIcon from '../assets/svg/lock.svg'
import ChevronLeftIcon from '../assets/svg/chevron-left.svg'
import PersonAddIcon from '../assets/svg/person-add.svg'
import EndCallIcon from '../assets/svg/end-call.svg'
import MicOffIcon from '../assets/svg/mic-off.svg'
import VideoIcon from '../assets/svg/video.svg'
import VolumeFull from '../assets/svg/volume-full.svg'
import ChevronCompactUp from '../assets/svg/chevron-compact-up.svg'

import FastImage from 'react-native-fast-image'
import { formatTime } from '../utilities/common.util'

const AVATAR_SIZE = 184

type Props = {
  name: string | null
  imgUrl: string | null
}

const Active = (props: Props) => {
  const { name, imgUrl } = props
  const insets = useSafeAreaInsets()

  const navigation = useNavigation<NavigationProps>()
  const [muted, setMuted] = useState(false)
  const [timer, setTimer] = useState<number>(0)

  const handleNavigate = useCallback(() => {
    navigation.navigate('wvc_idle_screen')
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(t => t + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    return () => {
      setMuted(false)
    }
  }, [])

  const onPressBack = useCallback(() => {
    handleNavigate()
  }, [])

  const onPressEnd = useCallback(() => {
    handleNavigate()
  }, [])

  const handleToggleMuted = useCallback(() => {
    setMuted(!muted)
  }, [muted])

  return (
    <ImageBackground style={styles.root} source={require('../assets/image/bg.jpg')}>
      <View style={StyleSheet.flatten([styles.root, { paddingTop: insets.top }])}>
        <View style={styles.header_root}>
          <TouchableOpacity onPress={onPressBack} style={styles.header_btn}>
            <ChevronLeftIcon color='#FFF' height={36} width={36} />
          </TouchableOpacity>
          <View style={styles.header_titleContainer}>
            <LockIcon color='#FFFFFF' height={16} width={16} style={{ marginRight: 5 }} />
            <Text style={styles.header_textTitle}>End-to-end encrypted</Text>
          </View>
          <TouchableOpacity style={styles.header_btn}>
            <PersonAddIcon color='#FFF' height={24} width={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.active_root}>
          <Text style={styles.active_textName}>{name}</Text>
          <Text style={styles.active_dur}>{formatTime(timer)}</Text>
        </View>

        <View style={styles.active_avatar}>
          {imgUrl ? (
            <FastImage
              style={StyleSheet.flatten([styles.active_avatarImg])}
              source={{
                uri: imgUrl,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          ) : (
            <Image
              resizeMode='contain'
              source={require('../assets/image/avatar_placeholder.png')}
              style={StyleSheet.flatten([styles.active_avatarImg])}
            />
          )}
        </View>

        <View style={styles.action_root}>
          <View style={styles.bottomSheetArrow}>
            <ChevronCompactUp color='#4b4b4b' height={50} width={50} />
          </View>
          <View style={styles.action_btnContainer}>
            <TouchableOpacity style={styles.action_btn}>
              <VolumeFull color='#ffffff' height={30} width={30} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.action_btn}>
              <VideoIcon color='#ffffff' height={30} width={30} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleToggleMuted}
              style={StyleSheet.flatten([
                styles.action_btn,
                {
                  ...(muted && { backgroundColor: '#FFFFFF' }),
                },
              ])}
            >
              <MicOffIcon color={muted ? '#000000' : '#ffffff'} height={34} width={34} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressEnd} style={StyleSheet.flatten([styles.action_btn, { backgroundColor: '#EA0038' }])}>
              <EndCallIcon color='#ffffff' height={37} width={37} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  )
}

export default memo(Active)

const height = Dimensions.get('screen').height
const width = Dimensions.get('screen').width

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height,
    width,
  },
  header_root: {
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  header_titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header_svg: {
    marginRight: 8,
  },
  header_btn: {
    height: 40,
    width: 40,
    borderRadius: 40,
  },
  header_textTitle: {
    fontSize: 14,
    lineHeight: 16,
    color: '#c3c3c3',
    fontWeight: '500',
  },
  active_root: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
  },
  active_textName: {
    fontSize: 30,
    lineHeight: 38,
    color: '#FFFFFF',
    fontWeight: '700',
    marginBottom: 8,
  },
  active_dur: {
    fontSize: 24,
    lineHeight: 30,
    color: '#bbbbbb',
    fontWeight: '500',
    letterSpacing: 1.5,
  },
  active_avatar: {
    alignItems: 'center',
  },
  active_avatarImg: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE,
  },
  textStyle: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 22,
    lineHeight: 30,
    fontWeight: '600',
  },
  action_root: {
    alignSelf: 'center',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
    backgroundColor: '#222222',
    height: 168,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  action_btnContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    flexDirection: 'row',
    width: '100%',
  },
  action_btn: {
    height: 58,
    width: 58,
    borderRadius: 58,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3f3f3f',
    marginBottom: 8,
  },
  bottomSheetArrow: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    top: -8,
    left: 0,
  },
})
