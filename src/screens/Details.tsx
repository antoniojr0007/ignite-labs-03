import firestore from "@react-native-firebase/firestore";
import { useNavigation, useRoute } from '@react-navigation/native';
import { Box, HStack, KeyboardAvoidingView, ScrollView, Text, useTheme, VStack } from 'native-base';
import { CircleWavyCheck, ClipboardText, DesktopTower, Hourglass } from "phosphor-react-native";
import { useEffect, useState } from 'react';
import { Alert, Platform } from "react-native";
import { Button } from "../components/Button";
import { CardDetails } from "../components/CardDetails";
import { Header } from '../components/Header';
import { Input } from "../components/Input";
import { Loading } from "../components/Loading";
import { OrderProps } from '../components/Order';
import { OrderFirestoreDTO } from "../DTOs/OrderFirestoreDTO";
import { dateFormat } from "../utils/firestoreDateFormat";
type RouteParams = {
  orderId: string;
}

type OrderDetails = OrderProps & {
  description: string;
  solution?: string;
  closed?: string;
}

export function Details() {
  const route = useRoute();
  const {colors} = useTheme()
  const navigation = useNavigation()
  const[isLoading, setIsLoading] = useState(true)
  const [solution, setSolution] = useState('')

  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails)
  const { orderId } = route.params as RouteParams;

  function HandleClosedOrder(){
    if(!solution) {
      return Alert.alert('Solicitação','Não e possivel encerrar uma ordem sem uma soluçao')
    }

    firestore()
    .collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .update({
        status:'closed',
        solution, 
        closed_at: firestore.FieldValue.serverTimestamp()
      }).then(()=> {
        Alert.alert('Solicitação', 'Solicitação encerrada com sucesso.');
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
        return Alert.alert('Solicitação', 'Não foi possível encerrar a solicitação')
      })
  }

  useEffect(() => {
    firestore()
      .collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .get()
      .then((doc) => {
        const { patrimony, description, status, created_at, closed_at, solution } = doc.data();
        const closed = closed_at ? dateFormat(closed_at) : null;


        setOrder({
          id: doc.id,
          patrimony,
          description,
          status,
          solution,
          when: dateFormat(created_at),
          closed
        });

        setIsLoading(false);
      });
  }, []);

  if(isLoading){
    <Loading />
  }
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    enabled>
      <VStack flex={1} bg='gray.700'>
        <Box px={6} bg='gray.600'>
          <Header title="Solicitação" />
        </Box>
        <HStack bg='gray.500' justifyContent='center' p={4} >
          {
            order.status === 'closed' ? <CircleWavyCheck size={22} color={colors.green[300]}/>
            : <Hourglass size={22} color={colors.secondary[700]}/>
          }
          <Text 
            fontSize='sm'
            color={order.status === 'closed' ? colors.green[300] : colors.secondary[700]}
            ml={2}
            textTransform='uppercase'
          >
            { order.status === 'closed' ? 'Finalizados' : 'Em andamento' }
          </Text>

        </HStack>
        <ScrollView mx={5} showsVerticalScrollIndicator={false}>
          <CardDetails 
            title='equipamento'
            description={`Patrimonio ${order.patrimony}`}
            icon={DesktopTower}
          />
          <CardDetails 
            title='Descriçao do Problema'
            description={order.description}
            icon={ClipboardText}
            footer={`Registrado em ${order.when}`}

          />
          <CardDetails 
            title='Solução'
            description={order.solution}
            icon={CircleWavyCheck}
            footer={order.closed && `Encerrado em ${order.closed}`}
          >
            { order.status ==='open' && 
              <>
                <Input 
                  bg='gray.500'
                  placeholder="Descreva a solução"
                  onChangeText={setSolution}
                  h={24}
                  textAlign="center"
                  textAlignVertical='top'
                  multiline
                />
                <Button 
                title='Encerrar'
                mt={5}
                onPress={HandleClosedOrder}
                />
              </>
            }
          </CardDetails>
        </ScrollView>
      </VStack>
    </KeyboardAvoidingView>
  );
}