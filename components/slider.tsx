import { theme } from '@/constanst/theme'
import Slider from '@react-native-community/slider'
import TrackPlayer, { useProgress } from 'react-native-track-player'
import { useSharedValue, withTiming } from 'react-native-reanimated'
import { formatDuration } from '@/utils/format-duration'
import { StyleProp, View, ViewStyle } from 'react-native'
import { TextUI } from './text-ui'

type SliderUIProps = {
 style?: StyleProp<ViewStyle>
 styleSlider?: StyleProp<ViewStyle>
}

export function SliderUI({ style, styleSlider }: SliderUIProps) {
 const { duration, position } = useProgress(250)
 const isSliding = useSharedValue(false)
 const progress = useSharedValue(0)
 const min = useSharedValue(0)
 const max = useSharedValue(1)

 const songElapsedTime = formatDuration(position)
 const songRemainingTime = formatDuration(duration - position)

 if (!isSliding.value) {
  progress.value = duration > 0 ? position / duration : 0
 }

 const handleValueChange = async (value: number) => {
  await TrackPlayer.seekTo(value * duration)
 }

 return (
  <View
   style={[
    style,
    {
     marginTop: 40,
     gap: 2,
     flexDirection: 'row',
     alignItems: 'center',
    },
   ]}
  >
   <TextUI style={{ fontSize: 12, width: 40 }}>{songElapsedTime}</TextUI>
   <Slider
    style={[styleSlider, { width: 250, height: 40 }]}
    minimumValue={min.value}
    maximumValue={max.value}
    value={progress.value}
    onSlidingComplete={async (value) => {
     if (!isSliding.value) return
     isSliding.value = false
     TrackPlayer.seekTo(value * duration)
    }}
    onSlidingStart={() => (isSliding.value = true)}
    onValueChange={handleValueChange}
    thumbTintColor={theme.colors.secondary}
    minimumTrackTintColor='#FFFFFF'
    maximumTrackTintColor={theme.colors.secondary}
   />
   <TextUI style={{ fontSize: 12, width: 40 }}>{songRemainingTime}</TextUI>
  </View>
 )
}
