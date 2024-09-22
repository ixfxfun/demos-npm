/**
 * This contains the snippets of code - in a string - which is sent to the Puck.js
 * It's probably not something to edit.
 */

// Ask Puck to push data to us automatically
// When calling 'magOn' we set the rate of the sensor, this can be one of these values (where higher == faster)
//  80, 40, 20, 10, 5, 2.5, 1.25, 0.63, 0.31, 0.16 or 0.08.
export const push = `
Puck.magOn(2.5);
let skip = 3; // How many initial readings to ignore
Puck.on('mag', xyz => {
  if (skip > 0) {
    skip--;
    return;
  }
  Bluetooth.println(JSON.stringify(xyz));
});
NRF.on("disconnect", () => reset());
`;

export const poll = `
Puck.magOn();
let skip = 3; // How many initial readings to ignore
setInterval(()=> {
  let xyz = Puck.mag();
  if (skip > 0) {
    skip--;
    return;
  }
  Bluetooth.println(JSON.stringify(xyz));
}, 200);
NRF.on('disconnect',()=> {
  Puck.magOff();
  reset();
});
`;