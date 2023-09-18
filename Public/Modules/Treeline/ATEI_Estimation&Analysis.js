/** 
 * Introduction:
 *  The "ATEI_Estimation&Analysis" module contains objects and funcitons
 *    for estimating and analyzing the Alpine Treeline Ecotone Index (ATEI) worldwide.
 *  @module Modules/Treeline/ATEI_Estimation&Analysis
 * 
 * Function groups:
 *  1) Functions for .
 * 
 * Reference to the public repository:
 *  https://code.earthengine.google.com/?scriptPath=users/ChenyangWei/Public
 * 
 * Load this module:
 *  var ATEI_EA = require("users/ChenyangWei/Public:Modules/Treeline/ATEI_Estimation&Analysis.js");
 * 
 * Update: 6/3/2023.
 */


/****** Load other prerequisite module(s). ******/

var GATE = require("users/ChenyangWei/Public:Modules/Treeline/Global_ATE.js");



/****** File names. ******/

/**
 * A String object representing the 30-m temporal median NDVI of 
 *  the identified open forests in the climatic ATE during 2015-2019
 *  in the Copernicus Land Cover data product.
 */
// exports.rawNDVI_OpenForests_FileName = "30mTemporalMedianNDVI_OpenForests_NewCATE_2015to2019";



/****** Regular objects. ******/

/**
 * A List object containing the major working directories of all continents.
 *  (Note: The working directory of Asia is in the default repository.)
 */
exports.WDs_AllContinents_List = [
  GATE.wd_NorthAmerica,
  GATE.wd_SouthAmerica,
  GATE.wd_Africa,
  GATE.wd_Oceania,
  GATE.wd_Europe,
  GATE.wd_Asia
];

/**
 * A List object containing the rectangular AOIs of all continents.
 *  (Note: The AOI of Asia contains ONE rectangle.)
 */
exports.AOIs_AllContinents_List = [
  GATE.AOI_NorthAmerica,
  GATE.AOI_SouthAmerica,
  GATE.AOI_Africa,
  GATE.AOI_Oceania,
  GATE.AOI_Europe,
  GATE.AOI_Asia
];

/**
 * A List object containing the region names of all continents.
 */
exports.Regions_AllContinents_List = [
  "North_America",
  "South_America",
  "Africa",
  "Oceania",
  "Europe",
  "Asia"
];

/**
 * A List object containing the region names of GMBA mountain ranges.
 *  ("Asia" should add "Pacific Ocean".)
 */
exports.GMBA_Regions_List = [
  "North America",
  "South America",
  "Africa",
  "Oceania",
  "Europe",
  "Asia"
];



/****** Functions. ******/


/**** 1) Functions for . ****/

/**
 * Returns a greeting string.
 * @param {ee.String} arg The name to which the greeting should be addressed
 * @return {ee.String} The complete greeting.
 */
// exports.foo = function(arg) {
//   return 'Hello, ' + arg + '!  And a good day to you!';
// };

