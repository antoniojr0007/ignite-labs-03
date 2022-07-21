import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { Heading, Icon, KeyboardAvoidingView, useTheme, VStack } from 'native-base'
import { Envelope, Key } from 'phosphor-react-native'
import React, { useState } from 'react'
import { Alert, Platform } from 'react-native'
import Logo from '../assets/logo_primary.svg'
import { Button } from '../components/Button'
import { Input } from '../components/Input'

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation()

  const { colors  } = useTheme() 
  function HandleSignIn(){
    if(!email && !password ) {
      return Alert.alert('Entrar', 'Informe o e-mail e a senha')
    }
    setIsLoading(true)

    auth().signInWithEmailAndPassword(email, password)
    .catch((error) => {
      setIsLoading(false)
      console.log(error.code)

      if(error.code === 'auth/invalid-email') {
        return Alert.alert('Entrar', 'Email invalido ')
      }

      if(error.code === 'auth/user-not-found' ||
             error.code === 'auth/wrong-password') {
        return Alert.alert('Entrar', 'Email ou senha está incorreto ')
      }
      
      return Alert.alert('Entrar', 'Não foi possivel acessar')
    })

    //navigation.navigate('home')
  }
  
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
        <Logo />
        <Heading color="gray.100" fontSize="xl" mt={20} mb={8}>
          Acesse sua conta 
        </Heading>
        <Input 
          mb={4}
          placeholder="Email"
          InputLeftElement={<Icon as={<Envelope color={colors.gray[300]}/>} ml={4}/>}
          onChangeText={setEmail}
        />
        <Input 
          mb={8}
          placeholder="Senha"
          InputLeftElement={<Icon as={<Key color={colors.gray[300]}/>} ml={4}/>}
          secureTextEntry
          onChangeText={setPassword}
        />
        <Button 
          title='Entrar' w='full' 
          onPress={HandleSignIn} 
          isLoading={isLoading}
        />
      </VStack>
    </KeyboardAvoidingView>
  )
}