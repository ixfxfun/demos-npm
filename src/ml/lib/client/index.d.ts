import * as ixfx_geometry_js from 'ixfx/geometry.js';
import { Line, Point, RectPositioned } from 'ixfx/geometry.js';
import { ImageSource } from '@mediapipe/tasks-vision';
import { Options as Options$1 } from '@clinth/remote';
import * as ixfx_trackers_js from 'ixfx/trackers.js';
import { TrackedPointMap, TrackedValueOpts, PointTracker } from 'ixfx/trackers.js';

type PoseLandmarks = "nose" | "left_eye_inner" | "left_eye" | "left_eye_outer" | "right_eye_inner" | "right_eye" | "right_eye_outer" | "left_ear" | "right_ear" | "mouth_left" | "mouth_right" | "left_shoulder" | "right_shoulder" | "left_elbow" | "right_elbow" | "left_wrist" | "right_wrist" | "left_pinky" | "right_pinky" | "left_index" | "right_index" | "left_thumb" | "right_thumb" | "left_hip" | "right_hip" | "left_knee" | "right_knee" | "left_ankle" | "right_ankle" | "left_heel" | "right_heel" | "left_foot_index" | "right_foot_index";
/**
 * Returns landmark index by name, or _undefined_ if not found
 * @param name
 * @returns
 */
declare const getLandmarkIndexByName: (name: PoseLandmarks | string) => number | undefined;
/**
 * Returns landmark name by index, throws if 'index' out of range.
 * @param index
 * @returns
 */
declare const getLandmarkNameByIndex: (index: number) => PoseLandmarks;
declare const getLandmark: (pose: PoseData, indexOrName: number | PoseLandmarks) => NormalizedLandmark | undefined;
declare const getWorldLandmark: (pose: PoseData, indexOrName: number | PoseLandmarks) => Landmark | undefined;

/**
 * Sorts raw `poses` by horziontal.
 * Leftmost pose will be first.
 */
declare const horizontalSort: (poses: PoseData[]) => {
    centroid: ixfx_geometry_js.Point;
    poseid: string;
    landmarks: NormalizedLandmark[];
    world: Landmark[];
}[];
/**
 * Return centroid of Pose based on landmarks.
 *
 */
declare const centroid: (pose: PoseData) => ixfx_geometry_js.Point;
/**
 * Return centroid of pose based on world landmarks
 */
declare const centroidWorld: (pose: PoseData) => ixfx_geometry_js.Point;
/**
 * Returns a line between two named/indexed landmarks.
 * If either of the two points are not found, _undefined_ is returned.
 * @param pose Pose data
 * @param a Landmark A
 * @param b Landmark B
 */
declare const lineBetween: (pose: PoseData, a: PoseLandmarks | number, b: PoseLandmarks | number) => Line | undefined;
/**
 * Returns the rough center of a pose, based on
 * the chest coordinates
 */
declare const roughCenter: (pose: PoseData) => ixfx_geometry_js.Point | undefined;

/**
 * PoseTracker keeps track of a landmarks for a single pose.
 * This is useful for tracking the movement of a pose or its landmarks over time.
 * It does this by making a PointTracker for each keypoint of a pose.
 *
 * @example
 * ```js
 * // Create a tracker (fromId is the id of sender, poseId is the id of the pose)
 * const pt = new PoseTracker(fromId, poseId, options);
 * // ...and whenever there is data, call .seen()
 * pt.seen(pose);
 * ```
 *
 * When creating, the most useful tuning options are `sampleLimit` which governs
 * how many of the most recent samples to keep, and `storeIntermediate` (true/false)
 * to store intermediate data.
 *
 * ## Accessing keypoints
 *  You can get the raw keypoint data from the pose
 * ```js
 * // Get a single point
 * const nosePoint = pose.keypointValue(`nose`); // { x, y, score, name }
 * // Get all points
 * for (const kp of poses.getRawValues()) {
 * // { x, y, score, name }
 * }
 * ```
 * But the real power comes from getting the [PointTracker](https://api.ixfx.fun/classes/Trackers.PointTracker) for a keypoint, since it keeps track of not just the last data, but a whole trail of historical data for a given keypoint.
 * ```js
 * const noseTracker = pose.keypoint(`nose`); // PointTracker
 * ```
 * Once we have the PointTracker, there are a _lot_ of things to access:
 *
 */
declare class PoseTracker {
    #private;
    points: TrackedPointMap;
    /**
     * Creates a PoseTracker
     *
     * Defaults:
     * * sampleLimit: 10
     * * storeIntermediate: false
     * @param fromId Data source for pose (ie device)
     * @param poseId Id of pose from TFjs
     * @param options
     */
    constructor(fromId: string, poseId: string, options?: TrackedValueOpts);
    /**
     * Reset stored data for the tracker
     */
    reset(): void;
    /**
     * Returns a [PointTracker](https://api.ixfx.fun/classes/Trackers.PointTracker) for a given landmark
     * by name or index.
     *
     * ```js
     * // Eg. get tracker for the 'nose' landmark
     * const nose = pose.landmark(`nose`);
     *
     * // Get the angle of nose movement since the start
     * const a = nose.angleFromStart();
     *
     * // Get the distance of nose since start
     * const d = nose.distanceFromStart();
     * ```
     * @param nameOrIndex
     * @returns
     */
    landmark(nameOrIndex: PoseLandmarks | number): ixfx_trackers_js.TrackerBase<Point, ixfx_trackers_js.PointTrackerResults> | undefined;
    /**
     * Returns the last position for a given landmark.
     * ```js
     * const pos = pose.landmarkValue(`nose`); // { x, y }
     * ```
     *
     * Throws an error if `nameOrIndex` does not exist.
     * @param nameOrIndex
     * @returns
     */
    landmarkValue(nameOrIndex: PoseLandmarks | number): Point;
    /**
     * Update this pose with new information
     * @param pose
     */
    seen(pose: PoseData): Promise<void>;
    /**
     * Returns all the [PointTrackers](https://api.ixfx.fun/classes/Trackers.PointTracker) (ie. landmark) for this pose.
     *
     * ```js
     * for (const pt of pose.getPointTrackers()) {
     *  // Do something with 'pt' (which tracks one individual landmark)
     * }
     * ```
     */
    getPointTrackers(): Generator<PointTracker, void, undefined>;
    /**
     * Returns the raw landmarks
     *
     * ```js
     * for (const kp of pose.getRawValues()) {
     *  // { x, y, z?, score, name }
     * }
     * ```
     * @returns {Point>}
     */
    getRawValues(): Generator<ixfx_trackers_js.TimestampedObject<Point>, void, unknown>;
    /**
     * Returns the centroid of all the pose points
     * ```js
     * pose.centroid; // { x, y }
     * ```
     *
     * Returns {0.5,0.5} is data is missing
     */
    get centroid(): Point;
    /**
     * Returns height of bounding box
     */
    get height(): number;
    /**
     * Return width of bounding box
     */
    get width(): number;
    /**
     * Gets the bounding box of the pose, computed by 'landmarks'.
     * ```js
     * pose.box; // { x, y, width, height }
     * ````
     *
     * Returns an empty rectangle if there's no data
     */
    get box(): RectPositioned | Readonly<{
        x: 0;
        y: 0;
        width: 0;
        height: 0;
    }>;
    /**
     * Returns the id of the sender
     */
    get peerId(): string;
    /**
     * Returns the middle of the pose bounding box
     * ```js
     * pose.middle; // { x, y }
     * ```
     * @returns
     */
    get middle(): {
        x: number;
        y: number;
    };
    /**
     * Returns the randomly-assigned hue (0..360)
     */
    get hue(): number;
    /**
     * Returns a CSS colour: hsl() based on
     * the randomly-assigned hue
     */
    get hsl(): string;
    /**
     * Returns the globally unique id of this pose
     * (fromId-poseId)
     */
    get guid(): string;
    /**
     * Returns the original pose id from TFjs
     * Warning: this may not be unique if there are multiple senders
     */
    get poseId(): string;
    /**
     * Returns the id of the sender of this pose
     */
    get fromId(): string;
    /**
     * Returns how long since pose was updated
     */
    get elapsed(): number;
    /**
     * Returns the last pose data in raw format
     */
    get last(): PoseData | undefined;
}

type PosesTrackerOptions = TrackedValueOpts & {
    maxAgeMs: number;
};
/**
 * Tracks several poses (ie. bodies)
 *
 * Events:
 * - expired: Tracked pose has not been seen for a while
 * - added: A new pose id
 */
declare class PosesTracker extends EventTarget {
    #private;
    /**
     * Constructor
     * @param {Partial<PosesTrackerOptions>} options
     */
    constructor(options?: {});
    /**
     * Enumerates each of the PoseTrackers, sorted by age.
     * The most recent pose will be at position 0.
     * (ie. one for each body).
     * Use getRawPosesByAge() to enumerate raw pose data
     */
    getByAge(): Generator<PoseTracker, void, undefined>;
    /**
     * Enumerates PoseTrackers, sorting by the horizontal position.
     * Leftmost pose will be at position 0.
     */
    getByHorizontal(): Generator<PoseTracker, void, undefined>;
    /**
     * Enumerate all PoseTracker instances
     */
    get(): Generator<PoseTracker, void, undefined>;
    /**
     * Enumerate the last set of raw pose data for
     * each of the PoseTrackers.
     */
    getRawPosesByAge(): Generator<PoseData | undefined, void, unknown>;
    getRawPoses(): Generator<PoseData>;
    /**
     * Get a raw landmark by name across all poses
     *
     * @example Get the 'nose' landmark for all bodies
     * ````js
     * for (const n of poses.getRawLandmarks(`nose`)) {
     *  // Yields: { x, y, z?, score, name }
     * }
     * ```
     *
     * @param nameOrIndex Name or index of landmark to get data for
     */
    getRawLandmarks(nameOrIndex: string | number): Generator<NormalizedLandmark, void, unknown>;
    /**
     * Enumerates all [PointTrackers](https://api.ixfx.fun/classes/Trackers.PointTracker) for a given landmark id.
     *
     * eg. to get the PointTracker for 'nose' across all poses currently seen:
     *
     * ```js
     * for (const pt of poses.getPointTrackers(`nose`)) {
     *  // do something with tracker...
     * }
     * ```
     *
     * Throws an error if `nameOrIndex` is not found.
     *
     * @param nameOrIndex Name or index of landmark to get tracker for
     */
    getPointTrackers(nameOrIndex: PoseLandmarks | number): Generator<ixfx_trackers_js.TrackerBase<ixfx_geometry_js.Point, ixfx_trackers_js.PointTrackerResults> | undefined, void, unknown>;
    /**
     * Returns all [PointTrackers](https://api.ixfx.fun/classes/Trackers.PointTracker) from a particular sender
     *
     * ```js
     * for (const pt of poses.getFromSender(`mobile`)) {
     *  // Do something with tracker...
     * }
     * ```
     *
     * @param senderId Id of sender
     */
    getFromSender(senderId: string): Generator<PoseTracker, void, unknown>;
    /**
     * Enumerate the set of unique sender ids
     * ```js
     * for (const sender of poses.getSenderIds()) {
     *  // Do something with sender (string)
     * }
     * ```
     */
    getSenderIds(): Generator<unknown, void, undefined>;
    /**
     * Returns the PoseTracker for this pose id.
     *
     * ```js
     * const pose = poses.getByPoseId(`123`);
     * pose.middle; // { x, y }
     * ```
     *
     * Warning: Pose ids are not unique if there are multiple data sources.
     * Prefer using guids.
     *
     * @param id Id of pose
     */
    getByPoseId(id: string): PoseTracker | undefined;
    /**
     * Returns the last raw pose data for this pose id.
     *
     * ```js
     * const pose = poses.getRawPoseByPoseId(`123`);
     * pose.landmark; // array of landmarks { x, y, z?, score, name }
     * pose.score; // score of this pose
     * pose.box;  // bounding box
     * ```
     *
     * Warning: Pose ids are not unique if there are multiple data sources.
     * Prefer using guids.
     *
     * @param id Id of pose
     */
    getRawPoseByPoseId(id: string): PoseData | undefined;
    /**
     * Enumerate the set of globally-unique ids of poses
     */
    getGuids(): Generator<string, void, unknown>;
    /**
     * Get the PoseTracker for unique id (based on sender and pose)
     * ```js
     * const pt = poses.getByGuid(`123-123`);
     * pt.middle; // { x, y }
     * ```
     *
     * Alternatively: {@link getRawPoseByGuid} to get raw data
     * @param id Combined id of sender-poseid
     */
    getByGuid(id: string): PoseTracker | undefined;
    /**
     * Returns the raw pose data for a unique id
     * ```js
     * const pose = poses.getRawPoseByGuide(`123-123`);
     * pose.landmark; // array of { x, y, z?, score, name }
     * pose.score;     // score of pose
     * ```
     *
     * Alternatively: {@link getByGuid} to get a tracker for pose
     * @param id Combined sender-pose
     * @returns
     */
    getRawPoseByGuid(id: string): PoseData | undefined;
    /**
     * Track a pose.
     * Fires `added` event if it is a new pose.
     * Returns the globally-unique id for this pose
     * @param pose New pose data
     * @param from Sender id
     */
    seen(from: string, pose: PoseData): string;
    /**
     * Return number of tracked poses
     */
    get size(): number;
    /**
     * Clear all data
     */
    clear(): void;
}

type ProcessorModes = `pose` | `objects` | `hand` | `face`;

type NormalizedLandmark = {
    /** The x coordinates of the normalized landmark. */
    x: number;
    /** The y coordinates of the normalized landmark. */
    y: number;
    /** The z coordinates of the normalized landmark. */
    z: number;
    /** The likelihood of the landmark being visible within the image. */
    visibility: number;
};
type Landmark = {
    /** The x coordinates of the landmark. */
    x: number;
    /** The y coordinates of the landmark. */
    y: number;
    /** The z coordinates of the landmark. */
    z: number;
    /** The likelihood of the landmark being visible within the image. */
    visibility: number;
};
type Detection = {
    /** A list of `Category` objects. */
    categories: Category[];
    /** The bounding box of the detected objects. */
    boundingBox?: BoundingBox;
    /**
     * List of keypoints associated with the detection. Keypoints represent
     * interesting points related to the detection. For example, the keypoints
     * represent the eye, ear and mouth from face detection model. Or in the
     * template matching detection, e.g. KNIFT, they can represent the feature
     * points for template matching. Contains an empty list if no keypoints are
     * detected.
     */
    keypoints: NormalizedKeypoint[];
};
type BoundingBox = {
    /** The X coordinate of the top-left corner, in pixels. */
    originX: number;
    /** The Y coordinate of the top-left corner, in pixels. */
    originY: number;
    /** The width of the bounding box, in pixels. */
    width: number;
    /** The height of the bounding box, in pixels. */
    height: number;
    /**
     * Angle of rotation of the original non-rotated box around the top left
     * corner of the original non-rotated box, in clockwise degrees from the
     * horizontal.
     */
    angle: number;
};
type Category = {
    /** The probability score of this label category. */
    score: number;
    /** The index of the category in the corresponding label file. */
    index: number;
    /**
     * The label of this category object. Defaults to an empty string if there is
     * no category.
     */
    categoryName: string;
    /**
     * The display name of the label, which may be translated for different
     * locales. For example, a label, "apple", may be translated into Spanish for
     * display purpose, so that the `display_name` is "manzana". Defaults to an
     * empty string if there is no display name.
     */
    displayName: string;
};
type NormalizedKeypoint = {
    /** X in normalized image coordinates. */
    x: number;
    /** Y in normalized image coordinates. */
    y: number;
    /** Optional label of the keypoint. */
    label?: string;
    /** Optional score of the keypoint. */
    score?: number;
};
type HandLandmarkerResult = {
    /** Hand landmarks of detected hands. */
    landmarks: NormalizedLandmark[][];
    /** Hand landmarks in world coordinates of detected hands. */
    worldLandmarks: Landmark[][];
    /** Handedness of detected hands. */
    handedness: Category[][];
};

type RecordingData = {
    name: string;
    rateMs: number;
    samples: any[];
    mode: string;
};
type SourceKinds = `camera` | `file` | `recording`;
type Verbosity = `errors` | `info` | `debug`;
type SourceData = {
    kind: SourceKinds;
    id: string;
    label: string;
};
type CameraOptions = {
    width?: number;
    height?: number;
    facingMode?: `user` | `environment`;
};
type ObjectDetectorOptions = {
    verbosity: Verbosity;
    scoreThreshold: number;
    modelPath: string;
};
type CommonModelOptions = {
    wasmBase: string;
    modelsBase: string;
};
interface ISource {
    start(): Promise<boolean>;
    stop(): void;
}
type PoseMatcherOptions = {
    /**
     * If pose is more than this distance away, assume it's a different body
     * Default: 0.1
     */
    distanceThreshold: number;
    /**
     * If a pose hasn't been seen for this long, delete.
     * Default: 2000
     */
    maxAgeMs: number;
    verbosity: Verbosity;
};
type HandDetectorOptions = {
    verbosity: Verbosity;
    numHands: number;
    minHandDetectionConfidence: number;
    minHandPresenceConfidence: number;
    minTrackingConfidence: number;
    modelPath: string;
};
type FaceDetectorOptions = {
    verbosity: Verbosity;
    modelPath: string;
    /**
     * Default: 0.5
     */
    minDetectionConfidence: number;
    /**
     * Default: 0.3
     */
    minSupressionThreshold: number;
};
type PoseDetectorOptions = {
    numPoses: number;
    minPoseDetectionConfidence: number;
    minPosePresenceConfidence: number;
    minTrackingConfidence: number;
    outputSegmentationMasks: boolean;
    modelPath: string;
    matcher: PoseMatcherOptions;
    verbosity: Verbosity;
};
type OverlayOptions = {
    show: boolean;
    label: boolean;
};
type Options = {
    camera: CameraOptions;
    hideModelSelector?: boolean;
    mode: ProcessorModes;
    overlay: OverlayOptions;
    pose?: PoseDetectorOptions;
    objects?: ObjectDetectorOptions;
    hand?: HandDetectorOptions;
    face?: FaceDetectorOptions;
    computeFreqMs: number;
    remote: Options$1;
    /**
     * 'errors','info','debug'
     */
    verbosity: Verbosity;
    wasmBase: string;
    modelsBase: string;
};
type ComputeCallback = (result: unknown) => void;
type OnDispatcherData = (mode: ProcessorModes, v: unknown) => void;
interface IModel {
    compute(v: ImageSource, callback: ComputeCallback, timestamp: number): void;
    dispose(): void;
    init(): Promise<boolean>;
}
type PoseData = {
    poseid: string;
    landmarks: NormalizedLandmark[];
    world: Landmark[];
};

type index$1_PoseData = PoseData;
type index$1_PoseLandmarks = PoseLandmarks;
type index$1_PoseTracker = PoseTracker;
declare const index$1_PoseTracker: typeof PoseTracker;
type index$1_PosesTracker = PosesTracker;
declare const index$1_PosesTracker: typeof PosesTracker;
type index$1_PosesTrackerOptions = PosesTrackerOptions;
declare const index$1_TrackedValueOpts: typeof TrackedValueOpts;
declare const index$1_centroid: typeof centroid;
declare const index$1_centroidWorld: typeof centroidWorld;
declare const index$1_getLandmark: typeof getLandmark;
declare const index$1_getLandmarkIndexByName: typeof getLandmarkIndexByName;
declare const index$1_getLandmarkNameByIndex: typeof getLandmarkNameByIndex;
declare const index$1_getWorldLandmark: typeof getWorldLandmark;
declare const index$1_horizontalSort: typeof horizontalSort;
declare const index$1_lineBetween: typeof lineBetween;
declare const index$1_roughCenter: typeof roughCenter;
declare namespace index$1 {
  export { type index$1_PoseData as PoseData, type index$1_PoseLandmarks as PoseLandmarks, index$1_PoseTracker as PoseTracker, index$1_PosesTracker as PosesTracker, type index$1_PosesTrackerOptions as PosesTrackerOptions, index$1_TrackedValueOpts as TrackedValueOpts, index$1_centroid as centroid, index$1_centroidWorld as centroidWorld, index$1_getLandmark as getLandmark, index$1_getLandmarkIndexByName as getLandmarkIndexByName, index$1_getLandmarkNameByIndex as getLandmarkNameByIndex, index$1_getWorldLandmark as getWorldLandmark, index$1_horizontalSort as horizontalSort, index$1_lineBetween as lineBetween, index$1_roughCenter as roughCenter };
}

type index_BoundingBox = BoundingBox;
type index_CameraOptions = CameraOptions;
type index_Category = Category;
type index_CommonModelOptions = CommonModelOptions;
type index_ComputeCallback = ComputeCallback;
type index_Detection = Detection;
type index_FaceDetectorOptions = FaceDetectorOptions;
type index_HandDetectorOptions = HandDetectorOptions;
type index_HandLandmarkerResult = HandLandmarkerResult;
type index_IModel = IModel;
type index_ISource = ISource;
type index_Landmark = Landmark;
type index_NormalizedKeypoint = NormalizedKeypoint;
type index_NormalizedLandmark = NormalizedLandmark;
type index_ObjectDetectorOptions = ObjectDetectorOptions;
type index_OnDispatcherData = OnDispatcherData;
type index_Options = Options;
type index_OverlayOptions = OverlayOptions;
type index_PoseData = PoseData;
type index_PoseDetectorOptions = PoseDetectorOptions;
type index_PoseMatcherOptions = PoseMatcherOptions;
type index_RecordingData = RecordingData;
type index_SourceData = SourceData;
type index_SourceKinds = SourceKinds;
type index_Verbosity = Verbosity;
declare namespace index {
  export type { index_BoundingBox as BoundingBox, index_CameraOptions as CameraOptions, index_Category as Category, index_CommonModelOptions as CommonModelOptions, index_ComputeCallback as ComputeCallback, index_Detection as Detection, index_FaceDetectorOptions as FaceDetectorOptions, index_HandDetectorOptions as HandDetectorOptions, index_HandLandmarkerResult as HandLandmarkerResult, index_IModel as IModel, index_ISource as ISource, index_Landmark as Landmark, index_NormalizedKeypoint as NormalizedKeypoint, index_NormalizedLandmark as NormalizedLandmark, index_ObjectDetectorOptions as ObjectDetectorOptions, index_OnDispatcherData as OnDispatcherData, index_Options as Options, index_OverlayOptions as OverlayOptions, index_PoseData as PoseData, index_PoseDetectorOptions as PoseDetectorOptions, index_PoseMatcherOptions as PoseMatcherOptions, index_RecordingData as RecordingData, index_SourceData as SourceData, index_SourceKinds as SourceKinds, index_Verbosity as Verbosity };
}

export { type BoundingBox, type Category, type Detection, type HandLandmarkerResult, index as Hands, type Landmark, type NormalizedKeypoint, type NormalizedLandmark, index$1 as Poses, type ProcessorModes };
