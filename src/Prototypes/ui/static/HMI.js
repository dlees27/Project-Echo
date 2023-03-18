'use strict';

var markups = [
  "elephant.svg",
  "monkey.svg",
  "tiger.svg"
]

function initialiseHMI(hmiState) {
    console.log(`initialising`);
  
    createBasemap(hmiState);
  
    //simulateData(hmiState);
}

function createBasemap(appState) {
  
    // Microphone layer
    var micSource = new ol.source.Vector();
    var micLayer = new ol.layer.Vector({
      name: 'micLayer',
      source: micSource,
      visible: true,
    });
  
    // Wildlife layer
    var wildlifeSource = new ol.source.Vector();
    var wildlifeLayer = new ol.layer.Vector({
      name: 'wildlifeLayer',
      source: wildlifeSource,
      visible: true
    });
  
    var basemap = new ol.Map({
      target: 'basemap',
      featureEvents: true,
      controls: ol.control
        .defaults({
          zoom: false,
        }),
      interactions: ol.interaction.defaults({
        constrainResolution: false,
      }),
      layers: [
        new ol.layer.Tile({
          name: 'mapTileLayer',
          source: new ol.source.XYZ({
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            maxZoom: 19,
          }),
        }),
        micLayer,
        wildlifeLayer,
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([hmiState.originLon, hmiState.originLat]),
        zoom: hmiState.defaultZoom,
      }),
    });

    //***Add some sample markers (WIP)***
    
    var markers = [];

    for(var i=0; i< 10; i++) {
      // Compute a random icon and lon/lat position.
      var icon = Math.floor(Math.random() * markups.length);
      var lon = Math.random() * 360 - 180;
      var lat = Math.random() * 170 - 85;
      

      // Add the marker into the array
      var mark= new ol.Feature({
        geometry: new ol.geom.Point(
          ol.proj.fromLonLat([lon, lat], "EPSG:900913")
        ),
      });
      var icon = new ol.style.Style({
          image: new ol.style.Icon({
            src: "/static/style/icons/"+ markups[icon]}),
          imgSize: 20,

      })
      mark.setStyle(icon);
      markers.push(mark);
    }

    console.log('markers: ', markers)

    var markerSource = new ol.source.Vector({
  		features: [markers],
    });
    var markerLayer = new ol.layer.Vector({
  		source: markerSource,
	  });
    map.addLayer(markerLayer);

    console.log('marker Layer: ', markerLayer);
    
    hmiState.basemap = basemap;

  
    return basemap;
}
 
function simulateData(hmiState) {

}

let simUpdateTimeout = null;

function queueSimUpdate(hmiState) {

    if (simUpdateTimeout) {
        clearTimeout(simUpdateTimeout);
    }

    simUpdateTimeout = setTimeout(
        simulateData,
        hmiState.requestInterval,
        hmiState
    );
}