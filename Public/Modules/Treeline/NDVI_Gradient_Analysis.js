/** 
 * Introduction:
 *  The objects and funcitons in this module are defined for
 *    the elevational gradient analysis of annual NDVIs
 *    for the elevational transects in global alpine treeline ecotones.
 * 
 * Function groups:
 *  1) Functions for loading files.
 *  2) Functions for combining the transect subsets.
 *  3) Functions for image processing.
 *  4) Functions for transect processing.
 *  5) Functions for analyses at the transect level.
 *  6) Functions for the temporal analyses of transects.
 *  7) Functions for the processing and analyses of sub-watersheds.
 * 
 * Reference to the public repository:
 *  https://code.earthengine.google.com/?scriptPath=users/ChenyangWei/Public
 * 
 * Load this module:
 *  var NGA = require("users/ChenyangWei/Public:Modules/Treeline/NDVI_Gradient_Analysis.js");
 * 
 * Update: 5/27/2022.
 */


/****** Load other prerequisite module(s). ******/

var GATE = require("users/ChenyangWei/Public:Modules/Treeline/Global_ATE.js");
var FC_AP = require("users/ChenyangWei/Public:Modules/General/FeatureCollection_Analysis&Processing.js");



/****** Objects. ******/


/**** File names. ****/

// Pixel-counted transects with at least 30 study domain pixels
//  and a length between 300m and 3km.
exports.pixelCountedTransects_FullName =
  "elvPixelCountedTransects_gte30pixels_300mTo3km";

exports.pixelCountedTransects_ShortName =
  "elvPixelCountedTransects";


// Computed elevational gradient, spatial average, pixel number ratio
//  of the annual NDVIs of each transect with at least 30 study domain pixels.
exports.annualFeatures_FullName =
  "annualFeatures_ElvGrad_AvgNDVI_PixelNumRatio";

exports.annualFeatures_ShortName =
  "annualFeatures";


// Filtered annual Features with no gap in NDVI and annual NDVI
//  > 50% of the corresponding long-term NDVI median.
exports.filteredAnnualFeatures_FullName =
  "filteredAnnualFeatures_NoNDVIgap_GtHalfMedian";

exports.filteredAnnualFeatures_ShortName =
  "filteredAnnualFeatures";


// Derived transects with the max. moving-window NDVI SD and 
//  the temporal variables.
exports.transects_MovWinTempVars_FullName =
  "transects_NDVImedianFiltered_withMovWinTemporalVars";

exports.transects_MovWinTempVars_ShortName =
  "transects_MovWinTemporalVars";


// Transects with the pixel number ratio between
//  the study domain and the raw elevation.
exports.transects_GapDetected_FullName =
  "transects_GapDetected_NDVImedianFiltered_withMovWinTemporalVars";

exports.transects_GapDetected_ShortName =
  "transects_GapDetected";


// Transects with the observation year variables.
exports.transects_withObsYearVars_FullName =
  "transects_withObsYearVars_MovWinTempVars_GapDetected_MedianFiltered";

exports.transects_withObsYearVars_ShortName =
  "transects_withObsYearVars";


// Combined transects at the continental level.
exports.continentalTransects_FileName =
  "continentalTransects_withObsYears_MovWinTempVars_GapDetected_MedianFiltered";


// Global transects with the max. moving-window NDVI SD, the temporal variables, 
//  and the ratio between the max. SD and the long-term mean.
// exports.globalTransects_MovWinTempVars_Name =
//   "globalTransects_withMaxMovWinNDVIsd_TemporalVars_SDmeanRatio";
// exports.globalTransects_MovWinTempVars_Name =
//   "globalTransects_GapDetected_withMaxMovWinNDVIsd_TemporalVars_SDmeanRatio";

// Combined transects at the global level.
exports.globalTransects_FileName =
  "globalTransects_withObsYears_MovWinTempVars_GapDetected_MedianFiltered";


// Global transects with the new transect ID.
exports.globalTransectsWithID_FileName =
  "globalTransects_withID_ObsYears_MovWinTempVars_GapDetected_MedianFiltered";


// // Global transects with distinct IDs.
// exports.distinctTransects_FileName =
//   "globalTransects_DistinctIDs_ObsYears_MovWinTempVars_GapDetected_MedianFiltered";



/**** Define a list of all the areas of interest in Asia. ****/

exports.AOIs_List_Asia = [
  GATE.AOI_Asia_1,
  GATE.AOI_Asia_2,
  GATE.AOI_Asia_3,
  GATE.AOI_Asia_4,
  GATE.AOI_Asia_5,
  GATE.AOI_Asia_6
];



/****** Functions. ******/


/**** 1) Functions for loading files. ****/

// Function to read and combine the AOIs of all continents.
exports.Load_GlobalAOIs = function() {
  
  /**
   * Result: Geometry.
  */
  
  // Load and combine the global AOIs.
  var global_AOIs = ee.Geometry.MultiPolygon({
    coords: [
      GATE.AOI_NorthAmerica,
      GATE.AOI_SouthAmerica,
      GATE.AOI_Asia,
      GATE.AOI_Europe,
      GATE.AOI_Africa,
      GATE.AOI_Oceania
    ]
  });
  
  return global_AOIs;
};


// Function to read and combine the study domains (i.e., new CATEs) of all continents.
exports.Load_GlobalNewCATEs = function() {
  
  /**
   * Result: Image.
  */
  
  // Define a function to load the study domain of each continent.
  var Load_ContinentNewCATE = function(wd) {
    var continent_NewCATE = ee.Image(wd + "Climate-Based_ATE/" 
      + GATE.newCATE_fileName);
    
    return continent_NewCATE;
  };
  
  // Load and combine the global study domains.
  var global_NewCATEs = ee.ImageCollection.fromImages([
    Load_ContinentNewCATE(GATE.wd_Europe),
    Load_ContinentNewCATE(GATE.wd_NorthAmerica),
    Load_ContinentNewCATE(GATE.wd_SouthAmerica),
    Load_ContinentNewCATE(GATE.wd_Africa),
    Load_ContinentNewCATE(GATE.wd_Oceania),
    Load_ContinentNewCATE(GATE.wd_Asia)
  ]).mosaic();
  
  return global_NewCATEs;
};


// // Function to read the files of each continent (other than
// //  Asia or North America) by the subset of transects.
// exports.LoadContinentFiles_bySubset = function(wd, fullName, shortName) {
  
//   /**
//   * "String":
//   *  wd, fullName, shortName.
//   * 
//   * Result: FeatureCollection.
//   */
  
//   // Create an empty List for storing the data of all transect subsets.
//   var files_AllSubsets = ee.List([]);
  
//   // Determine the folder path of all transect subsets.
//   var filePath = wd
//     + "NDVI_Gradient_Analysis/"
//     + fullName
//     + "/";
  
//   // Load the file of each transect subset (ID: 1 ~ 5) iteratively.
//   for (var subsetID = 1; subsetID <= 5; subsetID ++) {
    
//     var fileName = shortName + "_S" + subsetID;
    
//     var file_perSubset = ee.FeatureCollection(filePath
//       + fileName);
    
//     files_AllSubsets = files_AllSubsets.add(file_perSubset);
//   }
  
//   // Convert the generated List of FeatureCollections
//   //  to a regular FeatureCollection.
//   return ee.FeatureCollection(files_AllSubsets)
//     .flatten();
// };



/**** 2) Functions for combining the transect subsets. ****/

// Function to combine the transect-subset results of North America.
exports.Combine_TransectSubsets_NorthAmerica = function(fullName, shortName) {
  
  /**
   * "String":
   *  fullName, shortName.
   * 
   * Result: FeatureCollection.
  */

  // Determine the common file path of the transect-subset results.
  var wd_TransectSubset = GATE.wd_NorthAmerica
    + "NDVI_Gradient_Analysis/"
    + fullName
    + "/"
    + shortName; 

  // Determine the number of transect subsets.
  var subsetNum = 20; 

  // Create an empty List to store all the transect-subset results.
  var combined_TransectSubsets_List = ee.List([]);
  
  // Iteratively add each transect-subset result into the FeatureCollection List.
  for (var basinGroupID = 1; basinGroupID <= 5; basinGroupID ++) {
  
    for (var subsetID = 1; subsetID <= subsetNum; subsetID ++) {
      
      // Load each individual transect-subset result.
      var transectSubset = ee.FeatureCollection(wd_TransectSubset
        + "_BG" + basinGroupID
        + "_S" + subsetID);
      
      // Add the loaded FeatureCollection to the List.
      combined_TransectSubsets_List = combined_TransectSubsets_List
        .add(transectSubset);
    
    }
  }
  
  // Convert the generated FeatureCollection List to a FeatureCollection.
  var combined_TransectSubsets_FtrCol = ee.FeatureCollection(
    combined_TransectSubsets_List
  ).flatten();

  // Return the combined transect-subset results.
  return combined_TransectSubsets_FtrCol;
};


// Function to combine the transect-subset results of Asia.
exports.Combine_TransectSubsets_Asia = function(fullName, shortName) {
  
  /**
   * "String":
   *  fullName, shortName.
   * 
   * Result: FeatureCollection.
  */

  // Set the root working directory.
  var wd_Root = GATE.wd_Asia;

  // Determine a List of the transect-subset numbers of all the AOIs.
  var subsetNums_List = [20, 10, 5, 10, 5, 5];

  // Create an empty List to store all the transect-subset results.
  var combined_TransectSubsets_List = ee.List([]);
  
  // Iteratively add each transect-subset result into the FeatureCollection List.
  for (var AOI_ID = 1; AOI_ID <= 6; AOI_ID ++) {
    
    // Set the working directory of the AOI.
    var wd_AOI = wd_Root
      + "NDVI_Gradient_Analysis/"
      + "AOI_Asia_" + AOI_ID
      + "/";

    // Determine the common file path of the transect-subset results.
    var wd_TransectSubset = wd_AOI
      + fullName
      + "/"
      + shortName;

    // Select the transect-subset number of the AOI.
    var subsetNum = subsetNums_List[AOI_ID - 1];
    
    for (var basinGroupID = 1; basinGroupID <= 5; basinGroupID ++) {
      
      for (var subsetID = 1; subsetID <= subsetNum; subsetID ++) {
        
        // Load each individual transect-subset result.
        var transectSubset = ee.FeatureCollection(wd_TransectSubset
          + "_BG" + basinGroupID
          + "_S" + subsetID);
        
        // Add the loaded FeatureCollection to the List.
        combined_TransectSubsets_List = combined_TransectSubsets_List
          .add(transectSubset);
      
      }
    }
  }
  
  // Convert the generated FeatureCollection List to a FeatureCollection.
  var combined_TransectSubsets_FtrCol = ee.FeatureCollection(
    combined_TransectSubsets_List
  ).flatten();

  // Return the combined transect-subset results.
  return combined_TransectSubsets_FtrCol;
};


// Function to combine the transect-subset results of a continent
//  except North America and Asia.
exports.Combine_TransectSubsets_OtherContinents = function(
  wd_Continent, subset_Count, fullName, shortName) {
    
    /**
     * "String":
     *  wd_Continent, fullName, shortName.
     * 
     * "Number":
     *  subset_Count.
     * 
     * Result: FeatureCollection.
    */
  
    // Determine the common file path of the transect-subset results.
    var wd_TransectSubset = wd_Continent
      + "NDVI_Gradient_Analysis/"
      + fullName
      + "/"
      + shortName;
  
    // Create an empty List to store all the transect-subset results.
    var combined_TransectSubsets_List = ee.List([]);
    
    // Iteratively add each transect-subset result into the FeatureCollection List.
    for (var subsetID = 1; subsetID <= subset_Count; subsetID ++) {
      
      // Load each individual transect-subset result.
      var transectSubset = ee.FeatureCollection(wd_TransectSubset
        + "_S" + subsetID);
      
      // Add the loaded FeatureCollection to the List.
      combined_TransectSubsets_List = combined_TransectSubsets_List
        .add(transectSubset);
    
    }
  
    // Convert the generated FeatureCollection List to a FeatureCollection.
    var combined_TransectSubsets_FtrCol = ee.FeatureCollection(
      combined_TransectSubsets_List
    ).flatten();
  
    // Return the combined transect-subset results.
    return combined_TransectSubsets_FtrCol;
  };


// Function to combine all continental transects into a single FeatureCollection.
exports.Combine_ContinentalTransects = function(continental_FileName) {
  
  /**
   * "String":
   *  continental_FileName.
   * 
   * Result: FeatureCollection.
  */

  // Define a function to load the transects of each continent.
  var Load_ContinentalTransects = function(wd_Continent) {
    var continental_Transects = ee.FeatureCollection(wd_Continent
      + "NDVI_Gradient_Analysis/"
      + continental_FileName);
    
    return continental_Transects;
  };
  
  // Load and combine all continental transects.
  var global_Transects = ee.FeatureCollection([
    Load_ContinentalTransects(GATE.wd_NorthAmerica),
    Load_ContinentalTransects(GATE.wd_Asia),
    Load_ContinentalTransects(GATE.wd_SouthAmerica),
    Load_ContinentalTransects(GATE.wd_Europe),
    Load_ContinentalTransects(GATE.wd_Africa),
    Load_ContinentalTransects(GATE.wd_Oceania)
  ]).flatten();

  // Return the FeatureCollection of global transects.
  return global_Transects;
}; 



/**** 3) Functions for image processing. ****/

// Function to combine the elevation dataset (1 band, non-repeated) and
//  the annual-NDVI data (2 bands, repeated) as an ImageCollection.
exports.Combine_Elevation_AnnualNDVIs = function(elevation, annualNDVIs) {
  
  /**
   * "Image": 
   *  elevation, annualNDVIs.
   * 
   * Result: ImageCollection.
  */

  // Determine the band names of the annual-NDVI image.
  var NDVI_bandNames = annualNDVIs.bandNames();
  
  // Combine the elevation and the NDVI of each year.
  var elvAnnualNDVIs_ImgCol = ee.ImageCollection.fromImages(NDVI_bandNames.map(
    function(bandName) {
      
      // Select the NDVI of each year.
      var annualNDVI = annualNDVIs.select([bandName]);
      
      // Combine the non-repeated elevation (1 band) and
      //  the repeated annual NDVI (2 bands).
      var elvNDVIs = elevation.addBands(annualNDVI)
        .addBands(annualNDVI);
      
      // Extract the corresponding year.
      var yearString = ee.String(bandName).slice(8, 12);
      
      // Convert the year string to a number.
      var yearNum = ee.Number.parse(yearString);
      
      // Store the year number as a property.
      var elvNDVIs_withYear = elvNDVIs.set("Year", yearNum);
      
      return elvNDVIs_withYear;
    }));
  
  return elvAnnualNDVIs_ImgCol;
};



/**** 4) Functions for transect processing. ****/

// Function to generate a List of the centerline-ID Filters
//  for subsetting transects.
exports.Create_CLid_Filters = function(filterNum, CLid_Name) {
  
  /**
   * "Number":
   *  filterNum.
   * 
   * "String":
   *  CLid_Name.
   * 
   * Return: List.
  */
  
  // Calculate the number of the Filter limits.
  var limitNum = filterNum + 1;
  
  // Generate a List of the Filter limits.
  var filterLimits = ee.List.sequence({
    start: 0, 
    end: 1, 
    count: limitNum
  });
  
  // Define an empty List of Filters.
  var filterList = ee.List([]);
  
  // Create each centerline-ID Filter iteratively (except for the last Filter).
  for (var filterID = 1; filterID < filterNum; filterID ++) {
    
    // Extract the lower and upper limits.
    var lowerLimit = filterLimits.get(filterID - 1);
    var upperLimit = filterLimits.get(filterID);
    
    // Define each Filter based on the limits.
    var CLid_Filter = ee.Filter.and(
      ee.Filter.gte(CLid_Name, lowerLimit),
      ee.Filter.lt(CLid_Name, upperLimit)
    );
    
    // Append the defined Filter to the List of Filters.
    filterList = filterList.add(CLid_Filter);
  }
  
  // Extract the last lower and upper limits.
  var lastLowerLimit = filterLimits.get(filterNum - 1);
  var lastUpperLimit = filterLimits.get(filterNum);
  
  // Define the last Filter.
  var lastFilter = ee.Filter.and(
    ee.Filter.gte(CLid_Name, lastLowerLimit),
    ee.Filter.lte(CLid_Name, lastUpperLimit) // Include the last upper limit (1).
  );
  
  // Append the last Filter to the List of Filters.
  filterList = filterList.add(lastFilter);
  
  // Return the final List of Filters.
  return filterList;
};


// // Function to select the annual Features with a positive average NDVI and
// //  a pixel number ratio of at least 1.
// exports.Filter_Annual_AvgNDVI_PixelNumRatio = function(annualFtrs) {
  
//   /**
//   * "FeatureCollection": 
//   *  annualFtrs.
//   * 
//   * Result: FeatureCollection.
//   */

//   // Name the properties of interest.
//   var avgNDVI_name = "annualAvgNDVI";
  
//   var pixelNumRatio_Name = "pixelNumRatio_NDVIelv";
  
//   // Create and combine the Filter of each property.
//   var avgNDVI_Filter = ee.Filter.gt(avgNDVI_name, 0);
  
//   var pixelNumRatio_Filter = ee.Filter.gte(pixelNumRatio_Name, 1);
  
//   var combinedFilter = ee.Filter.and(
//     avgNDVI_Filter, pixelNumRatio_Filter
//   );
  
//   // Select the qualified annual Features.
//   var selected_AnnualFtrs = annualFtrs.filter(combinedFilter);
  
//   return selected_AnnualFtrs;
// };


// Function to perform the following operations:
//  1) Choose the annual Features with a pixel number ratio (NDVI/elevation 
//    in the study domain) greater than or equal to 1 (i.e., no gap in NDVI).
//  2) Calculate the long-term NDVI median for the no-gap annual Features 
//    of each transect.
//  3) For each transect, select the no-gap annual Features with NDVI over 
//    (i.e., greater than) 50% of the corresponding long-term NDVI median. 
exports.Filter_AnnualNDVIs_NoGap_GtHalfMedian = function(rawAnnualFtrs, CLid_Name) {
  
  /**
  * "FeatureCollection": 
  *  annualFtrs.
  * 
  * "String":
  *  CLid_Name.
  * 
  * Result: FeatureCollection.
  */

  // Name the properties of interest.
  var pixelNumRatio_Name = "pixelNumRatio_NDVIelv";
  
  var annualNDVI_Name = "annualAvgNDVI";
  
  var NDVImedian_Name = "noGapNDVI_rawMedian";
  
  var annualMedianRatio_Name = "annualRatio_NDVImedian";
  
  
  /* Choose the annual Features with a pixel number ratio (NDVI/elevation 
    in the study domain) greater than or equal to 1 (i.e., no gap in NDVI). */
  
  var pixelNumRatio_Filter = ee.Filter.gte(pixelNumRatio_Name, 1);
  
  var noGap_AnnualFtrs = rawAnnualFtrs.filter(pixelNumRatio_Filter);
  
  
  /* Calculate the long-term NDVI median for the no-gap annual Features 
    of each transect. */
  
  // Reducer for computing the long-term NDVI median.
  var NDVImedian_Reducer = ee.Reducer.median()
    .setOutputs([NDVImedian_Name]);
  
  var transects_NDVImedian_List = ee.List(noGap_AnnualFtrs.reduceColumns({
    selectors: [annualNDVI_Name, CLid_Name],
    reducer: NDVImedian_Reducer.group({
      groupField: 1,
      groupName: CLid_Name,
    })
  }).get("groups"));
  
  // Convert the generated List to a FeatureCollection without Geometries.
  var transects_NDVImedian_FtrCol = ee.FeatureCollection(transects_NDVImedian_List.map(
    function(groupedBy_Transect) {
      
      // Create a Feature with a NULL Geometry for each transect.
      return ee.Feature(null).set(groupedBy_Transect);
    }));
  
  // Combine each long-term NDVI median with the corresponding no-gap annual Features.
  var noGapAnnualFtrs_withNDVImedian = FC_AP.combine_twoFtrCols_byCommonProperty(
    noGap_AnnualFtrs, transects_NDVImedian_FtrCol, CLid_Name
  );
    
  
  /* For each transect, select the no-gap annual Features with NDVI over 
    (i.e., greater than) 50% of the corresponding long-term NDVI median. */
  
  var noGapAnnualFtrs_withMedianRatio = FC_AP.FtrCol_PropertyRatioCalculation(
    noGapAnnualFtrs_withNDVImedian, annualNDVI_Name, NDVImedian_Name, annualMedianRatio_Name
  );
  
  // Filter for removing the no-gap annual Features with a low NDVI/median ratio.
  var annualMedianRatio_Filter = ee.Filter.gt(annualMedianRatio_Name, 0.5);
  
  var noGapAnnualFtrs_GtHalfMedian = noGapAnnualFtrs_withMedianRatio.filter(
    annualMedianRatio_Filter
  );
  
  return noGapAnnualFtrs_GtHalfMedian;
};



/**** 5) Functions for analyses at the transect level. ****/

// Function to count the 30-m elevation pixels within the study domain
//  for each transect and select transects with at least 30 study domain pixels.
exports.Count_StudyDomainPixels_perTransect = function(
  rawTransects, studyDomain, proj) {
    
    /**
     * "FeatureCollection": 
     *  rawTransects.
     * 
     * "Image":
     *  studyDomain.
     * 
     * "Dictionary":
     *  proj.
     * 
     * Result: FeatureCollection.
    */

    // Name the properties of interest.
    var pixelNum_Name = "newCATEelv_PixelNum";
    
    var HybasID_name = "Hybas_ID";
    
    // Define a Reducer for computing the number of the study domain pixels.
    var countReducer = ee.Reducer.count()
      .setOutputs([pixelNum_Name]);
    
    // Construct a Filter to select transects with
    //  at least 30 study domain pixels.
    var pixelNum_Filter = ee.Filter.gte(pixelNum_Name, 30);
    
    // Create a non-duplicate List of the Hybas IDs.
    var HybasID_list = rawTransects.aggregate_array(HybasID_name)
      .distinct();
    
    
    /* Count the study domain pixels within each transect of all basins. */

    var pixelCountedTransects_AllBasins = HybasID_list.map(function(HybasID) {
      
      // Create a Filter of the Hybas ID.
      var HybasID_filter = ee.Filter.eq(HybasID_name, HybasID);
      
      // Identify the transects of each basin.
      var rawTransects_perBasin = rawTransects
        .filter(HybasID_filter);
      
      // Pixel counting for each transect in the basin.
      var pixelCountedTransects_perBasin = studyDomain.reduceRegions({
        collection: rawTransects_perBasin, 
        reducer: countReducer,
        scale: proj.scale, 
        crs: proj.crs
      });
      
      return pixelCountedTransects_perBasin;
    });
    
    // Convert the generated List of FeatureCollections
    //  to a regular FeatureCollection.
    var pixelCountedTransects_FtrCol = 
      ee.FeatureCollection(pixelCountedTransects_AllBasins).flatten();
    
    // Select transects with at least 30 study domain pixels.
    var pixelNumFilteredTransects_FtrCol = 
      pixelCountedTransects_FtrCol.filter(pixelNum_Filter);
    
    return pixelNumFilteredTransects_FtrCol;
  };


// Function to compute the elevational gradient, spatial average, and pixel number
//  of NDVIs and the ratio between the NDVI and elevation pixel numbers
//  of each year for each transect.
exports.Compute_Annual_ElvGrad_AvgNDVI_PixelNumRatio_perTransect = function(
  rawTransects, Elv_AnnualNDVIs_ImgCol, proj) {
    
    /**
     * "FeatureCollection": 
     *  rawTransects.
     * 
     * "ImageCollection":
     *  Elv_AnnualNDVIs_ImgCol.
     * 
     * "Dictionary":
     *  proj.
     * 
     * Result: FeatureCollection.
    */

    // Name the properties of interest.
    var avgNDVI_name = "annualAvgNDVI";
    
    var NDVIpixelNum_Name = "newCATEndvi_PixelNum";
    
    var HybasID_name = "Hybas_ID";
    
    var yearName = "Year";
    
    var slopeName = "slope";
    
    var slopeStringName = "slopeString";
    
    var elvPixelNum_Name = "newCATEelv_PixelNum";
    
    var pixelNumRatio_Name = "pixelNumRatio_NDVIelv";
    
    // Define a Sen's slope Reducer for estimating the annual elevational gradients.
    //  (Note: The inputs are expected to be x data followed by y data.
    //  It returns two double values; the estimated slope and the offset.)
    var sensReducer = ee.Reducer.sensSlope();
    
    // Generate a Reducer for calculating the annual average NDVIs.
    //  (Note: as the Sen's slope Reducer has unweighted inputs,
    //  the mean Reducer inputs have to be unweighted.)
    var meanReducer = ee.Reducer.mean().unweighted()
      .setOutputs([avgNDVI_name]);
    
    // Define a Reducer for computing the annual numbers of the NDVI pixels.
    var countReducer = ee.Reducer.count()
      .setOutputs([NDVIpixelNum_Name]);
    
    // Combine the unweighted mean Reducer and pixel counting Reducer.
    var meanCountReducer = meanReducer.combine({
      reducer2: countReducer, 
      sharedInputs: true
    });
    
    // Combine the Sen's slope Reducer and
    //  the unweighted mean and pixel counting Reducer.
    var combinedReducer = sensReducer.combine({
      reducer2: meanCountReducer, 
      sharedInputs: false
    });
    
    // Construct a Filter to remove the annual features that
    //  have a "NaN" elevational gradient or a NULL average NDVI
    //  or no NDVI pixel.
    var nonNaN_filter = ee.Filter.and(
      ee.Filter.neq(slopeStringName, "NaN"),
      ee.Filter.notNull([avgNDVI_name]),
      ee.Filter.gt(NDVIpixelNum_Name, 0)
    );
    
    // Create a non-duplicate list of the Hybas IDs.
    var HybasID_list = rawTransects.aggregate_array(HybasID_name)
      .distinct();
    
    
    /* Compute the annual elevational gradients, spatial averages, and pixel numbers
      of the NDVIs within each transect. */

    var allYearsResults_AllBasins = HybasID_list.map(function(HybasID) {
      
      // Create a Filter of the Hybas ID.
      var HybasID_filter = ee.Filter.eq(HybasID_name, HybasID);
      
      // Identify the transects of each basin.
      var rawTransects_perBasin = rawTransects
        .filter(HybasID_filter);
      
      
      /* Iteration over the ImageCollection with the 1-band (non-repeated) elevation
        and the 2-band (repeated) NDVIs of each year. */
      
      var allYearsResults_perBasin = Elv_AnnualNDVIs_ImgCol.map(function(ElvNDVIs_Img) {
      
        // Variable computation for each year.
        var oneYearResults_perBasin = ElvNDVIs_Img.reduceRegions({
          collection: rawTransects_perBasin, 
          reducer: combinedReducer,
          scale: proj.scale, 
          crs: proj.crs
        });
        
        // Obtain the corresponding year property.
        var yearProperty = ElvNDVIs_Img.get(yearName);
        
        // Add a year property and a slope string property
        //  to each generated annual Feature.
        var oneYearResults_PropertiesAdded_perBasin = oneYearResults_perBasin
          .map(function(annualFeature) {
            
            // Convert the slope property to a String type.
            var slopeValue = annualFeature.get(slopeName);
            
            var slopeString = ee.Algorithms.String(slopeValue);
            
            // Add the two properties of interest.
            return annualFeature.set(
              yearName, yearProperty,
              slopeStringName, slopeString
            );
          });
        
        return oneYearResults_PropertiesAdded_perBasin;
      });
      
      
      /* Remove the generated annual features that have a "NaN" elevational gradient
        or a NULL average NDVI or no NDVI pixel. */

      var allYearsResults_nonNaN_perBasin = allYearsResults_perBasin.flatten()
        .filter(nonNaN_filter);
      
      
      /* Calculate the annual ratios between the NDVI pixel number
        and the elevation pixel number for each transect. */
      
      var allYearsResults_withPixelNumRatio_perBasin =
        allYearsResults_nonNaN_perBasin.map(function(annualFtr) {
          
          // Derive the two types of pixel numbers of each year.
          var NDVIpixelNum = annualFtr.get(NDVIpixelNum_Name);
          
          var elvPixelNum = annualFtr.get(elvPixelNum_Name);
          
          // Compute the pixel number ratio.
          var pixelNumRatio = ee.Number(NDVIpixelNum)
            .divide(elvPixelNum);
          
          return annualFtr.set(pixelNumRatio_Name, pixelNumRatio);
        });
      
      return allYearsResults_withPixelNumRatio_perBasin;
    });
    
    // Return a FeatureCollection.
    return ee.FeatureCollection(allYearsResults_AllBasins)
      .flatten();
  };


// Function to: 1) count the raw 30-m elevation pixels, and 2) compute the ratio between 
//  the pixel numbers of the "study domain" elevation and the raw elevation for each transect.
exports.Compute_StudyDomainRawElv_PixelNumRatio_perTransect = function(
  rawTransects, rawElevation, proj) {
    
    /**
     * "FeatureCollection": 
     *  rawTransects.
     * 
     * "Image":
     *  rawElevation.
     * 
     * "Dictionary":
     *  proj.
     * 
     * Result: FeatureCollection.
    */

    // Name the properties of interest.
    var rawElvPN_name = "rawElv_PixelNum";
    
    var studyDomainPN_name = "newCATEelv_PixelNum";
    
    var PNratio_Name = "newCATE_rawElv_PNratio";
    
    var HybasID_name = "Hybas_ID";
    
    // Define a Reducer for computing the number of the raw 30-m elevation pixels.
    var countReducer = ee.Reducer.count()
      .setOutputs([rawElvPN_name]);
    
    // Create a non-duplicate List of the Hybas IDs.
    var HybasID_list = rawTransects.aggregate_array(HybasID_name)
      .distinct();
    
      
    /* Perform the following operations for each basin. */

    var transects_withPNratio_AllBasins_List = HybasID_list.map(function(HybasID) {
      
      
      /* Compute the pixel number of the raw elevation for each transect. */

      // Create a Filter of the Hybas ID.
      var HybasID_filter = ee.Filter.eq(HybasID_name, HybasID);
      
      // Identify the transects of each basin.
      var rawTransects_perBasin = rawTransects
        .filter(HybasID_filter);
      
      // Pixel counting for each transect in the single basin.
      var pixelCounted_Transects_perBasin = rawElevation.reduceRegions({
        collection: rawTransects_perBasin, 
        reducer: countReducer,
        scale: proj.scale, 
        crs: proj.crs
      });
      
      
      /* Calculate the pixel number ratio (study domain/raw elevation) for each transect. */
      
      var PNratioCalculated_Transects_perBasin = FC_AP.FtrCol_PropertyRatioCalculation(
        pixelCounted_Transects_perBasin, studyDomainPN_name, rawElvPN_name, PNratio_Name
      );
  
      return PNratioCalculated_Transects_perBasin;
    });
    
    // Convert the generated List of FeatureCollections
    //  to a regular FeatureCollection.
    var transects_withPNratio_AllBasins_FtrCol = 
      ee.FeatureCollection(transects_withPNratio_AllBasins_List).flatten();
    
    return transects_withPNratio_AllBasins_FtrCol;
  };



/**** 6) Functions for the temporal analyses of transects. ****/

// Function to perform the following operations for
//  the annual Features of each transect: 
// 1) compute the maximum annual-average-NDVI SD of
//  the 6-year (or >= 4-year) moving windows;
// 2) estimate the temporal trends and the long-term means and SDs 
//  of the elevational NDVI gradients and the average NDVIs, respectively;
// 3) count the elevational NDVI gradients and the average NDVIs, 
//  respectively;
// 4) calculate the ratio between the max. moving-window NDVI SD 
//  and the long-term NDVI mean for each transect.
exports.Perform_AnnualFeature_MovWinDetection_TemporalAnalyses = function(
  rawTransects, rawAnnualFtrs, CLid_Name) {
    
    /**
     * "FeatureCollection": 
     *  rawTransects, rawAnnualFtrs.
     * 
     * "String":
     *  CLid_Name.
     * 
     * Result: FeatureCollection.
    */

    /* Determine the names of the annual variables. */
    
    // Current year of the observation.
    var Y0_Name = "Year";
    
    // Elevational NDVI gradient.
    var gradName = "slope"; 
    
    // Average NDVI.
    var ndviName = "annualAvgNDVI";
    
    
    /* Name the variables for the moving-window detection. */
    
    // Properties for joining the Features of the following years in each moving window.
    var targetFtr_Name = "targetFtr_";
    
    var targetNum_Name = "targetNum";
    
    // Properties for computing the NDVI SD of each moving window.
    var movWinFirstYr_Name = "MW_FirstYr";
    
    var movWinNDVIsd_Name = "MW_NDVIsd";
    
    // Properties for extracting the max. moving-window NDVI SD of each transect.
    var movWinNum_Name = "MW_Num";
    
    var maxSDfirstYr_Name = "MW_MaxSDfirstYr";
    
    var maxNDVIsd_Name = "MW_MaxNDVIsd";
    
    var maxSDmeanRatio_Name = "MW_MaxSDmean_Ratio";
  
    
    /* Name the variables for the temporal analyses. */
    
    // Temporal trend of the elevational NDVI gradient.
    var gradTrend_Name = "elvGrad_Trend";
    
    var gradIntcep_Name = "elvGrad_Intcep";
    
    // Long-term mean and SD of the elevational NDVI gradient.
    var gradMean_Name = "elvGrad_Mean";
    
    var gradSD_Name = "elvGrad_SD";
    
    // Temporal trend of the average NDVI.
    var ndviTrend_Name = "avgNDVI_Trend";
    
    var ndviIntcep_Name = "avgNDVI_Intcep";
    
    // Long-term mean and SD of the average NDVI.
    var ndviMean_Name = "avgNDVI_Mean";
    
    var ndviSD_Name = "avgNDVI_SD";
    
    // Observation numbers of the elevational NDVI gradient 
    //  and the average NDVI. 
    var gradNum_Name = "elvGrad_Num";
    
    var ndviNum_Name = "avgNDVI_Num";
    
    
    /* Derive the Reducers for the moving-window detection. */
    
    // Reducer for computing the moving-window NDVI SDs.
    var NDVIsd_Reducer = ee.Reducer.stdDev()
      .setOutputs([movWinNDVIsd_Name]);
    
    // Reducer for calculating the max. moving-window NDVI SD
    //  and extracting the first year of the corresponding moving window.
    var maxSD_withFirstYr_Reducer = ee.Reducer.max(2)
      .setOutputs([maxNDVIsd_Name, maxSDfirstYr_Name]);
    
    // Reducer for counting the moving windows.
    var movWinCount_Reducer = ee.Reducer.count()
      .setOutputs([movWinNum_Name]);
    
    // Combine the max. NDVI SD and moving-window counting Reducers.
    var maxSD_MovWinCount_CombinedReducer = maxSD_withFirstYr_Reducer.combine({
      reducer2: movWinCount_Reducer, 
      sharedInputs: false
    });
    
    
    /* Determine the Reducers for the temporal analyses. */
    
    // Sen's slope Reducer for estimating the temporal trends.
    //  (Note: The inputs are expected to be x data followed by y data.
    //  It returns two double values; the estimated slope and the offset.)
    var sensReducer = ee.Reducer.sensSlope();
    
    // Reducer for calculating the long-term means.
    //  (Note: as the Sen's slope Reducer has unweighted inputs,
    //  the mean Reducer inputs have to be unweighted.)
    var meanReducer = ee.Reducer.mean().unweighted();
    
    // Reducer for calculating the long-term SDs.
    var SDreducer = ee.Reducer.stdDev();
    
    // Reducer for counting the non-null annual variables.
    var countReducer = ee.Reducer.count();
    
    
    /* Rename the outputs of the temporal-analysis Reducers and then combine them. */
    
    // Reducers for analyzing the elevational NDVI gradient.
    var grad_MeanSDreducer = meanReducer.setOutputs([gradMean_Name])
      .combine({
        reducer2: SDreducer.setOutputs([gradSD_Name]), 
        sharedInputs: true
      });
    
    var grad_MeanSDcountReducer = grad_MeanSDreducer.combine({
      reducer2: countReducer.setOutputs([gradNum_Name]), 
      sharedInputs: true
    });
    
    var grad_CombinedReducer = sensReducer.setOutputs([gradTrend_Name, gradIntcep_Name])
      .combine({
        reducer2: grad_MeanSDcountReducer, 
        sharedInputs: false
      });
    
    // Reducers for analyzing the average NDVI.
    var ndvi_MeanSDreducer = meanReducer.setOutputs([ndviMean_Name])
      .combine({
        reducer2: SDreducer.setOutputs([ndviSD_Name]), 
        sharedInputs: true
      });
    
    var ndvi_MeanSDcountReducer = ndvi_MeanSDreducer.combine({
      reducer2: countReducer.setOutputs([ndviNum_Name]), 
      sharedInputs: true
    });
    
    var ndvi_CombinedReducer = sensReducer.setOutputs([ndviTrend_Name, ndviIntcep_Name])
      .combine({
        reducer2: ndvi_MeanSDcountReducer, 
        sharedInputs: false
      });
    
    // Combine the two types of Reducers.
    var final_CombinedReducer = grad_CombinedReducer.combine({
      reducer2: ndvi_CombinedReducer, 
      sharedInputs: false
    });
    
    
    /* Generate a 6-year moving window for each annual Feature. */
    
    var rawAnnualFtrs_withMovWinYrs = rawAnnualFtrs.map(function(annualFeature) {
      
      // Get the value of the current year for each annual Feature.
      var Y0_Value = ee.Number(annualFeature.get(Y0_Name));
      
      // Add the following five years iteratively.
      for (var yearID = 1; yearID <= 5; yearID ++) {
        
        // Name a new property for each following year.
        var yearName = Y0_Name + "_" + yearID;
        
        // Derive the value of each following year.
        var yearValue = Y0_Value.add(yearID);
        
        // Add the new property to the annual Feature.
        annualFeature = annualFeature.set(yearName, yearValue);
      }
      
      // Return the annual Feature with a moving window of 6 years.
      return annualFeature;
    });
    
    // Obtain the property names of the annual Features, including the moving-window years.
    var annualFtrPrptNames_withMovWinYrs = rawAnnualFtrs_withMovWinYrs.first()
      .propertyNames();
    
    
    /* Caculate the moving-window NDVI SDs for each transect. */
    
    // Create a non-duplicate List of the centerline IDs.
    var CLids_List = rawTransects.aggregate_array(CLid_Name)
      .distinct();
    
    var movWinNDVIsds_AllTransects_List = CLids_List.map(function(CLid) {
      
      // Create a Filter of the centerline IDs.
      var CLid_Filter = ee.Filter.eq(CLid_Name, CLid);
      
      // Identify the annual Features (with the moving-window years) of each transect.
      var singleTransect_withMovWinYrs = rawAnnualFtrs_withMovWinYrs
        .filter(CLid_Filter);
      
      // Select all the annual Features of the years between 1985 and 2015
      //  (i.e., the first years of all the moving windows)
      //  as the primary FeatureCollection in the following joining operation.
      var primaryFtrCol_perTransect = singleTransect_withMovWinYrs.filter(
        ee.Filter.lte(Y0_Name, 2015)
      );
      
      // For each moving window, join the annual Feature of each following year 
      //  iteratively to the corresponding primary Feature.
      for (var targetID = 1; targetID <= 5; targetID ++) {
        
        // Name the target year and the corresponding annual Feature to join.
        var targetYr_Name = Y0_Name + "_" + targetID;
        
        var matchedFtr_Name = targetFtr_Name + targetID;
      
        // Define a Filter as the target year of the primary Feature
        //  and the current year of the secondary Feature are the same.
        var targetYr_Filter = ee.Filter.equals({
          leftField: targetYr_Name,
          rightField: Y0_Name
        });
        
        // Define a save-first join 
        //  (Note: Include the primary Features without matches in the result,
        //  so that the annual Features with "gaps" in their moving windows will be kept).
        var saveFirstJoin = ee.Join.saveFirst({
          matchKey: matchedFtr_Name,
          outer: true
        });
        
        // Join the annual Feature of each target year to the corresponding primary Feature
        //  as a new property.
        primaryFtrCol_perTransect = saveFirstJoin.apply(
          primaryFtrCol_perTransect, 
          singleTransect_withMovWinYrs, 
          targetYr_Filter
        );
      }
      
      // Compute the number of the joined annual Features for each primary Feature.
      var primaryFtrCol_TargetsCounted_perTransect = primaryFtrCol_perTransect.map(
        function(primaryFtr) {
          
          // Count the joined annual Features for each primary Feature.
          var targetNum_Value = primaryFtr.select([targetFtr_Name + ".*"])
            .propertyNames().size();
          
          return primaryFtr.set(targetNum_Name, targetNum_Value);
        });
      
      // Select the primary Features with at least 3 joined annual Features.
      var selectedPrimaryFtrCol_perTransect = primaryFtrCol_TargetsCounted_perTransect.filter(
        ee.Filter.gte(targetNum_Name, 3)
      );
      
      
      /* Generate a FeatureCollection of the moving windows for each transect. */
      
      var movWinFtrCol_perTransect = selectedPrimaryFtrCol_perTransect.map(
        function(primaryFtr_withTargets) {
          
          // Get all the properties except the joined annual Features.
          var primaryFtr_noTargets = primaryFtr_withTargets
            .select(annualFtrPrptNames_withMovWinYrs);
          
          // Determine the first year of each moving window.
          var movWinFirstYr_Value = primaryFtr_noTargets.get(Y0_Name);
          
          // Add the moving window's first year to the primary Feature as a "group ID".
          var primaryFtr_withMovWinFirstYr = primaryFtr_noTargets
            .set(movWinFirstYr_Name, movWinFirstYr_Value);
          
          // Obtain the names of the joined annual Features.
          var targetNames_List = primaryFtr_withTargets.select([targetFtr_Name + ".*"])
            .propertyNames();
          
          // Create a raw moving-window Feature List based on the primary Feature
          //  with the moving window's first year and without the joined annual Features.
          var raw_MovWin_FtrList = ee.List([primaryFtr_withMovWinFirstYr]);
          
          // Function to iteratively add each joined annual Feature
          //  into the moving-window Feature List.
          var addEachTargetFtr = function(targetName, movWin_FtrList) {
            
            // Extract each joined annual Feature.
            var currentTargetFtr = primaryFtr_withTargets.get(targetName);
            
            // Add the moving window's first year to each joined annual Feature 
            //  as a "group ID".
            var currentTargetFtr_withMovWinFirstYr = ee.Feature(currentTargetFtr)
              .set(movWinFirstYr_Name, movWinFirstYr_Value);
            
            // Add the annual Feature into the moving-window Feature List.
            return ee.List(movWin_FtrList).add(currentTargetFtr_withMovWinFirstYr);
          };
          
          // Derive a List of Features for each moving window.
          var movWin_withTargets_FtrList = ee.List(targetNames_List.iterate({
            function: addEachTargetFtr, 
            first: raw_MovWin_FtrList
          }));
          
          // Convert the derived Feature List to a FeatureCollection.
          var movWin_withTargets_FtrCol = ee.FeatureCollection(movWin_withTargets_FtrList);
          
          // Return the FeatureCollection of each moving window
          //  with the same first year as a "group ID".
          return movWin_withTargets_FtrCol;
        }).flatten();
      
      
      /* Calculate the SD of the 6 (or >= 4) annual average NDVIs of each moving window. */
      
      // Group the annual average NDVIs by the moving windows' first years
      //  and then calculate the NDVI SD of each group (i.e., moving window).
      var movWinNDVIsds_perTransect_List = ee.List(movWinFtrCol_perTransect.reduceColumns({
        selectors: [ndviName, movWinFirstYr_Name],
        reducer: NDVIsd_Reducer.group({
          groupField: 1,
          groupName: movWinFirstYr_Name,
        })
      }).get("groups"));
      
      // Convert the generated List to a FeatureCollection without Geometries.
      var movWinNDVIsds_perTransect_FtrCol = ee.FeatureCollection(movWinNDVIsds_perTransect_List
        .map(function(groupedBy_FirstYr) {
          
          // Create a Feature with the centerline ID and a NULL Geometry 
          //  for each moving window.
          return ee.Feature(null).set(groupedBy_FirstYr)
            .set(CLid_Name, CLid);
        }));
      
      // Return a FeatureCollection of the NDVI SDs for each transect.
      return movWinNDVIsds_perTransect_FtrCol;
    });
    
    // Convert the generated List of FeatureCollections to a regular FeatureCollection.
    var movWinNDVIsds_AllTransects_FtrCol = ee.FeatureCollection(movWinNDVIsds_AllTransects_List)
      .flatten();
    
    
    /* Derive the max. moving-window NDVI SD, the corresponding first year, 
      and the moving-window (i.e., first-year) number for each transect. */
    
    var maxNDVIsds_AllTransects_List = ee.List(movWinNDVIsds_AllTransects_FtrCol.reduceColumns({
      selectors: [movWinNDVIsd_Name, movWinFirstYr_Name, movWinFirstYr_Name, 
                  CLid_Name],
      reducer: maxSD_MovWinCount_CombinedReducer.group({
        groupField: 3,
        groupName: CLid_Name,
      })
    }).get("groups"));
    
    // Convert the generated List to a FeatureCollection without Geometries.
    var maxNDVIsds_AllTransects_FtrCol = ee.FeatureCollection(maxNDVIsds_AllTransects_List.map(
      function(groupedBy_CLidName) {
        
        // Create a Feature with a NULL Geometry for each transect.
        return ee.Feature(null).set(groupedBy_CLidName);
      }));
    
    // Combine each max. NDVI SD Feature with the corresponding transect Feature
    //  and keep the unique properties of the former one.
    var transects_withMaxNDVIsd = FC_AP.combine_twoFtrCols_byCommonProperty(
      rawTransects, maxNDVIsds_AllTransects_FtrCol, CLid_Name
    );
    
    
    /* Perform the temporal analyses for the annual Features of each transect. */
    
    // The grouped reduction:
    //  1) The "groupField" argument is the index of the input in the selectors array
    //    that contains the centerline IDs by which to group the output.
    //    The first field is index 0.
    //  2) The "groupName" argument specifies the name of the property
    //    to store the value of the grouping variable.
    var temporalVars_List = ee.List(rawAnnualFtrs.reduceColumns({
      selectors: [Y0_Name, gradName, gradName, 
                  Y0_Name, ndviName, ndviName, 
                  CLid_Name],
      reducer: final_CombinedReducer.group({
        groupField: 6,
        groupName: CLid_Name,
      })
    }).get("groups"));
    
    // Convert the generated List to a FeatureCollection without Geometries.
    var temporalVars_FtrCol = ee.FeatureCollection(temporalVars_List.map(
      function(groupedBy_CLid) {
        
        // Create a Feature with a NULL Geometry for each transect.
        return ee.Feature(null).set(groupedBy_CLid);
      }));
      
    // Combine each temporal variable Feature with the corresponding transect Feature
    //  that has the moving-window detection result 
    //  and keep the unique properties of the former one.
    var transects_withMaxNDVIsd_TemporalVars = FC_AP.combine_twoFtrCols_byCommonProperty(
      transects_withMaxNDVIsd, temporalVars_FtrCol, CLid_Name
    );
    
    
    /* Calculate the ratio between the max. moving-window NDVI SD 
      and the long-term NDVI mean for each transect. */
    
    var transects_withMaxSDmeanRatio = FC_AP.FtrCol_PropertyRatioCalculation(
      transects_withMaxNDVIsd_TemporalVars, maxNDVIsd_Name, ndviMean_Name, maxSDmeanRatio_Name
    );
    
    // Return the final result as a FeatureCollection.
    return transects_withMaxSDmeanRatio;
  };


// Function to derive the start (min.) and end (max.) years and the time span for 
//  the annual Features of each transect.
exports.Analyze_ObsYears_byTransect = function(
  rawTransects, annualFtrs, CLid_Name) {
    
    /**
     * "FeatureCollection": 
     *  rawTransects, annualFtrs.
     * 
     * "String":
     *  CLid_Name.
     * 
     * Result: FeatureCollection.
    */


    /* Name the current year of the annual observation. */
    
    var yearName = "Year";
    
    
    /* Name the variables of the observation years. */
    
    var startYear_Name = "startYear";
    
    var endYear_Name = "endYear";
    
    var timeSpan_Name = "timeSpan";
    
    
    /* Determine a min. and max. Reducer for the observation years. */
    
    var minMaxReducer = ee.Reducer.minMax()
      .setOutputs([startYear_Name, endYear_Name]);
    
    
    /* Compute the min. and max. years of each transect. */
    
    // The grouped reduction:
    //  1) The "groupField" argument is the index of the input in the selectors array
    //    that contains the centerline IDs by which to group the output.
    //    The first field is index 0.
    //  2) The "groupName" argument specifies the name of the property
    //    to store the value of the grouping variable.
    var yearMinMax_List = ee.List(annualFtrs.reduceColumns({
      selectors: [yearName, CLid_Name],
      reducer: minMaxReducer.group({
        groupField: 1,
        groupName: CLid_Name,
      })
    }).get("groups"));
    
    // Convert the generated List to a FeatureCollection without Geometries.
    var yearMinMax_FtrCol = ee.FeatureCollection(yearMinMax_List.map(
      function(groupedBy_CLid) {
        
        // Create a Feature with a NULL Geometry for each transect.
        return ee.Feature(null).set(groupedBy_CLid);
      }));
      
    // Combine each generated Feature with the corresponding transect
    //  and keep the unique properties of the former one.
    var transects_withYearMinMax = FC_AP.combine_twoFtrCols_byCommonProperty(
      rawTransects, yearMinMax_FtrCol, CLid_Name
    );
    
    
    /* Derive the observation time span of each transect. */
    
    var transects_withTimeSpan = transects_withYearMinMax.map(function(transect) {
      
      // Get the property values.
      var endYear_Value = transect.get(endYear_Name);
      
      var startYear_Value = transect.get(startYear_Name);
      
      // Calculate the time span.
      var timeSpan_Value = ee.Number(endYear_Value).subtract(startYear_Value)
        .add(1);
      
      // Add the time span to each Feature as a new property.
      return transect.set(timeSpan_Name, timeSpan_Value);
    });
    
    // Return the final result as a FeatureCollection.
    return transects_withTimeSpan;
  };



// /* Functions for the temporal analyses by period. */

// // Function to identify the annual Features in the first period (i.e., 1985-2002).
// exports.Identify_FirstPeriod_AnnualFeatures = function(rawAnnualFtrs) {
  
//   /**
//   * "FeatureCollection": 
//   *  rawAnnualFtrs.
//   * 
//   * Result: FeatureCollection.
//   */

//   // Name the property of interest.
//   var yearName = "Year";
  
//   // Set the threshold year.
//   var thresYear = 2002;
  
//   // Define a year Filter.
//   var firstPeriodFilter = ee.Filter.lte(yearName, thresYear);
  
//   // Identify the first period Features.
//   var firstPeriodFtrs = rawAnnualFtrs.filter(firstPeriodFilter);
  
//   return firstPeriodFtrs;
// };


// // Function to identify the annual Features in the second period (i.e., 2003-2020).
// exports.Identify_SecondPeriod_AnnualFeatures = function(rawAnnualFtrs) {
  
//   /**
//   * "FeatureCollection": 
//   *  rawAnnualFtrs.
//   * 
//   * Result: FeatureCollection.
//   */

//   // Name the property of interest.
//   var yearName = "Year";
  
//   // Set the threshold year.
//   var thresYear = 2002;
  
//   // Define a year Filter.
//   var secondPeriodFilter = ee.Filter.gt(yearName, thresYear);
  
//   // Identify the second period Features.
//   var secondPeriodFtrs = rawAnnualFtrs.filter(secondPeriodFilter);
  
//   return secondPeriodFtrs;
// };


// // Function to perform the following operations for
// //  the annual Features of each period: 
// // 1) estimate the temporal trends of the annual average NDVIs and 
// //  elevational gradients, respectively;
// // 2) count the annual average NDVIs and elevational gradients, 
// //  respectively.
// exports.Perform_TrendAnalyses_byPeriod = function(
//   rawTransects, periodAnnualFtrs, period_Name, CLid_Name) {
    
//     /**
//     * "FeatureCollection": 
//     *  rawTransects, periodAnnualFtrs.
//     * 
//     * "String":
//     *  period_Name, CLid_Name.
//     * 
//     * Result: FeatureCollection.
//     */


//     /* Name the properties of the annual Features. */
    
//     // Current year of the observation.
//     var yearName = "Year";
    
//     // Elevational NDVI gradient.
//     var gradName = "slope"; 
    
//     // Average NDVI.
//     var ndviName = "annualAvgNDVI";
    
    
//     /* Name the variables for the temporal analyses. */
    
//     // Temporal trend of the elevational gradient.
//     var gradTrend_Name = period_Name + "_EGtrend";
    
//     var gradIntcep_Name = period_Name + "_EGintcep";
    
//     // Temporal trend of the average NDVI.
//     var ndviTrend_Name = period_Name + "_ANtrend";
    
//     var ndviIntcep_Name = period_Name + "_ANintcep";
    
//     // Observation numbers of the two variables. 
//     var gradNum_Name = period_Name + "_EGnum";
    
//     var ndviNum_Name = period_Name + "_ANnum";
    
    
//     /* Determine the Reducers for the temporal analyses. */
    
//     // Sen's slope Reducer for estimating the temporal trends.
//     //  (Note: The inputs are expected to be x data followed by y data.
//     //  It returns two double values; the estimated slope and the offset.)
//     var sensReducer = ee.Reducer.sensSlope();
    
//     // Reducer for counting the non-null annual variables.
//     var countReducer = ee.Reducer.count();
    
    
//     /* Rename the outputs of the temporal-analysis Reducers and then combine them. */
    
//     // Reducers for analyzing the elevational NDVI gradient.
//     var grad_CombinedReducer = sensReducer.setOutputs([gradTrend_Name, gradIntcep_Name])
//       .combine({
//         reducer2: countReducer.setOutputs([gradNum_Name]), 
//         sharedInputs: false
//       });
    
//     // Reducers for analyzing the average NDVI.
//     var ndvi_CombinedReducer = sensReducer.setOutputs([ndviTrend_Name, ndviIntcep_Name])
//       .combine({
//         reducer2: countReducer.setOutputs([ndviNum_Name]), 
//         sharedInputs: false
//       });
    
//     // Combine the two types of Reducers.
//     var final_CombinedReducer = grad_CombinedReducer.combine({
//       reducer2: ndvi_CombinedReducer, 
//       sharedInputs: false
//     });
    
    
//     /* Perform the temporal analyses for the annual Features of each period. */
    
//     // The grouped reduction:
//     //  1) The "groupField" argument is the index of the input in the selectors array
//     //    that contains the centerline IDs by which to group the output.
//     //    The first field is index 0.
//     //  2) The "groupName" argument specifies the name of the property
//     //    to store the value of the grouping variable.
//     var temporalVars_List = ee.List(periodAnnualFtrs.reduceColumns({
//       selectors: [yearName, gradName, gradName, 
//                   yearName, ndviName, ndviName, 
//                   CLid_Name],
//       reducer: final_CombinedReducer.group({
//         groupField: 6,
//         groupName: CLid_Name,
//       })
//     }).get("groups"));
    
//     // Convert the generated List to a FeatureCollection without Geometries.
//     var temporalVars_FtrCol = ee.FeatureCollection(temporalVars_List.map(
//       function(groupedBy_CLid) {
        
//         // Create a Feature with a NULL Geometry for each transect.
//         return ee.Feature(null).set(groupedBy_CLid);
//       }));
      
//     // Combine each temporal variable Feature with the corresponding transect Feature
//     //  and keep the unique properties of the former one.
//     var transects_withPeriodTemporalVars = FC_AP.combine_twoFtrCols_byCommonProperty(
//       rawTransects, temporalVars_FtrCol, CLid_Name
//     );
    
//     // Return the final result as a FeatureCollection.
//     return transects_withPeriodTemporalVars;
//   };


// // Function to calculate the secondP/firstP ratios for the temporal trends
// //  of the annual elevational gradients and average NDVIs, respectively.
// exports.Calculate_PeriodTrendRatios = function(rawTransects) {
    
//     /**
//     * "FeatureCollection": 
//     *  rawTransects.
//     * 
//     * Result: FeatureCollection.
//     */


//     /* Name the properties of the trend ratios. */
    
//     var EGratio_Name = "EGtrendRatio_SpToFp";
    
//     var ANratio_Name = "ANtrendRatio_SpToFp";
    
    
//     /* Select transects with all the temporal trends. */
    
//     var selectedTransects = rawTransects.filter(
//       ee.Filter.notNull([
//         "firstP_EGtrend",
//         "firstP_ANtrend",
//         "secondP_EGtrend",
//         "secondP_ANtrend"
//       ])
//     );
    
    
//     /* Compute the temporal trend ratios. */
    
//     var newTransects = selectedTransects.map(function(transect) {
      
//       /* Derive the properties of the temporal trends. */
      
//       // Temporal trends of the first period.
//       var firstEG = transect.get("firstP_EGtrend");
      
//       var firstAN = transect.get("firstP_ANtrend");
      
//       // Temporal trends of the second period.
//       var secondEG = transect.get("secondP_EGtrend");
      
//       var secondAN = transect.get("secondP_ANtrend");
      

//       /* Calculate the secondP/firstP ratios for the temporal trends. */

//       // Elevational gradient trend.
//       var EGratio_Value = ee.Number(secondEG).divide(firstEG);
      
//       // Average NDVI trend.
//       var ANratio_Value = ee.Number(secondAN).divide(firstAN);
      
//       // Add the ratios to each transect as new properties.
//       return transect.set(
//         EGratio_Name, EGratio_Value,
//         ANratio_Name, ANratio_Value
//       );
//     });
    
//     // Return the FeatureCollection with the calculated ratios.
//     return newTransects;
//   };



/**** 7) Functions for the processing and analyses of sub-watersheds. ****/

// Function to combine the aggregated variables with the corresponding sub-watersheds.
exports.Merge_BasinsANDaggregatedVars = function(aggregatedVars) {
  
  /**
   * "FeatureCollection":
   *  aggregatedVars.
   * 
   * Result: FeatureCollection.
  */
  
  // Load the raw sub-watersheds.
  var rawBasins = ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_12");
  
  // Merge the sub-watersheds and the aggregated variables.
  var basins_withVars = FC_AP.combine_twoFtrCols_primaryGeometriesANDsecondaryProperties(
    rawBasins, aggregatedVars, "HYBAS_ID", "Hybas_ID");

  // Return the sub-watersheds with the aggregated variables.
  return basins_withVars;
};

