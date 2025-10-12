# pose/sender

See `script.js` for parameters to tune the pose detection.

You might want to copy this folder when making tweaks, so differently-tuned versions are available. Make sure you update the HTML in your sketch to point to the right sender.

## URL parameters

If you want to re-use the same 'sender' sketch in different contexts, it may be preferred to set parameter values dynamically, via the URL.

That is, rather than opening up:
```
http://127.0.0.1:3000/ml/pose/sender/index.html
```

In your browser, you might open something like:
```
http://127.0.0.1:3000/ml/pose/sender/index.html?numPoses=2&minPoseDetectionConfidence=0.2&minPosePresenceConfidence=0.9&model=full
```

URL parameters are basically `name=value`, tacked on to the end of the URL. You can set it manually in the browser address bar, or when you link to the sender in the HTML. You can see the latter in `between-basic/index.html`

To add parameters, the first one must be prefixed with a '?', as in 'numPoses' above. After that, use a '&' between each one you add.

Parameters you can set (see the MediaPipe docs for more info)
* numPoses (default: 5)
* minPoseDetectionConfidence (default 0.5)
* minPosePresenceConfidence (default 0.5)
* minTrackingConfidence (default 0.5)
* computeFreqMs: how often to process frames (milliseconds). Lower numbers improve tracking fast moving things, but increase CPU load. (default 50)
* model: lite, heavy, full (default lite)

Examples: Only track one pose, as fast as we can, using the 'full' model
```
index.html?numPoses=1&computeFreqMs=1&model=full
```

## Changing models

You can change to one of three preset models, 'lite', 'full' and 'heavy'. See the [MediaPipe docs](https://ai.google.dev/edge/mediapipe/solutions/vision/pose_landmarker#models) for more on the differences.

Tip: You can also change models using a URL parameter as described above.

Eg. to use MP's 'Pose landmarker heavy' model, change the 'modelPath' property:
```js
{
  ...
  pose: {
    ...
    modelPath: `heavy`,
    ...
  }
  ...
}
```

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
  modelsBase: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/latest/`
  ...
}
```

## Sending

Transmits pose data via Remote.

To specify an id of the peer, use the `peerId` URL parameter. That is, we access the sketch via:

```
http://127.0.0.1:5555/ml/pose/sender/index.html?peerId=leftCamera
```

...this will give the sender the peer id of 'leftCamera'. In sketches where you receive data, this id will be associated with poses, allowing you to distinguish different poses depending on the source.

Read more
* [remote](https://github.com/clinth/remote) - a library for simplifying cross-device interaction