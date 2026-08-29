import { Points } from "@ixfx/geometry.js";
import { CanvasHelper } from "@ixfx/visual.js";

/**
 * Draws a single head
 * @param {CanvasHelper} canvasHelper 
 * @param {import("./script.js").Head} head 
 */
export const head = (canvasHelper, head) => {
  const { ctx, dimensionMin } = canvasHelper;
  const headAbs = Points.multiplyScalar(head, dimensionMin);
  const radius = head.radius * dimensionMin;
  const { hue } = head;

  // Translate canvas so 0,0 is the center of head
  ctx.save();
  ctx.translate(headAbs.x, headAbs.y);

  // Draw a circle
  ctx.beginPath();
  ctx.fillStyle = `hsl(${hue},60%,70%)`;
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();

  // Draw id of head
  ctx.fillStyle = `black`;
  ctx.fillText(head.poseId.toString(), 0, 0);

  // Undo translation
  ctx.restore();
};