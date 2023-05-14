/*var requirejs = require('./r.js')

requirejs.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require
});*/
import config from "./config.json" assert { type: 'json' };

let axios;

let MESSAGE_API_URL = '';

if (typeof window === 'undefined') {
  axios = require('axios');
} else {
  axios = window.axios;
}

if (typeof window === 'undefined') {
  dotenv = require('dotenv');
  dotenv.config();
  MESSAGE_API_URL = process.env.API_HOST;

  console.log(MESSAGE_API_URL);
} else {
  MESSAGE_API_URL = config.API_HOST;

  console.log(MESSAGE_API_URL);
}

export function retrieveTruthEventsInTimeRange(from, to) {
  var start = parseInt(from);
  var end = parseInt(to);
  return axios.get(`${MESSAGE_API_URL}/movement_time?start=${start}&end=${end}`);
}

export function retrieveVocalizationEventsInTimeRange(from, to) {
  var start = parseInt(from);
  var end = parseInt(to);
  return axios.get(`${MESSAGE_API_URL}/events_time?start=${start}&end=${end}`);
}

export function retrieveMicrophones() {
  return axios.get(`${MESSAGE_API_URL}/microphones`);
}

export function retrieveAudio(id){
  //console.log(`${MESSAGE_API_URL}/audio?id=${id}`);
  return axios.get(`${MESSAGE_API_URL}/audio?id=${id}`);
}

export function startSimulator(){
  axios.post(`${MESSAGE_API_URL}/sim_control?control=Start`);
}

export function stopSimulator(){
  axios.post(`${MESSAGE_API_URL}/sim_control?control=Stop`);
}

export function retrieveSimTime(){
  return axios.get(`${MESSAGE_API_URL}/latest_movement`);
}