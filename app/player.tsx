import PlayIcon from '@/components/icons/play'
import PlayerSkipBack from '@/components/icons/player-skip-back'
import PlayerSkipForward from '@/components/icons/player-skip-forward'
import { TextUI } from '@/components/text-ui'
import { theme } from '@/constanst/theme'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useActiveTrack } from 'react-native-track-player'

export default function PlayerScreen() {
 const song = useActiveTrack()

 const handleClose = () => {
  router.back()
 }

 return (
  <GestureHandlerRootView style={styles.container}>
   <Pressable onPress={handleClose} style={styles.close} />
   <View style={styles.imageContainer}>
    <Image
     source={{
      uri: song?.artwork ?? '',
     }}
     style={styles.image}
    />
   </View>
   <View style={styles.info}>
    <TextUI fontFamily='Geist-SemiBold' style={{ fontSize: 32 }}>
     {song?.title}
    </TextUI>
    <TextUI style={{ fontSize: 16 }}>{song?.artist}</TextUI>
   </View>

   <View
    style={{
     flexDirection: 'row',
     gap: 20,
     marginTop: 40,
     alignItems: 'center',
    }}
   >
    <Pressable style={styles.controlsSmall}>
     <PlayerSkipBack width={24} height={24} fill={theme.colors.primary} />
    </Pressable>
    <Pressable style={styles.controlsButton}>
     <PlayIcon width={24} height={24} fill={theme.colors.primary} />
    </Pressable>
    <Pressable style={styles.controlsSmall}>
     <PlayerSkipForward width={24} height={24} fill={theme.colors.primary} />
    </Pressable>
   </View>
  </GestureHandlerRootView>
 )
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  alignItems: 'center',
  paddingTop: 50,
  backgroundColor: theme.colors.primary,
 },
 close: {
  zIndex: 100,
  width: 80,
  height: 20,
  marginVertical: 20,
  backgroundColor: '#fff',
  borderRadius: 100,
 },
 info: {
  marginTop: 20,
  gap: 5,
 },
 controls: {
  flexDirection: 'row',
  gap: 20,
 },
 controlsButton: {
  width: 60,
  height: 60,
  backgroundColor: '#fff',
  borderRadius: 100,
  justifyContent: 'center',
  alignItems: 'center',
 },
 controlsSmall: {
  width: 45,
  height: 45,
  backgroundColor: '#fff',
  borderRadius: 100,
  justifyContent: 'center',
  alignItems: 'center',
 },
 imageContainer: {
  width: 250,
  height: 250,
  backgroundColor: '#fff',
  borderRadius: 20,
  overflow: 'hidden',
 },
 image: {
  width: '100%',
  height: '100%',
 },
})
