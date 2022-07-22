import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Center, FlatList, Heading, HStack, IconButton, Text, useTheme, VStack } from 'native-base';
import { ChatTeardropText, SignOut } from 'phosphor-react-native';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Logo from '../assets/logo_secondary.svg';
import { Button } from '../components/Button';
import { Filter } from '../components/Filter';
import { Loading } from '../components/Loading';
import { Order, OrderProps } from '../components/Order';
import { OrderFirestoreDTO } from '../DTOs/OrderFirestoreDTO';
import { dateFormat } from '../utils/firestoreDateFormat';

export function Home() {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const[isLoading, setIsLoading] = useState(true)
  const [statusSelected, setStatusSelected] = useState<'open'| 'closed'>('open')
  const [orders, setOrders] = useState<OrderProps[]>([])
  const [countOrders, setCountOrders] = useState(0)



  function orderCount(){
    setCountOrders(orders.length)
  }

  function HandleNewOrder(){
    navigation.navigate('new');
  }

  function HandleLogout(){
    auth().signOut()
    .catch(error => {
      return Alert.alert('Sair', 'Nao Foi Possiver Sair')
    })
  }

  function handleOpenDetails(orderId:string){
    navigation.navigate('details', { orderId })
  }
  
  useEffect(() => {
    setIsLoading(true)
    
    const subscriber = firestore()
    .collection<OrderFirestoreDTO>('orders')
    .where('status', '==', statusSelected)
    .onSnapshot(snapshot => {
      const data = snapshot.docs.map(doc => {
        const {patrimony, description, status, created_at} = doc.data();

        return {
          id: doc.id,
          patrimony, 
          description, 
          status, 
          when: dateFormat(created_at)
        }
      })
      setOrders(data);
      setIsLoading(false);
    })
    },[statusSelected])
    
    useEffect(() => {
      orderCount()
    },[orders])
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
            {countOrders}
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

        {isLoading ? 
          <Loading/>:
          <FlatList 
            data={orders}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Order data={item} onPress={() => handleOpenDetails(item.id)}/>}
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
        }
        <Button 
        title='Nova Solicitação'
        mt={8} mb={8}
        onPress={HandleNewOrder}/>
      </VStack>
    </VStack>
  );
}