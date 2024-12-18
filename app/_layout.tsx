import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { useSetupTrackPlayer } from '@/hooks/use-setup-track-player'
import * as SplashScreen from 'expo-splash-screen'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
 useSetupTrackPlayer({
  onLoad: () => {
   SplashScreen.hideAsync()
  },
 })
 const [fontsLoaded] = useFonts({
  'Geist-Regular': require('@/assets/fonts/geist-sans-100.ttf'),
  'Geist-Medium': require('@/assets/fonts/geist-sans-400.ttf'),
  'Geist-SemiBold': require('@/assets/fonts/geist-sans-700.ttf'),
 })

 if (!fontsLoaded) {
  return null
 }

 return (
  <Stack>
   <Stack.Screen
    name='player'
    options={{
     presentation: 'card',
     animationMatchesGesture: true,
     fullScreenGestureEnabled: true,
     headerShown: false,
     gestureEnabled: true,
     animationDuration: 400,
     gestureDirection: 'vertical',
     animation: 'slide_from_bottom',
    }}
   />
  </Stack>
 )
}
