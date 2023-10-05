// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// -------------------------------------------------------------------------
// Joseph White
// School of Animals, Plants & Environmental Sciences
// University of the Witwatersrand
// 17 November 2021
// -------------------------------------------------------------------------
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// See: Phillips, S. J. 2017. A Brief Tutorial on Maxent. Available from url: http://biodiversityinformatics.amnh.org/open_source/maxent/. Accessed onXXXX-XX-XX.

///////////////////////////////////
//// IMPORT DATA & PRE-PROCESS ////
///////////////////////////////////

// Locality data //////////////////////////////////////////////

// Presence points of Solanum acuale (extracted from the R Dismo package and uploaded to GEE as an asset)
// var presences = ee.FeatureCollection("users/jdmwhite/solanum_acuale");
// Presence points of Bradypus variegatus (extracted from the R Dismo package and uploaded to GEE as an asset)
var presences = ee.FeatureCollection("users/jdmwhite/bradypus");
// Add presence points to map
Map.centerObject(presences, 4);
Map.addLayer(presences, {color: 'red'},'Bradypus presences', false);

// Area of interest ////////////////////////////////////////////////////////////////////////////////////////////////////

// Load in the countries FeatureCollection data
var countries = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
// Create a polygon.
var polygon = ee.Geometry.Polygon([
[-87.14743379727207,-34.736435036461145],[-32.12790254727207,-34.736435036461145],[-32.12790254727207,16.642228542503663],
[-87.14743379727207,16.642228542503663],[-87.14743379727207,-34.736435036461145]
]);

// Find the intersection of the polygon and S.American countries
// Map over the countries and use filterBounds & intersect to clip to our S.American AOI
var aoi = countries.filterBounds(polygon).map(function(f) {
  return f.intersection(polygon, 1);//1 refers to the maxError argument
});

// Combine the countries/polygons into one feature with union
var aoi = aoi.union();
Map.addLayer(polygon,{}, "Polygon", false);
Map.addLayer(aoi, {},"Area of interest", false);

// Environmental data ////////////////////////////////////////////////////////////////////////////////////////////////////

// Load in bioclimatic variables from WorldClim 
// Based on the R Dismo tutorials - these are the bioclim variables typically used for Bradypus distributions
var worldclim = ee.Image("WORLDCLIM/V1/BIO").select(['bio01','bio05','bio06','bio07','bio08','bio12','bio16','bio17']).rename(
                              ['Ann_mean_T','Max_T_warmest_month','Min_T_coldest_month',
                              'T_Ann_range','Mean_T_wettest_quarter','Ann_P',
                              'P_wettest_quarter','P_driest_quarter']);

// Load in terrain data
var elev = ee.Image("USGS/SRTMGL1_003");

// Load in Eco-regions
var ecoregions =  ee.FeatureCollection("RESOLVE/ECOREGIONS/2017").filterBounds(aoi) // filter this to our area of interest
  .reduceToImage({ // now run a vector to raster conversion
    properties: ['ECO_ID'], // select the band of interest
    reducer: ee.Reducer.first() // run a first() reducer - there is no overlap so this just takes the first value
}).select('first').rename('ECO_ID'); // the band is named 'first', so rename to ECO_ID

// Map.addLayer(ecoregions, {min: 439, max: 617}, 'Ecoregions', false);

// We now want to merge our full environmental covariate dataset together, using addBands()
// At the same time we can now clip it to our area of interest
var vars = worldclim.addBands(elev).addBands(ecoregions).clip(aoi);
// Using this method, you can add in extra bands to your predictor variable from any Image/ImageCollection
print('Check all covariates:', vars);

// // NOTE // 
// // At this point it is valuable to calculate a correlation matrix and select only variables 
// // that are uncorrelated below a certain threshold.
// // For GEE script on this, see https://code.earthengine.google.com/27557ebe40e549f604ed1005e047b75a

/////////////////////////////
//// PRE-PROCESSING DATA ////
/////////////////////////////

// Locality data //

// Make sure all of the presence points are within our AOI
var filtered_locs = presences.filterBounds(aoi);
// How many presence points do we have?
print('No. of localities:', filtered_locs.size());

//add a presence property to each feature i.e. a value of 1 to represent presence
var Presence = filtered_locs.map(function(feature){
  return feature.set('Presence', 1);
});

//create random pseudo-absence points and add 0 value to the presence property for absence
// check the Docs for the randomPoints function; requires region, number of points to generate & a seed
var pAbsencePoints = ee.FeatureCollection.randomPoints(aoi, filtered_locs.size(), 42).map(function(feature){
  return feature.set('Presence', 0); // we then add 0s to all pseudo-absences
});
// You need to be careful with how you chose your pseudo-absences...


// Add pseudo-absence points to the map
Map.addLayer(pAbsencePoints, {color: "gray"}, "Pseudo-absence points", false);

//Merge the presence and pseudo-absence points into a single feature
var points = Presence.merge(pAbsencePoints);
print('Check the full points dataset:', points);

// For later model evaluation, it is important to have a set of data for 'training' the 
// model and another set of data for 'testing' the model

// To do this, we will split the data into 80% for training and 20% for testing
// Add a random column by default named 'random'
var new_table = points.randomColumn({seed: 42}); 
var training = new_table.filter(ee.Filter.lt('random', 0.80));
// print("Check training data:", training);
var test = new_table.filter(ee.Filter.gte('random', 0.80));
// print("Check test data:", test);

// Extract the environmental variable values for each point
// Sampling using sampleRegions()
var trainingData = vars.sampleRegions({
  collection: training,
  properties: ['Presence'],
  geometries: true,
  scale: 1000
});
print('Check sampled data:', trainingData.limit(5));

// At this point, many users may want to export the locality data, together with 
// the covariate data to use it in a different program where there is more support
// for SDMs. So we will export the data before continuing. You can export it as 
// a shapefile or csv

// Export.table.toDrive({collection: trainingData, 
//                       description: 'Bradypus_sampled',
//                       fileFormat: 'SHP'});

//////////////////
//// ANALYSIS ////
//////////////////

//////////////////
//// MAXENT //////
//////////////////

// We will now fit a Classifier, using Maxent
var MXmodel = ee.Classifier.amnhMaxent()
                            .setOutputMode('PROBABILITY')
                            .train({
                              features: trainingData, 
                              classProperty: 'Presence', 
                              inputProperties: vars.bandNames(),
                            });
print(MXmodel, 'model input'); // Take a look at the model inputs

// Take a look at the model output
// This shows us the relative contributions of covariates to Bradypus distribution
// and also gives us the overall AUC of the model
print(MXmodel.explain(), 'model output');

// Area Under Curve 
var MX_AUC = MXmodel.explain().get('Training AUC').aside(print, 'MX AUC')
// AUC is the probability that a randomly chosen presence location is ranked higher than a randomly chosen background point

// Variable importance as contributions
var MXimportance = MXmodel.explain().aside(print,'explain MX model')
                  .get('Contributions').aside(print, 'Check MX model importance');

// Convert the importance values into a feature for plotting
var MXimportance_plot = ee.FeatureCollection(ee.Feature(null, ee.Dictionary(MXimportance)));
print('Check importance values:', MXimportance_plot);

///////////////////
// Visualisation //
///////////////////

// Plot the resulting variable importance in a bar chart
var chart =
ui.Chart.feature.byProperty(MXimportance_plot)
.setChartType('ColumnChart')
.setOptions({
title: 'Maxent Variable Importance',
legend: {position: 'none'},
hAxis: {title: 'Covariates'},
vAxis: {title: 'Importance (%)'}
});
print(chart);

// Run the prediction
var MXprediction = vars.classify(MXmodel);

// // Export the image to an Earth Engine asset.
// Export.image.toAsset({
//   image: MXprediction,
//   description: 'bradypus_MX_prediction',
//   scale: 5000,
//   region: aoi,
// });

// Load the predicted SDM image
var MXprediction = ee.Image('users/jdmwhite/bradypus_MX_prediction');

// Add in custom palette
var palettes = require('users/gena/packages:palettes');
var palette_mag = palettes.matplotlib.magma[7];

Map.addLayer(MXprediction, {bands: 'probability', min: 0, max: 1, palette: palette_mag},
'Probability of occurence (MaxEnt)', false);

/////////////////////////
//// Random Forest //////
/////////////////////////

// We need to specificy the number of trees required; we'll use 100 trees, which can be a good balance
// between under/over-fitting
var RFmodel = ee.Classifier.smileRandomForest({numberOfTrees: 100})
                            .setOutputMode('PROBABILITY') 
                            // .setOutputMode('CLASSIFICATION') 
                            .train({
                              features: trainingData, 
                              classProperty: 'Presence', 
                              inputProperties: vars.bandNames(),
                            });
print("Check model output:", RFmodel);

///////////////////
// Visualisation //
///////////////////

// Variable importance as Gini index
var RFimportance = RFmodel.explain().aside(print,'explain model')
                  .get('importance').aside(print, 'Check model importance');

// Convert the importance values into a feature for plotting
var RFimportance_plot = ee.FeatureCollection(ee.Feature(null, ee.Dictionary(RFimportance)));
print('Check importance values:', RFimportance_plot);

// Plot the resulting variable importance in a bar chart
var chart =
ui.Chart.feature.byProperty(RFimportance_plot)
.setChartType('ColumnChart')
.setOptions({
title: 'Random Forest Variable Importance',
legend: {position: 'none'},
hAxis: {title: 'Covariates'},
vAxis: {title: 'Importance'}
});
print(chart);

// Classify the image with the same bands used for training.
var RFprediction = vars.classify(RFmodel);

// Export the image to an Earth Engine asset.
// Export.image.toAsset({
//   image: RFprediction,
//   description: 'bradypus_RF_prediction',
//   scale: 5000,
//   region: aoi,
// });

// Load the predicted SDM image
var RFprediction = ee.Image('users/jdmwhite/bradypus_RF_prediction') 

// Display the predicted probability of occurence results.
Map.addLayer(RFprediction, {palette: palette_mag},'Probability of occurence (RF)', false);

///////////////////
// ENSEMBLE ///////
///////////////////

var collectionFromImages = ee.ImageCollection.fromImages(
  [ee.Image(RFprediction), ee.Image(MXprediction.select('probability').rename('classification'))]);
print('Check collectionFromImages:', collectionFromImages);

var ensemble_prediction = collectionFromImages.mean()
print('ensemble',ensemble_prediction);

Map.addLayer(ensemble_prediction, {palette: palette_mag},'Probability of occurence (ensemble)', false);

// Add in a legend for aid in visualisation

// Styling for the legend title.
var LEGEND_TITLE_STYLE = {
  fontSize: '16px',
  // fontWeight: 'bold',
  stretch: 'horizontal',
  textAlign: 'left',
  margin: '4px',
};

function ColorBar(palette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '100x10',
      format: 'png',
      min: 0, // change min value
      max: 1, // change max value
      palette: palette_mag, // chose the correct palette
    },
    style: {stretch: 'horizontal', margin: '0px 8px'},
  });
}

// Returns our labeled legend, with a color bar and three labels representing
// the minimum, middle, and maximum values.
function makeLegend() {
  var labelPanel = ui.Panel(
      [ui.Label('0', {margin: '4px 8px'}), // change min label here
      ui.Label('',{margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
      ui.Label('1', {margin: '4px 8px'})], // change max label here
      ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([ColorBar(palette_mag.palette), labelPanel]);
}

// Assemble the legend panel.
Map.add(ui.Panel(
    [
      ui.Label('Probability of occurrence', LEGEND_TITLE_STYLE), makeLegend() // change title here
      ],
    ui.Panel.Layout.flow('vertical'),
    {width: '230px', position: 'bottom-center'})); // change location here to chose where to put legend

// Specify region by your polygon, define the chosen palette & set width size (height adjusts automatically).
var thumbnail = MXprediction.select('probability').getThumbURL({
  palette: palette_mag,
  dimensions: 1000, // change dimensions here for a higher res image
  region: polygon,
  format: 'png'
});
print('Output image:', thumbnail);

// //////////////////////
// // Model Evaluation //
// //////////////////////

// // Accuracy assesment is very important, training vs test data - more on this in your next practical!
// // However, the code is included here so that the full workflow is available to you if you want it
// // This only works if you change your RF to 'CLASSIFICATION' rather than 'PROBABILITY'. 

// var Accuracy = RFmodel.confusionMatrix().accuracy();
// print('Training Data Accuracy:', Accuracy);
// // Test accuracy
// var testData = vars.sampleRegions({
//   collection: test,
//   properties: ['Presence'],
//   // geometries: true,
//   scale: 1000
// });
// print('Check test data:',testData.limit(5));

// var Test = testData.classify(RFmodel);
// print(Test);
// print('ConfusionMatrix', Test.errorMatrix('Presence', 'classification'));
// print('TestAccuracy', Test.errorMatrix('Presence', 'classification').accuracy());
// print('Kappa Coefficient', Test.errorMatrix('Presence', 'classification').kappa());
// print('Producers Accuracy', Test.errorMatrix('Presence', 'classification').producersAccuracy());
// print('Users Accuracy', Test.errorMatrix('Presence', 'classification').consumersAccuracy());

// ///////////////////////////////
// So, is GEE useful for SDMs? //
// ///////////////////////////////


// /////////////////////////////////////////////////////
// PRACTICAL 6 ASSIGNMENT /////////////////////////////
// /////////////////////////////////////////////////////

// INSTRUCTIONS:

// Use the Solanum acuale presence data (or your own species locality data) to analyse the important environmental covariates that determine this plant's distribution patterns.
// ..............................................
                              
// Comment out the import code for Bradypus and uncomment in the import code for Solanum
// Consider adding in more or different environmental covariates
// Run at least the MaxEnt model
// ..............................................
                              
// Provide some commentary (2-3 sentences) with your assignment on the covariates that are most important contributors to explaining Solanum acuale's distribution patterns and whether the model is an accurate representation of the patterns based on the strength of the model using the AUC value. 
// ..............................................

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

