import { ActivityIndicator, View } from 'react-native'
// import songs from '@/assets/data.json'
import { SongCard } from '@/components/song'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { MasonryFlashList } from '@shopify/flash-list'
import { Image } from 'expo-image'
import { Song } from '@/types/types'
import { FloatingPlayer } from '@/components/floating-player'
import TrackPlayer, { Event } from 'react-native-track-player'
import { useSongsSystem } from '@/hooks/use-songs-system'
import { useEffect } from 'react'
import { theme } from '@/constanst/theme'
import { PermisionsMessage } from '@/components/permisions-message'

export default function Index() {
 const {
  handleRequestPermission,
  isLoading,
  loadMoreSongs,
  refreshSongs,
  songs,
  hasNextPage,
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
  await TrackPlayer.play()
 }

 useEffect(() => {
  if (!hasPermission) {
   handleRequestPermission()
  }
 }, [])

 return (
  <View
   style={{
    flex: 1,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
   }}
  >
   <Stack.Screen
    options={{
     headerTitle: 'Songs',
     headerTitleAlign: 'left',
     headerTitleStyle: {
      color: '#fff',
      fontFamily: 'Geist-SemiBold',
      fontSize: 30,
     },
     headerTintColor: '#fff',
     headerShadowVisible: false,
     headerStyle: {
      backgroundColor: theme.colors.primary,
     },
    }}
   />
   {!hasPermission && <PermisionsMessage onPress={handleRequestPermission} />}
   {hasPermission && (
    <View
     style={{ flex: 1, width: '100%', paddingTop: 10, paddingBottom: 100 }}
    >
     <MasonryFlashList
      onEndReached={loadMoreSongs}
      onRefresh={refreshSongs}
      refreshing={isLoading}
      data={songs}
      centerContent={true}
      keyExtractor={(item) => item.url}
      renderItem={({ item }) => (
       <SongCard onTrackPress={handleTrackSelect} song={item} />
      )}
      ListFooterComponent={() =>
       isLoading && <ActivityIndicator color={'#fff'} size='large' />
      }
      numColumns={3}
      estimatedItemSize={100}
     />
    </View>
   )}
   <FloatingPlayer />
   <StatusBar style='light' translucent />
  </View>
 )
}
