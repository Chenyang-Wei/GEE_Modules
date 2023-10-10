/** 
 * Introduction:
 *  This is a module for objects and funcitons that are often used
 *    for image analysis and processing.
 * 
 * Reference to the public repository:
 *  https://code.earthengine.google.com/?scriptPath=users/ChenyangWei/Public
 * 
 * Load this module:
 *  var IMG = require("users/ChenyangWei/Public:Modules/General/Image_Analysis&Processing.js");
 * 
 * Update: 10/10/2023.
 */


/****** Objects. ******/

/* Coordinate reference systems. */

// WGS84 at 10 m.
exports.WGS84_10m = {
  crs: "EPSG:4326",
  scale: 10
};

// WGS84 at 30 m.
exports.WGS84_30m = {
  crs: "EPSG:4326",
  scale: 30
};

// WGS84 at 300 m.
exports.WGS84_300m = {
  crs: "EPSG:4326",
  scale: 300
};

// WGS84 at 3 km.
exports.WGS84_3km = {
  crs: "EPSG:4326",
  scale: 3e3
};

// The maximum number of pixels.
exports.maxPxNum = 1e13;



/****** Functions. ******/

// Function to print the image information.
exports.Print_ImgInfo = function(name, image) {
  print(name,
    image.bandTypes(),
    image.projection().crs(),
    image.projection().nominalScale());
};


// Function to aggregate an image to a new resolution.
exports.Image_Aggregation = function(oldImage, oldScale, aggregationReducer, newScale, newCRS) {
  // Factor of the resolution scaling of each axis.
  var factor = Math.ceil(newScale / oldScale);
  
  // Image aggregation.
  var newImage = oldImage.reduceResolution({ 
    reducer: aggregationReducer,
    maxPixels: factor * factor
  }).reproject({ 
    crs: newCRS,
    scale: newScale
  });
  
  // Set the mask of each valid pixel to 1.
  var newImage_noMask = newImage.updateMask(newImage.gte(-1e18));

  return newImage_noMask;
};


// Function to remove a list of bands from an Image.
exports.RemoveBands_fromImage = function(rawImage, bandList) {
  /**
   * "Image":
   *  rawImage.
   * 
   * "List":
   *  bandList.
  */
  
  // Derive a list of the band names of the raw Image.
  var rawBandNames = rawImage.bandNames();
  
  // Remove the list of bands from the raw band names.
  var newBandNames = rawBandNames.removeAll(bandList);
  
  // Select the remaining bands.
  var newImage = rawImage.select(newBandNames);
  
  // Return an Image.
  return newImage;
};

