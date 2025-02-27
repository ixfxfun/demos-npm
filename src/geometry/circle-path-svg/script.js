import { Circles } from '../../ixfx/geometry.js';
import { Svg } from '../../ixfx/visual.js';
import { Numbers, Dom, Modulation } from '../../ixfx/bundle.js';

const settings = Object.freeze({
  // Colour for text
  textStyle: `#54BAB9`,
  // Radius will be 30% of viewport
  radiusProportion: 0.3,
  text: `Hello there text on a path`,
  wave: Modulation.wave({ shape: `saw`, hertz: 0.1 })
});

/**
 * @typedef {Readonly<{
* loop:number
* pointer: { x: number, y: number }
* circleEl: SVGPathElement|undefined
* viewportSize: { width: number, height: number }
* viewportCenter: { x: number, y: number }
* }>} State
*/

/** @type State */
let state = {
  loop: 0,
  viewportSize: { width: 0, height: 0 },
  viewportCenter: { x: 0, y: 0 },
  pointer: { x: 0, y: 0 },
  circleEl: undefined
};

// Update state of world
const update = () => {
  const { wave } = settings;

  saveState({
    loop: wave()
  });
};

const use = () => {
  const { radiusProportion } = settings;
  const { circleEl, viewportSize, viewportCenter, loop } = state;
  if (!circleEl) return;

  const radius = radiusProportion * Math.min(viewportSize.width, viewportSize.height);

  // Define circle, using center for x,y 
  const circle = { radius, ...viewportCenter };

  // Rotate circle (and thus text with it)
  circleEl.style.transformOrigin = `50% 50%`; // Rotate from middle
  // Calculate rotation based on generator value
  circleEl.style.transform = `rotate(${loop * 360}deg)`;

  // Update existing SVG element with new details
  const sweep = true;
  circleEl.setAttribute(`d`, Circles.toSvg(circle, sweep).join(` `));
};

function setup() {
  const { text, textStyle } = settings;
  const svg = document.querySelector(`svg`);
  if (svg === null) return;

  // Resize SVG element to match viewport
  Dom.ElementSizer.svgViewport(svg, size => {
    svg.setAttribute(`viewbox`, `0 0 ${size.width} ${size.height}`);
    saveState({
      viewportSize: size,
      viewportCenter: {
        x: size.width / 2,
        y: size.height / 2
      }
    });
  });

  // Create an empty SVG path element for circle
  const circleElement = Svg.Elements.path(``, svg, {
    fillStyle: `none`,
    strokeStyle: `none`,
    strokeWidth: 1
  });
  circleElement.id = `circlePath`;
  saveState({ circleEl: circleElement });

  // Create text to go on path
  Svg.Elements.textPath(`#circlePath`, text, svg, {
    fillStyle: textStyle
  });

  const loop = () => {
    update();
    use();
    window.requestAnimationFrame(loop);
  };
  loop();
};

const windowBounds = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
  center: {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  }
});
setup();

/**
 * Update state
 * @param {Partial<state>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}