import { theme } from '@/constanst/theme'
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
 return (
  <Text
   style={[
    { color: theme.colors.secondary, textAlign: 'center', fontFamily },
    style,
   ]}
  >
   {children}
  </Text>
 )
}
