import {Controller} from "../videoSurveillance";

describe("Video Surveillance controller should", () => {
    it("tell stop recording when no detected motion", () => {
        const mockedRecorder = mockRecorder();
        const mockedSensor = mockSensor(false);
        let controller = new Controller(mockedRecorder, mockedSensor);

        controller.check();

        expect(mockedRecorder.stopRecording).toHaveBeenCalled();
        expect(mockedRecorder.startRecording).not.toHaveBeenCalled();
    });

    it("tell start recording when detected motion", () => {
        const mockedRecorder = mockRecorder();
        const mockedSensor = mockSensor(true);
        let controller = new Controller(mockedRecorder, mockedSensor);

        controller.check();

        expect(mockedRecorder.stopRecording).not.toHaveBeenCalled();
        expect(mockedRecorder.startRecording).toHaveBeenCalled();
    });

    it("tell stop recording when motion sensor raise an error", () => {
        const mockedRecorder = mockRecorder();
        const mockedSensor = mockErrorInSensor();
        let controller = new Controller(mockedRecorder, mockedSensor);

        controller.check();

        expect(mockedRecorder.stopRecording).toHaveBeenCalled();
        expect(mockedRecorder.startRecording).not.toHaveBeenCalled();
    });

    it("check motion sensor once per second", async () => {
        const mockedRecorder = mockRecorder();
        const mockedSensor = mockSensor(true);
        let controller = new Controller(mockedRecorder, mockedSensor);

        let numberOfSecondsRunning = 4;
        await controller.keepChecking(numberOfSecondsRunning);

        expect(mockedSensor.isDetectingMotion).toHaveBeenCalledTimes(4);
    });

    function mockRecorder() {
        return {
            stopRecording: jest.fn(),
            startRecording: jest.fn()
        };
    }

    function mockSensor(motion: boolean) {
        return {
            isDetectingMotion: jest.fn().mockReturnValue(motion)
        };
    }

    function mockErrorInSensor() {
        return {
            isDetectingMotion: () => { throw new Error() }
        };
    }
});
