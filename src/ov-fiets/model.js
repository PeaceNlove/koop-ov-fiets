/*
  model.js

  This file is required. It must export a class with at least one public function called `getData`

  Documentation: https://koopjs.github.io/docs/usage/provider
*/
var request = require('request');
function Model (koop) {}

// Public function to return data from the
// Return: GeoJSON FeatureCollection
//
// Config parameters (config/default.json)
// req.
//
// URL path parameters:
// req.params.host (if index.js:hosts true)
// req.params.id  (if index.js:disableIdParam false)
// req.params.layer
// req.params.method
Model.prototype.getData = function (req, callback) {
  const url = "http://fiets.openov.nl/locaties.json";
  const geojson = {
    type: 'FeatureCollection',
    features: [],
    metadata: {
    name: "OV_fiets", // The name of the layer
    description: "This layer contains the public transport rental bikes locations and availability", // The description of the layer
    displayField: "rentalBikes" // The display field to be used by a client
    }
  }
  
  request.get(url, function(e, res){
    var json = JSON.parse(res.body);
    for (var i in json.locaties){	
        //"ck001": {"name": "OV-fiets", "extra": {"fetchTime": 1444988292, "rentalBikes": "14", "locationCode": "ck001"}, "lat": 51.72659, "link": {"params": {}, "uri": "https://places.ns-mlab.nl/api/v2/places/station-retail/OV-fiets-ck001"}, "stationCode": "CK", "openingHours": [{"dayOfWeek": 1, "endTime": "00:00", "startTime": "00:00"}, {"dayOfWeek": 2, "endTime": "00:00", "startTime": "00:00"}, {"dayOfWeek": 3, "endTime": "00:00", "startTime": "00:00"}, {"dayOfWeek": 4, "endTime": "00:00", "startTime": "00:00"}, {"dayOfWeek": 5, "endTime": "00:00", "startTime": "00:00"}, {"dayOfWeek": 6, "endTime": "00:00", "startTime": "00:00"}, {"dayOfWeek": 7, "endTime": "00:00", "startTime": "00:00"} ], "lng": 5.87423, "open": "Yes", "description": "Cuijk"}, 						  var feature = {
            var feature = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    parseFloat(json.locaties[i].lng),parseFloat(json.locaties[i].lat)
                ]
            },
            "properties": json.locaties[i]
          }
          delete feature.properties.lng;
          delete feature.properties.lat;
          feature.properties.locationCode = i;
          if (feature.properties.extra && feature.properties.extra.rentalBikes){
              feature.properties.rentalBikes = parseInt(feature.properties.extra.rentalBikes);		
          }
          else{
            feature.properties.rentalBikes = null;
          }
          delete feature.properties.infoImages
          delete feature.properties.extra
          delete feature.properties.extraInfo
          delete feature.properties.apps
          delete feature.properties.sites
          delete feature.properties.thumbnail
          delete feature.properties.link;
          delete feature.properties.params;
          delete feature.properties.uri;
          delete feature.properties.openingHours;
          geojson.features.push(feature);
      }
      callback(null, geojson)
  });

  
}

module.exports = Model
