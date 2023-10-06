/** 
 * Introduction:
 *  This is a module for objects and funcitons that are often used
 *    for analyzing and processing FeatureCollections.
 * 
 * Function groups:
 *  Group 1 - Examine the FeatureCollection information.
 *  Group 2 - Combine the FeatureCollection information.
 *  Group 3 - Process FeatureCollection properties.
 *  Group 4 - Perform calculations with FeatureCollection properties.
 *  Group 5 - Add the Image information to FeatureCollections.
 * 
 * Reference to the public repository:
 *  https://code.earthengine.google.com/?scriptPath=users/ChenyangWei/Public
 * 
 * Load this module:
 *  var FC_AP = require("users/ChenyangWei/Public:Modules/General/FeatureCollection_Analysis&Processing.js");
 * 
 * Update: 10/6/2023.
 */


/****** Objects. ******/




/****** Functions. ******/


/**** Group 1 - Examine the FeatureCollection information. ****/

// Function to print the basin information of a FeatureCollection.
exports.Print_FCinfo = function(name, ftrCol) {
  
  /**
   * "String":
   *  name.
   * 
   * "FeatureCollection":
   *  ftrCol.
   * 
   * Return: NA.
  */
  
  print(name,
    ftrCol.first(),
    ftrCol.size());
};


// Function to examine the percentiles of a FeatureCollection property.
exports.Examine_FtrCol_PropertyPercentiles = 
  function(caption, ftrCol, propertyName, percentileInterval) {
    
    /**
     * "FeatureCollection":
     *  ftrCol.
     * 
     * "String":
     *  caption, propertyName.
     * 
     * "Number":
     *  percentileInterval.
     * 
     * Return: NA.
    */
    
    var percentileReducer = ee.Reducer.percentile(ee.List.sequence({
      start: 0, 
      end: 100, 
      step: percentileInterval
    }));
    
    var percentiles = ftrCol.reduceColumns({
      reducer: percentileReducer, 
      selectors: [propertyName]
    });
    
    print(caption, propertyName, percentiles);
  };


/**** Group 2 - Combine the FeatureCollection information. ****/

/**
 * Join two FeatureCollections by a Filter and
 *  add the unique properties of each matched secondary Feature
 *  to the corresponding primary Feature.
 * 
 * @param {FeatureCollection} primary_FC - 
 *         The primary FeatureCollection to join.
 * @param {FeatureCollection} secondary_FC - 
 *         The secondary FeatureCollection to join.
 * @param {Filter} condition_Filter - 
 *         The join condition.
 * 
 * @return {FeatureCollection} - 
 *          The joined FeatureCollection with
 *            the Geometries and properties of the primary FeatureCollection
 *            and the unique properties of the secondary FeatureCollection.
 */
exports.Join_2FC_byFilter = 
  function(primary_FC, secondary_FC, condition_Filter) {
    
    // Get the property names of each primary Feature.
    var primaryProperties_List = primary_FC.first().propertyNames();
    
    // Set the name of each matched secondary Feature.
    var joinedName_Str = "joined_Secondary";
    
    // Join each primary Feature with the corresponding secondary Feature.
    var joined_FC = ee.Join.saveFirst({
      matchKey: joinedName_Str
    }).apply({
      primary: primary_FC, 
      secondary: secondary_FC, 
      condition: condition_Filter
    });
    
    // Copy the unique properties of each matched secondary Feature
    //  to the corresponding joined Feature.
    var propertyCopied_FC = joined_FC.map(function(joined_Ftr) {
      
      // Select the primary-Feature properties.
      var joinedPrimary_Ftr = joined_Ftr.select(primaryProperties_List);
      
      // Get the matched secondary Feature;
      var joinedSecondary_Ftr = joined_Ftr.get(joinedName_Str);
      
      // Copy the unique secondary-Feature properties.
      var propertyCopied_Ftr = joinedPrimary_Ftr.copyProperties({
        source: joinedSecondary_Ftr, 
        exclude: primaryProperties_List
      });
      
      return propertyCopied_Ftr;
    });
    
    // Return the joined FeatureCollection 
    //  with the unique properties of the secondary FeatureCollection.
    return propertyCopied_FC;
  };


// Function to combine two FeatureCollections by a common property,
//  which has the same name in both FeatureCollections,
//  and copy the unique properties of each matched secondary Feature
//  to the corresponding primary Feature.
exports.combine_twoFtrCols_byCommonProperty = 
  function(primaryFtrCol, secondaryFtrCol, commonProperty) {
    
    /**
     * "FeatureCollection": 
     *  primaryFtrCol, secondaryFtrCol.
     * 
     * "String": 
     *  commonProperty.
    */
    
    // Define a filter as the primary and secondary Features
    //  that have the same common property.
    var commonPropertyFilter = ee.Filter.equals({
      leftField: commonProperty,
      rightField: commonProperty
    });
    
    // Get the property names of each primary Feature.
    var primaryPropNames = primaryFtrCol.first().propertyNames();
    
    // Set the name of each matched secondary Feature.
    var matched = "matchedSecondary";
    
    // Define a save-first join.
    var saveFirstJoin = ee.Join.saveFirst({
      matchKey: matched
    });
    
    // Join each primary Feature with the secondary Feature
    //  that it shares the same common property.
    var joined_FtrCol = saveFirstJoin.apply(primaryFtrCol, secondaryFtrCol, 
      commonPropertyFilter);
    
    // Copy the unique properties of each matched secondary Feature
    //  to the corresponding primary Feature.
    var combined_FtrCol = joined_FtrCol.map(function(joinedFeature) {
      
      // Select the primary-Feature properties.
      var joinedFeature_primaryProperties = joinedFeature.select(primaryPropNames);
      
      // Get the matched secondary Feature;
      var matchedSecondary = joinedFeature.get(matched);
      
      // Copy the unique secondary-Feature properties.
      var combinedFeature = joinedFeature_primaryProperties.copyProperties({
        source: matchedSecondary, 
        exclude: primaryPropNames
      });
      
      return combinedFeature;
    });
    
    // Return the combined "FeatureCollection."
    return combined_FtrCol;
  };


// Function to combine the geometries of a FeatureCollection (primary)
//  and the properties of another FeatureCollection (secondary)
//  by a common property with two (different) names
//  in the two FeatureCollections.
exports.combine_twoFtrCols_primaryGeometriesANDsecondaryProperties = 
  function(primaryFtrCol, secondaryFtrCol, primaryProperty, secondaryProperty) {
    
    /**
     * "FeatureCollection": 
     *  primaryFtrCol, secondaryFtrCol.
     * 
     * "String": 
     *  primaryProperty, secondaryProperty.
    */
    
    // Define a filter as the primary and secondary Features
    //  that have the same common property.
    var commonPropertyFilter = ee.Filter.equals({
      leftField: primaryProperty,
      rightField: secondaryProperty
    });
    
    // Set the name of each matched secondary Feature.
    var matched = "matchedSecondary";
    
    // Define a save-first join.
    var saveFirstJoin = ee.Join.saveFirst({
      matchKey: matched
    });
    
    // Join each primary Feature with the secondary Feature
    //  that it shares the same common property.
    var joined_FtrCol = saveFirstJoin.apply(primaryFtrCol, secondaryFtrCol, 
      commonPropertyFilter);
    
    // Keep the geometries of the primary FeatureCollection
    //  and the properties of the secondary FeatureCollection.
    var combined_FtrCol = joined_FtrCol.map(function(joinedFeature) {
      
      // Derive the geometry of each primary Feature.
      var joinedFeature_Geometry = joinedFeature.geometry();
      
      // Get the matched secondary Feature;
      var matchedSecondary = joinedFeature.get(matched);
      
      // Copy all the properties of the matched secondary Feature .
      var combinedFeature = ee.Feature(joinedFeature_Geometry).copyProperties({
        source: matchedSecondary
      });
      
      return combinedFeature;
    });
    
    // Return the combined "FeatureCollection."
    return combined_FtrCol;
  };


/**** Group 3 - Process FeatureCollection properties. ****/

// Function to remove a list of properties from a FeatureCollection.
exports.FtrCol_PropertyRemoval = 
  function(rawFtrCol, propertiesToRemove) {
    
    /**
     * "FeatureCollection": 
     *  rawFtrCol.
     * 
     * "List": 
     *  propertiesToRemove.
    */
    
    // Get the original property names.
    var rawProperties = rawFtrCol.first().propertyNames();
    
    // Remove the list of properties.
    var newProperties = rawProperties.removeAll(propertiesToRemove);
    
    var newFtrCol = rawFtrCol.select({
      propertySelectors: newProperties
    });
    
    // Return a FeatureCollection.
    return newFtrCol;
  };


// Function to rename a list of properties for a FeatureCollection.
//  (Note: The old and new names should be in the same order.)
exports.FtrCol_PropertyRename = 
  function(rawFtrCol, oldNames, newNames) {
    
    /**
     * "FeatureCollection": 
     *  rawFtrCol.
     * 
     * "List": 
     *  oldNames, newNames.
    */
    
    // Get the original property names.
    var rawProperties = rawFtrCol.first().propertyNames();
    
    // Create two lists of property names.
    var otherProperties = rawProperties.removeAll(oldNames);
    
    var oldPropertyList = otherProperties.cat(oldNames);
    
    var newPropertyList = otherProperties.cat(newNames);
    
    // Rename the list of properties.
    var newFtrCol = rawFtrCol.select({
      propertySelectors: oldPropertyList, 
      newProperties: newPropertyList
    });
    
    // Return a FeatureCollection.
    return newFtrCol;
  };


/**** Group 4 - Perform calculations with FeatureCollection properties. ****/

// Function to compute the ratio between two properties of each Feature 
//  and add the result to each Feature as a new property.
exports.FtrCol_PropertyRatioCalculation = 
  function(rawFtrCol, numeratorName, denominatorName, ratioName) {
    
    /**
     * "FeatureCollection": 
     *  rawFtrCol.
     * 
     * "String": 
     *  numeratorName, denominatorName, ratioName.
     * 
     * Result: FeatureCollection.
    */
    
    var newFtrCol = rawFtrCol.map(function(rawFtr) {
      
      // Get the property values.
      var numeratorValue = rawFtr.get(numeratorName);
      
      var denominatorValue = rawFtr.get(denominatorName);
      
      // Calculate the ratio.
      var ratioValue = ee.Number(numeratorValue).divide(denominatorValue);
      
      // Add the ratio to each Feature as a new property.
      return rawFtr.set(ratioName, ratioValue);
    });
    
    // Return the FeatureCollection with the calculated ratio.
    return newFtrCol;
  };


// Function to compute the difference between two properties of each Feature 
//  and add the result to each Feature as a new property.
exports.FtrCol_PropertyDifferenceCalculation = 
  function(rawFtrCol, minuendName, subtrahendName, differenceName) {
    
    /**
     * "FeatureCollection": 
     *  rawFtrCol.
     * 
     * "String": 
     *  minuendName, subtrahendName, differenceName.
     * 
     * Result: FeatureCollection.
    */
    
    var newFtrCol = rawFtrCol.map(function(rawFtr) {
      
      // Get the property values.
      var minuendValue = rawFtr.get(minuendName);
      
      var subtrahendValue = rawFtr.get(subtrahendName);
      
      // Calculate the difference.
      var differenceValue = ee.Number(minuendValue).subtract(subtrahendValue);
      
      // Add the difference to each Feature as a new property.
      return rawFtr.set(differenceName, differenceValue);
    });
    
    // Return the FeatureCollection with the calculated difference.
    return newFtrCol;
  };


/**** Group 5 - Add the Image information to FeatureCollections. ****/

/**
 * Perform ReduceRegions over an Image by Feature group.
 * 
 * @param {Image} varToReduce_Img - Variable to aggregate.
 * @param {FeatureCollection} rawRegions_FC - Areal unit of 
 *         variable aggregation.
 * @param {String} groupIDname_Str - Name of the group ID of 
 *         Features/regions.
 * @param {Reducer} varReducer - Variable aggregation metric.
 * @param {Projection} imgProj - Projection of the variable 
 *         to aggregate.
 * 
 * @return {FeatureCollection} - Areal unit with the aggregated
 *          variable.
 */
exports.ReduceRegions_byFeatureGroup = 
  function(varToReduce_Img, rawRegions_FC, 
    groupIDname_Str, varReducer, imgProj) {
    
    // Create a non-duplicate List of the group ID.
    var groupIDs_List = rawRegions_FC
      .aggregate_array(groupIDname_Str)
      .distinct();
    
    // Perform ReduceRegions by Feature group.
    var newRegions_List = 
      groupIDs_List.map(function Reduce_byGroup(groupID_Num) {
        
        // Create a Filter of the group ID.
        var groupID_Filter = ee.Filter.eq(
          groupIDname_Str, groupID_Num);
        
        // Identify the Features of each group.
        var rawRegions_perGroup_FC = rawRegions_FC
          .filter(groupID_Filter);
        
        // Perform ReduceRegions.
        var newRegions_perGroup_FC = 
          varToReduce_Img.reduceRegions({
            collection: rawRegions_perGroup_FC, 
            reducer: varReducer,
            scale: imgProj.scale, 
            crs: imgProj.crs
          });
        
        return newRegions_perGroup_FC;
      });
      
    // Convert the result to a FeatureCollection.
    var newRegions_FC = ee.FeatureCollection(
      newRegions_List)
      .flatten();
      
    return newRegions_FC;
  };

