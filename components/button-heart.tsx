import { Pressable } from 'react-native'
import Heart from './icons/heart'
import { theme } from '@/constanst/theme'

export const ButtonHeart = () => {
 return (
  <Pressable>
   <Heart
    width={24}
    height={24}
    opacity={0.5}
    stroke={theme.colors.secondary}
   />
  </Pressable>
 )
}
