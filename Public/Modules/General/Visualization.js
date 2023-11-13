/** 
 * Introduction:
 *  This is a module for objects and funcitons that are often used
 *    for visualization.
 * 
 * Reference to the public repository:
 *  https://code.earthengine.google.com/?scriptPath=users/ChenyangWei/Public
 * 
 * Load this module:
 *  var VIS = require("users/ChenyangWei/Public:Modules/General/Visualization.js");
 * 
 * Updated: 11/8/2023.
 */


/* Load the prerequisite module(s). */

var GATE = require("users/ChenyangWei/Public:Modules/Treeline/Global_ATE.js");



/****** Objects. ******/


/* Palette. */

// NDVI.
exports.NDVI_palette =
  "FFFFFF, CE7E45, DF923D, F1B555, FCD163, 99B718, 74A901, 66A000, 529400," +
  "3E8601, 207401, 056201, 004C00, 023B01, 012E01, 011D01, 011301";

// Elevation.
exports.Elevation_palette = ['006600', '002200', 'fff700', 'ab7634', 'c4d0ff', 'ffffff'];

// BGR.
exports.BWR_palette = ["0000FF", "FFFFFF", "FF0000"];

// BGR 2.
exports.BWR_2_palette = ["0000FF", "00FFFF", "FFFFFF", "FFFF00", "FF0000"];


/* Map styles. */

exports.Dark_withLabels = 
  [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#757575"
        },
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#181818"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1b1b1b"
        }
      ]
    },
    {
      "featureType": "road",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#2c2c2c"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8a8a8a"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#373737"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3c3c3c"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#4e4e4e"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3d3d3d"
        }
      ]
    }
  ];


/* Visualization dictionary. */

// NDVI visualization.
var vis_palette =
  "FFFFFF, CE7E45, DF923D, F1B555, FCD163, 99B718, 74A901, 66A000, 529400," +
  "3E8601, 207401, 056201, 004C00, 023B01, 012E01, 011D01, 011301";

exports.NDVI_vis = {min: 0, max: 1, palette: vis_palette};



/****** Functions. ******/


/* Functions to set a map center for each continent
  and change the basemap to "satellite." */

// Europe.
exports.centerEurope = function(zoomLevel) {
  Map.setCenter(10.6891, 46.4071, zoomLevel);
  
  Map.setOptions("satellite");
};

// Asia.
exports.centerAsia = function(zoomLevel) {
  Map.setCenter(95.0256, 30.0081, zoomLevel);
  
  Map.setOptions("satellite");
};

// Oceania.
exports.centerOceania = function(zoomLevel) {
  Map.setCenter(170.399, -43.4416, zoomLevel);
  
  Map.setOptions("satellite");
};

// North America.
exports.centerNorthAmerica = function(zoomLevel) {
  Map.setCenter(-113.79504, 48.98608, zoomLevel);
  
  Map.setOptions("satellite");
};

// South America.
exports.centerSouthAmerica = function(zoomLevel) {
  Map.setCenter(-72.342, -44.3569, zoomLevel);
  
  Map.setOptions("satellite");
};

// Africa.
exports.centerAfrica = function(zoomLevel) {
  Map.setCenter(19.76038, -34.04535, zoomLevel);
  
  Map.setOptions("satellite");
};


/* Functions to display a FeatureCollection. */

// Function to color both the fill and the edges of Features in a FeatureCollection
//  with values set from the same property of the Features.
exports.PaintFC_Fill_Edge = 
  function(rawFtrCol, propertyName, edgeWidth) {
    
    /**
     * "FeatureCollection": 
     *  rawFtrCol.
     * 
     * "String": 
     *  propertyName.
     * 
     * "Number": 
     *  edgeWidth.
    */
    
    // Define an empty image of the "double" type.
    var emptyImg = ee.Image().double();
    
    // Paint both the fill and the edges.
    var painted = emptyImg
      .paint(rawFtrCol, propertyName)
      .paint(rawFtrCol, propertyName, edgeWidth);
    
    // Return the painted "Image."
    return painted;
  };


// Function to color the edges of Features in a FeatureCollection
//  with values set from a property of the Features.
exports.PaintFC_Edge = 
  function(rawFtrCol, propertyName, edgeWidth) {
    
    /**
     * "FeatureCollection": 
     *  rawFtrCol.
     * 
     * "String": 
     *  propertyName.
     * 
     * "Number": 
     *  edgeWidth.
     * 
     * Return: Image.
    */
    
    // Define an empty image of the "double" type.
    var emptyImg = ee.Image().double();
    
    // Paint the edges.
    var painted = emptyImg
      .paint(rawFtrCol, propertyName, edgeWidth);
    
    // Return the painted Image.
    return painted;
  };

