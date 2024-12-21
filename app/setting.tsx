import { useThemeColor } from '@/hooks/use-theme-color'
import { Stack } from 'expo-router'
import { Pressable, View, Switch } from 'react-native'
import { theme as COLORS } from '@/constanst/theme'
import { TextUI } from '@/components/text-ui'

export default function Setting() {
  const { theme, setTheme } = useThemeColor()

  const handleTheme = (value: boolean) => {
    setTheme(value ? 'dark' : 'light')
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.colors[theme].primary,
        paddingHorizontal: 20,
      }}
    >
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.colors[theme].primary,
          },
          headerTintColor: COLORS.colors[theme].secondary,
          headerShown: true,
          headerTitle: 'Setting',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'Geist-SemiBold',
            fontSize: 24,
          },
        }}
      />
      <Pressable
        style={{
          marginTop: 20,
          width: '100%',
          alignItems: 'flex-start',
          borderWidth: 1,
          paddingVertical: 15,
          paddingHorizontal: 10,
          borderColor: COLORS.colors[theme]['gray-100'],
          borderRadius: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <TextUI fontFamily='Geist-SemiBold' style={{ fontSize: 16 }}>
          Theme Dark
        </TextUI>
        <Switch
          thumbColor={COLORS.colors[theme].secondary}
          trackColor={{
            true: COLORS.colors[theme]['gray-100'],
            false: COLORS.colors[theme]['gray-100'],
          }}
          value={theme === 'dark' ? true : false}
          onValueChange={handleTheme}
        />
      </Pressable>
    </View>
  )
}
