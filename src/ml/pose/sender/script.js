// @ts-ignore
import { LitElement } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import { MlVision } from "../../lib/index.js";
import { shortGuid } from 'ixfx/random.js';

// Parse query params
const params = (new URL(document.location.toString())).searchParams;

// Use 'peerId' specified as URL parameter or a random one
const peerId = params.get(`peerId`) ?? shortGuid();

// Setup
const ds = new MlVision(`#is`, {
  // Mode to run: pose, hand, objects, face
  mode: `pose`,
  // How often to run computation on image
  // Increase number to reduce CPU load, but add latency
  computeFreqMs: 100,
  // Remote id
  remote: {
    peerId
  },
  // Default camera
  camera: {
    facingMode: `user`,
  },
  // Settings for pose detection
  pose: {
    // See: https://ai.google.dev/edge/mediapipe/solutions/vision/pose_landmarker#configurations_options
    outputSegmentationMasks: false,
    minPoseDetectionConfidence: 0.5,
    minPosePresenceConfidence: 0.5,
    minTrackingConfidence: 0.5,
    numPoses: 5,
    // For more on models:
    // https://ai.google.dev/edge/mediapipe/solutions/vision/pose_landmarker#models
    modelPath: `pose_landmarker_lite.task`,
    verbosity: `errors`,
    matcher: {
      distanceThreshold: 0.1,
      maxAgeMs: 2000,
      verbosity: `errors`
    }
  },
  // For troubleshooting, try 'info' or 'debug'
  verbosity: `errors`,
  wasmBase: `/ml/lib`,
  // If you download models locally, put them in /ml/lib, use the setting '/ml/lib'
  modelsBase: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/latest/`,
  hideModelSelector: true
});

ds.init();

// Eg dump out data
// const client = new Client();
// client.addEventListener(`message`, event => {
//   const { detail } = event;
//   console.log(detail);
// })
