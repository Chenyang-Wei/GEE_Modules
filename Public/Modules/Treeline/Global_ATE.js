/** 
 * Introduction:
 *  This is a module for objects and funcitons related to
 *    the global alpine treeline ecotone (ATE) project.
 * 
 * Reference to the public repository:
 *  https://code.earthengine.google.com/?scriptPath=users/ChenyangWei/Public
 * 
 * Load this module:
 *  var GATE = require("users/ChenyangWei/Public:Modules/Treeline/Global_ATE.js");
 * 
 * Update: 6/1/2023.
 */



/****** Objects. ******/

/* Areas of interest: 
  the 10-km buffered bounding box of the study domain
    within each continent. */

// North America.
exports.AOI_NorthAmerica = ee.Geometry.Rectangle({
  coords: [-180, 7.114761500193937, -52.095625030545534, 80.24342770493531],
  geodesic: false
});

// South America.
exports.AOI_SouthAmerica = ee.Geometry.Rectangle({
  coords: [[-109.61604935443158,-56.00583412286005],
    [-28.68239728959196,13.47877305668919]],
  geodesic: false
});

// Asia.
exports.AOI_Asia = ee.Geometry.Rectangle({
  coords: [[25.070944865790178,-12.370472853749458],
    [180,81.37103685520522]],
  geodesic: false
});

// Europe.
exports.AOI_Europe = ee.Geometry.Rectangle({
  coords: [[-31.546113802033677, 34.71204055896572],
    [61.96974908940637, 71.27408645016632]],
  geodesic: false
});

// Africa.
exports.AOI_Africa = ee.Geometry.Rectangle({
  coords: [[-25.492819736711297,-47.07238134131982],
    [63.634730607383325,37.63280220193939]],
  geodesic: false
});

// Oceania (on the west side of 180 degrees).
exports.AOI_Oceania = ee.Geometry.Rectangle({
  coords: [[112.75775254694261,-54.85230853959079],
    [180,28.305403384827716]],
  geodesic: false
});


//// Asia segments.
// Asia_1.
exports.AOI_Asia_1 = ee.Geometry.Rectangle({
  coords: [[124.06877598783099,58.56731865607332],
    [180,81.37103685520522]],
  geodesic: false
});

// Asia_2.
exports.AOI_Asia_2 = ee.Geometry.Rectangle({
  coords: [[124.06877598783099,-12.370472853749458],
    [180,58.56731865607332]],
  geodesic: false
});

// Asia_3.
exports.AOI_Asia_3 = ee.Geometry.Rectangle({
  coords: [[81.61299350433724,60.460381939329075],
    [124.06877598783099,81.37103685520522]],
  geodesic: false
});

// Asia_4.
exports.AOI_Asia_4 = ee.Geometry.Rectangle({
  coords: [[81.61299350433724,-12.370472853749458],
    [124.06877598783099,60.460381939329075]],
  geodesic: false
});

// Asia_5.
exports.AOI_Asia_5 = ee.Geometry.Rectangle({
  coords: [[25.070944865790178,50.35979763978469],
    [81.61299350433724,81.37103685520522]],
  geodesic: false
});

// Asia_6.
exports.AOI_Asia_6 = ee.Geometry.Rectangle({
  coords: [[25.070944865790178,-12.370472853749458],
    [81.61299350433724,50.35979763978469]],
  geodesic: false
});


//// Alps (for testing).
exports.AOI_Alps =
    ee.Geometry.Polygon(
        [[[9.133311318191705, 47.608606435597885],
          [9.133311318191705, 45.838978932698396],
          [12.132578896316705, 45.838978932698396],
          [12.132578896316705, 47.608606435597885]]], null, false);



/* Working directories. */

// Global.
exports.wd_Global = "users/treeline/Global/";

// Europe.
exports.wd_Europe = "users/ChenyangWei/Europe_ATE/";
exports.wd_Europe_2 = "users/RealEarth/Europe_ATE_2/";

// North America.
exports.wd_NorthAmerica = "users/treeline/NorthAmerica_GME/";

// South America.
exports.wd_SouthAmerica = "users/ATE/South_America_ATE/";

// Africa.
exports.wd_Africa = "users/Mountains/Africa_ATE/";

// Oceania.
exports.wd_Oceania = "users/YushanFu/Oceania_ATE/";

// Asia.
exports.wd_Asia = "users/RealEarth/Asia_ATE/";
exports.wd_Asia_2 = "users/treeline/Asia_ATE_2/";



/* Cloud asset directories. */

// Europe.
exports.cloud_Europe = "projects/europe-ate/assets/";



/* Study domain names. */

// North America.
exports.studyDomain_NorthAmerica = "NorthAmerica_LSIB_SIMPLE";

// South America.
exports.studyDomain_SouthAmerica = "SouthAmerica_LSIB_SIMPLE";

// Africa.
exports.studyDomain_Africa = "Africa_LSIB_SIMPLE";

// Oceania.
exports.studyDomain_Oceania = "Oceania_LSIB_SIMPLE";

// Europe.
exports.studyDomain_Europe = "Europe_nonHighLat_LSIB_SIMPLE";

// Asia.
exports.studyDomain_Asia = "Asia_LSIB_SIMPLE";



/* Folder names. */

// Smoothed annual maximum NDVI.
exports.annualNDVI_folderName = "medianSmdAnnualMaxNDVI_cloudShadowMasked_300mBufNewCATE_AOI/";



/* File names. */

// New climate-based ATEs (CATEs) worldwide.
exports.globalNewCATE_fileName = "Climatic_Alpine_Treeline_Ecotones_v1_0";

// New climatic ATE (CATE) in the AOI.
exports.newCATE_fileName = "30mNewCATE_gteSmd10kmCForestElv_3kmCForestBuffer_AOI";

// Segmented new CATE with both invalid landforms and ridges removed.
exports.SegmentedNewCATE_fileName = "30mSegmentedNewCATE_distToAllRidgesNoCliff_invalidLandformsRemoved_ridgesRemoved"; 

// Centerlines of elevational transects.
exports.Centerlines_fileName = "TransectCenterLines_LowerClosedForests_UpperNonForested_30mSegmentedNewCATE";

// Grouped pixel centroids along the medial axis.
exports.groupedPxCtds_fileName = "grouped_Adjacent_MedialPxCtds";

// Buffered grouped pixel centroids along the medial axis.
exports.buffered_GroupedPxCtds_fileName = "meanAbsDistBuffered_Grouped_MedialPxCtds";

// Lowest closed-forest point in the lower region 
//  within each buffer of the pixel centroids along the medial axis.
exports.CFpts_fileName = "MinElv_LowerCFpt_perMedialPxCtdBuffer";

// Highest non-forested point in the upper region 
//  within each buffer of the pixel centroids along the medial axis.
exports.NonFpts_fileName = "MaxElv_UpperNonFpt_perMedialPxCtdBuffer";


// Unioned lowest closed-forest point in the lower region.
exports.unionedCFpts_fileName = "unionedPolygons_CFpts";

// Unioned highest non-forested point in the upper region.
exports.unionedNonFpts_fileName = "unionedPolygons_NonFpts";


// Grouped lowest closed-forest point in the lower region.
exports.groupedCFpts_fileName = "grouped_AdjacentCFpts";

// Grouped highest non-forested point in the upper region.
exports.groupedNonFpts_fileName = "grouped_AdjacentNonFpts";

// Mid-one-third segment around the centroid 
//  of each transect centerline. 
exports.midOneThirds_fileName = "MidOneThirdSegments_TransectCLs";



/* File names relevant to the medial axis and basins. */

// Squared distance (in pixels) to the nearest ridges/valleys 
//  at each pixel along the medial axis.
exports.medialAxis_fileName = "medialAxis_sqDist_inPixels";

// Selected HydroSHEDS basins ("hybas_12") intersecting the study domain
//  with the medial axis between ridges and valleys in the new CATE. 
exports.selectedBasins_fileName = "Hybas12Basins_MedialAxis_StudyDomain";

// Non-duplicate selected basins in an AOI of Asia. 
exports.nonDuplicateBasins_fileName = "nonDuplicateBasins_AsianAOI";

// Selected HydroSHEDS basin groups based on the self-created ID. 
exports.groupedBasins_fileName = "selectedBasins_Group_";

// Pixel centroids along the medial axis between ridges and valleys.
exports.medialAxisPxCtds_fileName = "medialAxis_PixelCentroids_8connected";

// Raw elevational transect centerlines by basin group.
exports.medialAxisPxCtds_byBasinGroup_fileName = "PixelCentroids_BasinGroup_";

// Pixel centroids along the medial axis buffered
//  by the corresponding distance to the nearest ridges/valleys.
exports.distBufferedPxCtds_fileName = "distanceBuffered_MedialAxisPixelCentroids";



/* File names relevant to raw centerlines. */

// Raw elevational transect centerlines between
//  the highest non-forested spot of the ridge landforms and
//  the lowest closed forest of the non-ridge landforms
//  in each qualified buffer of the medial-axis pixel centroids.
exports.rawCLs_fileName = "rawCLs_HighestRidgeNonF_LowestNonRidgeCF_perMedialAxisBuffer";

// Raw elevational transect centerlines by basin group.
exports.rawCLs_byBasinGroup_fileName = "rawCLs_BasinGroup_";

// Raw elevational transect centerlines of all basin groups.
exports.rawCLs_AllBasinGroups_fileName = "rawCLs_AllBasinGroups";

// Centroids of all transect centerlines.
exports.centroids_AllRawCLs_fileName = "centroids_AllRawCLs";



/* File names relevant to mid-quarter segments. */

// Mid-quarter segment around the centroid 
//  of each transect centerline. 
exports.midQuarters_fileName = "MidQuarterSegments_RawCLs";

// Mid-quarter segments by basin group. 
exports.midQuarters_byBasinGroup_fileName = "MidQuarterSegments_BasinGroup_";

// Mid-quarter segments of all transect centerlines. 
exports.midQuarters_AllRawCLs_fileName = "MidQuarterSegments_AllRawCLs";



/* File names relevant to mid-segment buffers. */

// 90-m buffer of the mid-quarter segments. 
exports.midQuarterBuffers_fileName = "MidQuarters_90mBuffered";

// 90-m buffer of the mid-quarter segments by basin group. 
exports.midQuarterBuffers_byBasinGroup_fileName = "MidQuarterBuffers_BasinGroup_";

// 90-m buffer of mid-quarter segments of all transect centerlines. 
exports.midQuarterBuffers_AllRawCLs_fileName = "MidQuarters_AllRawCLs_90mBuffered";

// // 90-m buffer of the mid-quarter segments of all basin groups. 
// exports.midQuarterBuffers_AllBasinGroups_fileName = "MidQuarterBuffers_AllBasinGroups";



/* File names relevant to unioned mid-segment buffers. */

// Polygons of the unioned 90m-buffer of the mid-quarter segments.
exports.unionedBuffer_fileName = "unionedPolygons_90mBufferedMidQuarters";

// Unioned MultiPolygon of the buffers of the mid-segments.
exports.multiPolygon_BufferUnion_fileName = "unionedMultiPolygon_90mBufferedMidQuarters";

// Unioned MultiPolygon of the buffers of the mid-segments by basin group.
exports.multiPolygon_BufferUnion_byBasinGroup_fileName = "unionedMultiPolygon_BasinGroup_";

// Unioned MultiPolygon of the mid-segment buffers of all basin groups.
exports.multiPolygon_BufferUnion_AllBasinGroups_fileName = "unionedMultiPolygon_AllBasinGroups";



// /* File names relevant to the "steepest" transects. */

// // Identified mid-segment with the largest elevational range in each group.
// exports.identified_MidSegments_fileName = "steepestMidQuarters_90mBuffered";

// // Locally "steepest" transect centerlines grouped by 
// //  identifying mid-segments within 90m to one another.
// exports.steepestCLs_fileName = "steepestTransectCLs_GroupedBy_90mBufferedMidQuarters";



/*  File names relevant to the "Hybas ID" assignment. */

// All centerline centroids with the corresponding Hybas IDs.
exports.CLcentroids_withHybasIDs_fileName = "allCLcentroids_withHybasIDs";

// Centerline centroids with the corresponding Hybas IDs by basin group.
exports.CLcentroids_withHybasIDs_byBasinGroup_fileName = "CLcentroids_withHybasIDs_BasinGroup_";

// All mid-quarter buffers with the corresponding Hybas IDs.
exports.midQuarterBuffers_withHybasIDs_fileName = "allMidQuarterBuffers_withHybasIDs";

// Mid-quarter buffers with the corresponding Hybas IDs by basin group.
exports.midQuarterBuffers_withHybasIDs_byBasinGroup_fileName = 
  "midQuarterBuffers_withHybasIDs_BasinGroup_";

// All mid-quarter segments with the corresponding Hybas IDs.
exports.midQuarters_withHybasIDs_fileName = "allMidQuarters_withHybasIDs";

// Mid-quarter segments with the corresponding Hybas IDs by basin group.
exports.midQuarters_withHybasIDs_byBasinGroup_fileName = 
  "midQuarters_withHybasIDs_BasinGroup_";

// All centerlines with the corresponding Hybas IDs.
exports.CLs_withHybasIDs_fileName = "allCenterlines_withHybasIDs";

// Centerlines with the corresponding Hybas IDs by basin group.
exports.CLs_withHybasIDs_byBasinGroup_fileName = 
  "centerlines_withHybasIDs_BasinGroup_";



/*  File names relevant to the transect grouping by basin. */

// Unioned MultiPolygons of the mid-segment buffers of each basin.
exports.unionedMultiPolygons_perBasin_fileName = "unionedMultiPolygons_MidQuarterBuffers_perBasin";

// Unioned MultiPolygons of the mid-segment buffers of each basin by basin group.
exports.unionedMultiPolygons_perBasin_byBasinGroup_fileName = 
  "unionedMultiPolygons_perBasin_BasinGroup_";

// Individual Polygons of the unioned mid-segment buffer of each basin.
exports.unionedIndivPlgs_perBasin_fileName = "IndivPolygons_UnionedBuffers_perBasin";

// Individual Polygons of the unioned mid-segment buffer of each basin by basin group.
exports.unionedIndivPlgs_perBasin_byBasinGroup_fileName = 
  "IndivPolygons_perBasin_BasinGroup_";

// Locally "steepest" centerlines based on the 90m-buffered mid-quarter segments.
exports.allSteepestCLs_fileName = "allSteepestCLs_90mBufferedMidQuarters";

// Locally "steepest" centerlines by basin group.
exports.steepestCLs_byBasinGroup_fileName = "steepestCLs_BasinGroup_";



/* File names relevant to the NDVI analysis of transects. */

// Estimated annual elevational NDVI gradients of each 90-m transect.
exports.annualElvNDVIgradients_fileName = "allAnnualElvNDVIgradients_90mTransects";

// Estimated annual elevational NDVI gradients of each 90-m transect without "NaN."
exports.annualElvNDVIgradients_nonNaN_PropertiesSelected_fileName =
  "annualElvNDVIgradients_nonNaN_PropertiesSelected_90mTransects";

// Estimated temporal trends of annual elevational NDVI gradients
//  by 90-m transect.
exports.elvNDVIgradientTrends_fileName =
  "elvNDVIgradients_TemporalTrends_90mTransects";



/* File names relevant to the ATEI estimation. */

// Estimated annual ATEIs.
exports.annualATEI_fileName = "AnnualATEI_1985to2020_newCATE_AOI";



/* List of periods from 1984 to 2020. */

// The first period contains five years,
//  each period after that contains four years.
exports.periodList = [[1984, 1988], // Five years.
  [1989, 1992], // Four years hereafter.
  [1993, 1996],
  [1997, 2000],
  [2001, 2004],
  [2005, 2008],
  [2009, 2012],
  [2013, 2016],
  [2017, 2020]];




/****** Functions. ******/

/* Load the ALOS elevation (Version 3.2, released in January 2021) in the geometry of interest. */

exports.load_ALOSelevation = function(geometry, proj) {
  var ALOSelevation = ee.ImageCollection('JAXA/ALOS/AW3D30/V3_2').select('DSM')
    .filterBounds(geometry)
    .mosaic()
    .reproject(proj);
  
  return ALOSelevation;
};



/* ALOS landforms processing. */

//// Load and reproject the ALOS landforms dataset.
exports.loadReproject_ALOSlandforms = function(proj) {
  // The landform dataset is based on the 30m "AVE" band of JAXA's ALOS DEM 
  //  (available in EE as JAXA/ALOS/AW3D30_V1_1).
  //  There are stripes of invalid data in areas over 60 degrees in latitude.
  var rawLF = ee.Image('CSP/ERGo/1_0/Global/ALOS_landforms').select('constant')
    .reproject(proj);
  
  // Remove the high-latitude stripes of invalid landforms  
  //  in the landform dataset (based on the ALOS DEM V1.1).
  var ALOSv11 = ee.Image("JAXA/ALOS/AW3D30_V1_1").select("AVE")
    .reproject(proj);
  
  var Landforms_noInvaid = rawLF.updateMask(ALOSv11.mask());
  
  return Landforms_noInvaid;
};


//// Extract the landforms of ridges.
exports.extractRidgeLandforms = function(landforms) {
  var ridges = landforms.lte(14);
  
  return ridges;
};
// Pixel values: 11 ~ 14, including: peak/ridge (warm/normal/cool) and mountain/divide.
// No cliff (15), because its shape is normally irregular and 
//  its distribution is more random than the peak/ridge or the mountain/divide.


//// Extract the landforms of valleys.
exports.extractValleyLandforms = function(landforms) {
  var valleys = landforms.gte(41);
  
  return valleys;
};


//// Extract the landforms of upper regions.
exports.extractUpperLandforms = function(landforms) {
  var upperRegions = landforms.lte(24);
  
  return upperRegions;
};


//// Extract the landforms of lower regions.
exports.extractLowerLandforms = function(landforms) {
  var lowerRegions = landforms.gte(31);
  
  return lowerRegions;
};



/* Medial-axis generation. */

// Function to segment the study area based on the distance to a type of landforms.
exports.landformsDistance_Segmentation = function(landforms, proj) {
  // Distance calculation.
  var distParams = {
    neighborhood: 1e3,
    units: "pixels",
    metric: "squared_euclidean"
  };

  var LF_dist = landforms.fastDistanceTransform(distParams)
    .sqrt() // Get the distance in the number of pixels.
    .reproject(proj);

  // Define a Laplacian, or isotropic-edge-detection kernel.
  var laplacian = ee.Kernel.laplacian8({ 
    normalize: false 
  });

  // Apply the Laplacian edge-detection kernel to detect boundaries in the distance image.
  var edgy = LF_dist.convolve(laplacian)
    .reproject(proj);

  var segmented = edgy.gte(0);
  
  return segmented;
};


// Function to extract the square distance to the nearest ridges/valleys 
//  at each pixel along the medial axis within the new CATE.
exports.extractMedialAxis_sqDist = function(ridgesORvalleys_Img, proj, medialAxis_Mask, newCATE_mask) {
  var sqDist = ridgesORvalleys_Img.medialAxis({
    neighborhood: 1e3, 
    units: "pixels"
  }).select("medial")
    .reproject(proj);
  
  var medialAxis_sqDist = sqDist.updateMask(medialAxis_Mask)
    .updateMask(newCATE_mask)
    .rename("medialAxis_sqDist_inPixels");

  return medialAxis_sqDist;
};



/* HydroSHEDS basin processing. */

// Function to extract the most detailed (level 12) HydroSHEDS basins 
//  intersecting the study domain.
exports.extractBasins_StudyDomain = function(studyDomain_FtrCol) {
  var studyDomain_Geom = ee.Feature(studyDomain_FtrCol.first())
    .geometry();
  
  var extractedBasins = ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_12")
    .filterBounds(studyDomain_Geom);

  return extractedBasins;
};


// Function to select the HydroSHEDS basins ("hybas_12") 
//  with the medial axis between ridges and valleys in the new CATE.
exports.selectBasins_MedialAxis = function(medialAxis_Img, rawBasins, proj) {
  var basins_withInfo = medialAxis_Img.reduceRegions({
    collection: rawBasins,
    reducer: ee.Reducer.firstNonNull(), 
    scale: proj.scale,
    crs: proj.crs
  });

  var selectedBasins = basins_withInfo
    .filter(ee.Filter.notNull(["first"]));
  
  return selectedBasins;
};


// Function to identify the basins of interest (BOIs)
//  that are not in the basins of the surrounding regions.
exports.identify_NonDuplicate_BOIs = function(BOIs, surroundingBasins) {
  // Create an equals filter based on the "HYBAS_ID" property.
  var HYBAS_ID_filter = ee.Filter.equals({
    leftField: "HYBAS_ID",
    rightField: "HYBAS_ID"
  });
  
  // Create an equals filter based on the "PFAF_ID" property.
  var PFAF_ID_filter = ee.Filter.equals({
    leftField: "PFAF_ID",
    rightField: "PFAF_ID"
  });
  
  // Combine the two filters.
  var combinedFilter = ee.Filter.and(HYBAS_ID_filter, PFAF_ID_filter);
  
  // Identify the non-duplicate BOIs.
  var invertedJoin = ee.Join.inverted();
  
  var nonDuplicate = invertedJoin.apply({
    primary: BOIs, 
    secondary: surroundingBasins, 
    condition: combinedFilter
  });

  return nonDuplicate;
};



/* Selected basin grouping. */

// Function to create a list of intervals for grouping the basin IDs.
exports.create_basinID_intervals = function(groupSize) {
  var intervalCount = groupSize + 1;
  
  var basinID_intervals = ee.List.sequence({
    start: 0,
    end: 1,
    count: intervalCount
  });
  
  return basinID_intervals;
};


// Function to group the HydroSHEDS basins by the self-created ID.
exports.groupBasins_byID = function(basins_withID, basinID_intervals, groupID) {
  var basinID_name = "Basin_ID";
  
  var lowerEnd = basinID_intervals.get(groupID - 1);
  
  var upperEnd = basinID_intervals.get(groupID);
  
  return basins_withID.filter(ee.Filter.and(
    ee.Filter.gte(basinID_name, lowerEnd),
    ee.Filter.lt(basinID_name, upperEnd) // Exclude the upper end.
  ));
};


// Function to add the "last" HydroSHEDS basin (i.e., ID = 1, if any) 
//  to the last group of basins.
exports.addLastBasin = function(basins_withID, lastGroup) {
  var basinID_name = "Basin_ID";
  
  var lastBasin = basins_withID.filter(
    ee.Filter.eq(basinID_name, 1)
  );
  
  return lastGroup.merge(lastBasin);
};



/* Copernicus Global Land Cover datasets (v3.0.1, from 2015 to 2019) processing. */

// Function to read the annual land cover datasets.
exports.readAnnualCoperLandCover = function(year) {
  // Set the file path and band name of land cover data.
  var lcPath = "COPERNICUS/Landcover/100m/Proba-V-C3/Global/";
  
  var lcName = "discrete_classification";

  return ee.Image(lcPath + year).select(lcName);
};


// Function to read the land cover datasets of 2015-2019.
exports.readCoperLandCover15to19 = function() {
  var readAnnualLC = function(year) {
    // Set the file path and band name of land cover data.
    var lcPath = "COPERNICUS/Landcover/100m/Proba-V-C3/Global/";
    
    var lcName = "discrete_classification";
  
    return ee.Image(lcPath + year).select(lcName);
  };
  
  var landCover15to19 = ee.ImageCollection.fromImages([
    readAnnualLC(2015),
    readAnnualLC(2016),
    readAnnualLC(2017),
    readAnnualLC(2018),
    readAnnualLC(2019),
  ]);

  return landCover15to19;
};


// Function to extract and reproject areas classified as closed forests 
//  (tree canopy > 70 %) in ALL the five years from 2015 to 2019.
exports.extractClosedForests_inAllYears = function(landCoverImgCol, proj) {
  // Function to extract the annual closed forests.
  function extractAnnualClosedForests(lcImg) {
    return lcImg.gte(111).and(lcImg.lte(116));
  }

  // Annual closed forests from 2015 to 2019.
  var annualClosedForests = landCoverImgCol.map(extractAnnualClosedForests);
  
  // Extract and reproject areas classified as closed forests 
  //  in ALL the five years.
  var ClosedForests_inAllYears = annualClosedForests.min()
    .reproject(proj);
  
  return ClosedForests_inAllYears;
};


// Function to extract and reproject areas classified as open forests 
//  (tree canopy between 15-70 %) in ALL the five years from 2015 to 2019.
exports.Extract_OpenForests_inAllYears = function(landCover_ImgCol, proj_Dict) {
  
  /**
   * "ImageCollection":
   *  landCover_ImgCol.
   * 
   * "Dictionary":
   *  proj_Dict.
   * 
   * Return: Image.
  */
  
  // Define a function to extract the annual open forests.
  var Extract_AnnualOpenForests = function(landCover_Img) {
    return landCover_Img.gte(121).and(landCover_Img.lte(126));
  };

  // Identify the annual open forests from 2015 to 2019.
  var annual_OpenForests = landCover_ImgCol.map(Extract_AnnualOpenForests);
  
  // Extract and reproject the areas classified as open forests 
  //  in ALL the five years.
  var openForests_inAllYears = annual_OpenForests.min()
    .reproject(proj_Dict);
  
  return openForests_inAllYears;
};


// Function to extract and reproject non-forested areas
//  (from "Shrubs" to "Moss and lichen") in ALL the five years from 2015 to 2019.
exports.extractNonForested_inAllYears = function(landCoverImgCol, proj) {
  // Function to extract the annual non-forested areas.
  function extractAnnualNonForested(lcImg) {
    return lcImg.gte(20).and(lcImg.lte(100));
  }

  // Annual non-forested areas from 2015 to 2019.
  var annualNonForested = landCoverImgCol.map(extractAnnualNonForested);
  
  // Extract and reproject areas classified as non-forested areas 
  //  in ALL the five years.
  var NonForested_inAllYears = annualNonForested.min()
    .reproject(proj);
  
  return NonForested_inAllYears;
};



/* Medial-axis processing. */

// Function to vectorize pixels along the medial axis between ridges and valleys
//  to their centroids by basin.
exports.vectorizeMedialAxis_byBasin = function(medialAxisImg, basinsFtrCol, proj) {
  function vectorization_byBasin(basin) {
    var basinGeom = basin.geometry();
    
    var pxCtds_perBasin = medialAxisImg.reduceToVectors({
      geometry: basinGeom, 
      scale: proj.scale, 
      geometryType: "centroid", 
      eightConnected: true, 
      labelProperty: medialAxisImg.bandNames().get(0), 
      crs: proj.crs, 
      maxPixels: 1e13
    });
    
    return pxCtds_perBasin;
  }
  
  var allPxCtds = basinsFtrCol.map(vectorization_byBasin);
  
  return allPxCtds.flatten();
};


// Function to buffer the vectorized pixel centroids along the medial axis
//  by the corresponding distance to the nearest ridges/valleys.
exports.distBuffer_MedialAxisPxCtds = function(pxCtds_FtrCol){
  function buffering(pxCtd) {
    // Extract the square distance.
    var sqDist = ee.Number(pxCtd.get("medialAxis_sqDist_inPixels"));
    
    // Calculate the buffer distance in meters.
    var bufferDist = sqDist.sqrt().multiply(30);
    
    return pxCtd.buffer(bufferDist);
  }
  
  var buffered_PxCtds = pxCtds_FtrCol.map(buffering);
  
  return buffered_PxCtds;
};


// Function to calculate the absolute distance (in pixels)
//  to the nearest ridges/valleys at each medial point.
exports.calculate_MedPts_AbsDist = function(MedPts_FtrCol) {
  var MedPts_FtrCol_withAbsDist = MedPts_FtrCol.map(function(MedPt) {
    var absDist = ee.Number(MedPt.get("medialAxis_sqDist_inPixels"))
      .sqrt();
    
    return MedPt.set("absDist_inPixels", absDist);
  });
  
  return MedPts_FtrCol_withAbsDist;
};


// Function to group the adjacent medial points.
exports.groupAdjacentMedPts = function(MedPts_FtrCol, groupDist) {
  // Union the medial points within a distance to each other.
  var unioned_MedPt_buffer = MedPts_FtrCol.map(function(MedPt) {
    return MedPt.buffer(groupDist);
  }).union();
  
  // Convert the multiPolygon of the unioned medial point buffer
  //  to a set of individual polygons.
  var unionedBuffer_Plgs = ee.FeatureCollection(unioned_MedPt_buffer.first()
    .geometry().coordinates().map(function(coords) {
      var plg = ee.Geometry.Polygon(coords);
      
      return ee.Feature(plg);
    }));
  
  // Define a spatial filter as geometries that intersect.
  var spatialFilter = ee.Filter.intersects({
    leftField: ".geo",
    rightField: ".geo"
  });
  
  // Define a save all join.
  var saveAllJoin = ee.Join.saveAll({
    matchesKey: "grouped_Pts",
  });
  
  // Join each polygon of the unioned medial point buffer with 
  //  the medial points that it intersects.
  var grouped_MedPts_FtrCol = saveAllJoin.apply(unionedBuffer_Plgs, MedPts_FtrCol, 
    spatialFilter);
  
  // Extract the centroid and average absolute distance of 
  //  each medial point group.
  var MedPt_Group_Ctds = grouped_MedPts_FtrCol.map(function(MedPt_Group) {
    var groupedMedPts = ee.FeatureCollection(ee.List(MedPt_Group.get("grouped_Pts")));
    
    var ctd = groupedMedPts.geometry().centroid();
    
    var meanAbsDist = groupedMedPts.aggregate_mean("absDist_inPixels");
    
    return ee.Feature(ctd).set("meanAbsDist_inPixels", meanAbsDist);
  });
  
  return MedPt_Group_Ctds;
};


// Function to buffer the grouped pixel centroids along the medial axis
//  by the averagey absolute distance to the nearest ridges/valleys.
exports.meanAbsDist_BufferGroupedMedPts = function(MedPts_FtrCol){
  function buffering(MedPt) {
    var bufferDist = ee.Number(MedPt.get("meanAbsDist_inPixels")).multiply(30);
    
    return MedPt.buffer(bufferDist);
  }
  
  var buffered_MedPts = MedPts_FtrCol.map(buffering);
  
  return buffered_MedPts;
};



/* Elevational transect centerline generation. */

// Function to extract the elevations and coordinates of 
//  the lowest closed-forest point
//  and the highest non-forested point
//  within each buffer of the medial-axis pixel centroids, respectively.
exports.extractElvMinMax_byBuffer = function(elevation, CF_img, nonF_img, proj, pxCtd_Buffers) {
  // Get the elevation of each type of area.
  var closedForestsElv = elevation.updateMask(CF_img)
    .rename("CF_elv");
  
  var nonForestedElv = elevation.updateMask(nonF_img)
    .rename("nonF_elv");

  // Determine and rename the pixel coordinates 
  //  of each type of area.
  var rawCoords = ee.Image.pixelLonLat()
    .reproject(proj);
  
  var closedForestsCoords = rawCoords.updateMask(CF_img)
    .select(["latitude", "longitude"], 
      ["CF_lat", "CF_long"]);
  
  var nonForestedCoords = rawCoords.updateMask(nonF_img)
    .select(["latitude", "longitude"], 
      ["nonF_lat", "nonF_long"]);

  // Combine the elevation and pixel coordinates of each type of area.
  var CF_elvCoords = closedForestsElv
    .addBands(closedForestsCoords);
  
  var nonF_elvCoords = nonForestedElv
    .addBands(nonForestedCoords);
  
  // Combine the elevation and coordinate datasets
  //  of the two types of areas for further extracting the elevational extremes by buffer.
  // (Note: the order of bands here should be consistent with the order of combined reducers
  //  in the following "reduceRegions()" function.)
  var CF_nonF_elvCoords = CF_elvCoords
    .addBands(nonF_elvCoords)
    .reproject(proj);

  // Create a reducer to extract the elevation and corresponding coordinates 
  //  of the lowest pixel of closed forests.
  var minReducer_CFelv_Coords = ee.Reducer.min({
    numInputs: 3
  }).setOutputs(CF_elvCoords.bandNames());
  // Note: this reducer outputs the minimum value of its first input (i.e., "elevation"). 
  //  As the "numInputs" (3) is greater than one (i.e., "elevation" followed by "coordinates"), 
  //    it also outputs the corresponding values of the additional inputs (i.e., "coordinates").
  
  // Create a reducer to extract the elevation and corresponding coordinates 
  //  of the highest non-forested pixel.
  var maxReducer_nonFelv_Coords = ee.Reducer.max({
    numInputs: 3
  }).setOutputs(nonF_elvCoords.bandNames());
  
  // Combine the two reducers of elevational extremes.
  // (Note: the order of reducers here should be consistent with the order of combined bands
  //  in the previously generated "CF_nonF_elvCoords" image.)
  var combinedReducer = minReducer_CFelv_Coords.combine({
    reducer2: maxReducer_nonFelv_Coords, 
    sharedInputs: false
  });
  // (Note: if "sharedInputs" is false, 
  //  the inputs of the combined reducer will be 
  //  those of reducer1 followed by those of reducer2.)

  // Extract the elevational extremes and corresponding pixel coordinates 
  //  within each buffer of the medial-axis pixel centroids.
  var elvMinMax_perBuffer = CF_nonF_elvCoords.reduceRegions({
    collection: pxCtd_Buffers, 
    reducer: combinedReducer, 
    scale: proj.scale, 
    crs: proj.crs
  });

  // Select buffers with both the minimum closed-forest elevation and 
  //  the maximum non-forested elevation.
  // Also, the latter one should be greater than the former one.
  var selectedBuffers = elvMinMax_perBuffer.filter(ee.Filter.and(
    ee.Filter.notNull(["nonF_elv", "CF_elv"]),
    ee.Filter.greaterThan({
      leftField: "nonF_elv", 
      rightField: "CF_elv"
    })));

  return selectedBuffers;
};


// Function to construct an elevational transect centerline 
//  between the upper and lower endpoints 
//  in each qualified buffer of the medial-axis pixel centroids.
exports.constructTransectCLs_byBuffer = function(Buffers_FtrCol) {
  var TransectCLs_FtrCol = Buffers_FtrCol.map(function(buffer) {
    // Extract the coordinates of the two endpoints.
    var CF_long = buffer.get("CF_long");
    var CF_lat = buffer.get("CF_lat");
    
    var nonF_long = buffer.get("nonF_long");
    var nonF_lat = buffer.get("nonF_lat");
  
    // Construct a lineString between the two endpoints.
    var lineString = ee.Geometry.LineString(
      [[CF_long, CF_lat],
       [nonF_long, nonF_lat]]);

    // Get the length of the lineString.
    var CL_length = lineString.length();
    
    // Calculate the elevational range.
    var nonF_elv = buffer.get("nonF_elv");
    var CF_elv = buffer.get("CF_elv");

    var elvRange = ee.Number(nonF_elv).subtract(CF_elv);
    
    // Create a feature with the length and elevational range.
    var CL = ee.Feature(lineString).set({
      CL_length: CL_length,
      elvRange: elvRange
    });
    
    // Copy the properties of interest.
    var CL_propertiesCopied = CL.copyProperties({
      source: buffer, 
      exclude: ["count", "medialAxis_sqDist_inPixels"]
    });
    
    return CL_propertiesCopied;
  });
  
  // Add a random column as IDs.
  return TransectCLs_FtrCol.randomColumn("CL_ID");
};


// Function to create the image of elevation and pixel coordinates 
//  of the closed-forest areas.
exports.create_CF_elvCoords = function(elevation, CF_img, proj) {
  // Get the elevation of each type of area.
  var closedForestsElv = elevation.updateMask(CF_img)
    .rename("CF_elv");
  
  // Determine and rename the pixel coordinates 
  //  of each type of area.
  var rawCoords = ee.Image.pixelLonLat()
    .reproject(proj);
  
  var closedForestsCoords = rawCoords.updateMask(CF_img)
    .select(["latitude", "longitude"], 
      ["CF_lat", "CF_long"]);
  
  // Combine the elevation and pixel coordinates of each type of area.
  var CF_elvCoords = closedForestsElv
    .addBands(closedForestsCoords);
  
  return CF_elvCoords;
};


// Function to create the image of elevation and pixel coordinates 
//  of the non-forested areas.
exports.create_nonF_elvCoords = function(elevation, nonF_img, proj) {
  // Get the elevation of each type of area.
  var nonForestedElv = elevation.updateMask(nonF_img)
    .rename("nonF_elv");

  // Determine and rename the pixel coordinates 
  //  of each type of area.
  var rawCoords = ee.Image.pixelLonLat()
    .reproject(proj);
  
  var nonForestedCoords = rawCoords.updateMask(nonF_img)
    .select(["latitude", "longitude"], 
      ["nonF_lat", "nonF_long"]);

  // Combine the elevation and pixel coordinates of each type of area.
  var nonF_elvCoords = nonForestedElv
    .addBands(nonForestedCoords);
  
  return nonF_elvCoords;
};


// Function to generate a combined reducer for extracting
//  the elevational extremes.
exports.generateCombinedReducer = function(CF_elvCoords, nonF_elvCoords) {
  // Create a reducer to extract the elevation and corresponding coordinates 
  //  of the lowest pixel of closed forests.
  var minReducer_CFelv_Coords = ee.Reducer.min({
    numInputs: 3
  }).setOutputs(CF_elvCoords.bandNames());
  // Note: this reducer outputs the minimum value of its first input (i.e., "elevation"). 
  //  As the "numInputs" (3) is greater than one (i.e., "elevation" followed by "coordinates"), 
  //  it also outputs the corresponding values of the additional inputs (i.e., "coordinates").
  
  // Create a reducer to extract the elevation and corresponding coordinates 
  //  of the highest non-forested pixel.
  var maxReducer_nonFelv_Coords = ee.Reducer.max({
    numInputs: 3
  }).setOutputs(nonF_elvCoords.bandNames());
  
  // Combine the two reducers of elevational extremes.
  //  (Note: the order of reducers here should be consistent with the order of combined bands
  //  in the previously generated "CF_nonF_elvCoords" image.)
  var combinedReducer = minReducer_CFelv_Coords.combine({
    reducer2: maxReducer_nonFelv_Coords, 
    sharedInputs: false
  });
  // (Note: if "sharedInputs" is false, 
  //  the inputs of the combined reducer will be 
  //  those of reducer1 followed by those of reducer2.)

  return combinedReducer;
};


// Function to construct transect centerlines by basin.
exports.constructTransectCLs_byBasin = function(allBasins, allPxCtds, 
  CF_nonF_elvCoords, combinedReducer, proj) {
    var allTransectCLs = allBasins.map(function(basin) {
      var basinGeom = basin.geometry();
      
      // Get the medial-axis pixel centroids in each basin.
      var pxCtds_perBasin = allPxCtds.filterBounds(basinGeom);
      
      // Buffer each selected pixel centroid
      //  by the corresponding distance to the nearest ridges/valleys.
      var pxCtd_Buffers = pxCtds_perBasin.map(function(pxCtd) {
        // Extract the square distance.
        var sqDist = ee.Number(pxCtd.get("medialAxis_sqDist_inPixels"));
        
        // Calculate the buffer distance in meters.
        var bufferDist = sqDist.sqrt().multiply(30);
        
        return pxCtd.buffer(bufferDist);
      });
      
      // Extract the elevational extremes and corresponding pixel coordinates 
      //  within each buffer of the medial-axis pixel centroids.
      var elvMinMax_perBuffer = CF_nonF_elvCoords.reduceRegions({
        collection: pxCtd_Buffers, 
        reducer: combinedReducer, 
        scale: proj.scale, 
        crs: proj.crs
      });
      
      // Select buffers with both the minimum closed-forest elevation and 
      //  the maximum non-forested elevation.
      //  Also, the latter one should be greater than the former one.
      var selectedBuffers = elvMinMax_perBuffer.filter(ee.Filter.and(
        ee.Filter.notNull(["nonF_elv", "CF_elv"]),
        ee.Filter.greaterThan({
          leftField: "nonF_elv", 
          rightField: "CF_elv"
        })));
    
      // Construct an elevational transect centerline 
      //  between the upper and lower endpoints 
      //  in each selected buffer.
      var transectCLs_perBasin = selectedBuffers.map(function(buffer) {
        // Extract the coordinates of the two endpoints.
        var CF_long = buffer.get("CF_long");
        var CF_lat = buffer.get("CF_lat");
        
        var nonF_long = buffer.get("nonF_long");
        var nonF_lat = buffer.get("nonF_lat");
      
        // Construct a LineString between the two endpoints.
        var lineString = ee.Geometry.LineString(
          [[CF_long, CF_lat],
           [nonF_long, nonF_lat]]);
    
        // Get the length of the LineString.
        var CL_length = lineString.length();
        
        // Calculate the elevational range.
        var nonF_elv = buffer.get("nonF_elv");
        var CF_elv = buffer.get("CF_elv");
    
        var elvRange = ee.Number(nonF_elv).subtract(CF_elv);
        
        // Create a feature with the LineString length and the elevational range.
        var CL = ee.Feature(lineString).set({
          CL_length: CL_length,
          elvRange: elvRange
        });
        
        // Copy the properties of interest from the buffer.
        var CL_propertiesCopied = CL.copyProperties({
          source: buffer, 
          exclude: ["count", "medialAxis_sqDist_inPixels"]
        });
        
        return CL_propertiesCopied;
      });
      
      // Return the constructed centerlines of each basin.
      return transectCLs_perBasin;
    });
  
    // Flatten the obtained FeatureCollection of FeatureCollections.
    var allTransectCLs_flattened = allTransectCLs.flatten();
    
    // Add a random column as IDs.
    return allTransectCLs_flattened.randomColumn("CL_ID");
  };


// Function to add the basin group ID to each transect and
//  combine it with the corresponding centerline ID.
exports.addBasinGroupIDtoCenterlines = function(centerlines, BasinGroup_ID) {
  var centerlines_withBasinGroupID = centerlines.map(function(CL) {
    // Obtain the centerline ID.
    var CL_ID = CL.get("CL_ID");
    
    // Combine the basin group ID and the centerline ID into a String.
    var BG_CL_ID = ee.Algorithms.String(BasinGroup_ID)
      .cat(CL_ID);
    
    return CL.set({
      BasinGroup_ID: BasinGroup_ID,
      BG_CL_ID: BG_CL_ID
    });
  });
  
  return centerlines_withBasinGroupID;
};


// Function to add the Asian AOI ID and the basin group ID to each transect
//  and combine them with the corresponding centerline ID.
exports.add_AoiID_BasinGroupID_toCenterlines = function(centerlines, Aoi_ID, BasinGroup_ID) {
  var centerlines_withIDs = centerlines.map(function(CL) {
    // Obtain the centerline ID.
    var CL_ID = CL.get("CL_ID");
    
    // Combine the Asian AOI ID, the basin group ID, 
    //  and the centerline ID into a String.
    var AoiBgCl_ID = ee.Algorithms.String(Aoi_ID)
      .cat(ee.Algorithms.String(BasinGroup_ID))
      .cat(CL_ID);
    
    return CL.set({
      Aoi_ID: Aoi_ID,
      BasinGroup_ID: BasinGroup_ID,
      AoiBgCl_ID: AoiBgCl_ID
    });
  });
  
  return centerlines_withIDs;
};



/* Grouping elevational transects based on the mid-segment of
  each transect centerline. */

// Function to identify the centroid of each transect centerline.
exports.identify_Centerline_Centroids = function(centerlines) {
  var centerline_Centroids = centerlines.map(function(CL) {
    var centroid = CL.centroid();
    
    return centroid;
  });

  return centerline_Centroids;
};


// Function to extract the mid-one-third segment of each transect centerline.
exports.extractMidOneThirdSegments = function(CLs_FtrCol) {
  var midOneThirds_FtrCol = CLs_FtrCol.map(function(CL) {
    // Calculate the buffer radius (half of 1/3).
    var fullLength = CL.get("CL_length");
    
    var bufferRadius = ee.Number(fullLength).divide(6);
    
    // Extract the mid-one-third segment around the centroid.
    var midOneThird_Buffer = CL.centroid().buffer(bufferRadius);
    
    var midOneThirdSegment = CL.intersection(midOneThird_Buffer);
    
    return midOneThirdSegment;
  });

  return midOneThirds_FtrCol;
};


// Function to extract the mid-quarter segment of each transect centerline.
exports.extractMidQuarterSegments = function(CLs_FtrCol) {
  var midQuarters_FtrCol = CLs_FtrCol.map(function(CL) {
    // Calculate the buffer radius (half a quarter of the full length).
    var fullLength = CL.get("CL_length");
    
    var bufferRadius = ee.Number(fullLength).divide(8);
    
    // Extract the mid-quarter segment around the centroid.
    var midQuarter_Buffer = CL.centroid().buffer(bufferRadius);
    
    var midQuarterSegment = CL.intersection(midQuarter_Buffer);
    
    return midQuarterSegment;
  });

  return midQuarters_FtrCol;
};


// Function to group transect centerlines with mid-segments within 90m to one another
//  and then select the centerline with the largest elevational range 
//  (the "steepest") in each group.
exports.selectSteepestCLs_GroupedByMidSegment = function(midSegments, centerLines) {
  // Define the grouping distance.
  var groupDist = 90;
  
  // Create and union the buffers of mid-segments.
  var unionedBuffer = midSegments.map(function(segment) {
    return segment.buffer(groupDist);
  }).union();
  
  // Convert the multiPolygon of the unioned buffer
  //  to a set of individual polygons.
  var unionedBuffer_IndPlgs = unionedBuffer.first()
    .geometry().coordinates().map(function(coords) {
      var plg = ee.Geometry.Polygon(coords);
      
      return ee.Feature(plg);
    });
  
  // Define a spatial filter as geometries that intersect.
  var spatialFilter = ee.Filter.intersects({
    leftField: ".geo",
    rightField: ".geo"
  });
  
  // Define a save-all join.
  var keyName = "groupedFeatures";
  
  var saveAllJoin = ee.Join.saveAll({
    matchesKey: keyName,
  });
  
  // Join each individual polygon of the unioned buffer with 
  //  mid-segments that it intersects.
  var joined_FtrCol = saveAllJoin.apply(unionedBuffer_IndPlgs, midSegments, 
    spatialFilter);
  
  // Identify the mid-segment of the centerline with the largest elevational range
  //  in each group.
  var identified_Segments = joined_FtrCol.map(function(joined) {
    var grouped_Ftrs = ee.FeatureCollection(ee.List(joined.get(keyName)));
  
    var sorted_Ftrs = grouped_Ftrs.sort({
      property: "elvRange", 
      ascending: false
    });
    
    var identified_Ftr = sorted_Ftrs.first();
    
    return identified_Ftr;
  });
  
  // Select centerlines sharing the same IDs with the identified mid-segments.
  var IDname = "CL_ID";
  
  var identified_ID_list = identified_Segments.aggregate_array(IDname);
  
  var selected_CLs = centerLines.filter(ee.Filter.inList({
    leftField: IDname, 
    rightValue: identified_ID_list
  }));
  
  return selected_CLs;
};


// Function to buffer the mid-segments and union the generated buffers,
//  then convert the unioned buffer into individual polygons.
exports.unionBuffer_MidSegments = function(midSegments) {
  // Define the grouping distance.
  var groupDist = 90;
  
  // Create and union the buffers of mid-segments.
  var unionedBuffer = midSegments.map(function(segment) {
    return segment.buffer(groupDist);
  }).union();
  
  // Convert the multiPolygon of the unioned buffer
  //  to a set of individual polygons.
  var unionedBuffer_IndPlgs = unionedBuffer.first()
    .geometry().coordinates().map(function(coords) {
      var plg = ee.Geometry.Polygon(coords);
      
      return ee.Feature(plg);
    });
  
  return ee.FeatureCollection(unionedBuffer_IndPlgs);
};


// Function to union the buffers of the mid-segments
//  without separating the unioned MultiPolygon into Polygons.
exports.multiPolygon_BufferUnion_MidSegments = function(midSegments) {
  // Define the grouping distance.
  var groupDist = 90;
  
  // Create and union the buffers of mid-segments.
  var unionedBuffer = midSegments.map(function(segment) {
    return segment.buffer(groupDist);
  }).union();
  
  return unionedBuffer;
};


// Function to buffer the mid-segments of transect centerlines.
exports.bufferMidSegments = function(midSegments) {
  // Define the grouping distance.
  var groupDist = 90;
  
  // Create the buffers of mid-segments.
  var buffers = midSegments.map(function(segment) {
    return segment.buffer(groupDist);
  });
  
  return buffers;
};


// Function to group the mid-segments with the individual polygons of their unioned buffer
//  and then identify the mid-segment with the largest elevational range in each group.
exports.groupIdentify_MidSegments = function(unionedBuffer_IndPlgs, midSegments) {
  // Define a spatial filter as geometries that intersect.
  var spatialFilter = ee.Filter.intersects({
    leftField: ".geo",
    rightField: ".geo"
  });
  
  // Define a save-all join.
  var keyName = "groupedFeatures";
  
  var saveAllJoin = ee.Join.saveAll({
    matchesKey: keyName,
  });
  
  // Join each individual polygon of the unioned buffer with 
  //  the mid-segments that it intersects.
  var joined_FtrCol = saveAllJoin.apply(unionedBuffer_IndPlgs, midSegments, 
    spatialFilter);
  
  // Identify the mid-segment of the centerline with the largest elevational range
  //  in each group.
  var identified_Segments = joined_FtrCol.map(function(joined) {
    var grouped_Ftrs = ee.FeatureCollection(ee.List(joined.get(keyName)));
  
    var sorted_Ftrs = grouped_Ftrs.sort({
      property: "elvRange", 
      ascending: false
    });
    
    var identified_Ftr = sorted_Ftrs.first();
    
    return identified_Ftr;
  });
  
  return identified_Segments;
};



// /* Generating and grouping the upper and lower endpoints of elevational transects. */

// // Function to construct the upper/lower endpoints 
// //  based on the corresponding coordinates
// //  for each selected buffer of the pixel centroids along the medial axis.
// exports.constructPOIs_byBuffer = function(Buffers_FtrCol, longName, latName) {
//   var POIs_FtrCol = Buffers_FtrCol.map(function(buffer) {
//     // Extract the coordinates of the point of interest.
//     var ptLong = buffer.get(longName);
//     var ptLat = buffer.get(latName);
  
//     // Construct the point of interest.
//     var POI = ee.Geometry.Point([ptLong, ptLat]);
  
//     // Create a feature with ID.
//     var POI_ftr = ee.Feature(POI).copyProperties({
//       source: buffer, 
//       properties: ["Buffer_ID"]
//     });
    
//     return POI_ftr;
//   });
  
//   return POIs_FtrCol;
// };


// // Function to union the upper/lower endpoints
// //  of elevational transects, respectively.
// exports.unionAdjacentPOIs = function(POIs_FtrCol, groupDist) {
//   // Union the points of interest within a distance.
//   var unioned_POI_buffer = POIs_FtrCol.map(function(pt) {
//     return pt.buffer(groupDist);
//   }).union();
  
//   // Convert the multiPolygon of the unioned POI buffer
//   //  to a set of individual polygons.
//   var unionedBuffer_Plgs = ee.FeatureCollection(unioned_POI_buffer.first()
//     .geometry().coordinates().map(function(coords) {
//       var plg = ee.Geometry.Polygon(coords);
      
//       return ee.Feature(plg);
//     }));
  
//   return unionedBuffer_Plgs;
// };


// // Function to group the adjacent upper/lower endpoints
// //  of elevational transects, respectively.
// exports.groupAdjacentPOIs = function(POIs_FtrCol, groupDist) {
//   // Union the points of interest within a distance.
//   var unioned_POI_buffer = POIs_FtrCol.map(function(POI) {
//     return POI.buffer(groupDist);
//   }).union();
  
//   // Convert the multiPolygon of the unioned POI buffer
//   //  to a set of individual polygons.
//   var unionedBuffer_Plgs = ee.FeatureCollection(unioned_POI_buffer.first()
//     .geometry().coordinates().map(function(coords) {
//       var plg = ee.Geometry.Polygon(coords);
      
//       return ee.Feature(plg);
//     }));
  
//   // Define a spatial filter as geometries that intersect.
//   var spatialFilter = ee.Filter.intersects({
//     leftField: ".geo",
//     rightField: ".geo"
//   });
  
//   // Define a save all join.
//   var saveAllJoin = ee.Join.saveAll({
//     matchesKey: "grouped_Pts",
//   });
  
//   // Join each polygon of the unioned POI buffer with the POIs that it intersects.
//   var grouped_POIs_FtrCol = saveAllJoin.apply(unionedBuffer_Plgs, POIs_FtrCol, spatialFilter);
  
//   // Move each POI to the centroid of the corresponding POI group.
//   var POIgroup_Ctds = grouped_POIs_FtrCol.map(function(POIgroup) {
//     var groupedPOIs = ee.FeatureCollection(ee.List(POIgroup.get("grouped_Pts")));
    
//     var ctd = groupedPOIs.geometry().centroid();
    
//     var newPOIs = groupedPOIs.map(function(oldPOI) {
//       // Create a feature with each buffer ID at the POI group centroid.
//       return ee.Feature(ctd).copyProperties({
//         source: oldPOI, 
//         properties: ["Buffer_ID"]
//       });
//     });
    
//     return newPOIs;
//   });
  
//   return POIgroup_Ctds.flatten();
// };



// /* Construct a elevational transect centerline between 
//   each pair of the grouped upper and lower endpoints. */

// exports.constructTransectCLs = function(CFpts_FtrCol, NonFpts_FtrCol) {
//   // Use an equals filter to specify how the collections match.
//   var sameID_filter = ee.Filter.equals({
//     leftField: "Buffer_ID",
//     rightField: "Buffer_ID"
//   });
  
//   // Define the join.
//   var innerJoin = ee.Join.inner("CFpt", "NonFpt");
  
//   // Apply the join.
//   var sameIDpts_innerJoined = innerJoin.apply(CFpts_FtrCol, NonFpts_FtrCol, sameID_filter);
  
//   // Connect each pair of the upper and lower endpoints sharing the same buffer ID.
//   var sameIDpts_connected = sameIDpts_innerJoined.map(function(joinedFtr) {
//     var CFpt_Geom = ee.Feature(joinedFtr.get("CFpt")).geometry();
//     var NonFpt_Geom = ee.Feature(joinedFtr.get("NonFpt")).geometry();
    
//     var lineString = ee.Geometry.LineString([CFpt_Geom, NonFpt_Geom]);
//     var ls_Length = lineString.length();
    
//     return ee.Feature(lineString).set("CL_length", ls_Length);
//   });
  
//   // Remove the duplicate lineStrings.
//   var noDuplicates = sameIDpts_connected.distinct(".geo");

//   // Add a random column as IDs.
//   return noDuplicates.randomColumn("CL_ID");
// };



/* "Hybas ID" extraction and assignment. */

// Function to extract and assign the corresponding Hybas ID
//  for each centerline centroid.
exports.assignHybasIDs_toCLcentroids = function(centroids, basins) {
  
  // Define a spatial filter as geometries that intersect.
  var spatialFilter = ee.Filter.intersects({
    leftField: ".geo",
    rightField: ".geo"
  });
  
  // Define a save-first join.
  var keyName = "Hybas_ID";
  
  var saveFirstJoin = ee.Join.saveFirst({
    matchKey: keyName
  });
  
  // Join each centerline centroid with the basin that it intersects.
  var joined_FtrCol = saveFirstJoin.apply(centroids, basins, 
    spatialFilter);
  
  // Extract and assign the Hybas ID from each joined feature
  //  to the corresponding centroid.
  var centroids_withHybasIDs = joined_FtrCol.map(function(joined) {
    // Determine the joined basin.
    var joinedBasin = joined.get(keyName);
    
    // Get the Hybas ID of the joined basin.
    var Hybas_ID = ee.Feature(joinedBasin)
      .get("HYBAS_ID");
  
    // Replace the property of the joined basin with its Hybas ID.
    var centroid_withID = joined.set(keyName, Hybas_ID);
    
    return centroid_withID;
  });
  
  return centroids_withHybasIDs;
};


// Function to assign the corresponding Hybas ID to each mid-segment buffer.
exports.assignHybasIDs_toMidSegmentBuffers = function(buffers, centroids) {
  
  // Define a filter as buffers and centroids that have the same centerline IDs.
  var CL_ID_filter = ee.Filter.equals({
    leftField: "CL_ID",
    rightField: "CL_ID"
  });
  
  // Define a save-first join.
  var keyName = "Hybas_ID";
  
  var saveFirstJoin = ee.Join.saveFirst({
    matchKey: keyName
  });
  
  // Join each buffer with the centroid that it shares the same centerline ID.
  var joined_FtrCol = saveFirstJoin.apply(buffers, centroids, 
    CL_ID_filter);
  
  // Extract and assign the Hybas ID from each joined centroid
  //  to the corresponding buffer.
  var buffers_withHybasIDs = joined_FtrCol.map(function(joined) {
    
    // Determine the joined centroid.
    var joinedCentroid = joined.get(keyName);
    
    // Get the Hybas ID of the joined centroid.
    var Hybas_ID = ee.Feature(joinedCentroid)
      .get(keyName);
  
    // Replace the property of the joined centroid with its Hybas ID.
    var buffer_withID = joined.set(keyName, Hybas_ID);
    
    return buffer_withID;
  });
  
  return buffers_withHybasIDs;
};


// Function to assign the Hybas ID of each centerline centroid
//  to the mid-segment buffer that shares the same "CL_newID"
//  and drop the old centerline ID
//  (applied to the data of North America and Asia).
exports.assignHybasIDs_toMidSegmentBuffers_byCLnewID_and_DropCLoldID = 
  function(buffers, centroids) {
    
    // Determine the name of the new centerline ID.
    var CL_IDname = "CL_newID";
    
    // Define a filter as buffers and centroids that have the same centerline IDs.
    var CL_ID_filter = ee.Filter.equals({
      leftField: CL_IDname,
      rightField: CL_IDname
    });
    
    // Determine the name of the Hybas ID.
    var Hybas_IDname = "Hybas_ID";
    
    // Set the property name of the matched feature.
    var matched = Hybas_IDname;
    
    // Define a save-first join.
    var saveFirstJoin = ee.Join.saveFirst({
      matchKey: matched
    });
    
    // Join each buffer with the centroid that it shares the same centerline ID.
    var joined_FtrCol = saveFirstJoin.apply(buffers, centroids, 
      CL_ID_filter);
    
    // Extract and assign the Hybas ID from each joined centroid
    //  to the corresponding buffer.
    var buffers_withHybasIDs = joined_FtrCol.map(function(joined) {
      
      // Determine the property of the joined centroid.
      var joinedCentroid = joined.get(matched);
      
      // Get the Hybas ID of the joined centroid.
      var Hybas_ID = ee.Feature(joinedCentroid)
        .get(Hybas_IDname);
    
      // Replace the property of the joined centroid with its Hybas ID.
      var HybasID_added = joined.set(matched, Hybas_ID);
      
      // Get the original property names.
      var properties = HybasID_added.propertyNames();
      
      // Drop the old centerline ID.
      var properties_noCLoldID = properties.remove("CL_ID");
      
      var CLoldID_dropped = HybasID_added.select({
        propertySelectors: properties_noCLoldID, 
        retainGeometry: true
      });
      
      return CLoldID_dropped;
    });
    
    return buffers_withHybasIDs;
  };


// Function to assign the Hybas ID of each centerline centroid
//  to the mid-segment that shares the same "CL_ID"
//  (applied to the data of all continents
//  except for North America and Asia).
exports.assignHybasIDs_toMidSegments_byCLid = 
  function(midSegments, centroids) {
    
    // Determine the name of the centerline ID
    //  (except for North America and Asia).
    var CL_IDname = "CL_ID";
    
    // Define a filter as mid-segments and centroids
    //  that have the same centerline IDs.
    var CL_ID_filter = ee.Filter.equals({
      leftField: CL_IDname,
      rightField: CL_IDname
    });
    
    // Determine the name of the Hybas ID.
    var Hybas_IDname = "Hybas_ID";
    
    // Set the property name of the matched feature.
    var matched = Hybas_IDname;
    
    // Define a save-first join.
    var saveFirstJoin = ee.Join.saveFirst({
      matchKey: matched
    });
    
    // Join each mid-segment with the centroid that it shares the same centerline ID.
    var joined_FtrCol = saveFirstJoin.apply(midSegments, centroids, 
      CL_ID_filter);
    
    // Extract and assign the Hybas ID from each joined centroid
    //  to the corresponding mid-segment.
    var midSegments_withHybasIDs = joined_FtrCol.map(function(joined) {
      
      // Determine the property of the joined centroid.
      var joinedCentroid = joined.get(matched);
      
      // Get the Hybas ID of the joined centroid.
      var Hybas_ID = ee.Feature(joinedCentroid)
        .get(Hybas_IDname);
    
      // Replace the property of the joined centroid with its Hybas ID.
      var HybasID_added = joined.set(matched, Hybas_ID);
      
      return HybasID_added;
    });
    
    return midSegments_withHybasIDs;
  };


// Function to assign the Hybas ID of each centerline centroid
//  to the centerline that shares the same "CL_ID"
//  (applied to the data of all continents
//  except for North America and Asia).
exports.assignHybasIDs_toCenterlines_byCLid = 
  function(centerlines, centroids) {
    
    // Determine the name of the centerline ID
    //  (except for North America and Asia).
    var CL_IDname = "CL_ID";
    
    // Define a filter as centerlines and centroids
    //  that have the same centerline IDs.
    var CL_ID_filter = ee.Filter.equals({
      leftField: CL_IDname,
      rightField: CL_IDname
    });
    
    // Determine the name of the Hybas ID.
    var Hybas_IDname = "Hybas_ID";
    
    // Set the property name of the matched feature.
    var matched = Hybas_IDname;
    
    // Define a save-first join.
    var saveFirstJoin = ee.Join.saveFirst({
      matchKey: matched
    });
    
    // Join each centerline with the centroid that it shares the same centerline ID.
    var joined_FtrCol = saveFirstJoin.apply(centerlines, centroids, 
      CL_ID_filter);
    
    // Extract and assign the Hybas ID from each joined centroid
    //  to the corresponding centerline.
    var centerlines_withHybasIDs = joined_FtrCol.map(function(joined) {
      
      // Determine the property of the joined centroid.
      var joinedCentroid = joined.get(matched);
      
      // Get the Hybas ID of the joined centroid.
      var Hybas_ID = ee.Feature(joinedCentroid)
        .get(Hybas_IDname);
    
      // Replace the property of the joined centroid with its Hybas ID.
      var HybasID_added = joined.set(matched, Hybas_ID);
      
      return HybasID_added;
    });
    
    return centerlines_withHybasIDs;
  };


// Function to assign the Hybas ID of each centerline centroid
//  to the Feature that shares the same "CL_newID"
//  and drop the old centerline ID of that Feature
//  (applied to the data of North America and Asia).
exports.assignHybasIDs_toFeatures_byCLnewID_and_DropCLoldID = 
  function(Features, centroids) {
    
    // Determine the name of the new centerline ID
    //  (applied to the data of North America and Asia).
    var CL_IDname = "CL_newID";
    
    // Define a filter as Features and centroids
    //  that have the same centerline IDs.
    var CL_ID_filter = ee.Filter.equals({
      leftField: CL_IDname,
      rightField: CL_IDname
    });
    
    // Determine the name of the Hybas ID.
    var Hybas_IDname = "Hybas_ID";
    
    // Set the name of each matched centroid
    //  that will be joined to the corresponding Feature
    //  as a new property.
    var matched = Hybas_IDname;
    
    // Define a save-first join.
    var saveFirstJoin = ee.Join.saveFirst({
      matchKey: matched
    });
    
    // Join each Feature with the centroid
    //  that it shares the same centerline ID.
    var joined_FtrCol = saveFirstJoin.apply(Features, centroids, 
      CL_ID_filter);
    
    // Extract and assign the Hybas ID of each joined centroid
    //  to the corresponding Feature
    //  and drop the old centerline ID of that Feature.
    var Features_withHybasIDs_noCLoldIDs = joined_FtrCol.map(function(joined) {
      
      // Extract the property of each joined centroid.
      var joinedCentroid = joined.get(matched);
      
      // Get the Hybas ID of each joined centroid.
      var Hybas_ID = ee.Feature(joinedCentroid)
        .get(Hybas_IDname);
    
      // Replace the property of each joined centroid
      //  with its Hybas ID.
      var HybasID_added = joined.set(matched, Hybas_ID);
      
      // Get the original list of property names.
      var properties = HybasID_added.propertyNames();
      
      // Drop the property of the old centerline ID.
      var properties_noCLoldID = properties.remove("CL_ID");
      
      var CLoldID_dropped = HybasID_added.select({
        propertySelectors: properties_noCLoldID, 
        retainGeometry: true
      });
      
      return CLoldID_dropped;
    });
    
    return Features_withHybasIDs_noCLoldIDs;
  };



/* Grouping transect centerlines based on their mid-segments
  by basin. */

// Function to union the mid-segment buffers of each basin into one MultiPolygon.
exports.unionMidSegmentBuffers_perBasin = function(buffers) {
  
  // Determine the property name of Hybas IDs.
  var IDname = "Hybas_ID";
  
  // Create a non-duplicate list of the Hybas IDs of all mid-segment buffers.
  var HybasID_list = buffers.aggregate_array(IDname)
    .distinct();
  
  // Union the mid-segment buffers of each basin.
  var unionedBuffers = HybasID_list.map(function(HybasID) {
    
    // Identify the buffers of each basin.
    var buffers_perBasin = buffers.filter(
      ee.Filter.eq(IDname, HybasID)
    );
    
    // Union the identified buffers.
    var unioned = buffers_perBasin.union();
    
    // Assign the corresponding Hybas ID to each unioned Feature.
    var unionedFeature = unioned.first()
      .set(IDname, HybasID);
    
    return unionedFeature;
  });
  
  // Return a FeatureCollection of the unioned buffers.
  return ee.FeatureCollection(unionedBuffers);
};


// Function to convert the MultiPolygon of the unioned mid-segment buffer
//  of each basin to a set of individual Polygons.
exports.multiPolygon_Conversion = function(all_MultiPlgs) {
  
  // Set the name of the Hybas ID.
  var IDname = "Hybas_ID";

  var all_IndivPlgs = all_MultiPlgs.map(function(multiPlg) {
    
    // Get the Hybas ID of each unioned mid-segment buffer.
    var Hybas_ID = multiPlg.get(IDname);
    
    // Obtain the coordinate list of each MultiPolygon.
    var coord_List = multiPlg.geometry().coordinates();
    
    // Construct a set of individual Polygons
    //  based on the obtained coordinate list.
    var indivPlgs_perMultiPlg = coord_List.map(function(coords) {
      
      // Create a Polygon Feature for each element of the coordinate list.
      var indivPlg_Geom = ee.Geometry.Polygon(coords);
      
      var indivPlg = ee.Feature(indivPlg_Geom);
      
      // Add the Hybas ID.
      var indivPlg_withID = indivPlg.set(IDname, Hybas_ID);
      
      return indivPlg_withID;
    });
    
    return ee.FeatureCollection(indivPlgs_perMultiPlg);
  });
  
  return all_IndivPlgs.flatten();
};


// Function to identify the locally steepest centerlines based on
//  the individual Polygons of the unioned mid-segment buffers of each basin
//  (for continents other than North America or Asia).
exports.identifySteepestCLs_byBasin_otherContinents = 
  function(unionedBuffers, midSegments, CLs) {
    
    // Determine the property name of the centerline ID.
    var CLid_Name = "CL_ID"; // Does NOT apply to the data of North America or Asia.
    
    // Determine the property name of the Hybas ID.
    var HybasID_name = "Hybas_ID";
    
    // Create a non-duplicate list of the Hybas IDs
    //  of the unioned mid-segment buffers.
    var HybasID_list = unionedBuffers.aggregate_array(HybasID_name)
      .distinct();
    
    // Define a spatial filter as geometries that intersect.
    var spatialFilter = ee.Filter.intersects({
      leftField: ".geo",
      rightField: ".geo"
    });
    
    // Define a save-first join to keep the matched mid-segment
    //  with the greatest elevational range.
    var matched = "steepest";
    
    var saveFirstJoin = ee.Join.saveFirst({
      matchKey: matched, 
      ordering: "elvRange", 
      ascending: false
    });
    
    // Identify the locally steepest centerlines by basin.
    var all_SteepestCLs = HybasID_list.map(function(HybasID) {
      
      // Create a filter of the Hybas ID.
      var HybasID_filter = ee.Filter.eq(HybasID_name, HybasID);
      
      // Identify the unioned mid-segment buffers of each basin.
      var unionedBuffers_perBasin = unionedBuffers
        .filter(HybasID_filter);
      
      // Identify the mid-segments of each basin.
      var midSegments_perBasin = midSegments
        .filter(HybasID_filter);
      
      // Identify the centerlines of each basin.
      var CLs_perBasin = CLs
        .filter(HybasID_filter);
      
      // Join each unioned mid-segment buffer with 
      //  the mid-segments that it intersects
      //  and identify the steepest mid-segment of each buffer.
      var steepestMidSegments_perBasin = saveFirstJoin.apply({
        primary: unionedBuffers_perBasin, 
        secondary: midSegments_perBasin, 
        condition: spatialFilter
      });
      
      // Extract the corresponding centerline of
      //  each identified steepest mid-segment.
      var steepestCls_perBasin = steepestMidSegments_perBasin.map(
        function(joinedFeature) {
          
          // Determine the corresponding centerline ID.
          var steepestMidSegment = joinedFeature.get(matched);
          
          var steepestCL_id = ee.Feature(steepestMidSegment)
            .get(CLid_Name);
          
          // Identify the centerline with the same ID.
          var steepestCL = CLs_perBasin.filter(
            ee.Filter.eq(CLid_Name, steepestCL_id)
          ).first();
          
          return steepestCL;
        }
      );
      
      return steepestCls_perBasin;
    });
    
    return ee.FeatureCollection(all_SteepestCLs).flatten();
  };


// Function to identify the locally steepest centerlines based on
//  the individual Polygons of the unioned mid-segment buffers of each basin
//  (for North America and Asia).
exports.identifySteepestCLs_byBasin_NorthAmerica_Asia = 
  function(unionedBuffers, midSegments, CLs) {
    
    // Determine the property name of the centerline ID.
    var CLid_Name = "CL_newID"; // Apply to the data of North America and Asia.
    
    // Determine the property name of the Hybas ID.
    var HybasID_name = "Hybas_ID";
    
    // Create a non-duplicate list of the Hybas IDs
    //  of the unioned mid-segment buffers.
    var HybasID_list = unionedBuffers.aggregate_array(HybasID_name)
      .distinct();
    
    // Define a spatial filter as geometries that intersect.
    var spatialFilter = ee.Filter.intersects({
      leftField: ".geo",
      rightField: ".geo"
    });
    
    // Define a save-first join to keep the matched mid-segment
    //  with the greatest elevational range.
    var matched = "steepest";
    
    var saveFirstJoin = ee.Join.saveFirst({
      matchKey: matched, 
      ordering: "elvRange", 
      ascending: false
    });
    
    // Identify the locally steepest centerlines by basin.
    var all_SteepestCLs = HybasID_list.map(function(HybasID) {
      
      // Create a filter of the Hybas ID.
      var HybasID_filter = ee.Filter.eq(HybasID_name, HybasID);
      
      // Identify the unioned mid-segment buffers of each basin.
      var unionedBuffers_perBasin = unionedBuffers
        .filter(HybasID_filter);
      
      // Identify the mid-segments of each basin.
      var midSegments_perBasin = midSegments
        .filter(HybasID_filter);
      
      // Identify the centerlines of each basin.
      var CLs_perBasin = CLs
        .filter(HybasID_filter);
      
      // Join each unioned mid-segment buffer with 
      //  the mid-segments that it intersects
      //  and identify the steepest mid-segment of each buffer.
      var steepestMidSegments_perBasin = saveFirstJoin.apply({
        primary: unionedBuffers_perBasin, 
        secondary: midSegments_perBasin, 
        condition: spatialFilter
      });
      
      // Extract the corresponding centerline of
      //  each identified steepest mid-segment.
      var steepestCLs_perBasin = steepestMidSegments_perBasin.map(
        function(joinedFeature) {
          
          // Determine the corresponding centerline ID.
          var steepestMidSegment = joinedFeature.get(matched);
          
          var steepestCL_id = ee.Feature(steepestMidSegment)
            .get(CLid_Name);
          
          // Identify the centerline with the same ID.
          var steepestCL = CLs_perBasin.filter(
            ee.Filter.eq(CLid_Name, steepestCL_id)
          ).first();
          
          return steepestCL;
        }
      );
      
      return steepestCLs_perBasin;
    });
    
    return ee.FeatureCollection(all_SteepestCLs).flatten();
  };



/* Functions relevant to the NDVI analysis of transects. */

// Function to buffer the transect centerlines by 45 m.
exports.bufferCLs_by45m = function(CLs) {
  var distance = 45;
  
  var buffered_CLs = CLs.map(function(CL) {
    return CL.buffer(distance);
  });
  
  return buffered_CLs;
};

// Function to pair the elevation with each annual NDVI
//  as an ImageCollection.
exports.combine_Elevation_AnnualNDVIs = function(elevation, annualNDVIs) {
  
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
  
  // Return an ImageCollection.
  return elvAnnualNDVIs_ImgCol;
};


// Function to estimate the annual elevational NDVI gradients
//  of each transect by basin.
exports.estimate_AnnualElvNDVIgradients_byBasin = function(
  allTransects, elvNDVIs_ImgCol, proj) {
    
    // Determine the property name of the Hybas ID.
    var HybasID_name = "Hybas_ID";
    
    // Create a non-duplicate list of the Hybas IDs.
    var HybasID_list = allTransects.aggregate_array(HybasID_name)
      .distinct();
    
    // Estimate the annual elevational NDVI gradients by basin.
    var all_AnnualGradients = HybasID_list.map(function(HybasID) {
      
      // Create a filter of the Hybas ID.
      var HybasID_filter = ee.Filter.eq(HybasID_name, HybasID);
      
      // Identify the transects of each basin.
      var transects_perBasin = allTransects
        .filter(HybasID_filter);
      
      // Estimate the annual gradients of each transect in the basin.
      var annualGradients_perBasin = elvNDVIs_ImgCol.map(function(elv_AnnualNDVI) {
        
        // Determine the Sen's slope between elevation and the annual NDVI.
        var annualGradient = elv_AnnualNDVI.reduceRegions({
          collection: transects_perBasin, 
          reducer: ee.Reducer.sensSlope(),
          // The inputs are expected to be x data followed by y data.
          // It returns two double values; the estimated slope and the offset.
          scale: proj.scale, 
          crs: proj.crs
        });
        
        // Obtain the property of the corresponding year.
        var propertyName = "Year";
        
        var yearProperty = elv_AnnualNDVI.get(propertyName);
        
        // Add the property of year to each transect Feature
        //  with the annual gradient.
        var annualGradient_withYear = annualGradient.map(function(transectFeature) {
          return transectFeature.set(propertyName, yearProperty);
        });
        
        return annualGradient_withYear;
      });
      
      return annualGradients_perBasin.flatten();
    });
    
    return ee.FeatureCollection(all_AnnualGradients).flatten();
  };


// Function to estimate the annual elevational NDVI gradients of each transect
//  and remove the annual features that have a "NaN" gradient
//  by basin.
exports.estimateAnnualElvNDVIgradients_RemoveNaN_byBasin = function(
  allTransects, elvNDVIs_ImgCol, proj) {
    
    // Determine the property names of Hybas ID and year.
    var HybasID_name = "Hybas_ID";
    
    var yearName = "Year";
    
    // Set the name of the "slopeString" property.
    var slopeStringName = "slopeString";
    
    // Create a non-duplicate list of the Hybas IDs.
    var HybasID_list = allTransects.aggregate_array(HybasID_name)
      .distinct();
    
    // Estimate the annual elevational NDVI gradients by basin.
    var allYearsGradients_AllBasins_nonNaN = HybasID_list.map(function(HybasID) {
      
      // Create a filter of the Hybas ID.
      var HybasID_filter = ee.Filter.eq(HybasID_name, HybasID);
      
      // Identify the transects of each basin.
      var transects_perBasin = allTransects
        .filter(HybasID_filter);
      
      // Estimate the annual gradients of all years of each transect in the basin.
      var allYearsGradients_perBasin = elvNDVIs_ImgCol.map(function(elv_AnnualNDVI) {
        
        // Determine the gradient of one year of each transect in the basin.
        var oneYearGradient_PerBasin = elv_AnnualNDVI.reduceRegions({
          collection: transects_perBasin, 
          reducer: ee.Reducer.sensSlope(),
          // The inputs are expected to be x data followed by y data.
          // It returns two double values; the estimated slope and the offset.
          scale: proj.scale, 
          crs: proj.crs
        });
        
        // Obtain the property of the corresponding year.
        var yearProperty = elv_AnnualNDVI.get(yearName);
        
        // Add the property of year and a string property of the "slope"
        //  to each annual gradient Feature.
        var oneYearGradient_withYearSlopestring = oneYearGradient_PerBasin
          .map(function(annualFeature) {
            
            // Convert the "slope" value to a string.
            var slopeValue = annualFeature.get("slope");
            
            var slopeString = ee.Algorithms.String(slopeValue);
            
            // Add the two properties.
            return annualFeature.set(
              yearName, yearProperty,
              slopeStringName, slopeString
            );
          });
        
        return oneYearGradient_withYearSlopestring;
      });
      
      // Remove the annual features that have a "NaN" gradient.
      var allYearsGradients_perBasin_Flattened = allYearsGradients_perBasin.flatten();
      
      var allYearsGradients_perBasin_nonNaN = allYearsGradients_perBasin_Flattened.filter(
        ee.Filter.neq(slopeStringName, "NaN")
      );
      
      return allYearsGradients_perBasin_nonNaN;
    });
    
    return ee.FeatureCollection(allYearsGradients_AllBasins_nonNaN).flatten();
  };


// Function to select the properties of interest
//  from the FeatureCollection of annual elevational NDVI gradients.
exports.selectProperties_fromAnnualElvNDVIgradients = function(annualGradients, CLid_Name) {
  var propertyList = [CLid_Name, "Hybas_ID", "Year",
    "offset", "slope", "slopeString"];
  
  return annualGradients.select({
    propertySelectors: propertyList,
    retainGeometry: true
  });
};


// Function to estimate the temporal trends of 
//  annual elevational NDVI gradients by transect.
exports.estimate_ElvNDVIgradientTrends_byTransect = function(
  transect_FtrCol, gradients, CLid_Name) {
    
    // Determine the name of the year property.
    var yearName = "Year";
  
  
    /* Gradient trend estimation. */
  
    // Combine the two-input Sen's slope 
    //  and one-input non-null distinct count reducers
    //  as the reducer to apply to each group, without the group field.
    var combinedReducer = ee.Reducer.sensSlope().combine({
      reducer2: ee.Reducer.countDistinctNonNull(), 
      sharedInputs: false
    });
  
    // Estimate the temporal trends of annual gradients by transect.
    var gradientTrend_List = ee.List(gradients.reduceColumns({
      selectors: [yearName, "slope", yearName, CLid_Name],
      reducer: combinedReducer.group({
        groupField: 3,
        groupName: CLid_Name,
      })
      // The grouped reduction:
      //  1) The "groupField" argument is the index of the input in the selectors array
      //    that contains the centerline IDs by which to group the output.
      //    The first field is index 0.
      //  2) The "groupName" argument specifies the name of the property
      //    to store the value of the grouping variable.
    }).get("groups"));
  
    // Determine the names of the trend-relevant properties.
    var yearCount_Name = "yearCount";
    var gradIntcep_Name = "gradIntcep";
    var gradTrend_Name = "gradTrend";
    
    // Convert the temporal trend List to a FeatureCollection.
    var gradientTrend_FtrCol = ee.FeatureCollection(gradientTrend_List.map(
      function(listElement) {
        var dictionary = ee.Dictionary(listElement);
        
        return ee.Feature(null).set(
          CLid_Name, dictionary.get(CLid_Name),
          yearCount_Name, dictionary.get("count"),
          gradIntcep_Name, dictionary.get("offset"),
          gradTrend_Name, dictionary.get("slope")
        );
      }));
    
    
    /* Transect and trend combination. */
    
    // Define a filter as transects and gradient trend Features
    //  that have the same centerline IDs.
    var CLid_Filter = ee.Filter.equals({
      leftField: CLid_Name,
      rightField: CLid_Name
    });
    
    // Set the property name of the matched Feature.
    var matched = gradTrend_Name;
    
    // Define a save-first join.
    var saveFirstJoin = ee.Join.saveFirst({
      matchKey: matched
    });
    
    // Join each transect with the gradient trend Feature that it shares the same centerline ID.
    var joined_FtrCol = saveFirstJoin.apply(transect_FtrCol, gradientTrend_FtrCol, 
      CLid_Filter);
    
    // Assign each joined gradient trend value to the corresponding transect.
    var transects_withTrends = joined_FtrCol.map(function(joined) {
      
      // Determine the joined gradient trend Feature.
      var trendFeature = ee.Feature(joined.get(matched));
    
      // Replace the joined trend Feature with its trend value
      //  and add other trend-relevant properties.
      var properties_Added = joined.set(
        matched, trendFeature.get(gradTrend_Name),
        gradIntcep_Name, trendFeature.get(gradIntcep_Name),
        yearCount_Name, trendFeature.get(yearCount_Name)
      );
      
      return properties_Added;
    });
    
    return transects_withTrends;
  };


