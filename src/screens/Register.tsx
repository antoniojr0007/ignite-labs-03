import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAvoidingView, VStack } from 'native-base'
import { useState } from 'react'
import { Alert, Platform } from 'react-native'
import { Button } from '../components/Button'
import { Header } from '../components/Header'
import { Input } from '../components/Input'

export function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const [patrimony, setPatrimony] = useState('')
  const [description, setDescription] = useState('')
  const navigation = useNavigation()

  async function HandleNewOrderRegister() {
    if (!patrimony || !description) {
      return Alert.alert('Registrar', 'Preencha todos campos ')
    }
    firestore()
      .collection('orders')
      .add({
        patrimony,
        description,
        status: 'open',
        created_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert('Solicitação', 'Solicitação registrada com sucesso.')
        navigation.goBack()
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
        return Alert.alert(
          'Solicitação',
          'Nao Foi Possiver registrar sua ordem.',
        )
      })
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <VStack flex={1} p={6} bg="gray.600">
        <Header title="Solicitação" />
        <Input
          placeholder="Numero do Patrimonio"
          textAlign="center"
          onChangeText={setPatrimony}
        />
        <Input
          placeholder="Descriçao do Problema"
          flex={1}
          mt={5}
          multiline
          textAlignVertical="top"
          textAlign="center"
          onChangeText={setDescription}
        />
        <Button
          title="Solicitar"
          mt={8}
          mb={8}
          isLoading={isLoading}
          onPress={HandleNewOrderRegister}
        />
      </VStack>
    </KeyboardAvoidingView>
  )
}
