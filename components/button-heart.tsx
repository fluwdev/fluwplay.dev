import { Pressable } from 'react-native'
import Heart from './icons/heart'
import { theme as COLORS } from '@/constanst/theme'
import { useThemeColor } from '@/hooks/use-theme-color'

export const ButtonHeart = () => {
  const { theme } = useThemeColor()
  return (
    <Pressable>
      <Heart
        width={24}
        height={24}
        opacity={0.5}
        stroke={COLORS.colors[theme].secondary}
      />
    </Pressable>
  )
}
