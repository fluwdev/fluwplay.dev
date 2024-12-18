import Svg, { SvgProps, Path } from 'react-native-svg'
const Heart = (props: SvgProps) => (
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
  <Path d='M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572' />
 </Svg>
)
export default Heart
