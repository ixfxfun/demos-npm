## sender

This sketch connects to an audio input and performs processing via Meyda. It outputs the data so that another sketch (see receiver.js/.html) can consume it.

The reason for this is that the audio processing can keep running and not be disturbed as you iterate on your own sketch. It also makes it easy to decouple where the microphone/input is and where you use the data. For example, you could use your phone's microphone, but have the output displayed on your laptop.

By default the sender enables lots of [audio feature extractions](https://meyda.js.org/audio-features). Please see that link for information on what they mean.

If you want to change this, edit 'script.js', changing the `meydaSettings` object.


```js
const meydaSettings = {
  bufferSize: 512,
  featureExtractors: [
    `rms`,
    `zcr`,
    `spectralCentroid`,
    `spectralFlatness`,
    `spectralSlope`,
    `spectralRolloff`,
    `spectralSpread`,
    `spectralSkewness`,
    `spectralKurtosis`,
    `loudness`,
    `perceptualSpread`,
    `mfcc` 
  ]
};
```

There would be some CPU efficiency gains by taking out feature extractors you're not using.

