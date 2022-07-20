import { VStack } from 'native-base';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';

export function Register() {
  return (
    <VStack flex={1} p={6} bg='gray.600'>
      <Header title='Nova Solicitação' />
      <Input placeholder='Numero do Patrimonio' textAlign='center'/>
      <Input placeholder='Descriçao do Problema'
      flex={1}
      mt={5}
      multiline
      textAlignVertical='top'
      textAlign='center'
      />
      <Button title='Solicitar' mt={8} mb={8}/>
    </VStack>
  );
}