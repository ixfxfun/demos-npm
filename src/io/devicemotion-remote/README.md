# devicemotion-remote

This demonstrates using the 'devicemotion' event.

There are a few parts. The 'sender' sketch is meant to run on a mobile device that is equipped with sensors. It broadcasts the data to 'plotter' and/or 'receiver' sketches.

The plotter is useful for understanding the character of the data, while the 'receiver' is meant more as something to extend.

Due to browser security you have to jump through some hoops to get this running. The 'sender' sketch has to be loaded over HTTPS. See the main ixfx documentation for tips on how to do this.