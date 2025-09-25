import React from 'react';
import { Svg, Circle, Path } from 'react-native-svg';

export const SimpleTestIcon: React.FC<{ width?: number; height?: number; color?: string }> = ({ 
  width = 24, 
  height = 24, 
  color = "#5177BB" 
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24">
    <Circle cx="12" cy="12" r="10" fill={color} />
    <Path d="M12 6v6l4 2" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export default SimpleTestIcon;
