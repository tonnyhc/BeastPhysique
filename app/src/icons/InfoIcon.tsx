import * as React from "react";
import Svg, { SvgProps, Path, Circle } from "react-native-svg";
import { IconProps } from "../ts/interfaces";
const InfoIcon: React.FC<IconProps> = ({ size, color, fill }) => (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill={fill ? fill : "none"}
  >
    <Circle cx={12} cy={12} r={9} stroke={color} />
    <Path fill={color} d="M12.5 7.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
    <Path stroke={color} d="M12 17v-7" />
  </Svg>
);
export default InfoIcon;
