import { ButtonHeart } from '@/components/button-heart'
import { ButtonPlayer } from '@/components/button-player'
import { ButtonPlayerBack } from '@/components/button-player-back'
import { ButtonPlayerForward } from '@/components/button-player-forward'
import { ButtonRepeatMode } from '@/components/button-repeat-mode'
import { SliderUI } from '@/components/slider'
import { TextUI } from '@/components/text-ui'
import { theme as COLORS } from '@/constanst/theme'
import { useThemeColor } from '@/hooks/use-theme-color'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { Pressable, StyleSheet, View } from 'react-native'
import { useActiveTrack } from 'react-native-track-player'

export default function PlayerScreen() {
  const song = useActiveTrack()
  const { theme } = useThemeColor()

  const handleClose = () => {
    router.back()
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: COLORS.colors[theme].primary },
      ]}
    >
      <Pressable
        onPress={handleClose}
        style={[
          styles.close,
          { backgroundColor: COLORS.colors[theme].secondary },
        ]}
      />
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: song?.artwork ?? '',
          }}
          style={[
            styles.image,
            { backgroundColor: COLORS.colors[theme].secondary },
          ]}
        />
      </View>
      <View style={styles.info}>
        <TextUI fontFamily='Geist-SemiBold' style={{ fontSize: 32 }}>
          {song?.title}
        </TextUI>
        <TextUI style={{ fontSize: 16 }} fontFamily='Geist-Medium'>
          {song?.artist}
        </TextUI>
      </View>
      <SliderUI />
      <View
        style={{
          flexDirection: 'row',
          gap: 20,
          alignItems: 'center',
        }}
      >
        <ButtonHeart />
        <ButtonPlayerBack />
        <ButtonPlayer style={{ width: 60, height: 60 }} />
        <ButtonPlayerForward />
        <ButtonRepeatMode />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  close: {
    zIndex: 100,
    width: 80,
    height: 20,
    marginVertical: 20,
    borderRadius: 100,
  },
  info: {
    marginTop: 20,
    gap: 5,
    width: '90%',
  },
  controls: {
    flexDirection: 'row',
    gap: 20,
  },
  imageContainer: {
    width: 250,
    height: 250,
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
})
