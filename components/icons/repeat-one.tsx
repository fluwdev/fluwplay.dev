import Svg, { SvgProps, Path } from 'react-native-svg'
const RepeatOne = (props: SvgProps) => (
 <Svg
  width={24}
  height={24}
  viewBox='0 0 24 24'
  fill='none'
  stroke='currentColor'
  strokeWidth={2}
  strokeLinecap='round'
  strokeLinejoin='round'
  {...props}
 >
  <Path stroke='none' d='M0 0h24v24H0z' fill='none' />
  <Path d='M4 12v-3a3 3 0 0 1 3 -3h13m-3 -3l3 3l-3 3' />
  <Path d='M20 12v3a3 3 0 0 1 -3 3h-13m3 3l-3 -3l3 -3' />
  <Path d='M11 11l1 -1v4' />
 </Svg>
)
export default RepeatOne
