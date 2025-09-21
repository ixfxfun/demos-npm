# rms

Uses a moving average to smooth out audio levels from the microphone.

See the [Meyda documentation on audio features for more on RMS](https://meyda.js.org/audio-features)

It uses:
* [Normalise.stream](https://ixfx.fun/cleaning/normal/) to convert to a scalar
* [movingAverage](https://ixfx.fun/cleaning/averaging/#moving-average) to average the RMS value
  
We also have some utility functions stashed away in `util.js` to not clutter up the main script.

## Sensitivity vs. smoothness

There is a trade off between sensitivity and smoothness. Increasing the number of samples for the average (sketch defaults to 100) makes the response smoother, but ball will be slower to respond to changes. Note also that the averaged peak value will tend to be lower than the raw value with increasing sample count.

## Things to try

* Adjust how reactive/smooth averaging is
* Use the average value to drive something else, like an element's size or font
* Use a different Meyda feature (for example 'energy')