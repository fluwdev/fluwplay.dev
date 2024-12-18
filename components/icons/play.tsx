import Svg, { SvgProps, Path } from 'react-native-svg'
const PlayIcon = (props: SvgProps) => (
 <Svg width={24} height={24} viewBox='0 0 24 24' fill='currentColor' {...props}>
  <Path stroke='none' d='M0 0h24v24H0z' fill='none' />
  <Path d='M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z' />
 </Svg>
)
export default PlayIcon
