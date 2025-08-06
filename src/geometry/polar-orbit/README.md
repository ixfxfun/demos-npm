# polar-orbit

Demonstrates moving a DOM element by polar coordinates

Angle is incremented each loop with simple addition.
Distance is determined by a ping-pong generator (cycles between 0..1)

The normal amount to turn is settings.maxRadiansPerCycle. This is multiplied
by the state.orbitSpeedFactor to make it slower or faster.

