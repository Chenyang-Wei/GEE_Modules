/** 
 * Introduction:
 *  This is a module for objects and funcitons that are often used
 *    in the NDVI analysis of the elevational transects
 *    in global alpine treeline ecotones.
 * 
 * Reference to the public repository:
 *  https://code.earthengine.google.com/?scriptPath=users/ChenyangWei/Public
 * 
 * Load this module:
 *  var TNA = require("users/ChenyangWei/Public:Modules/Treeline/Transect_NDVI_Analysis.js");
 * 
 * Update: 8/3/2022.
 */


/* Load other module(s). */

var GATE = require("users/ChenyangWei/Public:Modules/Treeline/Global_ATE.js");
var FC_AP = require("users/ChenyangWei/Public:Modules/General/FeatureCollection_Analysis&Processing.js");



/****** Objects. ******/

// Selected transect centerlines with length between 300m and 3km.
exports.selectedCLs_fileName = 
  "selectedTransectCLs_300mTo3km";

// Selected transect centerlines by basin group.
exports.selectedCLs_byBasinGroup_fileName = 
  "selectedTransectCLs_BasinGroup_";


/**** Transect segment generation and validation. ****/

// Equally divided segments of each 90-m transect.
exports.transectSegments_FullName = 
  "transectSegments_MiddleDivided";

exports.transectSegments_ShortName = 
  "transectSegments";


// Transect (upper and lower) segments with 
//  the un-weighted average canopy height and the corresponding 10-m pixel number.
exports.segments_withCanopyHt_FullName = 
  "segments_withAvgCanopyHt_PxNum";

exports.segments_withCanopyHt_ShortName = 
  "segments_withCanopyHt";


// Transect (upper and lower) segments with 
//  the un-weighted average NDVI and canopy height 
//  and the corresponding pixel numbers.
exports.segments_withNDVIcanopyHt_FullName = 
  "segments_withAvgNDVIcanopyHt_PxNums";

exports.segments_withNDVIcanopyHt_ShortName = 
  "segments_withNDVIcanopyHt";


// Transects with the corresponding information of 
//  both upper and lower segments.
exports.transects_withBothSegments_FullName = 
  "transects_withBothSegments_NDVIcanopyHt";

exports.transects_withBothSegments_ShortName = 
  "transects_withBothSegments";



// Estimated temporal trend of the annual elevational NDVI gradients
//  of each 90-m transect.
exports.elvNDVIgradientTrends_fileName =
  "elvNDVIgradientTrends_90mTransects";

// Estimated NDVI-gradient trends by basin group.
exports.gradientTrends_byBasinGroup_fileName = "elvGradTrends_BasinGroup_";

// // Estimated temporal trend of the annual elevational NDVI gradients
// //  of each 90-m transect less than or equal to 10 km.
// exports.elvNDVIgradientTrends_Lte10km_fileName =
//   "elvNDVIgradientTrends_90mTransects_Lte10km";

// Smoothed annual maximum NDVIs of North America in the 300-m buffered new CATE.
exports.annualMaxNDVI_300mBufNewCATE_NorthAmerica_fileName = 
  "medianSmdAnnualMaxNDVI_1984to2020_cloudShadowMasked_300mBufNewCATE_AOI";

// Estimated annual-average-NDVI trends of the lower segments.
exports.lowerSegmentsNDVItrends_fileName = 
  "lowerSegments_withAnnualAvgNDVItrends";

// Estimated annual-average-NDVI trends of the upper segments.
exports.upperSegmentsNDVItrends_fileName = 
  "upperSegments_withAnnualAvgNDVItrends";

// Estimated NDVI trends of the lower segments by basin group.
exports.lowerSegmentsNDVItrends_byBasinGroup_fileName = 
  "lowerSegmentsNDVItrends_BasinGroup_";

// Estimated NDVI trends of the upper segments by basin group.
exports.upperSegmentsNDVItrends_byBasinGroup_fileName = 
  "upperSegmentsNDVItrends_BasinGroup_";


// Calculated annual average NDVIs of each lower segment.
exports.lowerSegments_AnnualAvgNDVIs_fileName = 
  "lowerSegments_withAnnualAvgNDVIs";

// Calculated annual average NDVIs of each upper segment.
exports.upperSegments_AnnualAvgNDVIs_fileName = 
  "upperSegments_withAnnualAvgNDVIs";


// Calculated annual average NDVIs of each lower segment by basin group.
exports.lowerAnnualAvgNDVIs_byBasinGroup_fileName = 
  "lowerAnnualAvgNDVIs_BasinGroup_";

// Calculated annual average NDVIs of each upper segment by basin group.
exports.upperAnnualAvgNDVIs_byBasinGroup_fileName = 
  "upperAnnualAvgNDVIs_BasinGroup_";


// Calculated annual average NDVIs for the lower segments
//  with each subset of the centerline IDs.
exports.lowerAnnualAvgNDVIs_CLidSubset_fileName = 
  "lowerAnnualAvgNDVIs_CLidSubset_";

// Calculated annual average NDVIs for the upper segments
//  with each subset of the centerline IDs.
exports.upperAnnualAvgNDVIs_CLidSubset_fileName = 
  "upperAnnualAvgNDVIs_CLidSubset_";


// Calculated max. moving-window NDVI standard deviation of each lower segment.
exports.lowerSegments_MaxNDVIsds_fileName = 
  "lowerSegments_withMaxMovWinNDVIsds";

// Calculated max. moving-window NDVI standard deviation of each upper segment.
exports.upperSegments_MaxNDVIsds_fileName = 
  "upperSegments_withMaxMovWinNDVIsds";


// Calculated max. NDVI standard deviation of each lower segment by basin group.
exports.lowerSegmentsMaxNDVIsds_byBasinGroup_fileName = 
  "lowerMaxMovWinNDVIsds_BasinGroup_";

// Calculated max. NDVI standard deviation of each upper segment by basin group.
exports.upperSegmentsMaxNDVIsds_byBasinGroup_fileName = 
  "upperMaxMovWinNDVIsds_BasinGroup_";


// Calculated max. NDVI standard deviation for the lower segments
//  with each subset of the centerline IDs.
exports.lowerSegmentsMaxNDVIsds_CLidSubset_fileName = 
  "lowerMaxMovWinNDVIsds_CLidSubset_";

// Calculated max. NDVI standard deviation for the upper segments
//  with each subset of the centerline IDs.
exports.upperSegmentsMaxNDVIsds_CLidSubset_fileName = 
  "upperMaxMovWinNDVIsds_CLidSubset_";


// Transect dataset with the information of the corresponding segments
//  (all annual-observation numbers >= 10).
exports.transects_withBothSegments_fileName = 
  "transects_withBothSegments_ObsNumGte10";

// Transect dataset with the information of the corresponding segments
//  of each basin group.
exports.transects_withBothSegments_byBasinGroup_fileName = 
  "transectsWithBothSegments_BasinGroup_";

// Transect dataset with the information of the corresponding segments
//  of each centerline ID subset.
exports.transects_withBothSegments_CLidSubset_fileName = 
  "transectsWithBothSegments_CLidSubset_";


// Calculated average temporal max. spectral change magnitude of each segment.
exports.lowerSegments_withAvgTmaxSCMAG_fileName = 
  "lowerSegments_withAvgTmaxSCMAG";

exports.upperSegments_withAvgTmaxSCMAG_fileName = 
  "upperSegments_withAvgTmaxSCMAG";


// Calculated average spectral change magnitude of each segment by basin group.
exports.lowerAvgTmaxSCMAG_byBasinGroup_fileName = 
  "lowerAvgTmaxSCMAG_BasinGroup_";

// Calculated max. NDVI standard deviation of each upper segment by basin group.
exports.upperAvgTmaxSCMAG_byBasinGroup_fileName = 
  "upperAvgTmaxSCMAG_BasinGroup_";


// Combined transect-level results of continents other than Africa or Oceania
//  with the information of the corresponding segments
//  (all annual-observation numbers >= 10).
exports.combinedTransects_withBothSegments_fileName = 
  "combinedTransects_withBothSegments_ObsNumGte10";


// Aggregated NDVI elevational-gradient trends of the transects in each basin.
exports.basinGradientTrends_fileName =
  "aggregatedNDVIgradientTrends_Basins";

// Aggregated NDVI elevational-gradient trends by basin group.
exports.basinGradientTrends_byBasinGroup_fileName =
  "aggregatedNDVIgradientTrends_BasinGroup_";



/****** Functions. ******/


/**** Functions relevant to data loading. ****/

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


// Function to load the transect/segment-level data of all basin groups
//  for North America.
exports.LoadBasinGroupData_NorthAmerica = function(folderName, fileName) {
  
  /**
   * "String":
   *  folderName, fileName.
   * 
   * Result: FeatureCollection.
  */
  
  // Determine the file path of all basin groups.
  var filePath = GATE.wd_NorthAmerica
    + "Transect_NDVI_Analysis/"
    + folderName
    + "/";
  
  // Load the file of each basin group iteratively.
  var files_AllBasinGroups = ee.List([]);

  for (var basinGroupID = 1; basinGroupID <= 5; basinGroupID ++) {
    var fileName_OneBasinGroup = fileName + basinGroupID;
    
    var file_OneBasinGroup = ee.FeatureCollection(filePath
      + fileName_OneBasinGroup);
    
    files_AllBasinGroups = files_AllBasinGroups.add(file_OneBasinGroup);
  }
  
  return ee.FeatureCollection(files_AllBasinGroups)
    .flatten();
};


// Function to load the transect/segment-level data
//  of all the AOIs of Asia.
exports.LoadAOIdata_Asia = function(folderName, fileName) {
  
  /**
   * "String":
   *  folderName, fileName.
   * 
   * Result: FeatureCollection.
  */
  
  // Determine the root working directory.
  var wd = GATE.wd_Asia;
  
  // Create an empty list for storing the datasets of all AOIs.
  var files_AllAOIs = ee.List([]);
  
  // Load the file of each AOI (1 ~ 6) iteratively.
  for (var AOI_ID = 1; AOI_ID <= 6; AOI_ID ++) {
    
    // Set the working directory of the AOI.
    var wd_AOI = wd
      + "Transect_NDVI_Analysis/"
      + "AOI_Asia_" + AOI_ID
      + "/";
    
    // Determine the common file path of all basin groups.
    var filePath = wd_AOI
      + folderName
      + "/"
      + fileName;
    
    // Load the file of each basin group (1 ~ 5) iteratively.
    for (var basinGroupID = 1; basinGroupID <= 5; basinGroupID ++) {
      
      var filePath_OneBasinGroup = filePath + basinGroupID;
      
      var file_OneBasinGroup = ee.FeatureCollection(filePath_OneBasinGroup);
      
      files_AllAOIs = files_AllAOIs.add(file_OneBasinGroup);
    }
  }
  
  // Convert the generated list of FeatureCollections
  //  to a regular FeatureCollection.
  return ee.FeatureCollection(files_AllAOIs)
    .flatten();
};


// Function to load the transect/segment-level data
//  of all the subsets of Europe/South America.
exports.LoadCLidSubsetData = function(wd, folderName, fileName) {
  
  /**
   * "String":
   *  wd, folderName, fileName.
   * 
   * Result: FeatureCollection.
  */
  
  // Create an empty list for storing the datasets of all subsets.
  var files_AllSubsets = ee.List([]);
  
  // Determine the common file path of all subsets.
  var filePath = wd
    + "Transect_NDVI_Analysis/"
    + folderName
    + "/"
    + fileName;
  
  // Load the file of each subset (ID: 1 ~ 5) iteratively.
  for (var subsetID = 1; subsetID <= 5; subsetID ++) {
    
    var filePath_OneSubset = filePath + subsetID;
    
    var file_OneSubset = ee.FeatureCollection(filePath_OneSubset);
    
    files_AllSubsets = files_AllSubsets.add(file_OneSubset);
  }
  
  // Convert the generated list of FeatureCollections
  //  to a regular FeatureCollection.
  return ee.FeatureCollection(files_AllSubsets)
    .flatten();
};



/**** Functions relevant to the processing of transect centerlines and segments. ****/

// Function to select transect centerlines with length between 300m and 3km.
exports.filter_TransectCLlength = function(rawTransectCLs) {
  
  /**
   * "FeatureCollection":
   *  rawTransectCLs.
  */
  
  // Name the property of centerline length.
  var CLlength_Name = "CL_length";
  
  // Determine the filtering thresholds.
  var CLlength_LowerThres = 300;
  
  var CLlength_UpperThres = 3e3;
  
  // Define the Filters.
  var CLlength_LowerFilter = ee.Filter.gte(CLlength_Name, 
    CLlength_LowerThres);
  
  var CLlength_UpperFilter = ee.Filter.lte(CLlength_Name, 
    CLlength_UpperThres);
  
  // Combine the Filters.
  var combinedFilter = ee.Filter.and(
    CLlength_LowerFilter,
    CLlength_UpperFilter
  );
  
  // Filter the raw transect centerlines.
  var filteredCLs = rawTransectCLs.filter(combinedFilter);
  
  // Return a FeatureCollection.
  return filteredCLs;
};


// Function to divide each transect centerline into two equal segments by basin.
exports.divide_Centerlines_byBasin = function(
  rawCenterlines, CLid_Name) {
    
    /**
     * "FeatureCollection": 
     *  rawCenterlines.
     * 
     * "String":
     *  CLid_Name.
     * 
     * Result: FeatureCollection.
    */
    
    // Name of the properties of interest.
    var HybasID_name = "Hybas_ID";
    
    var segmentID_name = "SegmentID";
    
    var IDproperties = [CLid_Name, HybasID_name, segmentID_name];
    
    // Create a non-duplicate list of the Hybas IDs.
    var HybasID_list = rawCenterlines.aggregate_array(HybasID_name)
      .distinct();
    
    
    /* Divide the transect centerlines by basin. */

    var CLsegments_AllBasins = HybasID_list.map(function(HybasID) {
      
      // Create a filter of the Hybas ID.
      var HybasID_filter = ee.Filter.eq(HybasID_name, HybasID);
      
      // Identify the centerlines of each basin.
      var rawCenterlines_perBasin = rawCenterlines
        .filter(HybasID_filter);
      
      
      /* Divide each centerline into two equal segments. */
      
      var CLsegments_perBasin = rawCenterlines_perBasin.map(function(rawCL) {
        
        // Calculate the length of each segment
        //  and make sure there's NO overlap
        //  between each pair of segments.
        var CL_length = ee.Number(rawCL.get("CL_length"));
        
        var segmentLength = CL_length.divide(2).subtract(45);
        
        // Extract the coordinates of the two endpoints of each centerline.
        var CF_long = rawCL.get("CF_long");
        
        var CF_lat = rawCL.get("CF_lat");
        
        var nonF_long = rawCL.get("nonF_long");
        
        var nonF_lat = rawCL.get("nonF_lat");
        
        // Contruct the two endpoints.
        var lowerEndpoint = ee.Geometry.Point([CF_long, CF_lat]);
        
        var upperEndpoint = ee.Geometry.Point([nonF_long, nonF_lat]);
        
        // Construct the geometries of the lower and upper segments, respectively.
        var lowerSegment_Geom = rawCL.intersection(lowerEndpoint.buffer(segmentLength));
        
        var upperSegment_Geom = rawCL.intersection(upperEndpoint.buffer(segmentLength));
        
        // Generate a Feature for each type of segment
        //  and select the three ID properties.
        var lowerSegment_Ftr = ee.Feature(lowerSegment_Geom)
          .set(segmentID_name, 1)
          .select(IDproperties);
        
        var upperSegment_Ftr = ee.Feature(upperSegment_Geom)
          .set(segmentID_name, 2)
          .select(IDproperties);
        
        // Combine each pair of segments into a FeatureCollection.
        var segments_perCL = ee.FeatureCollection(
          [lowerSegment_Ftr, upperSegment_Ftr]
        );
        
        return segments_perCL;
      });
      
      // Return the produced segments of each basin.
      return CLsegments_perBasin.flatten();
    });
    
    // Return the generated segments of all basins.
    return ee.FeatureCollection(CLsegments_AllBasins)
      .flatten();
  };


// Function to buffer each transect centerline by 45 m.
exports.buffer_Centerlines_by45m = function(centerlines) {
  
  /**
   * "FeatureCollection": 
   *  centerlines.
  */

  var distance = 45;
  
  var buffered_Centerlines = centerlines.map(function(CL) {
    return CL.buffer(distance);
  });
  
  // Return the buffered centerlines as a FeatureCollection.
  return buffered_Centerlines;
};


// Function to select transects with at least 10 annual observations.
exports.Filter_TransectYearNum = function(rawTransects) {
  
  /**
   * "FeatureCollection":
   *  rawTransects.
   * 
   * Result: FeatureCollection.
  */
  
  // Name the number of annual observations.
  var yearNum_Name = "gradYearNum";
  
  // Determine the filtering threshold.
  var yearNum_Thres = 10;
  
  // Define the Filter.
  var yearNum_Filter = ee.Filter.gte(yearNum_Name, 
    yearNum_Thres);
  
  // Filter the raw transects.
  var filteredTransects = rawTransects.filter(yearNum_Filter);
  
  // Return a FeatureCollection.
  return filteredTransects;
};


// Function to select transect segments with at least 10 annual observations.
exports.Filter_SegmentYearNum = function(rawSegments, segmentType) {
  
  /**
   * "FeatureCollection":
   *  rawSegments.
   * 
   * "String":
   *  segmentType.
   * 
   * Result: FeatureCollection.
  */
  
  // Name the number of annual observations.
  var yearNum_Name = segmentType + "_YearNum";
  
  // Determine the filtering threshold.
  var yearNum_Thres = 10;
  
  // Define the Filter.
  var yearNum_Filter = ee.Filter.gte(yearNum_Name, 
    yearNum_Thres);
  
  // Filter the raw transect segments.
  var filteredSegments = rawSegments.filter(yearNum_Filter);
  
  // Return a FeatureCollection.
  return filteredSegments;
};


// Function to generate a list of five filters
//  for subsetting the centerline IDs.
exports.Create_CLid_FilterList = function(CLid_Name) {
  
  /**
   * "String":
   *  CLid_Name.
   * 
   * Return: List.
  */
  
  // Filter 1.
  var CLid_Filter_1 = 
    ee.Filter.lte(CLid_Name, 0.2);
  
  // Filter 2.
  var CLid_Filter_2 = ee.Filter.and(
    ee.Filter.gt(CLid_Name, 0.2),
    ee.Filter.lte(CLid_Name, 0.4)
  );
  
  // Filter 3.
  var CLid_Filter_3 = ee.Filter.and(
    ee.Filter.gt(CLid_Name, 0.4),
    ee.Filter.lte(CLid_Name, 0.6)
  );
  
  // Filter 4.
  var CLid_Filter_4 = ee.Filter.and(
    ee.Filter.gt(CLid_Name, 0.6),
    ee.Filter.lte(CLid_Name, 0.8)
  );
  
  // Filter 5.
  var CLid_Filter_5 = 
    ee.Filter.gt(CLid_Name, 0.8);

  var filterList = [
    CLid_Filter_1,
    CLid_Filter_2,
    CLid_Filter_3,
    CLid_Filter_4,
    CLid_Filter_5
  ];
  
  return filterList;
};



/**** Functions to analyze annual elevational NDVI gradients. ****/

// Function to pair the elevation dataset with each annual NDVI band
//  as an ImageCollection.
exports.pair_Elevation_AND_AnnualNDVIs = function(elevation, annualNDVIs) {
  
  /**
   * "Image": 
   *  elevation, annualNDVIs.
  */

  // Determine the band names of the annual NDVI image.
  var NDVI_bandNames = annualNDVIs.bandNames();
  
  // Pair the elevation with each annual NDVI.
  var elvAnnualNDVIs_ImgCol = ee.ImageCollection.fromImages(NDVI_bandNames.map(
    function(bandName) {
      
      // Select the NDVI band of each year.
      var annualNDVI = annualNDVIs.select([bandName]);
      
      // Pair the elevation and the annual NDVI.
      var elvNDVI = elevation.addBands(annualNDVI);
      
      // Extract the corresponding year.
      var yearString = ee.String(bandName).slice(8, 12);
      
      // Convert the string to a number.
      var yearNum = ee.Number.parse(yearString);
      
      // Store the year as a property.
      var elvNDVI_withYear = elvNDVI.set("Year", yearNum);
      
      return elvNDVI_withYear;
    }));
  
  // Return all the paired images of elevation and annual NDVIs
  //  as an ImageCollection.
  return elvAnnualNDVIs_ImgCol;
};


// Function to estimate the temporal trend of the annual elevational NDVI gradients
//  of each transect by basin.
exports.estimate_ElvNDVIgradientTrends_byBasin = function(
  rawTransects, paired_Elv_AnnualNDVIs, proj, CLid_Name) {
    
    /**
     * "FeatureCollection": 
     *  rawTransects.
     * 
     * "ImageCollection":
     *  paired_Elv_AnnualNDVIs.
     * 
     * "Dictionary":
     *  proj.
     * 
     * "String":
     *  CLid_Name.
    */

    // Name the properties of interest.
    var HybasID_name = "Hybas_ID";
    
    var yearName = "Year";
    
    var slopeName = "slope";
    
    var slopeStringName = "slopeString";
    
    // Name the properties relevant to the gradient trend.
    var yearCount_Name = "gradYearNum";
    
    var gradIntcep_Name = "gradIntcep";
    
    var gradTrend_Name = "gradTrend";
    
    // Define a Sen's slope reducer.
    //  (Note: The inputs are expected to be x data followed by y data.
    //    It returns two double values; the estimated slope and the offset.)
    var sensReducer = ee.Reducer.sensSlope();
    
    // Combine the two-input Sen's slope 
    //  and one-input non-null distinct count reducers
    //  as the reducer to apply to each group, without the group field.
    var combinedReducer = sensReducer.combine({
      reducer2: ee.Reducer.countDistinctNonNull(), 
      sharedInputs: false
    });
  
    // Create a non-duplicate list of the Hybas IDs.
    var HybasID_list = rawTransects.aggregate_array(HybasID_name)
      .distinct();
    
    
    /* Estimate the elevational-NDVI-gradient trend of each transect by basin. */

    var transects_withGradientTrends_AllBasins = HybasID_list.map(function(HybasID) {
      
      // Create a filter of the Hybas ID.
      var HybasID_filter = ee.Filter.eq(HybasID_name, HybasID);
      
      // Identify the transects of each basin.
      var rawTransects_perBasin = rawTransects
        .filter(HybasID_filter);
      
      
      /* Estimate the elevational NDVI gradients of all years of each transect in each basin. */
      
      var NDVIgradients_perBasin = paired_Elv_AnnualNDVIs.map(function(elv_AnnualNDVI) {
      
        // Determine the elevational NDVI gradient of each year of each transect in the basin.
        var oneYearGradients_perBasin = elv_AnnualNDVI.reduceRegions({
          collection: rawTransects_perBasin, 
          reducer: sensReducer,
          scale: proj.scale, 
          crs: proj.crs
        });
        
        // Obtain the corresponding year.
        var yearProperty = elv_AnnualNDVI.get(yearName);
        
        // Add a year property and a slope property of the String type
        //  to each transect with the annual gradient.
        var oneYearGradients_PropertiesAdded_perBasin = oneYearGradients_perBasin
          .map(function(transect) {
            
            // Convert the slope property to a String type.
            var slopeValue = transect.get(slopeName);
            
            var slopeString = ee.Algorithms.String(slopeValue);
            
            // Add the two properties of interest.
            return transect.set(
              yearName, yearProperty,
              slopeStringName, slopeString
            );
          });
        
        return oneYearGradients_PropertiesAdded_perBasin;
      });
      
      
      /* Remove the annual features that have "NaN" gradient. */

      var nonNaN_NDVIgradients_perBasin = NDVIgradients_perBasin.flatten()
        .filter(ee.Filter.neq(slopeStringName, "NaN"));
      
      
      /* Estimate the temporal trends of the annual elevational NDVI gradients
        of each transect in each basin. */
      
      // The grouped reduction:
      //  1) The "groupField" argument is the index of the input in the selectors array
      //    that contains the centerline IDs by which to group the output.
      //    The first field is index 0.
      //  2) The "groupName" argument specifies the name of the property
      //    to store the value of the grouping variable.
      var gradientTrends_perBasin_List = ee.List(nonNaN_NDVIgradients_perBasin.reduceColumns({
        selectors: [yearName, slopeName, yearName, CLid_Name],
        reducer: combinedReducer.group({
          groupField: 3,
          groupName: CLid_Name,
        })
      }).get("groups"));
      
      // Convert the gradient trend List to a FeatureCollection.
      var gradientTrends_perBasin_FtrCol = ee.FeatureCollection(gradientTrends_perBasin_List.map(
        function(listElement) {
          var dictionary = ee.Dictionary(listElement);
          
          return ee.Feature(null).set(
            CLid_Name, dictionary.get(CLid_Name),
            yearCount_Name, dictionary.get("count"),
            gradIntcep_Name, dictionary.get("offset"),
            gradTrend_Name, dictionary.get("slope")
          );
        }));
        
      // Combine the each gradent trend Feature with the corresponding transect Feature
      //  and keep the unique properties of the former one.
      var transects_withGradientTrends_perBasin = FC_AP.combine_twoFtrCols_byCommonProperty(
        rawTransects_perBasin, gradientTrends_perBasin_FtrCol, CLid_Name
      );
      
      return transects_withGradientTrends_perBasin;
    });
    
    // Return a FeatureCollection.
    return ee.FeatureCollection(transects_withGradientTrends_AllBasins)
      .flatten();
  };



/**** Functions to analyze annual spatial average NDVIs. ****/

// Function to estimate the temporal trend of the annual spatial average NDVIs
//  of each transect segment by basin.
exports.estimate_segmentNDVItrends_byBasin = function(
  rawSegments, annualNDVIs, proj, CLid_Name, segmentType) {
    
    /**
     * "FeatureCollection": 
     *  rawSegments.
     * 
     * "Image":
     *  annualNDVIs.
     * 
     * "Dictionary":
     *  proj.
     * 
     * "String":
     *  CLid_Name, segmentType.
    */

    // Name the properties of interest.
    var HybasID_name = "Hybas_ID";
    
    var yearName = "Year";
    
    var avgNDVI_name = "annualAvgNDVI";
    
    // Name the properties relevant to the NDVI trend
    //  based on the type of transect segments.
    var count_Name = segmentType + "_YearNum";
    
    var intcep_Name = segmentType + "_Intcep";
    
    var trend_Name = segmentType + "_Trend";
    
    // Generate a mean reducer for calculating annual spatial average NDVIs.
    var avgNDVI_reducer = ee.Reducer.mean().setOutputs([avgNDVI_name]);
    
    // Combine the two-input Sen's slope 
    //  and one-input non-null distinct count reducers
    //  as the reducer to apply to each group, without the group field.
    var combinedReducer = ee.Reducer.sensSlope().combine({
      reducer2: ee.Reducer.countDistinctNonNull(), 
      sharedInputs: false
    });
  
    // Create a non-duplicate list of the Hybas IDs.
    var HybasID_list = rawSegments.aggregate_array(HybasID_name)
      .distinct();
    
    // Determine the band names of the annual NDVI image.
    var NDVI_bandNames_List = annualNDVIs.bandNames();
    
    
    /* Estimate the annual-average-NDVI trend of each transect segment by basin. */

    var segments_withNDVItrends_AllBasins = HybasID_list.map(function(HybasID) {
      
      // Create a filter of the Hybas ID.
      var HybasID_filter = ee.Filter.eq(HybasID_name, HybasID);
      
      // Identify the segments of each basin.
      var rawSegments_perBasin = rawSegments
        .filter(HybasID_filter);
      
      
      /* Compute the annual average NDVIs of all years of each segment in each basin. */
      
      var allYearsAvgNDVIs_perBasin_List = NDVI_bandNames_List.map(function(bandName) {
        
        // Select the NDVI band of each year.
        var annualNDVI = annualNDVIs.select([bandName]);
        
        // Extract the corresponding year.
        var yearString = ee.String(bandName).slice(8, 12);
        
        // Convert the string to a number.
        var yearNum = ee.Number.parse(yearString);
        
        // Determine the average NDVI of each year of each segment in the basin.
        var oneYearAvgNDVIs_perBasin = annualNDVI.reduceRegions({
          collection: rawSegments_perBasin, 
          reducer: avgNDVI_reducer,
          scale: proj.scale, 
          crs: proj.crs
        });
        
        // Add a year property to each segment with the annual average NDVI.
        var oneYearAvgNDVIs_withYear_perBasin = oneYearAvgNDVIs_perBasin
          .map(function(segment) {
            
            return segment.set(
              yearName, yearNum
            );
          });
        
        return oneYearAvgNDVIs_withYear_perBasin;
      });
      
      // Remove the generated Features that don't have the annual average NDVI. 
      var allYearsAvgNDVIs_perBasin_FtrCol = ee.FeatureCollection(allYearsAvgNDVIs_perBasin_List)
        .flatten().filter(ee.Filter.notNull([avgNDVI_name]));
      
      
      /* Estimate the temporal trend of the annual spatial average NDVIs
        of each segment in each basin. */
      
      // The grouped reduction:
      //  1) The "groupField" argument is the index of the input in the selectors array
      //    that contains the variables by which to group the output.
      //    The first field is index 0.
      //  2) The "groupName" argument specifies the name of the property
      //    to store the value of the grouping variable.
      var NDVItrends_perBasin_List = ee.List(allYearsAvgNDVIs_perBasin_FtrCol.reduceColumns({
        selectors: [yearName, avgNDVI_name, yearName, CLid_Name],
        reducer: combinedReducer.group({
          groupField: 3,
          groupName: CLid_Name,
        })
      }).get("groups"));
      
      // Convert the NDVI trend List to a FeatureCollection.
      var NDVItrends_perBasin_FtrCol = ee.FeatureCollection(NDVItrends_perBasin_List.map(
        function(listElement) {
          var dictionary = ee.Dictionary(listElement);
          
          return ee.Feature(null).set(
            CLid_Name, dictionary.get(CLid_Name),
            count_Name, dictionary.get("count"),
            intcep_Name, dictionary.get("offset"),
            trend_Name, dictionary.get("slope")
          );
        }));
        
      // Combine each average-NDVI trend Feature with the corresponding segment Feature
      //  and keep the unique properties of the former one.
      var segments_withNDVItrends_perBasin = FC_AP.combine_twoFtrCols_byCommonProperty(
        rawSegments_perBasin, NDVItrends_perBasin_FtrCol, CLid_Name
      );
      
      return segments_withNDVItrends_perBasin;
    });
    
    // Return a FeatureCollection.
    return ee.FeatureCollection(segments_withNDVItrends_AllBasins)
      .flatten();
  };


// // Function to compute the temporal mean and standard deviation
// //  of the annual average NDVIs of each transect segment by basin.
// exports.compute_segmentAvgNDVI_meanSD_byBasin = function(
//   rawSegments, annualNDVIs, proj, CLid_Name, segmentType) {
    
//     /**
//     * "FeatureCollection": 
//     *  rawSegments.
//     * 
//     * "Image":
//     *  annualNDVIs.
//     * 
//     * "Dictionary":
//     *  proj.
//     * 
//     * "String":
//     *  CLid_Name, segmentType.
//     */

//     var HybasID_name = "Hybas_ID";
    
//     // Determine the property name of the annual average NDVI.
//     var avgNDVI_name = "annualAvgNDVI";
    
//     // Determine the names of the temporal properties
//     //  based on the type of transect segments.
//     var mean_Name = segmentType + "_Mean";
    
//     var SD_Name = segmentType + "_SD";
    
//     // Generate a mean reducer for calculating annual average NDVIs.
//     var avgNDVI_reducer = ee.Reducer.mean().setOutputs([avgNDVI_name]);
    
//     // Combine the mean and standard deviation reducers
//     //  as the reducer to apply to each group, without the group field.
//     var meanSD_reducer = ee.Reducer.mean().combine({
//       reducer2: ee.Reducer.stdDev(),
//       sharedInputs: true
//     });

//     // Create a non-duplicate list of the Hybas IDs.
//     var HybasID_list = rawSegments.aggregate_array(HybasID_name)
//       .distinct();
    
//     // Determine the band names of the annual NDVI image.
//     var NDVI_bandNames_List = annualNDVIs.bandNames();
    
    
//     /* Estimate the annual-average-NDVI mean and standard deviation
//       of each transect segment by basin. */

//     var segments_withNDVImeanSDs_AllBasins = HybasID_list.map(function(HybasID) {
      
//       // Create a filter of the Hybas ID.
//       var HybasID_filter = ee.Filter.eq(HybasID_name, HybasID);
      
//       // Identify the segments of each basin.
//       var rawSegments_perBasin = rawSegments
//         .filter(HybasID_filter);
      
      
//       /* Estimate the annual average NDVIs of all years of each segment in each basin. */
      
//       var allYearsAvgNDVIs_perBasin_List = NDVI_bandNames_List.map(function(bandName) {
        
//         // Select the NDVI band of each year.
//         var annualNDVI = annualNDVIs.select([bandName]);
        
//         // Determine the one-year average NDVI of each segment in the basin.
//         var oneYearAvgNDVIs_perBasin = annualNDVI.reduceRegions({
//           collection: rawSegments_perBasin, 
//           reducer: avgNDVI_reducer,
//           scale: proj.scale, 
//           crs: proj.crs
//         });
        
//         return oneYearAvgNDVIs_perBasin;
//       });
      
//       // Remove the generated Features that don't have the annual average NDVI. 
//       var allYearsAvgNDVIs_perBasin_FtrCol = ee.FeatureCollection(allYearsAvgNDVIs_perBasin_List)
//         .flatten().filter(ee.Filter.notNull([avgNDVI_name]));
      
      
//       /* Estimate the temporal mean and standard deviation of the annual average NDVIs
//         of each segment in each basin. */
      
//       // The grouped reduction:
//       //  1) The "groupField" argument is the index of the input in the selectors array
//       //    that contains the variables by which to group the output.
//       //    The first field is index 0.
//       //  2) The "groupName" argument specifies the name of the property
//       //    to store the value of the grouping variable.
//       var NDVImeanSDs_perBasin_List = ee.List(allYearsAvgNDVIs_perBasin_FtrCol.reduceColumns({
//         selectors: [avgNDVI_name, CLid_Name],
//         reducer: meanSD_reducer.group({
//           groupField: 1,
//           groupName: CLid_Name,
//         })
//       }).get("groups"));
      
//       // Convert the generated List to a FeatureCollection.
//       var NDVImeanSDs_perBasin_FtrCol = ee.FeatureCollection(NDVImeanSDs_perBasin_List.map(
//         function(listElement) {
//           var dictionary = ee.Dictionary(listElement);
          
//           return ee.Feature(null).set(
//             CLid_Name, dictionary.get(CLid_Name),
//             mean_Name, dictionary.get("mean"),
//             SD_Name, dictionary.get("stdDev")
//           );
//         }));
        
//       // Combine the average-NDVI trend with the corresponding segment.
//       var segments_withNDVImeanSDs_perBasin = FC_AP.combine_twoFtrCols_byCommonProperty(
//         rawSegments_perBasin, NDVImeanSDs_perBasin_FtrCol, CLid_Name
//       );
      
//       return segments_withNDVImeanSDs_perBasin;
//     });
    
//     // Return a FeatureCollection.
//     return ee.FeatureCollection(segments_withNDVImeanSDs_AllBasins)
//       .flatten();
//   };


// Function to calculate the annual spatial average NDVIs of each transect segment.
exports.Compute_AnnualAvgNDVIs_perSegment_byBasin = function(
  rawSegments, annualNDVIs, proj) {
    
    /**
     * "FeatureCollection": 
     *  rawSegments.
     * 
     * "Image":
     *  annualNDVIs.
     * 
     * "Dictionary":
     *  proj.
     * 
     * Result: FeatureCollection.
    */

    // Name the properties of the annual average NDVI calculation.
    var HybasID_name = "Hybas_ID";
    
    var yearName = "Year";
    
    var avgNDVI_name = "annualAvgNDVI";
    
    // Generate a reducer for calculating annual average NDVIs.
    var avgNDVI_reducer = ee.Reducer.mean().setOutputs([avgNDVI_name]);
    
    // Create a non-duplicate list of the Hybas IDs.
    var HybasID_list = rawSegments.aggregate_array(HybasID_name)
      .distinct();
    
    // Determine the band names of the annual NDVI image.
    var NDVI_bandNames_List = annualNDVIs.bandNames();
    
    
    /* Compute the annual spatial average NDVIs of each segment by basin. */

    var segments_withAnnualAvgNDVIs_AllBasins = HybasID_list.map(function(HybasID) {
      
      // Create a filter of the Hybas IDs.
      var HybasID_filter = ee.Filter.eq(HybasID_name, HybasID);
      
      // Identify the segments of each basin.
      var rawSegments_perBasin = rawSegments
        .filter(HybasID_filter);
      
      
      /* Calculate the annual average NDVIs of all years of each segment in each basin. */
      
      var allYearsAvgNDVIs_perBasin_List = NDVI_bandNames_List.map(function(bandName) {
        
        // Select the NDVI band of each year.
        var annualNDVI = annualNDVIs.select([bandName]);
        
        // Extract the corresponding "year" string.
        var yearString = ee.String(bandName).slice(8, 12);
        
        // Convert the "year" String to a Number.
        var yearNum = ee.Number.parse(yearString);
        
        // Determine the spatial average NDVI of that year for each segment in that basin.
        var oneYearAvgNDVIs_perBasin = annualNDVI.reduceRegions({
          collection: rawSegments_perBasin, 
          reducer: avgNDVI_reducer,
          scale: proj.scale, 
          crs: proj.crs
        });
        
        // Add a property of the current year to each generated annual Feature.
        var oneYearAvgNDVIs_withYear_perBasin = oneYearAvgNDVIs_perBasin
          .map(function(segment) {
            
            return segment.set(
              yearName, yearNum
            );
          });
        
        return oneYearAvgNDVIs_withYear_perBasin;
      });
      
      // Remove the generated annual Features that don't have an average NDVI. 
      var allYearsAvgNDVIs_perBasin_FtrCol = ee.FeatureCollection(allYearsAvgNDVIs_perBasin_List)
        .flatten().filter(ee.Filter.notNull([avgNDVI_name]));
      
      return allYearsAvgNDVIs_perBasin_FtrCol;
    });
    
    // Return a FeatureCollection.
    return ee.FeatureCollection(segments_withAnnualAvgNDVIs_AllBasins)
      .flatten();
  };


// Function to: 
// 1) Generate a 6-year moving window consisting of the annual average NDVIs
//  of the current year and the following 5 (or >= 3) years
//  for each annual NDVI Feature of transect segments.
// 2) Compute the maximum annual-NDVI standard deviation of all
//  6-year moving windows for each transect segment.
exports.Calculate_Max_MovWin_NDVIstdDev_perSegment_byBasin = function(
  selectedSegments, annual_NDVI_features, segmentType, CLid_Name) {
    
    /**
     * "FeatureCollection": 
     *  selectedSegments, annual_NDVI_features.
     * 
     * "String":
     *  segmentType, CLid_Name.
     * 
     * Result: FeatureCollection.
    */

    // Name the properties about Hybas IDs and annual average NDVIs.
    var HybasID_name = "Hybas_ID";
    
    var avgNDVI_name = "annualAvgNDVI";
    
    // Name the current year of each annual NDVI Feature.
    var Y0_Name = "Year";
    
    // Name the properties for joining the moving-window Features.
    var targetFtr_Name = "targetFeature_";
    
    var targetNum_Name = "targetFtr_Num";
    
    // Name the properties for computing all moving-window
    //  NDVI standard deviations for each segment.
    var movWinFirstYr_Name = "movWin_FirstYear";
    
    var movWinNDVIsd_Name = "movWin_NDVIsd";
    
    // Name the properties for extracting the max. moving-window
    //  NDVI standard deviation for each segment.
    var movWinNum_Name = segmentType + "_MovWinNum";
    
    var max_MovWinFirstYr_Name = segmentType + "_MaxMovWin_FirstYear";
    
    var max_MovWinNDVIsd_Name = segmentType + "_MaxMovWin_NDVIsd";
    
    // Create a reducer for computing all moving-window NDVI standard deviations
    //  for each segment.
    var NDVIsd_Reducer = ee.Reducer.stdDev().setOutputs([movWinNDVIsd_Name]);
    
    // Generate a reducer to calculate the max. moving-window NDVI standard deviation
    //  and extract the corresponding moving-window first year for each segment.
    var maxSD_withFirstYr_Reducer = ee.Reducer.max(2)
      .setOutputs([max_MovWinNDVIsd_Name, max_MovWinFirstYr_Name]);
    
    // Create a reducer to count the number of all moving windows
    //  for each segment.
    var movWinCount_Reducer = ee.Reducer.countDistinctNonNull()
      .setOutputs([movWinNum_Name]);
    
    // Combine the max. NDVI standard deviation and moving-window counting reducers.
    var maxSD_MovWinCount_CombinedReducer = maxSD_withFirstYr_Reducer.combine({
      reducer2: movWinCount_Reducer, 
      sharedInputs: false
    });
  
    // Create a non-duplicate list of the Hybas IDs.
    var HybasID_list = selectedSegments.aggregate_array(HybasID_name)
      .distinct();
    
    
    /* Compute the max. annual-NDVI standard deviation of all 6-year moving windows
      for each transect segment by basin. */

    var segments_withMaxMovWinNDVIsds_AllBasins = HybasID_list.map(function(HybasID) {
      
      // Create a filter of the Hybas IDs.
      var HybasID_filter = ee.Filter.eq(HybasID_name, HybasID);
      
      // Identify the selected segments in each basin.
      var selectedSegments_perBasin = selectedSegments
        .filter(HybasID_filter);
      
      // Extract the annual NDVI Features in each basin.
      var annualFeatures_perBasin = annual_NDVI_features
        .filter(HybasID_filter);
      
      
      /* Generate a 6-year moving window for each annual NDVI Feature in each basin. */
      
      var annualFeatures_withMovWinYrs_perBasin = annualFeatures_perBasin
        .map(function(annualFeature) {
          
          // Get the value of the current year for each annual Feature.
          var Y0_Value = ee.Number(annualFeature.get(Y0_Name));
          
          // Add the following five years iteratively.
          for (var yearID = 1; yearID <= 5; yearID ++) {
            // Name a new property for each year.
            var yearName = Y0_Name + "_" + yearID;
            
            // Derive the value of each year.
            var yearValue = Y0_Value.add(yearID);
            
            // Add the new property to the annual Feature.
            annualFeature = annualFeature.set(yearName, yearValue);
          }
          
          // Return the annual Feature with a moving window of 6 years.
          return annualFeature;
        });
      
      // Obtain the property names of each annual Feature with the 6-year moving window.
      var annualFeaturePrptNames_withMovWinYrs = annualFeatures_withMovWinYrs_perBasin.first()
        .propertyNames();
      
      // Create a non-duplicate list of the centerline IDs for each basin.
      var CLids_perBasin_List = selectedSegments_perBasin.aggregate_array(CLid_Name)
        .distinct();
      
      
      /* Calculate the max. moving-window NDVI standard deviation
        for each segment in each basin. */
      
      var segmentMaxMovWinNDVIsds_perBasin_List = CLids_perBasin_List.map(function(CLid) {
        
        // Create a filter of the centerline IDs.
        var CLid_Filter = ee.Filter.eq(CLid_Name, CLid);
        
        // Identify the annual Features of each segment.
        var singleSegment_withMovWinYrs = annualFeatures_withMovWinYrs_perBasin
          .filter(CLid_Filter);
        
        // Select all annual Features of years between 1985 and 2015
        //  (i.e., the first years of all moving windows)
        //  as the primary FeatureCollection in the joining operation.
        var primaryFtrCol_perSegment = singleSegment_withMovWinYrs.filter(
          ee.Filter.lte(Y0_Name, 2015)
        );
        
        // Join the annual Feature of each following year
        //  in the moving window iteratively to each primary Feature.
        for (var targetID = 1; targetID <= 5; targetID ++) {
          
          // Name the target year to join and the corresponding annual Feature.
          var targetYear_Name = Y0_Name + "_" + targetID;
          
          var matched = targetFtr_Name + targetID;
        
          // Define a filter as the target year of the primary Feature
          //  and the current year of the secondary Feature are the same.
          var targetYear_Filter = ee.Filter.equals({
            leftField: targetYear_Name,
            rightField: Y0_Name
          });
          
          // Define a save-first join 
          //  (Note: Include primary Features without matches in the result,
          //  so that annual Features with "gaps" in the moving window will be kept).
          var saveFirstJoin = ee.Join.saveFirst({
            matchKey: matched,
            outer: true
          });
          
          // Add the annual Feature of each target year to the corresponding primary Feature
          //  as a new property.
          primaryFtrCol_perSegment = saveFirstJoin.apply(
            primaryFtrCol_perSegment, 
            singleSegment_withMovWinYrs, 
            targetYear_Filter
          );
        }
        
        // Derive the number of the joined annual Features for each primary Feature.
        var primaryFtrCol_TargetsCounted_perSegment = primaryFtrCol_perSegment.map(
          function(primaryFtr) {
            
            // Count the joined annual Features for each primary Feature.
            var targetNum_Value = primaryFtr.select([targetFtr_Name + ".*"])
              .propertyNames().size();
            
            return primaryFtr.set(targetNum_Name, targetNum_Value);
          });
        
        // Select primary Features with the annual Features of
        //  at least 3 following years in the moving window.
        var selectedPrimaryFtrCol_perSegment = primaryFtrCol_TargetsCounted_perSegment.filter(
          ee.Filter.gte(targetNum_Name, 3)
        );
        
        
        /* Generate the moving windows of annual Features
          based on the selected primary Features of each segment. */
        
        var movWinFtrCol_perSegment = selectedPrimaryFtrCol_perSegment.map(
          function(primaryFtr_withTargets) {
            
            // Get all properties except the joined annual Features.
            var primaryFtr_noTargets = primaryFtr_withTargets
              .select(annualFeaturePrptNames_withMovWinYrs);
            
            // Determine the first year of each moving window.
            var movWinFirstYr_Value = primaryFtr_noTargets.get(Y0_Name);
            
            // Add the first moving-window year to the primary Feature as a "group ID".
            var primaryFtr_withMovWinFirstYr = primaryFtr_noTargets
              .set(movWinFirstYr_Name, movWinFirstYr_Value);
            
            // Obtain the names of the joined annual Features.
            var targetNames_List = primaryFtr_withTargets.select([targetFtr_Name + ".*"])
              .propertyNames();
            
            // Create a raw moving-window Feature list based on the primary Feature.
            var raw_MovWin_FtrList = ee.List([primaryFtr_withMovWinFirstYr]);
            
            // Function to iteratively add each joined annual Feature
            //  into the moving-window Feature list.
            var addEachTargetFtr = function(targetName, movWin_FtrList) {
              
              // Extract each joined annual Feature.
              var currentTargetFtr = primaryFtr_withTargets.get(targetName);
              
              // Add the first moving-window year to the annual Feature as a "group ID".
              var currentTargetFtr_withMovWinFirstYr = ee.Feature(currentTargetFtr)
                .set(movWinFirstYr_Name, movWinFirstYr_Value);
              
              // Add the annual Feature into the moving-window Feature list.
              return ee.List(movWin_FtrList).add(currentTargetFtr_withMovWinFirstYr);
            };
            
            // Generate a list of annual Features for the moving window.
            var movWin_withTargets_List = ee.List(targetNames_List.iterate({
              function: addEachTargetFtr, 
              first: raw_MovWin_FtrList
            }));
            
            var movWin_withTargets_FtrCol = ee.FeatureCollection(movWin_withTargets_List);
            
            // Return the generated moving-window FeatureCollection
            //  with the same first moving-window year as a "group ID".
            return movWin_withTargets_FtrCol;
          }).flatten();
        
        
        /* Calculate the standard deviation of all the 6 (or >= 4) annual average NDVIs
          for each moving window of each segment. */
        
        // Group the annual average NDVIs by the first moving-window year
        //  and then calculate the standard deviation of annual NDVIs
        //  for each group (i.e., moving window).
        var movWinNDVIsds_perSegment_List = ee.List(movWinFtrCol_perSegment.reduceColumns({
          selectors: [avgNDVI_name, movWinFirstYr_Name],
          reducer: NDVIsd_Reducer.group({
            groupField: 1,
            groupName: movWinFirstYr_Name,
          })
        }).get("groups"));
        
        // Convert the generated list to a FeatureCollection.
        var movWinNDVIsds_perSegment_FtrCol = ee.FeatureCollection(movWinNDVIsds_perSegment_List
          .map(function(movWin_Prpts) {
            
            // Create a Feature with NULL geometry for each moving window.
            return ee.Feature(null).set(movWin_Prpts);
          }));
        
        
        /* Derive the max. NDVI standard deviation of all moving windows for each segment. */
        
        // Output the max. standard deviation and the corresponding first moving-window year
        //  and also count the number of moving windows (i.e., first years) for each segment.
        var maxMovWinNDVIsd_perSegment = movWinNDVIsds_perSegment_FtrCol.reduceColumns({
          selectors: [movWinNDVIsd_Name, movWinFirstYr_Name, movWinFirstYr_Name],
          reducer: maxSD_MovWinCount_CombinedReducer
        });
        
        // Create a Feature with the centerline ID and NULL geometry for each segment.
        return ee.Feature(null).set(maxMovWinNDVIsd_perSegment)
          .set(CLid_Name, CLid);
      });
      
      // Convert the generated Feature list of each basin to a FeatureCollection.
      var segmentMaxMovWinNDVIsds_perBasin_FtrCol =
        ee.FeatureCollection(segmentMaxMovWinNDVIsds_perBasin_List);
      
      // Combine each segment Feature in each basin with the corresponding
      //  max. moving-window NDVI standard deviation Feature.
      var segments_withMaxMovWinNDVIsds_perBasin =
        FC_AP.combine_twoFtrCols_byCommonProperty(
          selectedSegments_perBasin, 
          segmentMaxMovWinNDVIsds_perBasin_FtrCol, 
          CLid_Name
        );
      
      return segments_withMaxMovWinNDVIsds_perBasin;
    });
    
    // Return a FeatureCollection.
    return ee.FeatureCollection(segments_withMaxMovWinNDVIsds_AllBasins)
      .flatten();
  };


/**** Functions relevant to other transect/segment analyses. ****/

// Function to average the temporal maximum spectral-change-magnitude values
//  at all 30-m pixels within each transect segment.
exports.Compute_AvgTmaxSCMAG_perSegment_byBasin = function(
  rawSegments, TmaxSCMAG, proj, segmentType) {
    
    /**
     * "FeatureCollection": 
     *  rawSegments.
     * 
     * "Image":
     *  TmaxSCMAG.
     * 
     * "Dictionary":
     *  proj.
     * 
     * "String":
     *  segmentType.
     * 
     * Result: FeatureCollection.
    */

    // Name the properties of interest.
    var HybasID_name = "Hybas_ID";
    
    var avgSCMAG_name = segmentType + "_AvgTmaxSCMAG";
    
    // Generate a reducer for calculating the average spectral change magnitude.
    var avgSCMAG_reducer = ee.Reducer.mean().setOutputs([avgSCMAG_name]);
    
    // Create a non-duplicate list of the Hybas IDs.
    var HybasID_list = rawSegments.aggregate_array(HybasID_name)
      .distinct();
    
    
    /* Compute the average spectral change magnitude of each segment by basin. */

    var segment_AvgSCMAGs_AllBasins_List = HybasID_list.map(function(HybasID) {
      
      // Create a filter of the Hybas IDs.
      var HybasID_filter = ee.Filter.eq(HybasID_name, HybasID);
      
      // Identify the segments within each basin.
      var rawSegments_perBasin = rawSegments
        .filter(HybasID_filter);
      
      // Determine the spatial average value of each identified segment.
      var segment_AvgSCMAGs_perBasin = TmaxSCMAG.reduceRegions({
        collection: rawSegments_perBasin, 
        reducer: avgSCMAG_reducer,
        scale: proj.scale, 
        crs: proj.crs
      });
      
      // Return a FeatureCollection.
      return segment_AvgSCMAGs_perBasin;
    });
    
    // Remove the segments that don't have an average spectral change magnitude. 
    var segment_AvgSCMAGs_AllBasins_FtrCol = 
      ee.FeatureCollection(segment_AvgSCMAGs_AllBasins_List)
        .flatten()
        .filter(ee.Filter.notNull([avgSCMAG_name]));
    
    // Return a FeatureCollection.
    return segment_AvgSCMAGs_AllBasins_FtrCol;
  };


// Function to select transects meeting the following criteria:
//  1) The centerline length is between 300 m (10 px) and 6,000 m (200 px).
//  2) The number of NDVI elevational-gradient observations is at least 10.
exports.select_TransectGradTrends = function(rawTransects) {
  
  /**
   * "FeatureCollection":
   *  rawTransects.
  */
  
  // Determine the names of the properties of interest.
  var CLlength_Name = "CL_length";
  
  var obs_Name = "yearCount";
  
  // Determine the filtering thresholds.
  var CLlength_LowerThres = 3e2;
  
  var CLlength_UpperThres = 6e3;
  
  var obs_Thres = 10;
  
  // Define the Filters.
  var CLlength_LowerFilter = ee.Filter.gte(CLlength_Name, 
    CLlength_LowerThres);
  
  var CLlength_UpperFilter = ee.Filter.lte(CLlength_Name, 
    CLlength_UpperThres);
  
  var obs_Filter = ee.Filter.gte(obs_Name, 
    obs_Thres);
  
  // Combine the Filters.
  var combinedFilter = ee.Filter.and(
    CLlength_LowerFilter,
    CLlength_UpperFilter,
    obs_Filter
  );
  
  // Filter the transects.
  var filteredTransects = rawTransects.filter(combinedFilter);
  
  // Return a "FeatureCollection."
  return filteredTransects;
};


// Function to select transects with the information on the corresponding
//  lower and upper segments (TLUs) meeting the following criteria:
//  1) The centerline length is between 500m and 2km.
//  2) All numbers of observations are at least 10.
//  3) Both temporal NDVI standard deviations are NOT over 0.2.
exports.select_TLUs = function(rawTransects) {
  
  /**
   * "FeatureCollection":
   *  rawTransects.
  */
  
  // Determine the filtering thresholds.
  var length_LowerThres = 500;
  
  var length_UpperThres = 2e3;
  
  var obs_Thres = 10;
  
  var SD_thres = 0.2;
  
  // 1) The centerline length is between 500m and 2km.
  var length_Name = "CL_length";
  
  var length_LowerFilter = ee.Filter.gte(length_Name, 
    length_LowerThres);
  
  var length_UpperFilter = ee.Filter.lte(length_Name, 
    length_UpperThres);
  
  // 2) All numbers of observations are at least 10.
  var grad_ObsFilter = ee.Filter.gte("gradYears", 
    obs_Thres);
  
  var lower_ObsFilter = ee.Filter.gte("lower_Years", 
    obs_Thres);
  
  var upper_ObsFilter = ee.Filter.gte("upper_Years", 
    obs_Thres);
  
  // 3) Both temporal NDVI standard deviations are NOT over 0.2.
  var lower_SDfilter = ee.Filter.lte("lower_SD", 
    SD_thres);
  
  var upper_SDfilter = ee.Filter.lte("upper_SD", 
    SD_thres);
  
  // Combine all the Filters.
  var combinedFilter = ee.Filter.and(
    length_LowerFilter,
    length_UpperFilter,
    grad_ObsFilter,
    lower_ObsFilter,
    upper_ObsFilter,
    lower_SDfilter,
    upper_SDfilter
  );
  
  // Filter the transects.
  var filteredTransects = rawTransects.filter(combinedFilter);
  
  // Return a FeatureCollection.
  return filteredTransects;
};



/**** Functions to aggregate variables to the basin level. ****/

// Function to aggregate the estimated NDVI elevational-gradient trends
//  of the transects in each basin.
exports.aggregate_TransectGradTrends_byBasin = 
  function(transectGradTrends, rawBasins, CLid_Name) {
    
    /**
     * "FeatureCollection":
     *  transectGradTrends, rawBasins.
     * 
     * "String":
     *  CLid_Name.
    */
    
    // Determine the names of the properties of interest.
    var HybasID_name = "Hybas_ID";
    
    var HybasID_rawName = "HYBAS_ID";
    
    var trend_Name = "gradTrend";
    
    var mean_Name = "mean";
    
    var SD_name = "stdDev";
    
    // Generate a combined reducer to calculate the statistics of the gradient trends.
    var combinedReducer_forTrend = ee.Reducer.mean().combine({
      reducer2: ee.Reducer.stdDev(), 
      sharedInputs: true
    });
    
    // Add a reducer to count the number of transects.
    var finalCombinedReducer = combinedReducer_forTrend.combine({
      reducer2: ee.Reducer.countDistinctNonNull(), 
      sharedInputs: false
    });
  
  
    /* Aggregate the NDVI elevational-gradient trends by basin. */
    
    // The grouped reduction:
    //  1) The "groupField" argument is the index of the input in the selectors array
    //    that contains the variables by which to group the output.
    //    The first field is index 0.
    //  2) The "groupName" argument specifies the name of the property
    //    to store the value of the grouping variable.
    var basinGradTrends_List = ee.List(transectGradTrends.reduceColumns({
      selectors: [trend_Name, CLid_Name, HybasID_name],
      reducer: finalCombinedReducer.group({
        groupField: 2,
        groupName: HybasID_name,
      })
    }).get("groups"));
    
    // Convert the generated List to a FeatureCollection.
    var basinGradTrends_FtrCol = ee.FeatureCollection(basinGradTrends_List.map(
      function(listElement) {
        var dictionary = ee.Dictionary(listElement);
        
        return ee.Feature(null).set(
          HybasID_name, dictionary.get(HybasID_name),
          "Transect_Number", dictionary.get("count"),
          trend_Name + "_" + mean_Name, dictionary.get(mean_Name),
          trend_Name + "_" + SD_name, dictionary.get(SD_name)
        );
      }));
  
    // Combine each aggregated-trend Feature with the corresponding basin geometry.
    var basinGradTrends_withGeometries = FC_AP.combine_twoFtrCols_primaryGeometriesANDsecondaryProperties(
      rawBasins, basinGradTrends_FtrCol, HybasID_rawName, HybasID_name
    );
  
    // Return a "FeatureCollection."
    return basinGradTrends_withGeometries;
  };


// Function to aggregate the three types of temporal trends
//  of the TLUs in each basin.
exports.aggregate_TLUsTrends_byBasin = 
  function(rawTLUs, rawBasins, CLid_Name) {
    
    /**
     * "FeatureCollection":
     *  rawTLUs, rawBasins.
     * 
     * "String":
     *  CLid_Name.
    */
    
    // Names of the three types of temporal trends.
    var grad_Tname = "gradTrend";
    
    var lower_Tname = "lower_Trend";
    
    var upper_Tname = "upper_Trend";
    
    // Names of the means of temporal trends.
    var grad_Tmean = "gradTr_Mean";
    
    var lower_Tmean = "lowerTr_Mean";
    
    var upper_Tmean = "upperTr_Mean";
    
    // Names of the SDs of temporal trends.
    var grad_tSD = "gradTr_SD";
    
    var lower_tSD = "lowerTr_SD";
    
    var upper_tSD = "upperTr_SD";
    
    // Determine the names of other properties of interest.
    var HybasID_rawName = "HYBAS_ID";
    
    var HybasID_name = "Hybas_ID";
    
    var count_Name = "Transect_Number";
    
    // Generate a reducer to calculate the statistics 
    //  of each type of temporal trends.
    var gradTrend_Reducer = ee.Reducer.mean().combine({
      reducer2: ee.Reducer.stdDev(), 
      sharedInputs: true
    }).setOutputs([grad_Tmean, grad_tSD]);
    
    var lowerTrend_Reducer = ee.Reducer.mean().combine({
      reducer2: ee.Reducer.stdDev(), 
      sharedInputs: true
    }).setOutputs([lower_Tmean, lower_tSD]);
    
    var upperTrend_Reducer = ee.Reducer.mean().combine({
      reducer2: ee.Reducer.stdDev(), 
      sharedInputs: true
    }).setOutputs([upper_Tmean, upper_tSD]);
    
    // Generate a combined reducer to calculate the statistics 
    //  of all the three types of temporal trends.
    var combinedReducer_AllTrends = gradTrend_Reducer.combine({
      reducer2: lowerTrend_Reducer, 
      sharedInputs: false
    }).combine({
      reducer2: upperTrend_Reducer, 
      sharedInputs: false
    });
  
    // Add a reducer to count the number of TLUs.
    var finalCombinedReducer = combinedReducer_AllTrends.combine({
      reducer2: ee.Reducer.countDistinctNonNull().setOutputs([count_Name]), 
      sharedInputs: false
    });
  
  
    /* Aggregate the three types of temporal trends by basin. */
    
    // The grouped reduction:
    //  1) The "groupField" argument is the index of the input in the selectors array
    //    that contains the variables by which to group the output.
    //    The first field is index 0.
    //  2) The "groupName" argument specifies the name of the property
    //    to store the value of the grouping variable.
    var basinTrends_List = ee.List(rawTLUs.reduceColumns({
      selectors: [grad_Tname, lower_Tname, upper_Tname, CLid_Name, HybasID_name],
      reducer: finalCombinedReducer.group({
        groupField: 4,
        groupName: HybasID_name,
      })
    }).get("groups"));
    
    // Convert the generated List to a FeatureCollection.
    var basinTrends_FtrCol = ee.FeatureCollection(basinTrends_List.map(
      function(listElement) {
        
        // Create a Feature with NULL geometry.
        return ee.Feature(null).set(listElement);
      }));
  
    // Combine each aggregated Feature with the corresponding basin geometry.
    var basinTrends_withGeometries = FC_AP.combine_twoFtrCols_primaryGeometriesANDsecondaryProperties(
      rawBasins, basinTrends_FtrCol, HybasID_rawName, HybasID_name
    );
  
    // Return a FeatureCollection.
    return basinTrends_withGeometries;
  };



/**** Functions for validating the elevational transects. ****/

// Function to calculate the unweighted average value and the corresponding 
//  pixel number of a single-band variable for each transect segment.
exports.Compute_UnWtdAvgVar_PxNum_perSegment = function(
  rawSegments_FC, var_Img, avgVarName_Str, pxNumName_Str, proj_Dict) {
    
    /**
     * "FeatureCollection": 
     *  rawSegments_FC.
     * 
     * "Image":
     *  var_Img.
     * 
     * "String":
     *  avgVarName_Str, pxNumName_Str.
     * 
     * "Dictionary":
     *  proj_Dict.
     * 
     * Result: FeatureCollection.
    */

    // Name the properties of interest.
    var HybasID_name = "Hybas_ID";
    
    // Generate a Reducer for calculating the unweighted 
    //  average variable.
    var meanReducer = ee.Reducer.mean().unweighted()
      .setOutputs([avgVarName_Str]);
    
    // Define a Reducer for counting the corresponding pixels.
    var countReducer = ee.Reducer.count()
      .setOutputs([pxNumName_Str]);
    
    // Combine the unweighted mean Reducer and pixel counting Reducer.
    var meanCountReducer = meanReducer.combine({
      reducer2: countReducer, 
      sharedInputs: true
    });
    
    // Create a non-duplicate list of the Hybas IDs.
    var HybasID_list = rawSegments_FC.aggregate_array(HybasID_name)
      .distinct();
    
    
    /* Compute the average variable and the pixel number for each segment. */

    var segments_withAvgVarPxNum_AllBasins = HybasID_list.map(function(HybasID) {
      
      // Create a Filter of the Hybas ID.
      var HybasID_filter = ee.Filter.eq(HybasID_name, HybasID);
      
      // Identify the segments in each basin.
      var rawSegments_perBasin = rawSegments_FC
        .filter(HybasID_filter);
      
      // Data computation by segment.
      var segments_withAvgVarPxNum_perBasin = var_Img.reduceRegions({
        collection: rawSegments_perBasin, 
        reducer: meanCountReducer,
        scale: proj_Dict.scale, 
        crs: proj_Dict.crs
      });
      
      // Return the resulting segments of each basin.
      return segments_withAvgVarPxNum_perBasin;
    });
    
    // Return the produced segments of all basins.
    return ee.FeatureCollection(segments_withAvgVarPxNum_AllBasins)
      .flatten();
  };

