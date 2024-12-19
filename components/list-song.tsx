import { ActivityIndicator, View } from 'react-native'
// import songs from '@/assets/data.json'
import { SongCard } from '@/components/song'
import { MasonryFlashList } from '@shopify/flash-list'
import { Song } from '@/types/types'
import TrackPlayer from 'react-native-track-player'
import { useSongsSystem } from '@/hooks/use-songs-system'
import { useEffect } from 'react'
import { PermisionsMessage } from '@/components/permisions-message'

export function ListSong() {
 const {
  handleRequestPermission,
  isLoading,
  refreshSongs,
  songs,
  hasPermission,
 } = useSongsSystem()

 const handleTrackSelect = async (selectedSong: Song) => {
  const songIndex = songs.findIndex((song) => song.url === selectedSong.url)
  if (songIndex === -1) return
  const beforeSongs = songs.slice(0, songIndex)
  const afterSongs = songs.slice(songIndex + 1)
  await TrackPlayer.reset()
  await TrackPlayer.add(selectedSong)
  await TrackPlayer.add(afterSongs)
  await TrackPlayer.add(beforeSongs)
 }

 useEffect(() => {
  if (!hasPermission) {
   handleRequestPermission()
  }
 }, [])
 return (
  <>
   {!hasPermission && <PermisionsMessage onPress={handleRequestPermission} />}
   {hasPermission && (
    <View
     style={{ flex: 1, width: '100%', paddingTop: 10, paddingBottom: 100 }}
    >
     <MasonryFlashList
      onRefresh={refreshSongs}
      refreshing={isLoading}
      data={songs}
      centerContent={true}
      keyExtractor={(item) => item.url}
      renderItem={({ item }) => (
       <SongCard
        onTrackPress={(song) => {
         handleTrackSelect(song).then(() => {
          TrackPlayer.play()
         })
        }}
        song={item}
       />
      )}
      ListFooterComponent={() =>
       isLoading && <ActivityIndicator color={'#fff'} size='large' />
      }
      estimatedItemSize={100}
     />
    </View>
   )}
  </>
 )
}