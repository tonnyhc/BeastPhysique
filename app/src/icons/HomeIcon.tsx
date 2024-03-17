import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { IconProps } from "../ts/interfaces";
const HomeIcon: React.FC<IconProps> = ({ size, color }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
  >
    <Path
      stroke={color}
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.2}
      d="M8.667 11H7.333c-.553 0-1 .447-1 1v2.333h3.334V12c0-.553-.447-1-1-1Z"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="m6.713 1.88-4.62 3.7c-.52.413-.853 1.287-.74 1.94l.887 5.307c.16.946 1.067 1.713 2.027 1.713h7.466c.954 0 1.867-.773 2.027-1.713l.887-5.307c.106-.653-.227-1.527-.74-1.94l-4.62-3.693c-.714-.574-1.867-.574-2.574-.007Z"
    />
  </Svg>
);
export default HomeIcon;
