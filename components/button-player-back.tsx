import { theme } from '@/constanst/theme'
import PlayerSkipBack from './icons/player-skip-back'
import { Pressable } from 'react-native'
import TrackPlayer from 'react-native-track-player'

export function ButtonPlayerBack() {
 const handleSkipBack = () => {
  TrackPlayer.skipToPrevious()
 }
 return (
  <Pressable onPress={handleSkipBack}>
   <PlayerSkipBack width={24} height={24} fill={theme.colors.secondary} />
  </Pressable>
 )
}
