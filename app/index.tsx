import { Pressable, View } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { FloatingPlayer } from '@/components/floating-player'
import { theme as COLORS } from '@/constanst/theme'
import { ListSong } from '@/components/list-song'
import { useThemeColor } from '@/hooks/use-theme-color'
import Gear from '@/components/icons/gear'

export default function Index() {
  const { theme } = useThemeColor()
  const navigation = useRouter()
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.colors[theme].primary,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      }}
    >
      <Stack.Screen
        options={{
          headerTitle: 'Songs',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: COLORS.colors[theme].secondary,
            fontFamily: 'Geist-SemiBold',
            fontSize: 30,
          },
          headerTintColor: COLORS.colors[theme].secondary,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: COLORS.colors[theme].primary,
          },
          headerRight: () => (
            <Pressable
              style={{ justifyContent: 'center', alignItems: 'center' }}
              onPress={() => navigation.push('/setting')}
            >
              <Gear
                stroke={COLORS.colors[theme].secondary}
                width={28}
                height={28}
              />
            </Pressable>
          ),
        }}
      />
      <ListSong />
      <FloatingPlayer />
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} translucent />
    </View>
  )
}
