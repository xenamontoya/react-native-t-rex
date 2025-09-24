import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { SvgIconProps } from '../SvgIcon';

export const FlightsIcon: React.FC<SvgIconProps> = ({ 
  width = 24, 
  height = 24, 
  color = "#1376cd",
  ...props 
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" {...props}>
    {/* Airplane icon */}
    <Path 
      d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
      fill={color}
    />
  </Svg>
);

export default FlightsIcon;
