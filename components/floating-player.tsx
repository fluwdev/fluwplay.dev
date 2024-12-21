import { Image } from 'expo-image'
import { Pressable, StyleSheet, View } from 'react-native'
import { useActiveTrack } from 'react-native-track-player'
import { TextUI } from './text-ui'
import { ButtonPlayer } from './button-player'
import { ButtonPlayerBack } from './button-player-back'
import { ButtonPlayerForward } from './button-player-forward'
import { router } from 'expo-router'
import { useThemeColor } from '@/hooks/use-theme-color'
import { theme as COLORS } from '@/constanst/theme'

export const FloatingPlayer = () => {
  const song = useActiveTrack()
  const { theme } = useThemeColor()
  const handlePress = () => {
    router.push('/player')
  }

  if (!song) return null

  return (
    <Pressable
      onPress={handlePress}
      style={[
        styles.container,
        { borderColor: COLORS.colors[theme]['gray-100'] },
      ]}
    >
      <Image
        source={{
          uri: song?.artwork ?? '',
        }}
        style={[
          styles.image,
          { backgroundColor: COLORS.colors[theme].secondary },
        ]}
      />
      <View style={styles.info}>
        <TextUI fontFamily='Geist-SemiBold' style={styles.text}>
          {song?.title?.slice(0, 15).concat('...')}
        </TextUI>
        <TextUI style={styles.text} fontFamily='Geist-Medium'>
          {song?.artist}
        </TextUI>
      </View>
      <View style={styles.controls}>
        <ButtonPlayerBack
          color={COLORS.colors[theme].secondary}
          style={{ backgroundColor: 'transparent', borderWidth: 0 }}
        />
        <ButtonPlayer
          color={COLORS.colors[theme].secondary}
          style={{ borderWidth: 0, backgroundColor: 'transparent' }}
        />
        <ButtonPlayerForward
          color={COLORS.colors[theme].secondary}
          style={{ backgroundColor: 'transparent', borderWidth: 0 }}
        />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    opacity: 0.9,
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 200,
    paddingHorizontal: 10,
    borderWidth: 1,
    width: '95%',
    borderRadius: 20,
    height: 70,
  },
  info: {
    height: '100%',
    flex: 1,
    zIndex: 100,
    marginLeft: 10,
    gap: 5,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'left',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  controls: {
    height: '80%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
})
