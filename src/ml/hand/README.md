# ml / hand

Uses MediaPipe to generate landmarks of the hand.

See [MediaPipe's documentation](https://ai.google.dev/edge/mediapipe/solutions/vision/hand_landmarker#models) for more information on the model.

## Local models

By default it will load models from the web. You can save these and put them in the `lib/` folder. 

The URL for a model is based on `modelsBase` and `modelsPath`. For example, assuming you have downloaded a model to `/ml/lib/pose_landmarker_full.task`, you change the options in `script.js`:
```js
{
 ...
  modelsBase: `/ml/lib/`,
 ... 
}
```

Instead of:
```js
{
  ...
  modelsBase: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/`
  ...
}
```