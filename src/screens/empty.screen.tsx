import { storageUtils } from '@/utilities'
import { Button, StyleSheet, Text, View } from 'react-native'

const EmptyScreen = () => {
  return (
    <View style={styles.root}>
      <Text style={styles.textStyle}>Empty screen</Text>
      <Button title='clear storage' onPress={() => storageUtils.clear()} />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 22,
    lineHeight: 30,
    fontWeight: '600',
  },
})

export default EmptyScreen
