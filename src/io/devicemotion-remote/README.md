# devicemotion-remote

This demonstrates using the 'devicemotion' event from a remote device.

There are a few parts. The 'sender' sketch is meant to run on a mobile device that is equipped with sensors. It broadcasts the data to 'plotter' and/or 'receiver' sketches.

The plotter is useful for understanding the character of the data, while the 'receiver' is meant more as something to extend.

If you don't need any cross-device communication, see the [devicemotion](../devicemotion/) sketch instead. 

Due to browser security you have to jump through some hoops to get this running. The 'sender' sketch has to be loaded over HTTPS. See the [ixfx Guide](https://ixfx.fun/reference/websockets/) for tips on how to do this.


Read more
* [Device orientation and motion](https://web.dev/articles/device-orientation)
