import { Pressable, StyleProp, ViewStyle } from 'react-native'
import PlayerSkipForward from './icons/player-skip-forward'
import { theme } from '@/constanst/theme'
import TrackPlayer from 'react-native-track-player'
import { styles } from './styles'

type ButtonPlayerForwardProps = {
 style?: StyleProp<ViewStyle>
 color?: string
}
export function ButtonPlayerForward({
 style,
 color,
}: ButtonPlayerForwardProps) {
 const handleSkipForward = () => {
  TrackPlayer.skipToNext()
 }
 return (
  <Pressable style={[styles.controlsButton, style]} onPress={handleSkipForward}>
   <PlayerSkipForward
    width={24}
    height={24}
    fill={color ?? theme.colors.secondary}
   />
  </Pressable>
 )
}
