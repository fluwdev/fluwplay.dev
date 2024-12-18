import * as MediaLibrary from 'expo-media-library'
import { useCallback, useState } from 'react'
import { Song } from '../types/types'

const PAGINATION_LIMIT = 20

export const useSongsSystem = () => {
 const [permission, requestPermission] = MediaLibrary.usePermissions()
 const [songs, setSongs] = useState<Song[]>([])
 const [hasNextPage, setHasNextPage] = useState(true)
 const [currentPage, setCurrentPage] = useState(0)
 const [isLoading, setIsLoading] = useState(false)

 const handleRequestPermission = async () => {
  const response = await requestPermission()
  if (response.granted) {
   await loadSongs()
  }
  return response.granted
 }

 const mapSongData = (asset: MediaLibrary.Asset): Song => {
  return {
   id: asset.id,
   title: asset.filename.replace(/\.[^/.]+$/, ''),
   artist: asset.artist || 'Artista desconocido',
   duration: asset.duration,
   url: asset.uri,
   artwork: asset.albumCoverUrl || undefined,
  }
 }

 const loadSongs = async (resetPagination = false) => {
  try {
   if (!permission?.granted) return

   setIsLoading(true)
   const pageToLoad = resetPagination ? 0 : currentPage

   const media = await MediaLibrary.getAssetsAsync({
    mediaType: MediaLibrary.MediaType.audio,
    first: PAGINATION_LIMIT,
    offset: pageToLoad * PAGINATION_LIMIT,
    sortBy: [MediaLibrary.SortBy.creationTime],
   })

   // Obtener metadatos adicionales para cada asset
   const assetsWithMetadata = await Promise.all(
    media.assets.map(async (asset) => {
     const assetInfo = await MediaLibrary.getAssetInfoAsync(asset)
     return { ...asset, ...assetInfo }
    })
   )

   const mappedSongs = assetsWithMetadata.map(mapSongData)

   if (resetPagination) {
    setSongs(mappedSongs)
   } else {
    setSongs((prevSongs) => [...prevSongs, ...mappedSongs])
   }

   setHasNextPage(media.hasNextPage)
   setCurrentPage(resetPagination ? 0 : pageToLoad + 1)
  } catch (error) {
   console.error('Error loading songs:', error)
  } finally {
   setIsLoading(false)
  }
 }

 const loadMoreSongs = useCallback(() => {
  if (!isLoading && hasNextPage) {
   loadSongs()
  }
 }, [isLoading, hasNextPage])

 const refreshSongs = useCallback(() => {
  loadSongs(true)
 }, [])

 return {
  songs,
  isLoading,
  hasNextPage,
  loadMoreSongs,
  refreshSongs,
  handleRequestPermission,
  hasPermission: permission?.granted ?? false,
 }
}
