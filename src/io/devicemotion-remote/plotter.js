import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";
import { PlotElement } from 'https://unpkg.com/@ixfx/components@0.1.3/bundle';

const settings = Object.freeze({
  accelPlot: PlotElement.fromQuery(`#accelPlot`),
  accelGravPlot: PlotElement.fromQuery(`#accelGravPlot`),
  rotRatePlot: PlotElement.fromQuery(`#rotRatePlot`),
});

const r = new Remote({
  websocket: `wss://${window.location.host}/ws`,
  allowNetwork: false,
  // defaultLog: `verbose`
});

r.onData = (message) => {
  const { accelPlot, accelGravPlot, rotRatePlot } = settings;

  accelPlot.plotObject(message.accel);
  accelGravPlot.plotObject(message.accelGrav);
  rotRatePlot.plotObject(message.rotRate);
};