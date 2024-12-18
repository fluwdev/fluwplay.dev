import { theme } from '@/constanst/theme'
import PlayerSkipBack from './icons/player-skip-back'
import { Pressable, StyleProp, ViewStyle } from 'react-native'
import TrackPlayer from 'react-native-track-player'
import { styles } from './styles'

type ButtonPlayerBackProps = {
 style?: StyleProp<ViewStyle>
 color?: string
}

export function ButtonPlayerBack({ style, color }: ButtonPlayerBackProps) {
 const handleSkipBack = () => {
  TrackPlayer.skipToPrevious()
 }
 return (
  <Pressable style={[styles.controlsButton, style]} onPress={handleSkipBack}>
   <PlayerSkipBack
    width={24}
    height={24}
    fill={color ?? theme.colors.secondary}
   />
  </Pressable>
 )
}
