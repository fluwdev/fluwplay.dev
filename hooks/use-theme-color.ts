import useStore from '@/store/store'

export const useThemeColor = () => {
  const { theme, getTheme, setTheme } = useStore((state) => state)

  return { theme, setTheme }
}
