import React from "react";
import { IconProps } from "../ts/interfaces";
import Svg, { Path } from "react-native-svg";

const VerifyIcon: React.FC<IconProps> = ({ size, color, fill, scale }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={fill ? fill : "none"}
      viewBox="0 0 16 16"
    >
      <Path
        stroke={color}
        scale={scale}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m5.587 8 1.607 1.613 3.22-3.226"
      />
      <Path
        stroke={color}
        scale={scale}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M7.167 1.633c.46-.393 1.213-.393 1.68 0L9.9 2.54c.2.173.574.313.84.313h1.134c.706 0 1.286.58 1.286 1.287v1.133c0 .26.14.64.314.84l.906 1.054c.394.46.394 1.213 0 1.68L13.474 9.9c-.174.2-.314.573-.314.84v1.133c0 .707-.58 1.287-1.286 1.287H10.74c-.26 0-.64.14-.84.313l-1.053.907c-.46.393-1.213.393-1.68 0l-1.053-.907a1.477 1.477 0 0 0-.84-.313H4.12c-.706 0-1.286-.58-1.286-1.287v-1.14c0-.26-.14-.633-.307-.833l-.9-1.06c-.387-.46-.387-1.207 0-1.667l.9-1.06c.167-.2.307-.573.307-.833V4.133c0-.706.58-1.286 1.286-1.286h1.154c.26 0 .64-.14.84-.314l1.053-.9Z"
      />
    </Svg>
  );
};

export default VerifyIcon;
