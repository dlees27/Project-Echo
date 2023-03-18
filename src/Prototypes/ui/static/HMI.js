'use strict';

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