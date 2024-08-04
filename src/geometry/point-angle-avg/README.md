# point-angle-avg

Demonstrates averaging a computed value over a time horizon. In this case, we calculate the angle of movement continuously, and report the average.

Calculating the average angle can be a challenge because of the cross over between 360/0. This demo doesn't handle this case, so when moving to the right on the horizontal, it will fail wildly.

Guides
* [Points](https://ixfx.fun/geometry/shapes/point/)
* [Trackers](https://ixfx.fun/geometry/tracking/)

APIs
* [Trackers.point](https://api.ixfx.fun/funcs/Trackers.point)
* [Trackers.points](https://api.ixfx.fun/funcs/Trackers.points)
* [Trackers.number](https://api.ixfx.fun/funcs/Trackers.number)
* [Geometry.Points](https://api.ixfx.fun/modules/Geometry.Points)