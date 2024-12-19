import { Song } from '@/types/types'
import { Pressable, StyleSheet, View } from 'react-native'
import { Image } from 'expo-image'
import { TextUI } from './text-ui'
import PlayIcon from './icons/play'
import { theme } from '@/constanst/theme'
import TrackPlayer, {
 useActiveTrack,
 useIsPlaying,
} from 'react-native-track-player'
import PauseIcon from './icons/pause'
import { LinearGradient } from 'expo-linear-gradient'
import { useMemo } from 'react'

type SongCardProps = {
 song: Song
 onTrackPress: (track: Song) => void
}

const gradientList = [
 ['#8442f5', '#42f5bf'],
 ['#2f2', '#2bb'],
 ['#9b42f5', '#d142f5'],
 ['#f542b3', '#428af5'],
]

const positionGradient = [
 { x: 0, y: 0 },
 { x: 1, y: 0.2 },
 { x: 0, y: 0.4 },
 { x: 0, y: 0 },
]

export const SongCard = ({
 song,
 onTrackPress: handleTrackPress,
}: SongCardProps) => {
 const isPlayingSong = useActiveTrack()?.url === song.url
 const isPlaying = useIsPlaying()

 const randomGradient = useMemo(
  () => gradientList[Math.floor(Math.random() * gradientList.length)],
  []
 )
 const randomPositionStart = useMemo(
  () => positionGradient[Math.floor(Math.random() * positionGradient.length)],
  []
 )
 const randomPositionEnd = useMemo(
  () => positionGradient[Math.floor(Math.random() * positionGradient.length)],
  []
 )

 return (
  <Pressable
   onPress={() => {
    handleTrackPress(song)
    TrackPlayer.play()
   }}
   style={styles.containerSong}
  >
   <LinearGradient
    start={randomPositionStart}
    end={randomPositionEnd}
    colors={randomGradient}
    style={{
     borderWidth: 1,
     borderColor: '#fff2',
     backgroundColor: '#1111',
     width: 50,
     height: 50,
     borderRadius: 10,
    }}
   />
   {/* <Image
    source={{
     uri: song.artwork ?? '',
    }}
    style={{
     borderWidth: 1,
     borderColor: '#fff2',
     backgroundColor: '#1111',
     width: 50,
     height: 50,
     borderRadius: 10,
    }}
   /> */}
   {isPlayingSong && (
    <Pressable style={styles.playButton}>
     {isPlaying.playing && (
      <PauseIcon width={20} height={20} fill={theme.colors.primary} />
     )}
     {!isPlaying.playing && (
      <PlayIcon width={20} height={20} fill={theme.colors.primary} />
     )}
    </Pressable>
   )}
   <View style={{ gap: 5, marginLeft: 10 }}>
    <TextUI style={{ textAlign: 'left' }} fontFamily='Geist-SemiBold'>
     {song.title.length > 30
      ? song.title.slice(0, 30).concat('...')
      : song.title}
    </TextUI>
    <TextUI style={{ textAlign: 'left' }}>{song.artist}</TextUI>
   </View>
  </Pressable>
 )
}

const styles = StyleSheet.create({
 containerSong: {
  width: '98%',
  height: 'auto',
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#fff2',
  paddingHorizontal: 10,
  gap: 5,
  margin: 2,
  position: 'relative',
  paddingVertical: 10,
  flexDirection: 'row',
  alignItems: 'center',
 },
 playButton: {
  position: 'absolute',
  bottom: '40%',
  right: '5%',
  backgroundColor: '#fff',
  borderRadius: 100,
  padding: 8,
  zIndex: 40,
 },
})
