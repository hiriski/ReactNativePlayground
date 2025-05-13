import React, { FC, memo } from 'react'
import { TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import { SPACING, THUMBNAIL_SIZE } from '../constants'

interface Props {
  index: number
  activeIndex: number
  imageUrl: string
  onPress: (index: number) => void
}

const FlatlistGalleryImageThumbnail: FC<Props> = ({ index, activeIndex, imageUrl, onPress }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(index)}
      activeOpacity={0.85}
      style={[
        {
          width: THUMBNAIL_SIZE,
          height: THUMBNAIL_SIZE,
          marginRight: SPACING,
          borderRadius: 12,
          overflow: 'hidden',
          borderWidth: 3,
          borderColor: activeIndex === index ? '#fff' : 'transparent',
        },
      ]}
    >
      <FastImage
        style={[
          {
            width: THUMBNAIL_SIZE - 6,
            height: THUMBNAIL_SIZE - 6,
            borderRadius: 8,
          },
        ]}
        source={{
          uri: imageUrl,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </TouchableOpacity>
  )
}

export default memo(FlatlistGalleryImageThumbnail)
