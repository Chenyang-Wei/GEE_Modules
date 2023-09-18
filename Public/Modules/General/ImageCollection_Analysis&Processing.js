/** 
 * Introduction:
 *  This is a module for objects and funcitons that are often used
 *    for ImageCollection analysis and processing.
 * 
 * Sections:
 *  1) Functions for the ImageCollection transformation.
 * 
 * Reference to the public repository:
 *  https://code.earthengine.google.com/?scriptPath=users/ChenyangWei/Public
 * 
 * Load this module:
 *  var IC_AP = require("users/ChenyangWei/Public:Modules/General/ImageCollection_Analysis&Processing.js");
 * 
 * Update: 10/26/2022.
 */


/****** Objects. ******/




/****** Functions. ******/

/**** 1) Functions for the ImageCollection transformation. ****/

// Function to convert an ImageCollection to a multi-band Image.
//  (To iterate over an ImageCollection.)
exports.Convert_ImgCol_toImage = function(current_Img, previous_Img) {
  
  /**
   * "Image":
   *  current_Img, previous_Img.
   * 
   * Return: Image.
  */
  
  var multiBand_Img = ee.Algorithms.If(
    
    // Check whether or not the current Image is the first Image in the ImageCollection.
    ee.Algorithms.IsEqual(previous_Img, null), 
    
    // True: for the first Image.
    current_Img, 
    
    // False: for the rest Images.
    ee.Image(previous_Img).addBands(current_Img) 
  );
  
  return multiBand_Img;
};

