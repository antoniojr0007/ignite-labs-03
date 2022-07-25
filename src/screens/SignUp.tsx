import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { Box, Icon, KeyboardAvoidingView, useTheme, VStack } from 'native-base'
import { Envelope, FileDoc, Lock, Phone, User } from 'phosphor-react-native'
import { useState } from 'react'
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native'
import Logo from '../assets/logo_primary.svg'
import { Button } from '../components/Button'
import { Header } from '../components/Header'
import { Input } from '../components/Input'

export function SignUp() {
  const { colors } = useTheme()
  const [isLoading, setIsLoading] = useState(false)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')

  function HandleSignUpUser() {
    if (!name) {
      return Alert.alert('Cadastro', 'Nome deve ser preenchido')
    } else if (!phone) {
      return Alert.alert('Cadastro', 'Telefone deve ser preenchido')
    } else if (!cpf) {
      return Alert.alert('Cadastro', 'CPF deve ser preenchido')
    } else if (!email) {
      return Alert.alert('Cadastro', 'E-mail deve ser preenchido')
    } else if (!password) {
      return Alert.alert('Cadastro', 'Senha deve ser preenchido')
    } else if (password !== cpassword) {
      return Alert.alert('Cadastro', 'Senhas nao confere')
    }
    setIsLoading(true)
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        auth().onAuthStateChanged((user) => {
          firestore()
            .collection('users')
            .doc(user?.uid)
            .set({
              name,
              phone,
              cpf,
              email,
            })
            .catch((error) => {
              setIsLoading(false)
              console.log(error.code)
              Alert.alert(
                'Cadastro',
                'Erro ao se Cadastar tente novamente mais tarde.',
              )
            })
        })
      })
      .then(() => {
        Alert.alert('Cadastro', 'Cadastro foi realizado com sucesso.')
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error.code)
      })
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Box bg="gray.600" flex={1}>
        <KeyboardAvoidingView behavior="position" enabled>
          <VStack alignItems="center" px={8} pt={5}>
            <Header title="Criar Conta" pb={5} />
            <Logo />
            <Input
              mb={4}
              mt={10}
              placeholder="Nome"
              InputLeftElement={
                <Icon as={<User color={colors.gray[300]} />} ml={4} />
              }
              onChangeText={setName}
            />
            <Input
              mb={4}
              placeholder="Telefone"
              keyboardType="numeric"
              InputLeftElement={
                <Icon as={<Phone color={colors.gray[300]} />} ml={4} />
              }
              onChangeText={setPhone}
            />
            <Input
              mb={4}
              placeholder="CPF"
              keyboardType="numeric"
              InputLeftElement={
                <Icon as={<FileDoc color={colors.gray[300]} />} ml={4} />
              }
              onChangeText={setCpf}
            />
            <Input
              mb={4}
              placeholder="E-mail"
              keyboardType="email-address"
              InputLeftElement={
                <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
              }
              onChangeText={setEmail}
            />
            <Input
              mb={4}
              placeholder="Senha"
              InputLeftElement={
                <Icon as={<Lock color={colors.gray[300]} />} ml={4} />
              }
              onChangeText={setPassword}
            />
            <Input
              mb={4}
              placeholder="Confirme sua senha"
              InputLeftElement={
                <Icon as={<Lock color={colors.gray[300]} />} ml={4} />
              }
              onChangeText={setCpassword}
            />
            <Button
              mb={4}
              w="full"
              title="Cadastrar"
              isLoading={isLoading}
              onPress={HandleSignUpUser}
            />
          </VStack>
        </KeyboardAvoidingView>
      </Box>
    </TouchableWithoutFeedback>
  )
}
