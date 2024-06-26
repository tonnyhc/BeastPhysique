import * as React from "react";
import Svg, { SvgProps, Path, Circle } from "react-native-svg";
import { IconProps } from "../ts/interfaces";
const ChevronLeft: React.FC<IconProps> = ({ size, color, fill, scale }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill={fill ? fill : "none"}
  >
    <Path
      stroke={color}
      scale={scale}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={2}
      d="M15 19.92 8.48 13.4c-.77-.77-.77-2.03 0-2.8L15 4.08"
    />
  </Svg>
);
export default ChevronLeft;
