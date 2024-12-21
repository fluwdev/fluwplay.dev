import { theme as COLORS } from '@/constanst/theme'
import PlayerSkipBack from './icons/player-skip-back'
import { Pressable, StyleProp, ViewStyle } from 'react-native'
import TrackPlayer from 'react-native-track-player'
import { styles } from './styles'
import { useThemeColor } from '@/hooks/use-theme-color'

type ButtonPlayerBackProps = {
  style?: StyleProp<ViewStyle>
  color?: string
}

export function ButtonPlayerBack({ style, color }: ButtonPlayerBackProps) {
  const { theme } = useThemeColor()
  const handleSkipBack = () => {
    TrackPlayer.skipToPrevious()
  }
  return (
    <Pressable style={[styles.controlsButton, style]} onPress={handleSkipBack}>
      <PlayerSkipBack
        width={24}
        height={24}
        fill={color ?? COLORS.colors[theme].primary}
      />
    </Pressable>
  )
}
