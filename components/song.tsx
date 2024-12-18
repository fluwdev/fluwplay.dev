import { Song } from '@/types/types'
import { Pressable, StyleSheet, View } from 'react-native'
import { Image } from 'expo-image'
import { TextUI } from './text-ui'
import PlayIcon from './icons/play'
import { theme } from '@/constanst/theme'
import TrackPlayer, {
 useActiveTrack,
 useIsPlaying,
 isPlaying,
} from 'react-native-track-player'
import PauseIcon from './icons/pause'

type SongCardProps = {
 song: Song
 onTrackPress: (track: Song) => void
}

export const SongCard = ({
 song,
 onTrackPress: handleTrackPress,
}: SongCardProps) => {
 const isPlayingSong = useActiveTrack()?.url === song.url
 const isPlaying = useIsPlaying()
 return (
  <Pressable
   onPress={() => {
    handleTrackPress(song)
    TrackPlayer.play()
   }}
   style={styles.containerSong}
  >
   <Image
    source={{
     uri: song.artwork ?? '',
    }}
    style={{
     backgroundColor: '#42f',
     width: 100,
     height: 100,
     borderRadius: 10,
    }}
   />
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
   <View style={{ gap: 5 }}>
    <TextUI fontFamily='Geist-SemiBold'>
     {song.title.slice(0, 15).concat('...')}
    </TextUI>
    <TextUI>{song.artist}</TextUI>
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
  gap: 15,
  margin: 2,
  position: 'relative',
  paddingVertical: 10,
  flexDirection: 'column',
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
