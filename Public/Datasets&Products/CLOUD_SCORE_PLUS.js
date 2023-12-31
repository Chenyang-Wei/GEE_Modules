// Example showing how to apply Google Cloud Score+ mask
// Background of the product and script to apply it to a collection
// at goo.gle/g4g23-cloud-score-plus
var image = ee.Image('COPERNICUS/S2_SR_HARMONIZED/20230329T050659_20230329T051912_T43PGQ');
var rgbVis = {
  min: 0.0,
  max: 3000,
  bands: ['B4', 'B3', 'B2'],
};

Map.centerObject(image);
Map.addLayer(image, rgbVis, 'Full Image', false);

var csPlus = ee.ImageCollection('GOOGLE/CLOUD_SCORE_PLUS/V1/S2_HARMONIZED');
var csPlusBands = csPlus.first().bandNames();

// Link S2 and CS+ results.
var imageWithCs = image.linkCollection(csPlus, csPlusBands);
Map.addLayer(imageWithCs, rgbVis, 'Full Image', false);

// Function to mask pixels with low CS+ QA scores.
function maskLowQA(image) {
  var qaBand = 'cs';
  var clearThreshold = 0.5;
  var mask = image.select(qaBand).gte(clearThreshold);
  return image.updateMask(mask);
}

var maskedImage = ee.Image(maskLowQA(imageWithCs));
Map.addLayer(maskedImage, rgbVis, 'Masked Image');
