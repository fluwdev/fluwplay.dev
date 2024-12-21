import { useSongRepeatMode } from '@/hooks/use-song-repeat-mode'
import { Pressable } from 'react-native'
import Repeat from './icons/repeat'
import RepeatOne from './icons/repeat-one'
import RepeatOff from './icons/repeat-off'
import { theme as COLORS } from '@/constanst/theme'
import { RepeatMode } from 'react-native-track-player'
import { useThemeColor } from '@/hooks/use-theme-color'

const repeatOrder = [RepeatMode.Off, RepeatMode.Track, RepeatMode.Queue]

export const ButtonRepeatMode = () => {
  const { theme } = useThemeColor()
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
        <Repeat width={24} height={24} color={COLORS.colors[theme].secondary} />
      )}
      {repeatMode === RepeatMode.Track && (
        <RepeatOne
          width={24}
          height={24}
          color={COLORS.colors[theme].secondary}
        />
      )}
      {repeatMode === RepeatMode.Off && (
        <RepeatOff
          width={24}
          height={24}
          color={COLORS.colors[theme].secondary}
        />
      )}
    </Pressable>
  )
}
