# ml / face

Uses MediaPipe to generate a couple of landmarks of the face.

See [MediaPipe's documentation](https://ai.google.dev/edge/mediapipe/solutions/vision/hand_landmarker#models) for more information on the model.

## Local models

By default it will load models from the web. You can save these and put them in the `lib/` folder. 

The URL for a model is based on `modelsBase` and `modelsPath`. For example, assuming you have downloaded a model to `/ml/lib/blaze_face_short_range.tflite`, you change the options in `script.js`:
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
  modelsBase: `https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/latest/`
  ...
}
```