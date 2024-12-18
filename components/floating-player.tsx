import { Image } from 'expo-image'
import { Pressable, StyleSheet, View } from 'react-native'
import { useActiveTrack } from 'react-native-track-player'
import { TextUI } from './text-ui'
import { ButtonPlayer } from './button-player'
import { ButtonPlayerBack } from './button-player-back'
import { ButtonPlayerForward } from './button-player-forward'
import { router } from 'expo-router'

export const FloatingPlayer = () => {
 const song = useActiveTrack()

 const handlePress = () => {
  router.push('/player')
 }

 if (!song) return null

 return (
  <Pressable onPress={handlePress} style={styles.container}>
   <Image
    source={{
     uri: song?.artwork ?? '',
    }}
    style={styles.image}
   />
   <View style={styles.info}>
    <TextUI fontFamily='Geist-SemiBold' style={styles.text}>
     {song?.title?.slice(0, 15).concat('...')}
    </TextUI>
    <TextUI style={styles.text}>{song?.artist}</TextUI>
   </View>
   <View style={styles.controls}>
    <ButtonPlayerBack />
    <ButtonPlayer />
    <ButtonPlayerForward />
   </View>
  </Pressable>
 )
}

const styles = StyleSheet.create({
 container: {
  position: 'absolute',
  bottom: 10,
  opacity: 0.9,
  alignItems: 'center',
  flexDirection: 'row',
  zIndex: 200,
  paddingHorizontal: 10,
  backgroundColor: '#112122',
  width: '95%',
  borderRadius: 20,
  height: 70,
 },
 info: {
  height: '100%',
  zIndex: 100,
  marginLeft: 10,
  gap: 5,
  justifyContent: 'center',
 },
 text: {
  textAlign: 'left',
 },
 image: {
  width: 50,
  height: 50,
  backgroundColor: '#42f',
  borderRadius: 10,
 },
 controls: {
  height: '80%',
  gap: 10,
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 10,
 },
})
