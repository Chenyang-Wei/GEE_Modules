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
 * 
 * Update: 5/6/2022.
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
exports.paintFtrCol_FillANDEdge = 
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
exports.paintFtrCol_Edge = 
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
    
    // Paint both the fill and the edges.
    var painted = emptyImg
      .paint(rawFtrCol, propertyName, edgeWidth);
    
    // Return the painted Image.
    return painted;
  };


/* Functions to read global datasets. */

// Function to read the new Climate-based ATE.
exports.readNewCATE = function(wd) {
  return ee.Image(wd + "Climate-Based_ATE/"
    + GATE.newCATE_fileName);
};

// Function to read the squared distance to the nearest ridges/valleys 
//  at each pixel along the medial axis.
exports.readMedialAxisSqDist = function(wd) {
  return ee.Image(wd + "Elevational_Transect_Generation/"
    + GATE.medialAxis_fileName);
};

// Function to read the squared distance to the nearest ridges/valleys 
//  at each pixel along the medial axis in Asia AOIs.
exports.readMedialAxisSqDist_AsiaAOIs = function(AOInum) {
  return ee.Image(GATE.wd_Asia + "Elevational_Transect_Generation/"
    + "AOI_Asia_" + AOInum + "/"
    + GATE.medialAxis_fileName);
};

// Function to read the selected basins in a continent, except Asia, 
//  containing the medial axis.
exports.readSelectedBasins = function(wd) {
  return ee.FeatureCollection(wd + "Elevational_Transect_Generation/"
    + GATE.selectedBasins_fileName);
};

// Function to read the selected basins containing the medial axis
//  in an AOI of Asia.
exports.readSelectedBasins_AsiaAOIs = function(AOInum) {
  return ee.FeatureCollection(GATE.wd_Asia + "Elevational_Transect_Generation/"
    + "AOI_Asia_" + AOInum + "/"
    + GATE.selectedBasins_fileName);
};

// Function to read the non-duplicate basins containing the medial axis
//  in an AOI of Asia.
exports.readNonDuplicateBasins_AsiaAOIs = function(AOInum) {
  return ee.FeatureCollection(GATE.wd_Asia + "Elevational_Transect_Generation/"
    + "AOI_Asia_" + AOInum + "/"
    + GATE.nonDuplicateBasins_fileName);
};

// Function to read the pixel centroids of the medial-axis.
exports.readMedialPxCtds = function(wd) {
  return ee.FeatureCollection(wd + "Elevational_Transect_Generation/"
    + GATE.medialAxisPxCtds_fileName);
};

// Function to read the buffers of the medial-axis pixel centroids.
exports.readMedialAxisBuffers = function(wd) {
  return ee.FeatureCollection(wd + "Elevational_Transect_Generation/"
    + GATE.distBufferedPxCtds_fileName);
};

// Function to read the raw centerlines.
exports.readRawCenterlines = function(wd) {
  return ee.FeatureCollection(wd + "Elevational_Transect_Generation/"
  + GATE.rawCLs_fileName);
};

// Function to read the raw centerlines of North America.
exports.readRawCLs_NorthAmerica = function(basinGroupID) {
  var wd = GATE.wd_NorthAmerica + "Elevational_Transect_Generation/"
    + GATE.rawCLs_fileName
    + "/";
  
  var fileName = GATE.rawCLs_byBasinGroup_fileName + basinGroupID;
  
  return ee.FeatureCollection(wd + fileName);
};


// Function to read all the raw centerlines of Asia.
exports.readAllRawCLs_Asia = function() {
  
  var allRawCLs = ee.List([]);
  
  // Asian AOI: 1 ~ 6.
  for (var AOI_ID = 1; AOI_ID <= 6; AOI_ID ++) {
    
    // Set the working directory of the AOI.
    var wd_AOI = GATE.wd_Asia + "Elevational_Transect_Generation/"
      + "AOI_Asia_" + AOI_ID + "/";
    
    // Basin group: 1 ~ 5.
    for (var basinGroupID = 1; basinGroupID <= 5; basinGroupID ++) {
      
      // Load the raw transect centerlines of the basin group.
      var wd_RawCLs = wd_AOI 
        + GATE.rawCLs_fileName + "/"
        + GATE.rawCLs_byBasinGroup_fileName 
        + basinGroupID;
      
      var rawCLs = ee.FeatureCollection(wd_RawCLs);
      
      allRawCLs = allRawCLs.add(rawCLs);
    }
  }
  
  var allRawCLs_Flattened = ee.FeatureCollection(allRawCLs).flatten();
  
  return allRawCLs_Flattened;
};


// Function to read the mid-quarter segments of the raw centerlines.
exports.readMidQuarters = function(wd) {
  return ee.FeatureCollection(wd + "Elevational_Transect_Generation/"
  + GATE.midQuarters_fileName);
};

// Function to read all the mid-quarter segments of the raw centerlines in North America.
exports.readAllMidQuarters_NorthAmerica = function() {
  var filePath = GATE.wd_NorthAmerica + "Elevational_Transect_Generation/"
    + GATE.midQuarters_fileName + "/"
    + GATE.midQuarters_byBasinGroup_fileName;

  var readMidQuarters_byBasinGroup = function(basinGroupID) {
    var midQuarters_perBasinGroup = ee.FeatureCollection(filePath + basinGroupID);
    
    return midQuarters_perBasinGroup;
  };
  
  var BasinGroup_1 = readMidQuarters_byBasinGroup(1);
  var BasinGroup_2 = readMidQuarters_byBasinGroup(2);
  var BasinGroup_3 = readMidQuarters_byBasinGroup(3);
  var BasinGroup_4 = readMidQuarters_byBasinGroup(4);
  var BasinGroup_5 = readMidQuarters_byBasinGroup(5);
  
  var allMidQuarters = ee.FeatureCollection([
    BasinGroup_1,
    BasinGroup_2,
    BasinGroup_3,
    BasinGroup_4,
    BasinGroup_5
  ]);
  
  return allMidQuarters.flatten();
};

// Function to read the mid-quarter segments of North America by basin group.
exports.readMidQuarters_byBasinGroup_NorthAmerica = function(basinGroupID) {
  var filePath = GATE.wd_NorthAmerica
    + "Elevational_Transect_Generation/"
    + GATE.midQuarters_fileName + "/"
    + GATE.midQuarters_byBasinGroup_fileName;

  var midQuarters_perBasinGroup = ee.FeatureCollection(filePath + basinGroupID);
    
  return midQuarters_perBasinGroup;
};

// Function to read the unioned buffers of all basin groups of North America.
exports.readUnionedBuffers_AllBasinGroups_NorthAmerica = function() {
  var wd_UnionedBuffers = GATE.wd_NorthAmerica
    + "Elevational_Transect_Generation/"
    + GATE.multiPolygon_BufferUnion_fileName
    + "/";

  var allUnionedBuffers = ee.List([]);
  
  for (var basinGroup_ID = 1; basinGroup_ID <= 5; basinGroup_ID ++) {
    var unionedBuffers_perBasinGroup = ee.FeatureCollection(wd_UnionedBuffers
      + GATE.multiPolygon_BufferUnion_byBasinGroup_fileName
      + basinGroup_ID);
    
    allUnionedBuffers = allUnionedBuffers.add(unionedBuffers_perBasinGroup);
  }

  var allUnionedBuffers_Flattened = ee.FeatureCollection(allUnionedBuffers).flatten();
  
  return allUnionedBuffers_Flattened;
};



/* Functions relevant to the locally "steepest" centerlines. */

// Function to read the "steepest" centerlines
//  of each continent
//  (except for North America and Asia).
exports.readSteepestCLs_otherContinents = function(wd) {
  return ee.FeatureCollection(wd
    + "Elevational_Transect_Generation/"
    + GATE.allSteepestCLs_fileName);
};


// Function to read the "steepest" centerlines of North America.
exports.readSteepestCLs_NorthAmerica = function() {
  
  var allSteepestCLs = ee.List([]);
  
  var wd_SteepestCLs = GATE.wd_NorthAmerica
    + "Elevational_Transect_Generation/"
    + GATE.allSteepestCLs_fileName + "/"
    + GATE.steepestCLs_byBasinGroup_fileName;

    // Basin group: 1 ~ 5.
    for (var basinGroupID = 1; basinGroupID <= 5; basinGroupID ++) {
      
      // Load the steepest centerlines of each basin group.
      var steepestCLs = ee.FeatureCollection(wd_SteepestCLs
        + basinGroupID);
      
      allSteepestCLs = allSteepestCLs.add(steepestCLs);
    }

  var allSteepestCLs_Flattened = ee.FeatureCollection(allSteepestCLs).flatten();
  
  return allSteepestCLs_Flattened;
};


// Function to read the "steepest" centerlines of Asia.
exports.readSteepestCLs_Asia = function() {
  
  var allSteepestCLs = ee.List([]);
  
  // Asian AOI: 1 ~ 6.
  for (var AOI_ID = 1; AOI_ID <= 6; AOI_ID ++) {
    
    // Set the working directory of the AOI.
    var wd_AOI = GATE.wd_Asia
      + "Elevational_Transect_Generation/"
      + "AOI_Asia_" + AOI_ID + "/";
    
    var wd_SteepestCLs = wd_AOI 
      + GATE.allSteepestCLs_fileName + "/"
      + GATE.steepestCLs_byBasinGroup_fileName;
      
    // Basin group: 1 ~ 5.
    for (var basinGroupID = 1; basinGroupID <= 5; basinGroupID ++) {
      
      // Load the steepest centerlines of each basin group.
      var steepestCLs = ee.FeatureCollection(wd_SteepestCLs
        + basinGroupID);
      
      allSteepestCLs = allSteepestCLs.add(steepestCLs);
    }
  }
  
  var allSteepestCLs_Flattened = ee.FeatureCollection(allSteepestCLs).flatten();
  
  return allSteepestCLs_Flattened;
};



/* Functions relevant to the transect NDVI analysis. */

// Function to load the annual NDVI data of each continent
//  except North America.
exports.readAnnualNDVIs_nonNorthAmerica = function(wd) {
  
  // Determine the path of NDVI images.
  var NDVIpath = wd
    + "ATEI_Estimation/"
    + GATE.annualNDVI_folderName;
  
  // Determine the list of NDVI periods
  //  (except for North America).
  var periods = GATE.periodList;
  
  //// Load the NDVI image of the first period.
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
  
  //// Add the NDVI image of each remaining period.
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
  
  // Return all the annual NDVIs as an Image.
  return allNDVIs;
};


