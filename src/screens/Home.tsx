import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { Center, FlatList, Heading, HStack, IconButton, Text, useTheme, VStack } from 'native-base';

import { ChatTeardropText, SignOut } from 'phosphor-react-native';
import { useState } from 'react';
import { Alert } from 'react-native';
import Logo from '../assets/logo_secondary.svg';
import { Button } from '../components/Button';
import { Filter } from '../components/Filter';
import { Order, OrderProps } from '../components/Order';

export function Home() {
  const {colors} = useTheme();
  const navigation = useNavigation();

  const [statusSelected, setStatusSelected] = useState<'open'| 'closed'>('open')
  const [orders, setOrders] = useState<OrderProps[]>([])

  function HandleNewOrder(){
    navigation.navigate('new');
  }

  function HandleLogout(){
    auth().signOut()
    .catch(error => {
      return Alert.alert('Sair', 'Nao Foi Possiver Sair')
    })
  }

  function HandleDetails(orderId:string){
    navigation.navigate('details', { orderId })
  }

  return (
    <VStack flex={1} pb={6} bg='gray.700'>  
      <HStack w='full' 
        justifyContent='space-between' 
        alignItems='center' 
        bg='gray.600'
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />
        <IconButton 
          icon={<SignOut size={26} color={colors.gray[300]}/>}
          onPress={HandleLogout} 

        />
      </HStack>
      <VStack flex={1} px={6}>
        <HStack w='full' mb={4} mt={4} justifyContent='space-between' alignItems='center'>
          <Heading color='gray.100'>
            Meus Chamados
          </Heading>
          <Text color='gray.200'>
            3
          </Text>
        </HStack>
        <HStack space={3} mb={8}>
          <Filter 
            title='Em Andamento'  
            type='open' 
            onPress={() => setStatusSelected('open')}
            isActive={statusSelected === 'open'}
          />
          <Filter 
            title='Finalizados'  
            type='closed' 
            onPress={() => setStatusSelected('closed')} 
            isActive={statusSelected === 'closed'}
          />
        </HStack>

        <FlatList 
          data={orders}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Order data={item}/>}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom:100}}
          
          ListEmptyComponent={
            () => (
              <Center>
                <ChatTeardropText color={colors.gray[300]} size={40}/>
                <Text color='gray.300' fontSize='lg' mt={6} textAlign='center' fontWeight='bold'>
                  Você ainda não possui {'\n'} 
                  solicitações {statusSelected === 'open' ? 'em andamento' : 'finalizados' }
                </Text>
              </Center>
            )
          }
        />
        <Button 
        title='Nova Solicitação'
        mt={8} mb={8}
        onPress={HandleNewOrder}/>
      </VStack>
    </VStack>
  );
}