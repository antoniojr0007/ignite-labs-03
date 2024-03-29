import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Details } from '../screens/Details'
import { Home } from '../screens/Home'
import { Recovery } from '../screens/Recovery'
import { Register } from '../screens/Register'
import { SignUp } from '../screens/SignUp'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="new" component={Register} />
      <Screen name="details" component={Details} />
      <Screen name="register" component={SignUp} />
      <Screen name="recovery" component={Recovery} />
    </Navigator>
  )
}
