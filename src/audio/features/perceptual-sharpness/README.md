# perceptualSharpness

Uses the 'perceptualSharpness' and 'loudness' features and draws on the canvas instead of using the DOM.

The loudness feature is an array of numbers. In this case, lower frequency sound is lower in the array index. We use helper functions to make an average of just part of the data we care about. This can be a basic way to do some frequency-based tuning.

[Meyda.js audio features](https://meyda.js.org/audio-features)

Things to try:
* Try using other features, and keep in mind you may need to adjust the scaling parameters
* Use the average loudness in a set frequency band to only influence the sketch when this is above a threshold
