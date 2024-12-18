import { Pressable, StyleProp, View, ViewStyle } from 'react-native'
import { useIsPlaying } from 'react-native-track-player'
import PauseIcon from './icons/pause'
import PlayIcon from './icons/play'
import { theme } from '@/constanst/theme'
import TrackPlayer from 'react-native-track-player'
import { styles } from './styles'

type ButtonPlayerProps = {
 style?: StyleProp<ViewStyle>
 color?: string
}

export const ButtonPlayer = ({ style, color }: ButtonPlayerProps) => {
 const isPlaying = useIsPlaying()

 const handlePlay = async () => {
  if (isPlaying.playing) {
   await TrackPlayer.pause()
  } else {
   await TrackPlayer.play()
  }
 }
 return (
  <Pressable style={[styles.controlsButton, style]} onPress={handlePlay}>
   {isPlaying.playing ? (
    <PauseIcon width={28} height={28} fill={color ?? theme.colors.secondary} />
   ) : (
    <PlayIcon width={28} height={28} fill={color ?? theme.colors.secondary} />
   )}
  </Pressable>
 )
}
