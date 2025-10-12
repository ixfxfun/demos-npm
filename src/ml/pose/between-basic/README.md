# between-basic

This demo shows how to work with poses and landmarks on a spatial basis.

We sort the poses horizontally - this is useful if people are standing side-by-side - and use the first two poses found.

```js
const sorted = [ ...poses.getByHorizontal() ];
```

We care about people reaching out to each other, and since you could do that with either hand, what we really care about is which ever hand from one pose is closest to another.

Keep in mind that for the landmarks, something like 'left_wrist' is the person's physical left wrist. Not necessarily the wrist which is leftmost in terms of orientation.

```js
// Get whichever hand is closest to the other for each body
const poseAHand = poseA.getRightmost(`left_wrist`, `right_wrist`);
const poseBHand = poseB.getLeftmost(`left_wrist`, `right_wrist`);
```

Once we have that, we can compute the distance between the hands:
```js
distance = Points.distance2d(poseAHand, poseBHand);
```

...and a `Normalise.stream` function is used to establish a 0..1 scale

The distance value is picked up by a 'thing' which gets affected by the distance and has it's own tendency to want to expand.