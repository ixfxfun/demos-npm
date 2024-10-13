# techniques

Demonstrates a few techniques. 

Don't extend this sketch, but rather learn (or steal) from the techniques demonstrated and start from one of the 'starter' sketches instead.

## Thumb curl

If an open hand is facing camera, calculates the amount of rotation the thumb

## Spread

Derives a number indicating spread between finger tips (ignoring thumb). It calculates this
relative to the distance between knuckles.

## Grip rotate

Assuming you're cupping a cup in front of the camera, this gives a bipolar value representing whether
the cup is tucked in against your arm, or more outwards.

## Open hand rotate

Assuming an open hand facing the camera, this yields a bipolar value representing the left-to-right pivot of the wrist, akin to a royal wave. It uses the knuckle position of the pinky and index fingers.

## Fist

Adds up the 'extension' amount for each finger. This is based on distance of tip to knuckle. This is scaled to get a scalar (0..1) representing whether the hand is open or closed.