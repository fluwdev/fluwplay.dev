import * as MediaLibrary from 'expo-media-library'
import { useCallback, useState, useEffect } from 'react'
import { Song } from '../types/types'

export const useSongsSystem = () => {
 const [permission, requestPermission] = MediaLibrary.usePermissions()
 const [songs, setSongs] = useState<Song[]>([])
 const [isLoading, setIsLoading] = useState(false)

 const handleRequestPermission = async () => {
  try {
   const response = await requestPermission()
   if (response.granted) {
    await loadSongs()
   }
   return response.granted
  } catch (error) {
   return false
  }
 }

 const mapSongData = async (
  asset: MediaLibrary.Asset
 ): Promise<Song | null> => {
  try {
   const assetInfo = await MediaLibrary.getAssetInfoAsync(asset.id, {
    shouldDownloadFromNetwork: true,
   })
   const fileName =
    asset.filename.split('.').slice(0, -1).join('.') || asset.filename
   const title = assetInfo.metadata?.title || fileName

   return {
    id: asset.id,
    title: title,
    artist: assetInfo.metadata?.artist || asset.artist || 'Artista desconocido',
    duration: asset.duration,
    url: asset.uri,
    artwork:
     assetInfo.metadata?.albumCoverUrl ||
     asset.albumCoverUrl ||
     assetInfo.metadata?.albumArt ||
     undefined,
   }
  } catch (error) {
   return null
  }
 }

 const loadSongs = async () => {
  try {
   if (!permission?.granted) {
    return
   }
   setIsLoading(true)
   const mediaCount = await MediaLibrary.getAssetsAsync({
    mediaType: [MediaLibrary.MediaType.audio],
   })
   const media = await MediaLibrary.getAssetsAsync({
    mediaType: [MediaLibrary.MediaType.audio],
    first: mediaCount.totalCount,
    sortBy: ['creationTime'],
   })

   const processedSongs = await Promise.all(
    media.assets.map(async (asset) => {
     try {
      return await mapSongData(asset)
     } catch (error) {
      return null
     }
    })
   )

   const validSongs = processedSongs.filter(
    (song): song is Song => song !== null
   )
   setSongs(validSongs)
  } catch (error) {
   setIsLoading(false)
  } finally {
   setIsLoading(false)
  }
 }

 const refreshSongs = useCallback(() => {
  loadSongs()
 }, [])

 useEffect(() => {
  if (permission?.granted && songs.length === 0) {
   loadSongs()
  }
 }, [permission?.granted])

 return {
  songs,
  isLoading,
  refreshSongs,
  handleRequestPermission,
  hasPermission: permission?.granted ?? false,
 }
}
