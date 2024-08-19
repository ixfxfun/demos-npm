// Ask Puck to push data to us automatically
// When calling 'magOn' we set the rate of the sensor, this can be one of these values (where higher == faster)
//  80, 40, 20, 10, 5, 2.5, 1.25, 0.63, 0.31, 0.16 or 0.08.
export const push = `
Puck.magOn(2.5); 
Puck.on('mag', xyz => {
  Bluetooth.println(JSON.stringify(xyz));
});
NRF.on("disconnect", () => reset());
`;

export const poll = `
Puck.magOn();
setInterval(()=>Bluetooth.println(JSON.stringify(Puck.mag())), 100);
NRF.on('disconnect',()=> {
  Puck.magOff();
  reset()
});
`;