# pose-sender

See `script.js` for parameters to tune the pose detection.

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