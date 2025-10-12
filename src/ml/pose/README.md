# ml/pose

We use MediaPipe (MP) for this module.
* [MediaPipe overview](https://ai.google.dev/edge/mediapipe/solutions/vision/pose_landmarker)
* [BlazePose model card](https://storage.googleapis.com/mediapipe-assets/Model%20Card%20BlazePose%20GHUM%203D.pdf)
* ixfx PointTracker [Guide](https://ixfx.fun/geometry/points/tracking/#pointtracker) or [API](https://api.ixfx.fun/_ixfx/geometry/PointTracker/)
* [Helper API docs](https://demos.ixfx.fun/ml/lib/client/docs/modules/Poses)

# Introduction

A _pose_ represents a single human body. A pose is made up of _landmarks_ which are defined parts of the body which are tracked. Each landmark is a 3D coordinate, given as _x, y_ & _z_, for example: `{ x: 0.012, y: 0.163, z: -0.643 }`. The _x_ and _y_ coordinates are scalars (0..1) and relative to the camera frame. That is, a landmark at `{ x: 0, y: 0 }` would correspond to the top-left of the camera. The _z_ coordinate can be thought of as distance to the camera. It uses the body's hips as a reference point, with negative numbers mean closer, positive values mean furtherer away. For example a large negative _z_ for the shoulder landmarks means the person is leaning forward, and positive values would mean they are leaning backward.

![](landmarks.png)

Each of the landmarks has an associated name, so in code you can access `left_shoulder` rather than using its numerical index of 11.

It's important to keep in mind that that 'left' and 'right' for landmarks are always with respect to the person's body, _not_ how it is oriented or position. That is, `left_shoulder` refers to the person's left shoulder, regardless of whether the shoulder is pointing left or right, or placed left or right.

To re-iterate, landmark names are _body-centric_, while _x,y_ coordinates are _camera-centric_. Because coordinates are camera-centric, you can spatially relate different poses, since they share the same coordinate space. For example, if one pose's average _x_ value is smaller than another pose's average _x_ value, it means it's more to the left in the camera frame.

All the image processing is done locally on your own computer. This keeps things private and low-latency, but does mean your GPU & CPU will get pushed. It's a good idea to keep your laptop plugged in so it runs at its best. You may also want to enable 'high performance' mode or similar.

# Demos overview

Roughly listed in ascending complexity
* starter-canvas / starter-dom: simple starter sketches that don't do much but get you going. One is set up for drawing on the canvas, the other for using DOM elements.
* closest-landmark: For a single pose, find the landmark closest to a target landmark.
* shoulders-basic: uses the height difference between left and right shoulder, drawing it using the canvas.
* head: uses some of the head landmarks (very much a mirror).
* hands-arms: does some basic calculations between hand and arm landmarks for any number of poses.
* between-basic: shows how to access poses and landmarks on a spatial basis.
* shoulders: Uses the same calculation as 'shoulders-basic', but uses the value in a fancier way, nudging a 'Thing' using physics rather than setting the value directly.
* between: computes distance between all pairs of bodies.
* landmark: visualises historical values per pose, per landmark.

# Architecture

A _sender_ sketch reads data from a source (webcam, video, or recorded points) and emits it via [Remote](https://github.com/clinth/remote). This is usually loaded in a separate browser window.

The sender sketch probably does not need to be modified, but it is how some MediaPipe settings can be tweaked. See its README for more on that, including how to dynamically set parameters using its URL.

In `pose/head`, we show how to embed the source in the page via an `IFRAME`. The downside of this is that with every little change in your code, the sender has to also reload - and this can be cumbersome because models have to be reloaded and media source initialised etc.

What's better is to open the sender sketch in a separate window and leave it running. Note that if you minimise or cover it over with another window, the browser may suspend Javascript execution (as a battery-saving mechanism). Your sketch might stop receiving pose data or the rate may be slowed.

Tip: There are tools for Windows & Mac to make any window stay on top of all other windows.

In terms of objects that you'll encounter, from top-level to low-level, we have: PosesConsumer -> PosesTracker -> PoseTracker -> PointTracker

* PosesConsumer: listens for pose data and updates the PosesTracker (you probably won't interact with this object)
* [PosesTracker](https://demos.ixfx.fun/ml/lib/client/docs/classes/Poses.PosesTracker): maintain a set of 'poses' (ie. different human bodies) currently observed by MediaPipe. Contains many PoseTracker instances.
* [PoseTracker](https://demos.ixfx.fun/ml/lib/client/docs/classes/Poses.PoseTracker): tracks the 'landmarks' of single pose. Contains many PointTracker instances.
* [PointTracker](https://api.ixfx.fun/_ixfx/geometry/PointTracker/): tracks the history of a single landmark, eg the nose, on a single body

Thus, if you want to do something with different poses, you probably want to start with the `PosesTracker`, use it to find the pose you're interested in and from there dig deeper.

## Pose ids

Pose ids are generated when MediaPipe starts tracking a body. If it loses tracking, the same human body might get assigned a new id. Ids are generated by the sender sketch. Since there could be multiple senders, we can't use the pose id to properly separate poses. Thus, we use a 'guid' (globally-unique id). This consists of the sender's id and the pose id put together.

# PosesTracker

[`PosesTracker`](https://demos.ixfx.fun/ml/lib/client/docs/classes/Poses.PosesTracker) keeps track of all current poses (ie. multiple bodies). Internally, it manages a set of `PoseTracker` objects for each detected pose.

## Basic setup

We create the PoseTracker via `PosesConsumer`. Below is a basic skeleton for setting it all up:

```js
// Import
import { Poses, PosesConsumer } from "../util/Poses.js";

const settings = Object.freeze({
  // Create as part of settings
  poses: new PosesConsumer({ 
    // Forget a pose if it hasn't been updated for over 1 second
    maxAgeMs: 1000 
  }).poses
});
```

To access pose data current and historical, do so via the `PoseTracker`:

```js
function update() {
  const { poses } = settings;

  // Loop over every current pose
  for (const pose of poses.get()) {
    // Get the geometric center of this body
    const centroid = pose.centroid();

    // ...compute some stuf
  }

  // Save to state...
}
```

## Listening for poses coming and going

It's often the case you want to take some action if a new pose is detected (eg. a person walks into frame) or if a pose is lost (eg. because the tracking has failed or because the person is out-of-frame).

To do this, add the event listeners:

```js
function setup() {
  const { poses } = settings;
  // Get notified when a new pose is detected or one expires
  poses.addEventListener(`added`, onPoseAdded);
  poses.addEventListener(`expired`, onPoseExpired);
}

// A new pose is detected
function onPoseAdded(event)  {
  // Get the PoseTracker for this pose
  const poseTracker = /** @type Poses.PoseTracker */(event.detail);
}

// A pose seems to have disappeared
function onPoseExpired(event)  {
  // Get the PoseTracker for the expired pose
  const poseTracker = /** @type Poses.PoseTracker */(event.detail);
}
```

## Enumerating data

Tip: Check the [`API docs for PosesTracker`](https://demos.ixfx.fun/ml/lib/client/docs/classes/Poses.PosesTracker) to browse all of these functions and more.

* Enumerate all poses: `get()` (PoseTracker instances)
* Get a pose by its guid: `getByGuid(guid:string)` (PoseTracker)

Spatial access
* Sorted by horizontal position `getByHorizontal` (position 0 is the left-most pose by camera frame)
* Sorted by vertical position `getByVertical` (position 0 is the highest pose, by camera frame)
* Sorted by by distance from point `getByDistanceFromPoint(point)`
* Closest pose to point `getClosestPoseToPoint(point)`

You can also access landmarks across all poses:
* All landmarks for all poses: `landmarks()` or filter to get all noses, for example: `landmarks('nose')`
* To get the raw landmark values: `landmarkValues()`, you could filter: `landmarkValues('left_hip')`

Raw pose data:
* Enumerate all poses: `getRawPoses()`
* Get raw pose by its guid: `getRawPoseByGuid(guid:string)` 

### Examples

```js
// Get all PoseTrackers (ie. all visible bodies)
for (const tracker of poses.get()) {
  // Since we have the tracker, we can do low-level work with landmarks
}

for (const pt of poses.landmarks(`nose`)) {
  // Do something with every currently-seen 'nose' landmark...
}
```

# PoseTracker

The [`PoseTracker`](https://demos.ixfx.fun/ml/lib/client/docs/classes/Poses.PoseTracker) instance maintains data for a single body. A body is itself made up several 'landmarks', known points of the body with associated coordinates. The `PoseTracker` does the work of tracking the movement of each landmark over time using a `PointTracker` ([Guide](https://ixfx.fun/geometry/points/tracking/#pointtracker), [API](https://api.ixfx.fun/_ixfx/geometry/PointTracker/))

There's documentation provided by VS Code when working with the tracker. But here's an overview:

Geometry that's based on all the landmarks of pose:

```js
poseTracker.box // { x, y, width, height }
poseTracker.height
poseTracker.width
poseTracker.middle // Middle of the .box rectangle

// Geometric middle point of pose (more correct than .middle)
poseTracker.centroid()
```

You can also do some basic computations based on a provided list of landmarks:
```js
// Get centroid between shoulders
poseTracker.centroid(`left_shoulder`, `right_shoulder`);
```

Each pose has an associated id which is useful for logically associating things with the same body. In practice, this is far from reliable, as the same human body may get assigned different ids over time as tracking is gained and lost.

```js
poseTracker.guid; // string
```

If you want to do something with a particular landmark, eg the nose, you can get the underlying [PointTracker](https://api.ixfx.fun/_ixfx/geometry/PointTracker/), or the raw point value:

```js
poseTracker.landmark(`nose`) // PointTracker
poseTracker.landmarkValue(`nose`); // Point
```

You can access landmarks spatially, with reference to the camera frame. All of these functions allow you to provide a named list of landmarks, or their numeric index. If no parameter is given, all landmarks for that pose are used.

This can be useful for example if you don't care which hand is being moved, you just care about the one that is reaching the most to the right of the camera frame.

```js
// Get PointTrackers for both landmarks, but sorted by X coordinate
poseTracker.getSortedByX(`left_wrist`, `right_wrist`); // Y & Z variations available too

poseTracker.getLeftmost(); // Get whichever feature is the leftmost
poseTracker.getRightmost(`left_ankle`, `right_ankle`); // Get whichever ankle is the rightmost
poseTracker.getHighest() / getLowest(); // Uses vertical
poseTracker.getNearest() / getFurtherest(); // Uses proximity to camera frame

poseTracker.getByDistanceFromPoint(point, use2d); // Get landmarks, sorted by distance from point
poseTracker.getClosestLandmarkToPoint(point); // Get closest landmark to point
```

If you have the `PointTracker`, then you can do things like calculate the angle of movement etc.

To enumerate `PointTrackers` or raw value for _all_ landmarks:

```js
poseTracker.landmarks()
poseTracker.landmarkValues()
```

You can also provide a list of indexes or named landmarks, and the library has a few in-built sets:

```js
// Get PointTrackers for right arm
for (const l of poseTracker.landmarks(...Poses.armRightIndexes)) {

}
```
To access the last raw `PoseData` from MediaPipe:
```js
poseTracker.last; // PoseData
```

# Recording

Point data is recorded to the browser's local storage. Image data is are not stored. The recording can be useful because all the image processing is already done, so playback is extremely lightweight.

# Troubleshooting

## https

Your code will not be able to access media devices like a camera if it's being loaded from an insecure connection.

If you're running a local server, make sure you're using http://127.0.0.1 as the address. If you're running from an online hosting service, make sure you're accessing via `https://`.
