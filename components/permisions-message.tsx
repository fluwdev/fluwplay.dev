import { Pressable, Text, View } from 'react-native'
import { TextUI } from './text-ui'
import { theme } from '@/constanst/theme'

export function PermisionsMessage({ onPress }: { onPress: () => void }) {
 return (
  <View
   style={{
    flex: 1,
    width: '100%',
    paddingTop: 10,
    paddingBottom: 100,
    alignItems: 'center',
   }}
  >
   <TextUI
    fontFamily='Geist-Medium'
    style={{ fontSize: 16, width: '80%', color: '#fff' }}
   >
    Please grant permission to access the microphone and storage to use this
    app.
   </TextUI>
   <Pressable
    style={{
     backgroundColor: '#fff',
     height: 45,
     borderRadius: 8,
     marginTop: 10,
     paddingHorizontal: 10,
     justifyContent: 'center',
     alignItems: 'center',
    }}
    onPress={onPress}
   >
    <TextUI
     fontFamily='Geist-Medium'
     style={{ fontSize: 16, color: theme.colors.primary }}
    >
     Grant Permission
    </TextUI>
   </Pressable>
  </View>
 )
}
