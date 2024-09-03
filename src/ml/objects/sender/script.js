// @ts-ignore
import { LitElement } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import { MlVision, Client } from "../../lib/index.js";
import { shortGuid } from 'ixfx/random.js';

// Parse query params
const params = (new URL(document.location.toString())).searchParams;

// Use 'peerId' specified as URL parameter or a random one
const peerId = params.get(`peerId`) ?? shortGuid();

// Setup
const ds = new MlVision(`#is`, {
  // Mode to run: pose, hand, objects, face
  mode: `objects`,
  // Remote id
  remote: {
    peerId
  },
  // Default camera
  camera: {
    facingMode: `user`,
  },
  objects: {
    scoreThreshold: 0.5,
    verbosity: `errors`,
    modelPath: `https://storage.googleapis.com/mediapipe-models/object_detector/efficientdet_lite0/int8/latest/efficientdet_lite0.tflite`
  },
  // How often to run computation on image
  computeFreqMs: 10,

  // For troubleshooting, try 'info' or 'debug'
  verbosity: `errors`,
  wasmBase: `/ml/lib`,
  modelsBase: ``,
  hideModelSelector: true
});

ds.init();

// Eg dump out data
// const client = new Client();
// client.addEventListener(`message`, event => {
//   const { detail } = event;
//   console.log(detail);
// })
