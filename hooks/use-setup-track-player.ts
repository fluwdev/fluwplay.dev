import { useEffect, useRef } from 'react'
import TrackPlayer, { RepeatMode } from 'react-native-track-player'

const setupTrackPlayer = async () => {
 await TrackPlayer.setupPlayer({
  maxCacheSize: 1024 * 10,
 })
 await TrackPlayer.setVolume(0.7)
 await TrackPlayer.setRepeatMode(RepeatMode.Queue)
}

export const useSetupTrackPlayer = ({ onLoad }: { onLoad: () => void }) => {
 const isInitlized = useRef<boolean>(false)
 useEffect(() => {
  if (!isInitlized.current) {
   setupTrackPlayer()
    .then(() => {
     isInitlized.current = true
     onLoad()
    })
    .catch((error) => {
     isInitlized.current = false
     console.log(error)
    })
  }
 }, [onLoad])
}
