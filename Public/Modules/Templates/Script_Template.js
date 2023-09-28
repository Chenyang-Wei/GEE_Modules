/**
 * Introduction:
 * 
 *  1) Operation #1.
 * 
 *  2) Operation #2.
 * 
 *  3) Operation #3.
 * 
 * Updated: 9/21/2023.
 * 
 * Runtime: N/A.
*/


/* Module loading. */


/* Object definition. */


/* Function definition. */


/* Dataset loading. */


/* 1) Operation #1. */


/* 2) Operation #2. */


/* 3) Operation #3. */


/* Check/output the result(s). */

var output = false; // true OR false.

if (!output) {
  
  // Visualization.
  
  Map.setOptions("Satellite");
  
} else {
  
  // Output to Asset.
  
  var fileName = "HybasSampled_ATETs";
  
  Export.table.toAsset({
    collection: sampled_Transects, 
    description: fileName, 
    assetId: GATE.wd_Global 
      + "Elevational_Transects/"
      + "Validation/"
      + fileName
  });
}

