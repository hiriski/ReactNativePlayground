import { useCallback, useState } from 'react'
import { NavigationProps } from '@/navigator/navigator.type'
import { StatusBar, Text } from 'react-native'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { FlashList, ListRenderItem } from '@shopify/flash-list'
import RAW_QUOTES from '../json/quotes.json'

type Quote = {
  id: number
  quote: string
  author?: string
  color: { borderColor: string; backgroundColor: string }
}

const COLORS: { borderColor: string; backgroundColor: string }[] = [
  { borderColor: '#FFC1C1', backgroundColor: '#7B1A1A' },
  { borderColor: '#BBDEFB', backgroundColor: '#1A579B' },
  { borderColor: '#C8E6C9', backgroundColor: '#1B5E20' },
  { borderColor: '#FFE0B2', backgroundColor: '#BF5700' },
  { borderColor: '#D1C4E9', backgroundColor: '#45278E' },
  { borderColor: '#FFC1C1', backgroundColor: '#7B1A1A' },
  { borderColor: '#BBDEFB', backgroundColor: '#1A579B' },
  { borderColor: '#C8E6C9', backgroundColor: '#1B5E20' },
  { borderColor: '#3AE2FC', backgroundColor: '#1D89B5' },
  { borderColor: '#F9E03B', backgroundColor: '#907A12' },
]

const QuoteItem: ListRenderItem<Quote> = props => {
  const { item, index } = props
  return (
    <View
      style={{
        backgroundColor: props.item.color.backgroundColor,
        borderTopStartRadius: 32,
        borderTopEndRadius: 32,
        paddingTop: 32,
        paddingBottom: 60,
        marginBottom: -32,
        paddingHorizontal: 24,
        borderWidth: 1,
        borderColor: item.color.borderColor,
      }}
    >
      <Text
        style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: '600', fontSize: 18, lineHeight: 26, marginBottom: 14, color: '#fbfbfb' }}
      >
        "{item.quote}"
      </Text>
      <Text style={{ fontWeight: 500, fontFamily: 'Jost', fontSize: 12, lineHeight: 14, color: '#fbfbfb' }}>- {item.author}</Text>
    </View>
  )
}

const FlashListScreen = () => {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<NavigationProps>()

  const [quotes, setQuotes] = useState<Quote[]>([])

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      if (RAW_QUOTES.length > 0) {
        const mappedQuotes = RAW_QUOTES.map(x => {
          const randomIndex = Math.floor(Math.random() * COLORS.length)
          const color = COLORS[randomIndex]
          return {
            ...x,
            color,
          }
        })
        setQuotes(mappedQuotes)
      }
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      }
    }, [])
  )

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor='transparent' barStyle='light-content' />
      <View
        style={{
          backgroundColor: '#2F384C',
          paddingTop: insets.top + 4,
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 12,
        }}
      >
        <Text style={{ textAlign: 'center', fontWeight: 500, fontFamily: 'Jost', fontSize: 20, lineHeight: 26, color: '#ffffff' }}>
          Shopify FlashList
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <FlashList data={quotes} renderItem={QuoteItem} estimatedItemSize={1000} />
      </View>
    </View>
  )
}

export default FlashListScreen
