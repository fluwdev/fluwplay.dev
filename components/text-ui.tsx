import { theme as COLORS } from '@/constanst/theme'
import { useThemeColor } from '@/hooks/use-theme-color'
import { Text, TextStyle, StyleProp } from 'react-native'

export const TextUI = ({
  children,
  style,
  fontFamily = 'Geist-Regular',
}: {
  children: React.ReactNode
  style?: StyleProp<TextStyle>
  fontFamily?: 'Geist-Regular' | 'Geist-Medium' | 'Geist-SemiBold'
}) => {
  const { theme } = useThemeColor()
  return (
    <Text
      style={[
        {
          color: COLORS.colors[theme].secondary,
          textAlign: 'center',
          fontFamily,
        },
        style,
      ]}
    >
      {children}
    </Text>
  )
}
