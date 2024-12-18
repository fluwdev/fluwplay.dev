import { useSongRepeatMode } from '@/hooks/use-song-repeat-mode'
import { Pressable } from 'react-native'
import Repeat from './icons/repeat'
import RepeatOne from './icons/repeat-one'
import RepeatOff from './icons/repeat-off'
import { theme } from '@/constanst/theme'
import { RepeatMode } from 'react-native-track-player'

const repeatOrder = [RepeatMode.Off, RepeatMode.Track, RepeatMode.Queue]

export const ButtonRepeatMode = () => {
 const { changeRepeatMode, repeatMode } = useSongRepeatMode()

 const handlePress = () => {
  const currentIndex = repeatOrder.indexOf(repeatMode)
  const nextIndex = (currentIndex + 1) % repeatOrder.length
  const nextRepeatMode = repeatOrder[nextIndex]
  changeRepeatMode(nextRepeatMode)
 }

 return (
  <Pressable onPress={handlePress}>
   {repeatMode === RepeatMode.Queue && (
    <Repeat width={24} height={24} color={theme.colors.secondary} />
   )}
   {repeatMode === RepeatMode.Track && (
    <RepeatOne width={24} height={24} color={theme.colors.secondary} />
   )}
   {repeatMode === RepeatMode.Off && (
    <RepeatOff width={24} height={24} color={theme.colors.secondary} />
   )}
  </Pressable>
 )
}
