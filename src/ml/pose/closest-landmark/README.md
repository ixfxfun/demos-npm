# closest-landmark

For a single pose, finds the closest landmark to another one.

The key functionality here is:

```js
// Get our target landmark
const targetLandmarkLandmark = pose.landmarkValue(targetLandmark);

// Get a list of landmarks sorted by 2d distance to target
const toTarget = pose.getByDistanceFromPoint(targetLandmarkLandmark, true);

// We want the second-closest landmark, because the closest will be the landmark itself.
const closest = toTarget[1];
```

Note the use of _true_ as the second parameter to `getByDistanceFromPoint`. This will do the distance calculation using only the x & y coordinates. This tends to be more reliable than calculating with depth as well.