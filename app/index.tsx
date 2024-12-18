import { ActivityIndicator, View } from 'react-native'
import songs from '@/assets/data.json'
import { SongCard } from '@/components/song'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { MasonryFlashList } from '@shopify/flash-list'
import { Image } from 'expo-image'
import { Song } from '@/types/types'
import { FloatingPlayer } from '@/components/floating-player'
import TrackPlayer from 'react-native-track-player'
import { useSongsSystem } from '@/hooks/use-songs-system'
import { useEffect } from 'react'

export default function Index() {
 const {
  handleRequestPermission,
  isLoading,
  loadMoreSongs,
  refreshSongs,
  //   songs,
  hasPermission,
 } = useSongsSystem()
 const handleTrackSelect = (song: Song) => {
  TrackPlayer.load(song)
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
    backgroundColor: '#101014',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
   }}
  >
   <Stack.Screen
    options={{
     headerTitle: 'Songs',
     headerTitleAlign: 'center',
     headerTintColor: '#fff',
     headerShadowVisible: false,
     headerStyle: {
      backgroundColor: '#101014',
     },
    }}
   />
   <Image
    source={{
     uri: 'https://i.pinimg.com/736x/eb/3e/e9/eb3ee9f7e1d3746d831a0efc887680d5.jpg',
    }}
    style={{
     position: 'absolute',
     top: 0,
     width: '100%',
     height: '100%',
     opacity: 0.2,
    }}
   />
   <View style={{ flex: 1, width: '100%', paddingTop: 10, paddingBottom: 100 }}>
    <MasonryFlashList
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
   <FloatingPlayer />
   <StatusBar style='light' translucent />
  </View>
 )
}
