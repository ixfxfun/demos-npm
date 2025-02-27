# ml / hand

Uses MediaPipe to generate landmarks of the hand.

See [MediaPipe's documentation](https://ai.google.dev/edge/mediapipe/solutions/vision/hand_landmarker#models) for more information on the model.

Most simply, this model gives you the x, y & z position of 21 well-defined _landmarks_ per detected hand.

![Landmarks](hand-pose.avif)

The numerical number of each landmark is fixed, for example #0 always refers to the wrist. The model also give a prediction for whether a hand is left or right, allowing you take different action accordingly.

## Data

In the sketches, hand pose data comes in to the `updateFromHands` function as the first parameter. It's of type `HandLandmarkerResult`, which looks like:

```ts
type HandLandmarkerResult = {
  /** Landmarks of detected hands. */
  landmarks: NormalizedLandmark[][]

  /** Landmarks in world coordinates of detected hands. */
  worldLandmarks: Landmark[][]

  /** Handedness of detected hands. */
  handedness: Category[][];
}
```

The first thing to realise is each field is a two-dimensional array, as evident in the `[][]` typing. A two-dimensional array is an array containing arrays. You can think of this like a table: each row contains several cells of data. So to get access to a specific bit of data you need two coordinates: row and column.

In our case, the first coordinate - the row - is the index of detected hand. Eg: 
```js
result.landmarks[0] // array of landmarks for the first hand.
result.landmarks.length // how many hands  

for (const landmarks of result.landmarks) {
  // Iterate over each hand-worth of landmarks
}
```

The array indexes are consistent: `landmarks[1]` refers to the same hand as `worldLandmarks[1]` and `handedness[1]`.

The second coordinate - the column - differs for the field. For `landmarks` and `worldLandmarks` you get a list of landmarks. For `handedness` you get a list of categorisaton results.

Example:
```js
// Get landmark for point 4 (tip of thumb)
result.landmarks[0][4]; // { x, y, z, visibility }
```

Let us look at the contents of the sub-arrays.

### Landmarks

This is an array of `NormalizedLandmark`, essentially, a scalar 3D coordinate along with a value denoting the 'visibility' of the landmark. These are all on a normalised (0..1) scale in relation to the camera frame. This means values a hand closer to the camera (filling more of the image) will report a wider range of numbers than a hand furtherer away. 

```ts
type NormalizedLandmark = {
  x: number; // 0..1
  y: number; // 0..1
  z: number; // 0..1
  visibility: number; // 0..1
}
```

`x` and `y` are the position in relation to camera frame. Ie. `x:0, y:0` means the point is in the top-left of the camera frame, while `x:1, y:1` means the bottom-right.

`z` represents depth, in relation to the wrist. A negative Z value is the extent to which the point is closer to camera than the wrist. A positive Z value is the extent to which the point points away from the camera.

`visibility` denotes how visually obscured the landmark is, in relation to camera.

## World landmarks (recommended)

World landmarks are normalised to the geometric center of the hand. This is useful because values will stay on the same range regardless of distance to camera, or where in camera frame it is. Since points have a their own hand as a reference point, it's not possible to compare hands in physical or camera space. For example, to compare the distance between two thumbs. But you can compare the pose of one hand to another, for example, how much one hand is balled up into a fist compared to the other.

```ts
type Landmark = {
  x: number; // 0..1
  y: number; // 0..1
  z: number; // 0..1
  visibility: number; // 0..1
}
```

The properties of `Landmark` are the same as the normalised landmark except with the different origin point.

## Handedness

This property gives a prediction of whether the hand is left or right.

```js
type Category = {
  score: number
  index: number         // ignore this
  categoryName: string
  displayName: string
}
```

For example, if two hands are showing you might get `result.handedness` of:
```js
[
  [ { score: 0.85, index: 1, categoryName: `Left`, displayName: `Left` } ],
  [ { score: 0.91, index: 0, categoryName: `Right`, displayName: `Right` } ],
]
```

The ordering of the array matters. The first result (index 0) is about hand 0, and so on. The `index` property is not what you might expect. It has nothing to do with the ordering of the hands in the `landmarks` or `worldLandmarks` arrays. Rather, it is the id of the category. That is, `Left` will always have an index of 1 and `Right` always an index of 0.


## Hands.js

There's a utility file included, `hands.js`. It makes accessing data a little more readable so you're not drowning in array indexes.

Here are some examples:
```js
import * as Hands from '../hands.js';

// Get {x,y,z} of tip of thumb
const thumbTip = Hands.getFingertip(`thumb`, landmarks);

// Get {x,y,z} of the pinky finger's knuckle
const pinkyKnuckle = Hands.getKnuckle(`pinky`, landmarks);

// Get {x,y,z} of all fingertips as an array
const tips = Hands.getFingertips(landmarks);

// Get { landmarks, worldLandmarks, categories } for hand at index 0
const hand = Hands.getHand(0, data);

// Get the list of landmark array indexes for the ring finger
const indexes = Hands.FingerIndexes[`ring`]; // [13, 14, 15, 16]

// Get data for the left hand, if it's showing (undefined, otherwise)
const left = Hands.findByHandedness(`left`, hands);
```

## Tuning

There are some model tuning parameters you can set in the `sender` sketch. Keep in mind that this sketch is used by all of the sketches in this 'hand' folder. Make a copy of it if different settings will be needed.

Handy parameters:
* Adjusting total number of hands to look for. If you only use one hand, reducing it to one in the settings can improve performance.
* Change default camera
* Change processing speed
* If you're getting 'phantom' hands, adjust some of the confidence thresholds