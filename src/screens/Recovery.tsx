import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native'
import {
  Box,
  Icon,
  KeyboardAvoidingView,
  Text,
  useTheme,
  VStack
} from 'native-base'
import { Envelope } from 'phosphor-react-native'
import { useState } from 'react'
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native'
import Logo from '../assets/logo_primary.svg'
import { Button } from '../components/Button'
import { Input } from '../components/Input'

export function Recovery() {
  const { colors } = useTheme()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation()

  function handleRecoveryPassword() {
    setIsLoading(true)
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return (
          Alert.alert('Recuperaçao senha', 'Solicitaçao envida com sucesso.'),
          navigation.goBack()
        )
      })
      .catch((error) => {
        console.log(error)
        return Alert.alert('Recuperaçao senha', 'Erro ao recuperar senha.')
      })
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
      <Box flex={1} bg="gray.600">
        <KeyboardAvoidingView behavior="position" enabled>
          <VStack alignItems="center" bg="gray.600" px={8} pt={24}>
            <Logo />
            <Text color="white" fontSize="xl" mt={30}>
              Digite seu email para {'\n'} recuperar sua senha
            </Text>
            <Input
              mt={100}
              placeholder="E-mail"
              keyboardType="email-address"
              InputLeftElement={
                <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
              }
              onChangeText={setEmail}
            />
            <Button
              w="full"
              mt={100}
              title="Recuperar Senha"
              isLoading={isLoading}
              onPress={handleRecoveryPassword}
            />
          </VStack>
        </KeyboardAvoidingView>
      </Box>
    </TouchableWithoutFeedback>
  )
}
