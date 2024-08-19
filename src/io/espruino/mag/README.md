# magnetometer

Uses a stream of magnetometer data (x, y & z) from an Espruino [Puck.js](https://www.espruino.com/Puck.js). [Try the demo online](https://demos.ixfx.fun/io/espruino/mag/)

Data is normalised to a bipolar (-1...1) scale and smoothed over time.

## Processing data

You'll want to tweak the data processing according to the dynamics of the magnetic field you're working with. 

In `script.js`, there are two main points at which magnetometer data is processed.

The first is `normaliseData()`. It takes in raw values, returning a normalised copy where x, y & z are on bipolar -1...1 scale. It is called whenever data is received from the Puck. This is also a chance to clamp data, apply non-linear scaling etc.

The second place data gets processed is `update()`. This runs repeatedly at a high rate, must faster than the rate of `normaliseData()`. They are _decoupled_, allowing us to smooth data over time, and be flexible with changing the rate at which data is sent from the Puck (eg. to conserve battery).

Once you are producing values that capture the desired dynamics, these should be put into state and later consumed in `use()`. In the demo, we put normalised and smoothed values into `state.mag`.

However, these x, y & z values aren't very semantically meaningful. They don't speak to the quality of interaction. And you'll be limited later trying to map them to output dimensions. Instead, you might want to create new properties which encode something about a dynamic, rather than sensor reading. To do so, edit the `State` type, compute the value in `update()` and later use it in `use()`.

## Background

The values you get will vary depending on:
* Location of magnets or things that absorb magnetic radiation. Having the Puck near or close to a laptop will make a difference, for example.
* Orientation & [kind of magnet](https://www.stanfordmagnets.com/what-is-the-magnetization-direction-for-permanent-magnets.html)
* Strength of magnet
* Residual magnetism of Puck.js hardware
* Location on earth (see below)

Here are some comments from the Espruino documentation about the magnetic sensor:
>If you have issues using the magnetometer, please check your battery percentage with `E.getBattery()` to ensure that it has over 30% charge remaining. When the battery is almost empty the magnetometer can stop working correctly. [2](https://www.espruino.com/Puck.js#magnetometer)

>An object of the form {x,y,z} is returned containing magnetometer readings. Due to residual magnetism in the Puck and magnetometer itself, with no magnetic field the Puck will not return {x:0,y:0,z:0}. [1](https://www.espruino.com/Reference#l_Puck_magOn)

>Instead, it's up to you to figure out what the 'zero value' is for your Puck in your location and to then subtract that from the value returned. If you're not trying to measure the Earth's magnetic field then it's a good idea to just take a reading at startup and use that. [1](https://www.espruino.com/Reference#l_Puck_magOn)

>With the aerial at the top of the board, the y reading is vertical, x is horizontal, and z is through the board. [1](https://www.espruino.com/Reference#l_Puck_magOn)

>Readings are in increments of 0.1 micro Tesla (uT). The Earth's magnetic field varies from around 25-60 uT, so the reading will vary by 250 to 600 depending on location. [1](https://www.espruino.com/Reference#l_Puck_magOn)

## The script

Read more:
- [ixfx Espruino module](https://api.ixfx.fun/modules/Io.Espruino.html)
- [Puck.js mag event](https://www.espruino.com/Puck.js#magnetometer)

When the button is clicked, we try to connect to the Espruino, and if that works, a short snippet of Javascript is sent (these are stored in `espruino.js`). The snippet runs on the device, sending back data in JSON format:

```js
// -- Runs on Espruino ---
// Enable sensor
Puck.magOn(2.5); 
// Listen for event data
Puck.on('mag', xyz => {
  // Send a JSON version of data via Bluetooth
  // - this is how we get data back to the browser
  Bluetooth.println(JSON.stringify(xyz));
});
// If Bluetooth disconnects, reset the board
// so the code doesn't run any more. This saves battery.
NRF.on("disconnect", () => reset());
```

When calling `Puck.magOn`, you can provide a sample rate (in Hz). This must be one of these values:  80, 40, 20, 10, 5, 2.5, 1.25, 0.63, 0.31, 0.16 or 0.08. Larger numbers send data faster, at the cost of using more power.

A few functions are stashed away in `util.js` to keep `script.js` as concise as possible. It handles connecting to the Espruino, early parsing of data and setting CSS classes to show/hide things based on connection state. It is unlikely `util.js` needs editing.

## Plotter

The embedded plotter is useful when tuning your data processing.

It is loaded as an `<iframe>` in `index.html`, and is stashed away in the `mag-plot` folder.

There should be no need to edit the plotter, and if you don't want it, remove the `<iframe>` element from `index.html`, or add the 'hidden' CSS class.