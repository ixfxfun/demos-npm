// @ts-ignore
import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";
import { Poses } from './Poses.js';

export class PosesConsumer {
  remote;
  poses;
  options;

  /**
   * 
   * @param {undefined|(Partial<Poses.PosesTrackerOptions> & import("./Poses.js").RemoteOptions)} [options]
   */
  constructor(options) {
    this.options = options;
    this.poses = new Poses.PosesTracker(options);
    setTimeout(() => this.init(), 100);
  }

  init() {
    this.remote = new Remote(this.options);
    this.remote.onData = this.onReceivedPoses.bind(this);
  }

  onReceivedPoses(packet) {
    const { _from, data } = packet;
    const poseData =/** @type Poses.PoseData[] */(JSON.parse(data));

    if (!Array.isArray(poseData)) {
      console.warn(`Not getting an array as expected. ${typeof poseData} Is sender set to 'pose'?`);
      console.log(poseData);
      return;
    }

    // Pass each pose over to the poses tracker
    for (const pose of poseData) {
      this.poses.seen(_from, pose);
    }
  };
}