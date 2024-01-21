import * as React from "react";
import Svg, { SvgProps, Path, SvgXml, Rect } from "react-native-svg";
import { IconProps } from "../ts/interfaces";

const iconString = `
  <svg width="18" height="8" viewBox="0 0 18 8" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 4H15M15 4H16M15 4V0M15 4V8M16 4H17M16 4V0.5M16 4V7.5M17 4H18M17 4V1.5M17 4V7M1 1.5V6.5M2 0.5V7.5M3 0V8" fill={color} stroke={color} />
  </svg>
`;

const BarbellIcon: React.FC<IconProps> = ({ size, color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 1"
      viewBox="0 0 64 80"
      size={size}
      color={color}
    >
      <Path d="M55 27h2.5v10H55zM58.5 30.5H60v3h-1.5zM57.5 28h.5v8h-.5zM52 25h2.5v14H52zM47.5 23h4v18h-4zM6.5 27H9v10H6.5zM4 30.5h1.5v3H4zM6 28h.5v8H6zM17 30.5h30v3H17zM9.5 25H12v14H9.5zM12.5 23h4v18h-4z" />
    </Svg>
  );
};
export default BarbellIcon;
