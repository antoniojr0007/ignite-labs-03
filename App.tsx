import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from "native-base";
import { AppLoading } from './src/components/AppLoading';
import { SignIn } from './src/screens/SignIn';
import { THEME } from './src/styles/theme';


export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar style="auto" />
      {!fontsLoaded ? <AppLoading /> : <SignIn /> }
    </NativeBaseProvider>
  );
}

