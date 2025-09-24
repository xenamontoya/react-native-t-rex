import React from 'react';
import { SvgProps } from 'react-native-svg';

// SVG Component Interface
export interface SvgIconProps extends SvgProps {
  width?: number;
  height?: number;
  color?: string;
}

// Generic SVG wrapper for easy styling
export const SvgIcon: React.FC<SvgIconProps & { children: React.ReactNode }> = ({
  width = 24,
  height = 24,
  color,
  children,
  ...props
}) => {
  return React.cloneElement(children as React.ReactElement, {
    width,
    height,
    fill: color,
    ...props,
  });
};

export default SvgIcon;
