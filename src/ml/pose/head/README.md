# pose/head

Make sure your 'sender' is using the 'pose' model.

This basic demo demonstrates:
1. Receiving pose data of one or more bodies
2. Deriving data from raw pose data
3. Mapping to screen coordinates
4. Drawing on the canvas.

It is limited because it mirrors the data to the canvas.

In this demo we draw a circle for each detected head. The circle is positioned relative to where the head appears in the camera frame. It's also sized roughly based on how much of the camera frame the head fills.