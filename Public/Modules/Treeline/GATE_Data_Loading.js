/** 
 * Introduction:
 *  This is a module for objects and funcitons that are used
 *    for reading the GEE Assets for the global ATE project.
 * 
 * Reference to the public repository:
 *  https://code.earthengine.google.com/?scriptPath=users/ChenyangWei/Public
 * 
 * Load this module:
 *  var GDL = require("users/ChenyangWei/Public:Modules/Treeline/GATE_Data_Loading.js");
 * 
 * Update: 11/23/2021.
 */


/****** Objects. ******/




/****** Functions. ******/


/* Functions relevant to the transect NDVI analysis. */

// Function to load the annual NDVI data of each continent
//  except North America.
exports.loadAnnualNDVIs_nonNorthAmerica = function(wd) {
  
  /**
   * "String": 
   *  wd.
  */

  // Determine the path of NDVI images.
  var NDVIpath = wd
    + "ATEI_Estimation/"
    + GATE.annualNDVI_folderName;
  
  // Determine the list of NDVI periods
  //  (except for North America).
  var periods = GATE.periodList;
  
  
  /* Load the NDVI image of the first period. */

  // Determine the first NDVI period.
  var firstPeriodIndex = 0;
  
  var period = periods[firstPeriodIndex];
  
  var firstYear = period[0];
  
  var lastYear = period[1];
  
  // Read the corresponding NDVI image.
  var fileName = "smdNDVI_" + firstYear
    + "to" + lastYear;
  
  var NDVIimg_perPeriod = ee.Image(NDVIpath + fileName);
  
  // Create an image for storing all the NDVI data.
  var allNDVIs = NDVIimg_perPeriod;
  
  
  /* Add the NDVI image of each remaining period. */

  for (var periodIndex = firstPeriodIndex + 1; periodIndex < periods.length; periodIndex ++) {
    
    // Determine each remaining period.
    period = periods[periodIndex];
    
    firstYear = period[0];
    
    lastYear = period[1];
    
    // Read the corresponding NDVI image.
    fileName = "smdNDVI_" + firstYear
      + "to" + lastYear;
    
    NDVIimg_perPeriod = ee.Image(NDVIpath + fileName);
    
    // Add the NDVI image as a set of new bands.
    allNDVIs = allNDVIs.addBands(NDVIimg_perPeriod);
  }
  
  // Return all the annual NDVIs as an "Image."
  return allNDVIs;
};

