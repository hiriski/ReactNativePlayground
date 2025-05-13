import React, { ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AppConfig } from '@/configs'
import { useFocusEffect } from '@react-navigation/native'
import { View, Text, FlatList, StyleSheet, Dimensions, StatusBar, StatusBarStyle } from 'react-native'
import FastImage from 'react-native-fast-image'
import RenderCounter from '@/common/components/RenderCounter'
import FlatlistGalleryImageThumbnail from '../components/FlatlistGalleryImageThumbnail'
import { ListRenderItem } from '@shopify/flash-list'
import { IPexelImageItem } from '../interfaces'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// constants
import { SPACING, THUMBNAIL_SIZE } from '../constants'

const IMAGE_COUNT = 40
let renderCount = 0

const FlatlistGalleryImageScreen = () => {
  const { height, width } = Dimensions.get('screen')
  const [images, setImages] = useState<IPexelImageItem[]>([])
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const pexelParams = ['wallpaper', 'background', 'nature', 'portrait', 'underwater', 'night']

  const insets = useSafeAreaInsets()

  const photoRef = useRef<FlatList>(null)
  const thumbRef = useRef<FlatList>(null)

  const statusBarBarStyle = useMemo<StatusBarStyle | null | undefined>(() => {
    // put logic here
    return 'light-content'
  }, [])

  const handleFetchImages = async (): Promise<void> => {
    try {
      const responses = await fetch(
        `https://api.pexels.com/v1/search?query=${pexelParams[Math.floor(Math.random() * pexelParams.length)]}&per_page=${IMAGE_COUNT}`,
        {
          headers: {
            Authorization: AppConfig.PEXEL_API_KEY,
          },
        }
      ).then(r => r.json())
      const responseImages = responses?.photos ?? []
      setImages(responseImages as IPexelImageItem[])
    } catch (e) {
      setImages([])
    }
  }

  const scrollToActiveIndex = useCallback(
    (index: number) => {
      setActiveIndex(index)
      photoRef?.current?.scrollToOffset({
        offset: index * width,
        animated: true,
      })

      const matchesOffsetThumbnail = index * (THUMBNAIL_SIZE + SPACING)
      const halfScreenWidth = width / 2

      if (matchesOffsetThumbnail > halfScreenWidth) {
        const thumbnailOffset = matchesOffsetThumbnail + THUMBNAIL_SIZE / 2 - halfScreenWidth + SPACING / 2
        thumbRef?.current?.scrollToOffset({
          offset: thumbnailOffset,
          animated: true,
        })
      } else {
        thumbRef?.current?.scrollToOffset({
          offset: 0,
          animated: true,
        })
      }

      // Scroll flatlist
    },
    [activeIndex, photoRef?.current, thumbRef?.current]
  )

  useFocusEffect(
    useCallback(() => {
      handleFetchImages()
    }, [])
  )

  // clean up
  useEffect(() => {
    return () => {
      renderCount = 0
    }
  }, [])

  renderCount += 1

  const renderThumbnailItem = useCallback<ListRenderItem<IPexelImageItem>>(
    ({ item, index }): ReactElement => {
      return (
        <FlatlistGalleryImageThumbnail index={index} activeIndex={activeIndex} imageUrl={item.src.small} onPress={scrollToActiveIndex} />
      )
    },
    [activeIndex]
  )

  if (!images) {
    return <Text>Loading...</Text>
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar animated={true} barStyle={statusBarBarStyle} />
      <FlatList
        ref={photoRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        onMomentumScrollEnd={e => {
          scrollToActiveIndex(Math.floor(e.nativeEvent.contentOffset.x / width))
        }}
        renderItem={({ item }) => {
          return (
            <View style={StyleSheet.flatten({ width, height, backgroundColor: item.avg_color })}>
              <FastImage
                style={StyleSheet.flatten([StyleSheet.absoluteFill, { width, height }])}
                source={{
                  uri: item.src.portrait,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          )
        }}
      />

      {/* thumbnails */}
      <FlatList
        data={images}
        ref={thumbRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        style={{ position: 'absolute', bottom: insets.bottom }}
        contentContainerStyle={{ padding: SPACING }}
        // @ts-ignore
        renderItem={renderThumbnailItem}
      />
      <RenderCounter renderCount={renderCount} />
    </View>
  )
}

export default FlatlistGalleryImageScreen
