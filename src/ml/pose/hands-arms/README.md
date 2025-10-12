# hands-arms

Shows how to do some basic calculations based on hand & arm positions.

This sketch uses a _map_, which to associate data with an id, in this case the pose id. A 'thing' is created (along with an associated DOM element) for each pose that's detected.

In _thing.js_ we do some demo calculations based on hand/arm landmarks for the one body:
* Compute the distance between wrists
* Calculate angle of index finger to elbow, to roughly gauge pointing
* Calculate elbow-articulated bending of arm, calculating the angle between forearm and upper-arm
* Get the depth difference between wrists - eg which is in front or behind the other

Read more:
* ixfx guide: [Maps](https://ixfx.fun/collections/map/)
  
Things to try:
* Normalise values: for example, it would be more useful to have a 0..1 value for arm bend instead of angle
* Compare values between poses. The sketch gives you some calculations _per-pose_, but it gets even more interesting if you relate values _between_ poses and derive additional data