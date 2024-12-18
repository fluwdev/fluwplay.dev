import * as MediaLibrary from 'expo-media-library'
import { useCallback, useState, useRef } from 'react'
import { Song } from '../types/types'

const PAGINATION_LIMIT = 20

export const useSongsSystem = () => {
 const [permission, requestPermission] = MediaLibrary.usePermissions()
 const [songs, setSongs] = useState<Song[]>([])
 const [hasNextPage, setHasNextPage] = useState(true)
 const [currentPage, setCurrentPage] = useState(0)
 const [isLoading, setIsLoading] = useState(false)
 const loadingRef = useRef(false)

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
   if (!permission?.granted || loadingRef.current) return

   loadingRef.current = true
   setIsLoading(true)

   const pageToLoad = resetPagination ? 0 : currentPage

   const media = await MediaLibrary.getAssetsAsync({
    mediaType: MediaLibrary.MediaType.audio,
    first: PAGINATION_LIMIT,
    offset: pageToLoad * PAGINATION_LIMIT,
    sortBy: [MediaLibrary.SortBy.creationTime],
   })

   const batchSize = 5
   const newSongs: Song[] = []

   for (let i = 0; i < media.assets.length; i += batchSize) {
    const batch = media.assets.slice(i, i + batchSize)
    const batchWithMetadata = await Promise.all(
     batch.map(async (asset) => {
      const assetInfo = await MediaLibrary.getAssetInfoAsync(asset)
      return mapSongData({ ...asset, ...assetInfo })
     })
    )
    newSongs.push(...batchWithMetadata)

    setSongs((prevSongs) => {
     if (resetPagination) return newSongs
     return [...prevSongs, ...batchWithMetadata]
    })
   }

   setHasNextPage(media.hasNextPage)
   setCurrentPage(resetPagination ? 0 : pageToLoad + 1)
  } catch (error) {
   console.error('Error loading songs:', error)
  } finally {
   setIsLoading(false)
   loadingRef.current = false
  }
 }

 const loadMoreSongs = useCallback(() => {
  if (!isLoading && hasNextPage && !loadingRef.current) {
   loadSongs()
  }
 }, [isLoading, hasNextPage])

 const refreshSongs = useCallback(() => {
  if (!loadingRef.current) {
   loadSongs(true)
  }
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
