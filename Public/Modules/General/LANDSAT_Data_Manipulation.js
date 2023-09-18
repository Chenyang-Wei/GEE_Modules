/** 
 * Introduction:
 *  The objects and funcitons in this module are defined for
 *    manipulating the LANDSAT datasets.
 * 
 * Function groups:
 *  1) Functions for loading the "Surface Reflectance" datasets.
 *  2) Functions for manipulating the "Surface Reflectance" datasets.
 *  3) Functions for caculations based on the "Surface Reflectance" datasets.
 * 
 * Reference to the public repository:
 *  https://code.earthengine.google.com/?scriptPath=users/ChenyangWei/Public
 * 
 * Load this module:
 *  var LDM = require("users/ChenyangWei/Public:Modules/General/LANDSAT_Data_Manipulation.js");
 * 
 * Update: 8/3/2022.
 */


/**** Load other prerequisite module(s). ****/




/****** Objects. ******/


/**** 1) Spectral bands of the "Surface Reflectance" datasets. ****/

/* Reflectance bands. */

// LANDSAT-8.
exports.L8_SR_refBands_List =
  ["B[1-7]"];


/* Pixel quality bands. */

// LANDSAT-5, 7, and 8.
exports.L578_SR_qualBand_Str =
  "pixel_qa";



/****** Functions. ******/


/**** 1) Functions for loading the "Surface Reflectance" datasets. ****/

/* Function to load the LANDSAT-8 SR imagery. */
exports.Load_L8_SR_byRegionDate = function(
  bandNames_List, region_Geom, startDate_Str, endDate_Str) {
    
    /**
     * "List": 
     *  bandNames_List.
     * 
     * "Geometry":
     *  region_Geom.
     * 
     * "String":
     *  startDate_Str, endDate_Str.
     * 
     * Result: ImageCollection.
    */
    
    // Load the selected bands of the raw LANDSAT-8 SR images.
    var raw_L8_SRbands_IC = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR")
      .select(bandNames_List);
    
    // Filter the LANDSAT-8 imagery by region and date.
    var filtered_L8_SRbands_IC = raw_L8_SRbands_IC.filterBounds(region_Geom)
      .filterDate(startDate_Str, endDate_Str); // The end date is exclusive.
    
    // Return the filtered ImageCollection.
    return filtered_L8_SRbands_IC;
  };


/**** 2) Functions for manipulating the "Surface Reflectance" datasets. ****/

/* Function to preprocess the SR imagery:
  1) Remove cloud (high confidence), cloud shadow, and NA edge pixels
    in each LANDSAT SR image based on the pixel QA band,
  2) Remove invalid pixels (< 0 or > 10000) 
    from each band of surface reflectance. */
exports.MaskCloudShadow_RemoveInvalidPx_SRimg = function(raw_SR_Img) {
    
  /**
   * "Image": 
   *  raw_SR_Img.
   * 
   * Result: Image.
  */
  
  //// 1) Remove cloud (high confidence), cloud shadow, and NA edge pixels.
  
  // Get the pixel QA band.
  var qa = raw_SR_Img.select('pixel_qa');
  
  // If the cloud bit (5) is set and the cloud confidence (7) is high
  //  or the cloud shadow bit is set (3), then it's a bad pixel.
  var cloud_shadow = qa.bitwiseAnd(1 << 5).and(qa.bitwiseAnd(1 << 7))
    .or(qa.bitwiseAnd(1 << 3));
  
  // Remove edge pixels that don't occur in all bands.
  var removeEdge = raw_SR_Img.mask().reduce(ee.Reducer.min());
  
  // Mask the unwanted pixels.
  var masked_SR_Img = raw_SR_Img.updateMask(cloud_shadow.not())
    .updateMask(removeEdge);
  
  // Select the bands of SR.
  var masked_RefBands = masked_SR_Img.select("B.*");
  
  
  //// 2) Remove invalid pixels (< 0 or > 10000).
  
  // Keep pixels with all the SR bands 
  //  within the valid range: 0-10000.
  var lowerLimit = masked_RefBands.gte(0).reduce(ee.Reducer.min());
  var upperLimit = masked_RefBands.lte(1e4).reduce(ee.Reducer.min());
  
  var noInvalid_RefBands = masked_RefBands.updateMask(lowerLimit)
    .updateMask(upperLimit);
  
  // Return the processed SR bands.
  return noInvalid_RefBands;
};


/**** 3) Functions for caculations based on the "Surface Reflectance" datasets. ****/

/* Function to calculate the NDVI of each LANDSAT SR pixel. */

// For the LANDSAT-8 images.
exports.Calculate_L8SR_NDVI = function(raw_L8_SR_Img) {
  
  /**
   * "Image": 
   *  raw_L8_SR_Img.
   * 
   * Result: Image.
  */
  
  // Derive a band of NDVI.
  var L8_SR_NDVI = raw_L8_SR_Img.normalizedDifference(["B5", "B4"])
    .rename("NDVI");
  
  // Return the NDVI band with all the input image properties.
  return raw_L8_SR_Img.addBands(L8_SR_NDVI)
    .select("NDVI");
};


