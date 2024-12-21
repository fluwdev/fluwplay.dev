import { Pressable, Text, View } from 'react-native'
import { TextUI } from './text-ui'
import { theme as COLORS } from '@/constanst/theme'
import { useThemeColor } from '@/hooks/use-theme-color'

export function PermisionsMessage({ onPress }: { onPress: () => void }) {
  const { theme } = useThemeColor()
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        paddingTop: 10,
        paddingBottom: 100,
        alignItems: 'center',
      }}
    >
      <TextUI
        fontFamily='Geist-Medium'
        style={{
          fontSize: 16,
          width: '80%',
          color: COLORS.colors[theme].secondary,
        }}
      >
        Please grant permission to access the microphone and storage to use this
        app.
      </TextUI>
      <Pressable
        style={{
          backgroundColor: COLORS.colors[theme].secondary,
          height: 45,
          borderRadius: 8,
          marginTop: 10,
          paddingHorizontal: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={onPress}
      >
        <TextUI
          fontFamily='Geist-Medium'
          style={{ fontSize: 16, color: COLORS.colors[theme].secondary }}
        >
          Grant Permission
        </TextUI>
      </Pressable>
    </View>
  )
}
