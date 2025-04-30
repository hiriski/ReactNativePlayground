import { useCallback, useEffect, useRef, useState } from 'react'
import { NavigationProps } from '@/navigator/navigator.type'
import { Alert, Button, ScrollView, StatusBar, StyleSheet, Text, TextInput } from 'react-native'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import RenderCounter from '@/common/components/RenderCounter'

interface IFormState {
  requiredField: string
  optionalField?: string
}

let renderCount = 0
const ReactHookFormScreen = () => {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<NavigationProps>()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormState>({
    defaultValues: {
      requiredField: '',
      optionalField: '',
    },
  })

  const onValidSubmit: SubmitHandler<IFormState> = useCallback(data => {
    console.log('onValidSubmit->', data)
    Alert.alert('Result:', JSON.stringify(data))
  }, [])

  const onInvalidSubmit: SubmitErrorHandler<IFormState> = useCallback(data => {
    console.log('onInvalidSubmit->', data)
  }, [])

  // clean up
  useEffect(() => {
    return () => {
      renderCount = 0
    }
  }, [])

  renderCount += 1

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor='transparent' barStyle='light-content' />
      <View
        style={{
          backgroundColor: '#081229',
          paddingTop: insets.top,
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 12,
        }}
      >
        <Text style={{ fontWeight: 700, fontFamily: 'Jost', fontSize: 20, lineHeight: 26, color: '#ffffff' }}>React Hook Form</Text>
        <Text style={{ fontFamily: 'Jost', fontSize: 14, color: '#fbfbfb' }}>https://react-hook-form.com</Text>
      </View>
      <ScrollView style={styles.container} bounces={false}>
        <View style={{ gap: 8 }}>
          <View>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput style={styles.textInput} placeholder='Required field' onBlur={onBlur} onChangeText={onChange} value={value} />
              )}
              name='requiredField'
            />
            {errors.requiredField && <Text style={styles.inputHelper}>This is required.</Text>}
          </View>
          <View>
            <Controller
              control={control}
              rules={{
                maxLength: 100,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput style={styles.textInput} placeholder='Optional field' onBlur={onBlur} onChangeText={onChange} value={value} />
              )}
              name='optionalField'
            />
          </View>

          <Button title='Submit' onPress={handleSubmit(onValidSubmit, onInvalidSubmit)} />
        </View>
      </ScrollView>
      <RenderCounter renderCount={renderCount} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  textInput: {
    borderColor: '#ADC8FF',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    borderRadius: 8,
    fontFamily: 'Plus Jakarta Sans',
  },
  inputHelper: {
    marginTop: 4,
    color: '#FF4830',
    fontSize: 11,
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: 600,
  },
})

export default ReactHookFormScreen
