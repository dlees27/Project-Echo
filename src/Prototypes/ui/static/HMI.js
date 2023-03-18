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
  
  
    // Not used but leaving here for example
    //
    //   let select = new ol.interaction.Select({
    //     condition: ol.events.condition.pointerMove,
    //   });
    //   select.on("select", (evt) => {
    //     console.log(evt);
    //   });
    //   map.addInteraction(select);
  
    appState.basemap = basemap;
  
    //appState.heartbeatStyle = getEventStyles(appState, 'heartbeat');
    //appState.pulseStyle = getEventStyles(appState, 'drtpulse');

  
    /*appState.outlineStyle = new ol.style.Style({
      visible: false,
      lineCap: 'round',
      stroke: new ol.style.Stroke({
        color: [0, 0, 0],
        width: appState.participantOutlineScale,
      }),
    });
  
    appState.participantOutlineMarkerStyle = new ol.style.Style({
      image: new ol.style.Circle({
        radius: 10,
        stroke: new ol.style.Stroke({
          color: [0, 0, 0],
          width: 3,
        }),
      }),
    });*/
  
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