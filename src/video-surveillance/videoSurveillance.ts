export class Controller {
    constructor(private videoRecorder: VideoRecorder, private motionSensor: MotionSensor) {
    }

    public check(): void {
        try {
            if (this.motionSensor.isDetectingMotion()) {
                this.videoRecorder.startRecording();
            } else {
                this.videoRecorder.stopRecording();
            }
        } catch (e) {
            this.videoRecorder.stopRecording();
        }
    }

    public async keepChecking(numberOfSecondsRunning: number) {
        for (let i = 0; i < numberOfSecondsRunning; i++) {
            this.check();
            await this.sleep(1000);
        }
    }

    private sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export interface MotionSensor {
    isDetectingMotion(): boolean;
}

export interface VideoRecorder {
    startRecording(): void;

    stopRecording(): void;
}
