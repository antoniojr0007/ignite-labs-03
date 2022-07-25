import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

export type UserFirestoreDTO = {
  id: string
  name: string
  email: string
  phone: string
  password: string
  created_at: FirebaseFirestoreTypes.Timestamp
}
