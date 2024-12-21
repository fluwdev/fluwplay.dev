import { create } from 'zustand'
import { getItemAsync, setItemAsync } from 'expo-secure-store'

type Theme = 'dark' | 'light'

interface State {
  theme: Theme
  getTheme: () => Promise<void>
  setTheme: (theme: Theme) => Promise<void>
}

const useStore = create<State>((set) => ({
  theme: 'dark',
  getTheme: async () => {
    const theme = await getItemAsync('theme')
    set({ theme: theme ?? 'dark' })
  },
  setTheme: async (theme: Theme) => {
    await setItemAsync('theme', theme)
    set({ theme })
  },
}))

export default useStore
