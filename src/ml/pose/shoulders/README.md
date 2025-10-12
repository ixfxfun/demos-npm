# shoulders

Based on the `starters/canvas-thing` demo.

This basic demo demonstrates:
1. Receiving pose data of one or more bodies.
2. Deriving data from raw pose data.
3. Influencing a Thing using some basic physics.

We calculate a 'tilt' value based on the left and right shoulder points. These are averaged across all poses. [`Bipolar.scale`](https://api.ixfx.fun/_ixfx/numbers/Bipolar/scale/) is used to map the empirically-discovered min/max tilt values to the bipolar range of -1 to 1. [`interpolate`](https://ixfx.fun/modulation/interpolation/) is used to smooth this value.

In `thing.js`, the tilt value is applied as a velocity vector to the thing. A bunch of other physics forces are applied

Read more:
* [ixfx Bipolar](https://ixfx.fun/data/bipolar/overview/)
* [ixfx Interpolate](https://ixfx.fun/modulation/interpolation/)

## Things to try

* Tweak the physics parameters in `thing.js`. For example: the friction amount, the mass of the thing, how tilt is applied to acceleration etc.