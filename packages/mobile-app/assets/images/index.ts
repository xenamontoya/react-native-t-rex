/**
 * MINIMAL WORKING ASSETS FILE 
 * Using only direct require() calls that work
 */

// Main background image (known to work)
export const backgroundImage = require('./thewayofcolor-JyOeDt0kRYc-unsplash.png');

// Working PNG logos
export const sportysLogo = require('./logos/SportysLogo.png');
export const flightAwareLogo = require('./logos/flight-aware.png');
export const xenaSignature = require('./logos/xena-signature.png');

// Pilotbase PNG files
export const pilotbaseIcon = require('./logos/pilotbase-icon-6x.png');
export const pilotbasePro = require('./logos/pilotbase-pro-6x.png');
export const pilotbase = require('./logos/pilotbase-6x.png');

// Asset groups for compatibility
export const backgrounds = {
  main: backgroundImage,
};

export const pilotbaseAssets = {
  icon: pilotbaseIcon,
  pro: pilotbasePro,
  main: pilotbase,
  nameplate: pilotbase, // Using main logo as nameplate
};