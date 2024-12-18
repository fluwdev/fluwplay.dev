import { useState, useCallback, useEffect } from 'react'
import TrackPlayer, { RepeatMode } from 'react-native-track-player'

export const useSongRepeatMode = () => {
 const [repeatMode, setRepeatMode] = useState<RepeatMode>()
 const changeRepeatMode = useCallback(async (mode: RepeatMode) => {
  await TrackPlayer.setRepeatMode(mode)
  setRepeatMode(mode)
 }, [])

 useEffect(() => {
  TrackPlayer.getRepeatMode().then((mode) => setRepeatMode(mode))
 }, [])

 return { repeatMode, changeRepeatMode }
}
