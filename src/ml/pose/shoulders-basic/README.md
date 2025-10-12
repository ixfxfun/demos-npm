# shoulders-basic

Calculates the tilt of the shoulders using the Y value difference.

Uses Bipolar to get value on a -1 to 1 scale (where 0 means shoulders are flat). Tilt values are averaged across all detected poses. We use interpolate to increment slowly to the current value, this smooths out the movement.

For no real reason, the radius of the circle has some randomness applied.

Read more:
* [ixfx Bipolar](https://ixfx.fun/data/bipolar/overview/)
* [ixfx Interpolate](https://ixfx.fun/modulation/interpolation/)