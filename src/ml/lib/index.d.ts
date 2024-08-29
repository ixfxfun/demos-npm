import * as lit from 'lit';
import { LitElement, PropertyValues } from 'lit';
import * as lit_html from 'lit-html';
import { Ref } from 'lit/directives/ref.js';
import * as Mp from '@mediapipe/tasks-vision';
import { ImageSource, Detection as Detection$1, HandLandmarkerResult as HandLandmarkerResult$1, NormalizedLandmark as NormalizedLandmark$1, BoundingBox as BoundingBox$1 } from '@mediapipe/tasks-vision';
import { Point } from 'ixfx/geometry.js';
import { Options as Options$1 } from '@clinth/remote';

declare class Log {
    verbosity: Verbosity;
    prefix: string;
    constructor(prefix: string, verbosity: Verbosity | Log);
    info(msg: any): void;
    debug(msg: any): void;
}

declare class TrackedPose {
    centroid: Point;
    firstSeen: number;
    lastSeen: number;
    id: string;
    constructor();
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
declare const getLowest: <T>(data: Array<T>, fn: (d: T) => number) => {
    data: T;
    score: number;
} | undefined;
declare class PoseMatcher {
    tracked: TrackedPose[];
    distanceThreshold: number;
    ageThreshold: number;
    lastPrune: number;
    log: Log;
    constructor(opts: PoseMatcherOptions);
    toPoses(poses: Mp.PoseLandmarkerResult): Generator<PoseData, void, unknown>;
    toPose(n: Mp.NormalizedLandmark[], l: Mp.Landmark[]): PoseData;
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

declare class Dispatcher extends EventTarget {
    #private;
    onData: OnDispatcherData | undefined;
    constructor(options: Options);
    receivedData(mode: ProcessorModes, data: any): void;
}

declare const defaults: (mode: ProcessorModes) => Options;
declare class MlVision extends EventTarget {
    #private;
    el: VisionElement;
    sources: Sources;
    dispatcher: Dispatcher;
    log: Log;
    constructor(elQuery: string, options?: Partial<Options>);
    init(): void;
}

declare class Recordings {
    #private;
    private readonly sources;
    constructor(sources: Sources);
    delete(source: SourceData): void;
    getSources(): SourceData[];
    getRecording(name: string): RecordingData | undefined;
    add(data: RecordingData): void;
    save(): void;
    init(): void;
    promptName(): string | null;
}

type RecorderStates = `idle` | `recording` | `complete`;
declare class Recorder extends EventTarget {
    #private;
    readonly recordings: Recordings;
    readonly dispatcher: Dispatcher;
    buffer: any[];
    computeFreqMs: number;
    onDataBound: (event: Event) => void;
    log: Log;
    constructor(recordings: Recordings, dispatcher: Dispatcher);
    start(computeFreqMs: number): void;
    get length(): number;
    onData(event: Event): void;
    stop(): void;
    get state(): RecorderStates;
}

type SourcesState = `starting` | `started` | `stopped`;
/**
 * Event: 'updated','state-change'
 */
declare class Sources extends EventTarget {
    #private;
    readonly mlv: MlVision;
    log: Log;
    constructor(cameraOptions: CameraOptions, mlv: MlVision);
    delete(source: SourceData): void;
    get isStarted(): boolean;
    createRecorder(): Recorder;
    startStop(): boolean;
    kindMatch(kind: SourceKinds): boolean;
    start(): Promise<void>;
    stop(): void;
    get cameras(): SourceData[];
    get recordings(): SourceData[];
    init(): void;
    setSource(sourceData: SourceData): void;
    getCurrentId(): string;
    notifySourceUpdated(source: any): void;
    get currentSourceData(): SourceData | undefined;
}

declare class VideoSelector extends LitElement {
    #private;
    static styles: lit.CSSResult;
    source: SourceData | undefined;
    playing: boolean;
    cameras: SourceData[];
    render(): lit_html.TemplateResult<1>;
    getSelected(): SourceData | undefined;
    /**
   * Start stop source & processing
   */
    onStartStopClick(): void;
    onFileSelect(): void;
    notifySourceState(state: SourcesState): void;
    onFileChange(event: Event): void;
    /**
     * User has selected a camera
     * @param event
     * @returns
     */
    onCameraSelectChange(event: Event): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'video-selector': VideoSelector;
    }
}

declare const wrap: (el: HTMLCanvasElement) => {
    dot: (point: Point, radius: number, fillStyle?: string, label?: string, labelFillStyle?: string) => void;
    abs: (pt: Point) => {
        x: number;
        y: number;
    };
    clear: () => void;
    testPattern: () => void;
    scale: (v: number) => number;
    line: (a: Point, b: Point, width: number) => void;
    joinPoints: (width: number, ...points: Array<Point>) => void;
    fill: (style?: string) => void;
    text: (text: string, point: Point, style?: string) => void;
    ctx: CanvasRenderingContext2D;
};
type Typewriter = ReturnType<typeof typewriter>;
declare const typewriter: (ctx: CanvasRenderingContext2D, x?: number, y?: number) => {
    line: (msg: string, colour?: string) => void;
    word: (msg: string, colour?: string) => void;
    move: (toX: number, toY: number) => void;
};
type Wrapper = ReturnType<typeof wrap>;

declare class OverlayElement extends LitElement {
    #private;
    static styles: lit.CSSResult;
    canvasEl: Ref<HTMLCanvasElement>;
    lastHue: number;
    labelPoints: boolean;
    render(): lit_html.TemplateResult<1>;
    setSize(width: number, height: number): void;
    draw(mode: ProcessorModes, data?: any): void;
    drawFaces(wrap: Wrapper, d: Detection$1[]): void;
    drawHands(wrap: Wrapper, results: HandLandmarkerResult$1): void;
    drawHand(wrap: Wrapper, p: NormalizedLandmark$1[], colour: string): void;
    drawObjects(wrap: Wrapper, data: Detection$1[]): void;
    drawDetectionBoundingBox(wrap: Wrapper, det: Detection$1, colour: string, typewriter: Typewriter): void;
    drawBoundingBox(ctx: CanvasRenderingContext2D, bbox: BoundingBox$1, colour: string): void;
    getColour(id: string): string;
    drawLandmarks(wrap: Wrapper, poses: NormalizedLandmark$1[][]): void;
    drawOneSetOfLandmarks(wrap: Wrapper, p: NormalizedLandmark$1[], maxRadius: number, colour: string): void;
    drawPose(wrap: Wrapper, pose: PoseData): void;
    drawPoseLines(wrap: Wrapper, p: NormalizedLandmark$1[], colour: string): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'overlay-element': OverlayElement;
    }
}

type VideoSourceStates = `started` | `stopped`;
/**
 * Events:
 * * state
 * * sized: {width/height}
 */
declare class VideoSourceElement extends LitElement {
    #private;
    videoEl: Ref<HTMLVideoElement>;
    source: SourceData | undefined;
    log: Log;
    showPreview: boolean;
    render(): lit_html.TemplateResult<1>;
    togglePreview(): void;
    getVideoElement(): HTMLVideoElement | undefined;
    getVideoSize(): {
        width: number;
        height: number;
    } | undefined;
    get isStarted(): boolean;
    start(): void;
    stop(): void;
    onLoadedMetadata(): void;
    /**
     * From video element - now playing
     */
    onPlaying(): void;
    /**
     * From video element - now stopped
     */
    onPause(): void;
    /**
     * From video element - now stopped
     */
    onEnded(): void;
    setVideoSource(source: MediaProvider | string | null | undefined): void;
    static styles: lit.CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'video-source': VideoSourceElement;
    }
}

declare class RecPanel extends LitElement {
    static styles: lit.CSSResult;
    recordings: SourceData[];
    playing: boolean;
    selectEl: Ref<HTMLSelectElement>;
    render(): lit_html.TemplateResult<1>;
    onStartStopClick(): void;
    onSelectChange(event: Event): void;
    getSelected(): SourceData | undefined;
    onDeleteClick(): void;
    notifySourceState(state: SourcesState): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'rec-panel': RecPanel;
    }
}

declare class VisionElement extends LitElement {
    #private;
    videoSelectorEl: Ref<VideoSelector>;
    videoSourceEl: Ref<VideoSourceElement>;
    overlayEl: Ref<OverlayElement>;
    recPanelEl: Ref<RecPanel>;
    debug: boolean;
    uiSource: `video` | `recording`;
    recorder: Recorder | undefined;
    hideModelSelector: boolean;
    render(): lit_html.TemplateResult<1>;
    onRequestMode(event: Event): void;
    onRecRequestDelete(event: Event): void;
    onRecSelectorChange(event: Event): void;
    /**
     * User has choosing a new camera
     * @param event
     */
    onVideoSelectorChange(event: Event): void;
    onRecStartStop(event: Event): void;
    onVideoStartStop(event: Event): void;
    getRecordingUi(): lit_html.TemplateResult<1> | undefined;
    onStopRecording(): void;
    onStartRecording(): void;
    onOverlayClick(): void;
    setOptions(options: Options): void;
    /**
     * User swapped between camera/recording in UI
     * @param event
     * @returns
     */
    onSelectSource(event: Event): void;
    /**
     * Notification that sources have been updated
     * @param sources
     */
    onSourcesUpdated(cameras: SourceData[], recordings: SourceData[]): void;
    connectedCallback(): void;
    protected firstUpdated(_changedProperties: PropertyValues): void;
    updateRecPanel(): void;
    /**
     * Notification that source has changed
     * @param source
     */
    notifySourceChange(source: SourceData): void;
    notifySourceState(state: SourcesState, source?: SourceData): void;
    onVideoSized(): void;
    resizeElements(): void;
    onSourceChange(event: CustomEvent): void;
    onReceivedData(mode: ProcessorModes, data: any): void;
    getVideoSource(): VideoSourceElement | undefined;
    getVideoElement(): HTMLVideoElement | undefined;
    static styles: lit.CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'vision-element': VisionElement;
    }
}

declare class ModelElement extends LitElement {
    static styles: lit.CSSResult;
    render(): lit_html.TemplateResult<1>;
    onSelectChange(event: Event): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'model-element': ModelElement;
    }
}

declare class PoseDetector implements IModel {
    readonly p: CommonModelOptions;
    lp: Mp.PoseLandmarker | undefined;
    opts: PoseDetectorOptions;
    matcher: PoseMatcher;
    log: Log;
    constructor(p: CommonModelOptions, opts?: Partial<PoseDetectorOptions>);
    static defaults(): PoseDetectorOptions;
    compute(v: Mp.ImageSource, callback: ComputeCallback, timestamp: number): void;
    init(): Promise<boolean>;
    dispose(): void;
}

type OnReceivedData = (msg: unknown) => void;
declare class Client extends EventTarget {
    #private;
    onData: OnReceivedData | undefined;
    constructor(options?: Options$1);
}

type ProcessingStates = `queued-start` | `starting` | `started` | `stopping` | `stopped`;
declare class Processing extends EventTarget {
    #private;
    readonly mlv: MlVision;
    log: Log;
    dispatcher: Dispatcher;
    poseOptions: PoseDetectorOptions;
    objectDetectorOptions: ObjectDetectorOptions;
    faceDetectorOptions: FaceDetectorOptions;
    handDetectorOptions: HandDetectorOptions;
    computeFreqMs: number;
    dispatcherBound: (mode: ProcessorModes, data: any) => void;
    wasmBase: string;
    modelsBase: string;
    constructor(mlv: MlVision, opts: Options);
    stop(): void;
    setMode(mode: ProcessorModes): void;
    getModelOptions(): CommonModelOptions;
    start(video: HTMLVideoElement): Promise<void>;
    setState(state: ProcessingStates): void;
    get isStarted(): boolean;
    get currentMode(): ProcessorModes;
}

export { type BoundingBox, type CameraOptions, type Category, Client, type CommonModelOptions, type ComputeCallback, type Detection, type FaceDetectorOptions, type HandDetectorOptions, type HandLandmarkerResult, type IModel, type ISource, type Landmark, MlVision, ModelElement, type NormalizedKeypoint, type NormalizedLandmark, type ObjectDetectorOptions, type OnDispatcherData, type OnReceivedData, type Options, OverlayElement, type OverlayOptions, type PoseData, PoseDetector, type PoseDetectorOptions, PoseMatcher, type PoseMatcherOptions, Processing, type ProcessingStates, RecPanel, type RecordingData, type SourceData, type SourceKinds, type Verbosity, VideoSourceElement, type VideoSourceStates, VisionElement, defaults, getLowest };
