# Minimum sketch setup

What do you need to add Mediapipe stuff to an existing sketch? We'll assume the sketch is located in the root `demos` folder.

## Prep

Imports:

```js
import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";
import * as MpVision from "./ml/pose-helper/Poses.js";
```

In settings, add:
```js
const settings = Object.freeze({
  // ... your other other settings
  remote: new Remote(),
  poses: new MpVision.PosesTracker()
});
```

## Listening for data

We need a function to handle incoming data. Most of the time we don't want to do anything more with it than add it to the PosesTracker.

```js
function onReceivedPoses (packet) {
  const { _from, data } = packet;
  const poseData =/** @type MpVision.PoseData[] */(data);
  
  // Pass each pose over to the poses tracker
  for (const pose of poseData) {
    settings.poses.seen(_from, pose);
  }
};
```

And then in `setup()`, add it as a callback on Remote:

```js
settings.remote.onData = onReceivedPoses;
```


## Poses added/expired

If you want to be notified when a pose is added or expires...

We need two functions to be called when events fire:
```js
const onPoseAdded = (event) => {
  const poseTracker = /** @type MoveNet.PoseTracker */(event.detail);
  // do what you want when a pose is added...
};
const onPoseExpired = (event) => {
  const poseTracker = /** @type MoveNet.PoseTracker */(event.detail);
  // do what you want when a pose expires...
};
```

And in your `setup` function, add them as event listeners:
```js
settings.poses.events.addEventListener(`added`, onPoseAdded);
settings.poses.events.addEventListener(`expired`, onPoseExpired);
````