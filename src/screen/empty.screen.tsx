import { StyleSheet, Text, View } from 'react-native'

const EmptyScreen = () => {
  return (
    <View style={styles.root}>
      <Text>Empty screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default EmptyScreen
