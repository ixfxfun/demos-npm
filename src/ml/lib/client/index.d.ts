import { Points, Line, PointTracker, Rects } from 'ixfx/geometry.js';
import { ImageSource } from '@mediapipe/tasks-vision';
import { Options as Options$1 } from '@clinth/remote';
import * as ixfx_index_BkFpdty__js from 'ixfx/index-BkFpdty_.js';
import { TrackedValueOpts } from 'ixfx/trackers.js';
import { NumbersComputeResult } from 'ixfx/numbers.js';

type PoseLandmarks = "nose" | "left_eye_inner" | "left_eye" | "left_eye_outer" | "right_eye_inner" | "right_eye" | "right_eye_outer" | "left_ear" | "right_ear" | "mouth_left" | "mouth_right" | "left_shoulder" | "right_shoulder" | "left_elbow" | "right_elbow" | "left_wrist" | "right_wrist" | "left_pinky" | "right_pinky" | "left_index" | "right_index" | "left_thumb" | "right_thumb" | "left_hip" | "right_hip" | "left_knee" | "right_knee" | "left_ankle" | "right_ankle" | "left_heel" | "right_heel" | "left_foot_index" | "right_foot_index";
/**
 * Returns indexes for right foot: ankle, heel, index
 */
declare const footRightIndexes: number[];
/**
 * Returns indexes for left foot: ankle, heel, index
 */
declare const footLeftIndexes: number[];
/**
 * Returns indexes for right shoulder, elbow, wrist (but not pinky, index & thumb)
 */
declare const armRightIndexes: number[];
/**
 * Returns indexes for left wrist, pinky, index & thumb
 */
declare const armHandRightIndexes: number[];
/**
 * Returns indexes for left shoulder, elbow, wrist (but not pinky, index & thumb)
 */
declare const armLeftIndexes: number[];
/**
 * Returns indexes for left wrist, pinky, index & thumb
 */
declare const armHandLeftIndexes: number[];
/**
 * Returns indexes for nose, eyes, ears & mouth
 */
declare const faceIndexes: number[];
/**
 * Returns indexes for shoulders and hips
 */
declare const torsoIndexes: number[];
/**
 * Returns indexes for left hip, knee, ankle (but not foot)
 */
declare const legLeftIndexes: number[];
/**
 * Returns indexes for right hip, knee, ankle (but not foot)
 */
declare const legRightIndexes: number[];
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
    centroid: Points.Point;
    poseid: string;
    landmarks: NormalizedLandmark[];
    world: Landmark[];
}[];
/**
 * Return centroid of Pose based on landmarks.
 *
 */
declare const centroid: (pose: PoseData) => Points.Point;
/**
 * Return centroid of pose based on world landmarks
 */
declare const centroidWorld: (pose: PoseData) => Points.Point;
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
declare const roughCenter: (pose: PoseData) => Points.Point | undefined;

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

/**
 * PoseTracker keeps track of a landmarks for a single pose.
 * This is useful for tracking the movement of a pose or its landmarks over time.
 * It does this by making a PointTracker for each keypoint of a pose.
 *
 * Note: You probably don't want to create this yourself! Rather, use a {@link PosesTracker} to access.
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
 * const nosePoint = pose.landmarkValue(`nose`); // { x, y, score, name }
 * // Get all points
 * for (const kp of poses.landmarkValues()) {
 * // { x, y, score, name }
 * }
 * ```
 * But the real power comes from getting the [PointTracker](https://api.ixfx.fun/_ixfx/geometry/PointTracker/) for a keypoint, since it keeps track of not just the last data, but a whole trail of historical data for a given keypoint.
 * ```js
 * const noseTracker = pose.landmark(`nose`); // PointTracker
 * ```
 * Once we have the PointTracker, there are a _lot_ of things to access:
 *
 */
declare class PoseTracker {
    #private;
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
     * Returns a [PointTracker](https://api.ixfx.fun/_ixfx/geometry/PointTracker/) for a given
     * normalised landmark by name or index.
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
    landmark(nameOrIndex: PoseLandmarks | number): PointTracker<NormalizedLandmark> | undefined;
    /**
   * Returns a [PointTracker](https://api.ixfx.fun/_ixfx/geometry/PointTracker/) for a given
   * normalised landmark by name or index.
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
    worldLandmark(nameOrIndex: PoseLandmarks | number): PointTracker<Landmark> | undefined;
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
    landmarkValue(nameOrIndex: PoseLandmarks | number): NormalizedLandmark;
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
    worldLandmarkValue(nameOrIndex: PoseLandmarks | number): Landmark;
    /**
     * Update this pose with new information
     * @param pose
     */
    seen(pose: PoseData): void;
    /**
     * Returns all the [PointTrackers](https://api.ixfx.fun/_ixfx/geometry/PointTracker/) (ie. landmark) for this pose.
     *
     * ```js
     * for (const pt of pose.landmarks()) {
     *  // Do something with 'pt' (which tracks one individual landmark)
     * }
     * ```
     *
     * Or provide a list of landmark indexes or name:
     * ```js
     * // Get landmarks for right arm
     * for (const pt of pose.landmarks(11, 13, 15)) {
     * }
     * ```
     */
    landmarks(...namesOrIds: (PoseLandmarks | number)[]): Generator<Points.PointTracker<NormalizedLandmark>, void, undefined>;
    worldLandmarks(...namesOrIds: (PoseLandmarks | number)[]): Generator<Points.PointTracker<Landmark>, void, undefined>;
    /**
     * Returns the raw landmarks
     *
     * ```js
     * for (const kp of pose.landmarkValues()) {
     *  // { x, y, z?, score, name }
     * }
     * ```
     */
    landmarkValues(...namesOrIds: (PoseLandmarks | number)[]): Generator<ixfx_index_BkFpdty__js.TimestampedObject<NormalizedLandmark>, void, unknown>;
    worldLandmarkValues(...namesOrIds: (PoseLandmarks | number)[]): Generator<ixfx_index_BkFpdty__js.TimestampedObject<NormalizedLandmark>, void, unknown>;
    /**
     * Returns the 2D centroid of all the pose points (uses normalised landmarks)
     * ```js
     * pose.centroid(); // { x, y }
     * ```
     *
     * Or you can pass in the names/indexes of landmarks:
     * ```js
     * pose.centroid(`left_shoulder`, `right_shoulder`);
     * ```
     *
     * Returns `{ x: 0.5, y: 0.5 }` is data is missing
     */
    centroid(...namesOrIds: (PoseLandmarks | number)[]): Points.Point;
    /**
     * Returns PointTrackers, sorted by their last X value
     * @param namesOrIds
     * @returns
     */
    getSortedByX(...namesOrIds: (PoseLandmarks | number)[]): Points.PointTracker<NormalizedLandmark>[];
    /**
     * Gets the leftmost (by camera frame coords) of any of the listed landmarks
     *
     * Eg get whichever wrist is the most left of the camera frame
     * ```js
     * pose.getLeftmost(`left_wrist`,`right_wrist`);
     * ```
     * @param namesOrIds
     * @returns
     */
    getLeftmost(...namesOrIds: (PoseLandmarks | number)[]): Points.PointTracker<NormalizedLandmark>;
    /**
     * Gets the rightmost (by camera frame coords) of any of the listed landmarks
     *
     * Eg get whichever wrist is the most right of the camera frame
     * ```js
     * pose.getRightmost(`left_wrist`,`right_wrist`);
     * ```
     * @param namesOrIds
     * @returns
     */
    getRightmost(...namesOrIds: (PoseLandmarks | number)[]): Points.PointTracker<NormalizedLandmark>;
    /**
     * Gets the highest (by camera frame coords) of any of the listed landmarks
     *
     * Eg get whichever wrist is the highest in the camera frame
     * ```js
     * pose.getHighest(`left_wrist`,`right_wrist`);
     * ```
     * @param namesOrIds
     * @returns
     */
    getHighest(...namesOrIds: (PoseLandmarks | number)[]): Points.PointTracker<NormalizedLandmark>;
    /**
     * Returns landmarks in order of distance from the given point.
     *
     * The point should be the same coordinates as poses.
     * @param point Point to compare to
     * @param use2d If _true_, Z coordinate is ignored.
     */
    getByDistanceFromPoint(point: Points.Point, use2d?: boolean): {
        distance: number;
        landmark: Points.PointTracker<NormalizedLandmark>;
        raw: NormalizedLandmark;
    }[];
    /**
     * Returns the closest landmark to `point`
     * @param point
     * @param use2d If _true_ only x,y coordinates are used for distance calculation
     * @returns
     */
    getClosestLandmarkToPoint(point: Points.Point, use2d: boolean): Points.PointTracker<NormalizedLandmark> | undefined;
    /**
     * Gets the lowest (by camera frame coords) of any of the listed landmarks
     *
     * Eg get whichever wrist is the lowest in the camera frame
     * ```js
     * pose.getLowest(`left_wrist`,`right_wrist`);
     * ```
     * @param namesOrIds
     * @returns
     */
    getLowest(...namesOrIds: (PoseLandmarks | number)[]): Points.PointTracker<NormalizedLandmark>;
    /**
     * Gets the nearest (by camera frame coords) of any of the listed landmarks
     *
     * Eg get whichever wrist is the nearest in the camera frame
     * ```js
     * pose.getNearest(`left_wrist`,`right_wrist`);
     * ```
     * @param namesOrIds
     * @returns
     */
    getNearest(...namesOrIds: (PoseLandmarks | number)[]): Points.PointTracker<NormalizedLandmark>;
    /**
     * Gets the furtherest (by camera frame coords) of any of the listed landmarks
     *
     * Eg get whichever wrist is the furtherest in the camera frame
     * ```js
     * pose.getFurtherest(`left_wrist`,`right_wrist`);
     * ```
     * @param namesOrIds
     * @returns
     */
    getFurtherest(...namesOrIds: (PoseLandmarks | number)[]): Points.PointTracker<NormalizedLandmark>;
    /**
     * Returns PointTrackers, sorted by their last Y value
     * @param namesOrIds
     * @returns
     */
    getSortedByY(...namesOrIds: (PoseLandmarks | number)[]): Points.PointTracker<NormalizedLandmark>[];
    /**
     * Returns PointTrackers, sorted by their last Z value
     * @param namesOrIds
     * @returns
     */
    getSortedByZ(...namesOrIds: (PoseLandmarks | number)[]): Points.PointTracker<NormalizedLandmark>[];
    /**
     * Gets the bounding box of the pose, computed using the normalised landmarks.
     * ```js
     * pose.box(); // { x, y, width, height }
     * ````
     *
     * Returns an empty rectangle if there's no data.
     *
     * You can also provide a list of landmark names/indexes to compute the bounding box
     * for just those:
     *
     * ```js
     * // Get bounding box of torso
     * pose.box(`left_shoulder`, `right_shoulder`, `left_hip`, `right_`hip`);
     * ```
     *
     * See also {@link boxWorld} for same behaviour but using world coordinates.
     */
    box(...namesOrIds: (PoseLandmarks | number)[]): Rects.RectPositioned | Readonly<{
        x: 0;
        y: 0;
        width: 0;
        height: 0;
    }>;
    boxWorld(...namesOrIds: (PoseLandmarks | number)[]): Rects.RectPositioned | Readonly<{
        x: 0;
        y: 0;
        width: 0;
        height: 0;
    }>;
    /**
     * Returns height of bounding box (normalised coordinates)
     */
    get height(): number;
    get heightWorld(): number;
    /**
     * Return width of bounding box (normalised coordinates)
     */
    get width(): number;
    get widthWorld(): number;
    /**
     * Returns the id of the sender
     */
    get peerId(): string;
    /**
     * Returns the middle of the pose bounding box using normalised coordinates
     * ```js
     * pose.middle; // { x, y }
     * ```
     * @returns
     */
    get middle(): Points.Point | {
        readonly x: 0;
        readonly y: 0;
    };
    get middleWorld(): Points.Point | {
        readonly x: 0;
        readonly y: 0;
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
     * Gets the min/max Z range of all landmarks (normalised)
     */
    get zRange(): NumbersComputeResult;
    /**
     * Gets the min/max Z range of all landmarks (world coordinates)
     */
    get zRangeWorld(): NumbersComputeResult;
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
     * Enumerates PoseTrackers, sorting by the horizontal middle position.
     * Leftmost pose will be at position 0.
     */
    getByHorizontal(): Generator<PoseTracker, void, undefined>;
    /**
     * Returns poses in order of distance (as judged by their centroid property)
     * from the given point. Since centroid is 2D, distance is also calculated using x,y only.
     *
     * The point should be the same coordinates as poses.
     * @param point Point to compare to
     */
    getByDistanceFromPoint(point: Points.Point): {
        distance: number;
        tracker: PoseTracker;
    }[];
    /**
     * Returns the closest pose to `point`, as judged by its centroid property
     * @param point
     * @returns
     */
    getClosestPoseToPoint(point: Points.Point): PoseTracker | undefined;
    /**
     * Enumerates PoseTrackers, sorting by the vertical middle position.
     * Highest pose will be at position 0.
     */
    getByVertical(): Generator<PoseTracker, void, undefined>;
    /**
     * Enumerates PoseTrackers, sorting by the average Z value.
     * Closest pose will be at position 0.
     */
    getByDistance(): Generator<PoseTracker, void, undefined>;
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
     * for (const n of poses.landmarkValues(`nose`)) {
     *  // Yields: { x, y, z?, score, name }
     * }
     * ```
     *
     * @param namesOrIds Name or index of landmark to get data for
     */
    landmarkValues(...namesOrIds: (PoseLandmarks | number)[]): Generator<ixfx_index_BkFpdty__js.TimestampedObject<NormalizedLandmark>, void, unknown>;
    /**
     * Enumerates all [PointTrackers](https://api.ixfx.fun/classes/Trackers.PointTracker) for a given landmark id.
     *
     * ```js
     * // Return all landmarks for all poses
     * for (const pt of poses.landmarks()) {
     * }
     * ```
     *
     * eg. to get the PointTracker for 'nose' across all poses currently seen:
     *
     * ```js
     * for (const pt of poses.landmarks(`nose`)) {
     *  // do something with tracker...
     * }
     * ```
     *
     * @param namesOrIds List of indexes or landmark names to filter by
     */
    landmarks(...namesOrIds: (PoseLandmarks | number)[]): Generator<Points.PointTracker<NormalizedLandmark>, void, undefined>;
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
     * @param guid Combined id of sender-poseid
     */
    getByGuid(guid: string | undefined): PoseTracker | undefined;
    /**
     * Returns _true_ if a PoseTracker for `guid` is found.
     * @param guid
     */
    hasPoseGuid(guid: string | undefined): boolean;
    /**
     * Returns the raw pose data for a unique id
     * ```js
     * const pose = poses.getRawPoseByGuide(`123-123`);
     * pose.landmark; // array of { x, y, z?, score, name }
     * pose.score;     // score of pose
     * ```
     *
     * Alternatively: {@link getByGuid} to get a tracker for pose
     * @param guid Combined sender-pose
     * @returns
     */
    getRawPoseByGuid(guid: string): PoseData | undefined;
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
/**
 * Object detector options.
 *
 * Preset model names:
 * * EfficientDet-Lite0: lite0-8, lite0-16, lite0-32
 * * EfficientDet-Lite2: lite2-8, lite2-16, lite2-32
 * * SSDMObileNet-V2: mobilenet2-8, mobilenet2-32
 */
type ObjectDetectorOptions = {
    verbosity: Verbosity;
    scoreThreshold: number;
    modelPath: string;
    presetModelPaths?: Record<string, string>;
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
    presetModelPaths?: Record<string, string>;
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
    presetModelPaths?: Record<string, string>;
};
/**
 * Preset model names: lite, full, heavy.
 */
type PoseDetectorOptions = {
    numPoses: number;
    minPoseDetectionConfidence: number;
    minPosePresenceConfidence: number;
    minTrackingConfidence: number;
    outputSegmentationMasks: boolean;
    modelPath: string;
    matcher: PoseMatcherOptions;
    verbosity: Verbosity;
    presetModelPaths?: Record<string, string>;
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
declare const index$1_armHandLeftIndexes: typeof armHandLeftIndexes;
declare const index$1_armHandRightIndexes: typeof armHandRightIndexes;
declare const index$1_armLeftIndexes: typeof armLeftIndexes;
declare const index$1_armRightIndexes: typeof armRightIndexes;
declare const index$1_centroid: typeof centroid;
declare const index$1_centroidWorld: typeof centroidWorld;
declare const index$1_faceIndexes: typeof faceIndexes;
declare const index$1_footLeftIndexes: typeof footLeftIndexes;
declare const index$1_footRightIndexes: typeof footRightIndexes;
declare const index$1_getLandmark: typeof getLandmark;
declare const index$1_getLandmarkIndexByName: typeof getLandmarkIndexByName;
declare const index$1_getLandmarkNameByIndex: typeof getLandmarkNameByIndex;
declare const index$1_getWorldLandmark: typeof getWorldLandmark;
declare const index$1_horizontalSort: typeof horizontalSort;
declare const index$1_legLeftIndexes: typeof legLeftIndexes;
declare const index$1_legRightIndexes: typeof legRightIndexes;
declare const index$1_lineBetween: typeof lineBetween;
declare const index$1_roughCenter: typeof roughCenter;
declare const index$1_torsoIndexes: typeof torsoIndexes;
declare namespace index$1 {
  export { type index$1_PoseData as PoseData, type index$1_PoseLandmarks as PoseLandmarks, index$1_PoseTracker as PoseTracker, index$1_PosesTracker as PosesTracker, type index$1_PosesTrackerOptions as PosesTrackerOptions, index$1_TrackedValueOpts as TrackedValueOpts, index$1_armHandLeftIndexes as armHandLeftIndexes, index$1_armHandRightIndexes as armHandRightIndexes, index$1_armLeftIndexes as armLeftIndexes, index$1_armRightIndexes as armRightIndexes, index$1_centroid as centroid, index$1_centroidWorld as centroidWorld, index$1_faceIndexes as faceIndexes, index$1_footLeftIndexes as footLeftIndexes, index$1_footRightIndexes as footRightIndexes, index$1_getLandmark as getLandmark, index$1_getLandmarkIndexByName as getLandmarkIndexByName, index$1_getLandmarkNameByIndex as getLandmarkNameByIndex, index$1_getWorldLandmark as getWorldLandmark, index$1_horizontalSort as horizontalSort, index$1_legLeftIndexes as legLeftIndexes, index$1_legRightIndexes as legRightIndexes, index$1_lineBetween as lineBetween, index$1_roughCenter as roughCenter, index$1_torsoIndexes as torsoIndexes };
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
