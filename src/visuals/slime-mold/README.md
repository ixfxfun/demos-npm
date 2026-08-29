# slime-mold

A simple Physarum slime mold simulation. This implementation is inspired by that of [ProgrammingChaos](https://www.programmingchaos.dev/physarum-simulations-programming-slime-molds/)

Implementation is broken out into script, agent, world, util and types files.
* script.js: sets up and orchestrates everything
* agent.js: updating and drawing of each agent
* world.js: updating and drawing of slime
* util.js: utility functions
* types.js: type hinting files

# Agent

An agent has a position, velocity vector, mass, visual size and set of 'noses'.

The ixfx [Forces](https://ixfx.fun/modulation/forces/) module is used to make agents move around steered by velocity and wrapping around the viewport:

```js
agent = Forces.apply(
  agent, // Apply agent's own velocity to its position
  state.constrain // Wrap coordinates around
);
```

An agent has three 'noses': left, centre and right. Each nose has an angle offset and distance from the centre of the agent's body. When created, each agent gets a slightly different nose configuration. The position of the nose determines where we sample the scent value. If the scent is stronger at one nose than the other, the agent steers toward it.

```js
velocity = Points.rotateByAngle(agent.velocity, smelliest.nose.angleRadian);
```

# World

The world is divided up into a [Grid](https://ixfx.fun/geometry/grid/). We track the amount of 'scent' at each grid coordinate.

At startup, a noise function is used to give the world some random scent. After that, the scent slowly decays (as if evaporating) and diffuses (as if getting spread by a breeze).

```js
// Decay scent
let scent = world.scent;
for (const cell of Grids.By.cells(world.grid)) {
  scent[cell.y][cell.x] = scent[cell.y][cell.x] * decayMultiplier;
}
```

To diffuse scent, we use ixfx's convolution kernel sub-module - effectively an image blur over the scent.

The user can also draw in scent with the pointer.

# Parameters

There's quite a few parameters governing the simulation. Tweaking these can lead to very different outcomes, or complete failure of the simulation. Keep in mind changing one variable might need changing another. 

For example, if you increase the number of agents, you might need to increase the scent decay amount otherwise the whole world fills up with scent.

In world.js:
* cellSize: dimensions (in pixels) of the underlying scent grid. Smaller numbers means more detail at a cost of slower performance
* decayMultiplier: how quickly scent evaporates
* updateThrottle: how often to update scent
* diffuseInterpolation: how strong the blurring of scent should be

In agent.js
* initialVelocityMultiplier: how quickly agents move
* smellStrengthThreshold: how sensitive the nose will be

In script.js
* howManyAgents: How many agents to spawn
* scentTrailStrength: How much scent an agent leaves behind

# Reference

* [ixfx Grid](https://ixfx.fun/geometry/grid/)
* [ixfx Forces](https://ixfx.fun/modulation/forces/)


