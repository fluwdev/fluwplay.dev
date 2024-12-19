import { ActivityIndicator, View } from 'react-native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { FloatingPlayer } from '@/components/floating-player'
import { theme } from '@/constanst/theme'
import { ListSong } from '@/components/list-song'

export default function Index() {
 return (
  <View
   style={{
    flex: 1,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
   }}
  >
   <Stack.Screen
    options={{
     headerTitle: 'Songs',
     headerTitleAlign: 'left',
     headerTitleStyle: {
      color: '#fff',
      fontFamily: 'Geist-SemiBold',
      fontSize: 30,
     },
     headerTintColor: '#fff',
     headerShadowVisible: false,
     headerStyle: {
      backgroundColor: theme.colors.primary,
     },
    }}
   />
   <ListSong />
   <FloatingPlayer />
   <StatusBar style='light' translucent />
  </View>
 )
}
