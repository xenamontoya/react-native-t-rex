import React from 'react';
import { Svg, Path, Defs } from 'react-native-svg';
import { SvgIconProps } from '../SvgIcon';

export const FlightScheduleProLogo: React.FC<SvgIconProps> = ({ 
  width = 144, 
  height = 46.8, 
  color = "#1376cd",
  ...props 
}) => (
  <Svg width={width} height={height} viewBox="0 0 1440 468" {...props}>
    <Defs>
      <style>{`
        .st0 {
          fill: ${color};
        }
      `}</style>
    </Defs>
    
    {/* Main airplane/aircraft silhouette */}
    <Path 
      className="st0"
      d="M720 234C720 362.86 618.86 468 490 468H950C1078.86 468 1180 362.86 1180 234C1180 105.14 1078.86 0 950 0H490C618.86 0 720 105.14 720 234Z" 
      fill={color}
    />
    
    {/* Flight plan elements - simplified from original complex path */}
    <Path
      className="st0" 
      d="M200 200 L400 250 L600 200 L800 250 L1000 200 L1200 250"
      stroke={color}
      strokeWidth="8" 
      fill="none"
    />
    
    {/* Airport markers */}
    <Path
      className="st0"
      d="M200 190 L200 210 M400 240 L400 260 M600 190 L600 210 M800 240 L800 260 M1000 190 L1000 210 M1200 240 L1200 260"
      stroke={color}
      strokeWidth="6"
    />
  </Svg>
);

export default FlightScheduleProLogo;
