import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";
import { PlotElement } from "https://unpkg.com/@ixfx/components/bundle.js";

const settings = Object.freeze({
  accelPlot: PlotElement.fromQuery(`#accelPlot`),
  accelGravPlot: PlotElement.fromQuery(`#accelGravPlot`),
  rotRatePlot: PlotElement.fromQuery(`#rotRatePlot`),
});

const r = new Remote({
  websocket: `wss://${window.location.host}/ws`,
  allowNetwork: true,
  defaultLog: `verbose`
});

r.onData = (message) => {
  const { accelPlot, accelGravPlot, rotRatePlot } = settings;

  accelPlot.plotObject(message.accel);
  accelGravPlot.plot(message.accelGrav);
  rotRatePlot.plot(message.rotRate);
};