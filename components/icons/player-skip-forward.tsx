import Svg, { SvgProps, Path } from 'react-native-svg'
const PlayerSkipForward = (props: SvgProps) => (
 <Svg width={24} height={24} viewBox='0 0 24 24' fill='currentColor' {...props}>
  <Path stroke='none' d='M0 0h24v24H0z' fill='none' />
  <Path d='M3 5v14a1 1 0 0 0 1.504 .864l12 -7a1 1 0 0 0 0 -1.728l-12 -7a1 1 0 0 0 -1.504 .864z' />
  <Path d='M20 4a1 1 0 0 1 .993 .883l.007 .117v14a1 1 0 0 1 -1.993 .117l-.007 -.117v-14a1 1 0 0 1 1 -1z' />
 </Svg>
)
export default PlayerSkipForward
