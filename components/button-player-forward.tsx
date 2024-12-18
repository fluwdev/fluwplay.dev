import { Pressable } from 'react-native'
import PlayerSkipForward from './icons/player-skip-forward'
import { theme } from '@/constanst/theme'
import TrackPlayer from 'react-native-track-player'

export function ButtonPlayerForward() {
 const handleSkipForward = () => {
  TrackPlayer.skipToNext()
 }
 return (
  <Pressable onPress={handleSkipForward}>
   <PlayerSkipForward width={24} height={24} fill={theme.colors.secondary} />
  </Pressable>
 )
}
