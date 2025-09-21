# features

These demos use the [Meyda](https://meyda.js.org/) library for audio feature extraction.

Use `starter` as a starting sketch.

## To add

Assuming your sketch folder is within audio/features:

Import:

```js
import * as Meyda from '../lib/index.js';
```

Create in your settings object, defining which feature extractors to use.

```js
const settings = Object.freeze({
  // .. other bits omitted

  // Meyda helper. In this case just one the feature extractor
  // is added, 'rms'.
  meyda: new Meyda.MeydaHelper({
    featureExtractors: [ `rms` ]
  })
});
```

Make a function to handle analysis data
```js
/**
 * Called each time we have a new analysis
 * @param {Meyda.MeydaAudioFeature} data 
 */
function onData(data) {
  // Do something with data...
}
```

In your `setup()` function initialise and link it to the 'onData' function from above
```js
// Initialise analyser
meyda.onData = onData;
meyda.init();
```