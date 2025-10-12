Tip: Most likely you don't want to create a `PosesTracker` yourself. Use `PoseConsumer` instead (see main README)

## Importing

In your own sketch, you can import stuff relating via:

```js
import { Poses, PosesConsumer } from "../util/Poses.js";
```
...assuming your sketch is located at `demos/ml/pose/YOUR-SKETCH` and thus accessible via _http://localhost:3000/ml/pose/YOUR-SKETCH_


## Setup

To create:
```js
const poses = new Poses.PosesTracker();
```

You can provide some options to override the default behaviour. The options are:
```js
// Remove a pose if it hasn't been seen for this long
maxAgeMs: 10_000,
// How many samples to store if 'storeIntermediate' is enabled
sampleLimit: 100,
// Whether to store data for each pose landmark
storeIntermediate:false
```

For example:

```js
const poses = new Poses.PosesTracker({
  // Remove a pose if we haven't seen it for 30seconds
  maxAge: 30_000
})
```

## Adding data

Tip: Again, if you're using a `PosesConsumer`, it will do this bit for you.

Whenever you receive pose data, you need to pass it to the tracker. To use it, call `seen`, passing the id of the sender, and the pose.

Eg. to add all received poses:

```js
remote.onData = (packet) {
  const { _from, data } = packet;
  const poseData =/** @type Types.Pose[] */(data);
  for (const pose of poseData) {
    settings.poses.seen(_from, pose);
  }
};
```