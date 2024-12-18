import Svg, { SvgProps, Path } from 'react-native-svg'
const PauseIcon = (props: SvgProps) => (
 <Svg width={24} height={24} viewBox='0 0 24 24' fill='currentColor' {...props}>
  <Path stroke='none' d='M0 0h24v24H0z' fill='none' />
  <Path d='M9 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z' />
  <Path d='M17 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z' />
 </Svg>
)
export default PauseIcon
