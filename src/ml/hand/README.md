# ml / hand

Uses MediaPipe to generate landmarks of the hand.

See [MediaPipe's documentation](https://ai.google.dev/edge/mediapipe/solutions/vision/hand_landmarker#models) for more information on the model.

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

The first thing to realise is each field is a two-dimensional array: an array containing arrays. You can think of this like a table: each row contains several cells of data. So to get access to a specific bit of data you need two coordinates: row and column.

In our case, the first coordinate is the index of detected hand. Eg: 
```js
result.landmarks[0] // array of landmarks for the first hand.
result.landmarks.length // how many hands  

for (const landmarks of result.landmarks) {
  // Iterate over each hand-worth of landmarks
}
```

The array indexes are consistent: `landmarks[1]` refers to the same hand as `worldLandmarks[1]` and `handedness[1]`.

Let us now look at the contents of the sub-arrays.

### Landmarks

This is an array of `NormalizedLandmark`, essentially, a scalar 3D coordinate along with a value denoting the 'visibility' of the landmark. These are all on a normalised (0..1) scale in relation to the camera frame. This means values a hand closer to the camera (filling more of the image) will report a wider range of numbers than a hand furtherer away. 

```ts
type NormalizedLandmark = {
  x: number;
  y: number;
  z: number;
  visibility: number;
}
```

`x` and `y` are the position in relation to camera frame. Ie. `x:0, y:0` means the point is in the top-left of the camera frame, while `x:1, y:1` means the bottom-right.

`z` represents depth, in relation to the wrist. A negative Z value is the extent to which the point is closer to camera than the wrist. A positive Z value is the extent to which the point points away from the camera.

## World landmarks

World landmarks are normalised to the geometric center of the hand. This is useful because values will stay on the same range regardless of distance to camera, or where in camera frame it is. Since points are only related to the hand, it's not possible to some kinds of referencing between hands. Eg, distance between the index finger on left and right hand.

```ts
type Landmark = {
  x: number;
  y: number;
  z: number;
  visibility: number;
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

For example, if two hands are showing you might get:
```js
[
  [ { score: 0.85, index: 1, categoryName: `Left`, displayName: `Left` } ],
  [ { score: 0.91, index: 0, categoryName: `Right`, displayName: `Right` } ],
]
```

The first result corresponds to hand at position 0, suggesting that it is left.



## Hands.js

There's a little utility file included, `hands.js`. It makes accessing data a little more readable so you're not drowning in array indexes.

Here are some examples:
```js
import * as Hands from '../hands.js';

// Get {x,y,z} of tip of thumb
const thumbTip = Hands.getFingertip(`thumb`, landmarks);

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

There are some model tuning parameters you can set in the `sender` sketch. Keep in mind that this sketch is used by all of the sketches in this 'hand' folder. So you may want to make a copy of it if different settings will be needed.

Handy parameters:
* Adjusting total number of hands to look for
* Change default camera