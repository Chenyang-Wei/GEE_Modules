/** 
 * Introduction:
 *  This is a module for objects and funcitons related to
 *    the analysis of environmental factors
 *    in the global alpine treeline ecotone (ATE) project.
 * 
 * Reference to the public repository:
 *  https://code.earthengine.google.com/?scriptPath=users/ChenyangWei/Public
 * 
 * Load this module:
 *  var ENV = require("users/ChenyangWei/Public:Modules/Treeline/Environmental_Factors.js");
 * 
 * Update: 11/5/2021.
 */



/****** Objects. ******/


/* File names. */

// Average topographic features of each 90-m elevational transect.
exports.avgTopoFeaturesPerTransect_fileName = 
  "averageALOStopographicFeatures_per90mTransect";




/****** Functions. ******/


// PRIVATE function to convert an Image from degrees to radians.
var convertToRadians = function(degrees) {
  var radians = degrees.divide(180).multiply(Math.PI);
  
  return radians;
};


// Function to generate topographic features (including coordinates).
exports.generate_TopographicFeatures = function(rawElv, proj) {
  
  // Generate and reproject pixel coordinates.
  var coordinates = ee.Image.pixelLonLat()
    .reproject(proj);
  
  // Rename the raw elevation.
  var elevation = rawElv.rename("elevation");
  
  // Calculate the slope and the aspect (in degrees).
  var slope = ee.Terrain.slope(elevation);
  
  var aspect = ee.Terrain.aspect(elevation);
  
  // Convert the slope and the aspect to radians.
  // var slopeRadians = slope.divide(180).multiply(Math.PI);
  
  // var aspectRadians = aspect.divide(180).multiply(Math.PI);
  
  var slopeRadians = convertToRadians(slope);
  
  var aspectRadians = convertToRadians(aspect);

  // Calculate the sin and cos variables.
  var sinSlope = slopeRadians.sin();
  
  var sinAspect = aspectRadians.sin();
  
  var cosAspect = aspectRadians.cos();
  
  // Get the east-westness and north-southness indices.
  var eastWest = sinSlope.multiply(sinAspect)
    .rename("eastWest");
  
  var northSouth = sinSlope.multiply(cosAspect)
    .rename("northSouth");
  
  // Combine all the topographic features into an Image.
  var allFeatures = coordinates.addBands(elevation)
    .addBands(slope)
    .addBands(aspect)
    .addBands(eastWest)
    .addBands(northSouth);
  
  return allFeatures;
};


// Function to calculate the average topographic features of each elevational transect
//  by basin.
exports.calculate_AvgTopoFeaturesPerTransect_byBasin = 
  function(transects_FtrCol, topoFeatures_Img, proj) {
    
    // Determine the name of the Hybas ID property.
    var HybasID_name = "Hybas_ID";
    
    // Create a non-duplicate list of the Hybas IDs.
    var HybasIDs_List = transects_FtrCol.aggregate_array(HybasID_name)
      .distinct();
    
    
    /* Average feature calculation. */
    
    var avgFeaturesPerTransect_AllBasins_List = HybasIDs_List.map(function(HybasID) {
      
      // Create a filter of the Hybas ID.
      var HybasID_filter = ee.Filter.eq(HybasID_name, HybasID);
      
      // Identify the transects of each basin.
      var transects_perBasin = transects_FtrCol
        .filter(HybasID_filter);
      
      // Calculate the average topographic features of each transect in the basin.
      var avgFeaturesPerTransect_PerBasin = topoFeatures_Img.reduceRegions({
        collection: transects_perBasin, 
        reducer: ee.Reducer.mean(),
        scale: proj.scale, 
        crs: proj.crs
      });
      
      return avgFeaturesPerTransect_PerBasin;
    });
    
    var avgFeaturesPerTransect_AllBasins_FtrCol = 
      ee.FeatureCollection(avgFeaturesPerTransect_AllBasins_List).flatten();
    
    return avgFeaturesPerTransect_AllBasins_FtrCol;
  };


