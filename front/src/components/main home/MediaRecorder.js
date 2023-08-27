import React, { useState } from 'react';
import RecordRTC from 'recordrtc';
import {Tab, Tabs} from "react-bootstrap";

const MediaRecorder = () => {
    const [startWebcamRec, setStartWebcamRec] = useState(false);
    const [startScreenRec, setStartScreenRec] = useState(false);
    const [webcamSetup, setWebcamSetup] = useState(null);
    const [screenSetup, setScreenSetup] = useState(null);
    const [dataForWebcam, setDataForWebcam] = useState(null);
    const [dataForScreen, setDataForScreen] = useState(null);
    const [audioWebcam, setAudioWebcam] = useState(true);
    const [audioScreenRecord, setAudioScreenRecord] = useState(true);
    const [resolution, setResolution] = useState('1920x1080');
    const [key, setKey] = useState('1');

    const webRec = async () => {
        try {
            const data = await navigator.mediaDevices.getUserMedia({
                audio: audioWebcam,
                video: { width: resolution.split('x')[0], height: resolution.split('x')[1] } });

            const recordRTC = RecordRTC(data, {
                type: 'video',
                mimeType: 'video/webm',
            });
            recordRTC.startRecording();
            setWebcamSetup(data);
            setDataForWebcam(recordRTC);
            setStartWebcamRec(true);
        } catch (error) {
            console.error('Error recording webcam data:', error);
        }
    };

    const screenRec = async () => {
        try {
            const data = await navigator.mediaDevices.getDisplayMedia(
                { audio: audioScreenRecord,
                    video: { width: resolution.split('x')[0], height: resolution.split('x')[1] } });

            const recordRTC = RecordRTC(data, {
                type: 'video',
                mimeType: 'video/webm',
            });
            recordRTC.startRecording();
            setScreenSetup(data);
            setDataForScreen(recordRTC);
            setStartScreenRec(true);
        } catch (error) {
            console.error('Error recording screen data:', error);
        }
    };

    const stopRecording = (recorder, stream, setRecording) => {
        if (recorder) {
            recorder.stopRecording(() => {
                const blob = recorder.getBlob();
                const url = URL.createObjectURL(blob);

                const a = document.createElement('a');
                a.href = url;
                a.download = 'recorded-media.webm';
                a.click();
            });

            stream.getTracks().forEach(track => track.stop());
            setRecording(false);
        }
    };

    return (
        <div>
            <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
                <Tab eventKey="1" title="Webcam Record 1">
                    <h1 className="mt-4">Webcam Recording</h1>
                    <div className="form-check">
                        <input className="form-check-input"
                               type="checkbox"
                               checked={audioWebcam}
                               onChange={() => setAudioWebcam(!audioWebcam)}
                        />
                        <label class="form-check-label">
                            Record with Audio
                        </label>
                    </div>


                    <br />
                    <div className="div-2">
                        <div className="form-group">
                            <label htmlFor="resolution">Resolution:</label>
                            <select className="form-control form-control-sm" id="resolution" value={resolution} onChange={(e) => setResolution(e.target.value)}>
                                <option value="1920x1080">1920x1080</option>
                                <option value="1280x720">1280x720</option>
                                <option value="640x480">640x480</option>
                            </select>
                        </div>
                    </div>

                    <br />
                    <button type="button" className="btn btn-secondary button-width" onClick={webRec} disabled={startWebcamRec}>
                        Start Webcam Recording
                    </button>
                    <button type="button" className="btn btn-danger button-width" onClick={() => stopRecording(dataForWebcam, webcamSetup, setStartWebcamRec)} disabled={!startWebcamRec}>
                        Stop Webcam Recording
                    </button>
                </Tab>
                <Tab eventKey="2" title="Screen Record">
                    <h1 className="mt-4">Screen Recording</h1>
                    <div className="form-check">
                        <input className="form-check-input"
                               type="checkbox"
                               checked={audioScreenRecord}
                               onChange={() => setAudioScreenRecord(!audioScreenRecord)}
                        />
                        <label className="form-check-label">
                            Record with Audio
                        </label>
                    </div>
                    <br />
                    <div className="div-2">
                        <div className="form-group">
                            <label htmlFor="resolution">Resolution:</label>
                            <select className="form-control form-control-sm" id="resolution" value={resolution} onChange={(e) => setResolution(e.target.value)}>
                                <option value="1920x1080">1920x1080</option>
                                <option value="1280x720">1280x720</option>
                                <option value="640x480">640x480</option>
                            </select>
                        </div>
                    </div>
                    <br/>

                    <button type="button" className="btn btn-secondary button-width" onClick={screenRec} disabled={startScreenRec}>
                        Start Screen Recording
                    </button>

                    <button type="button" className="btn btn-danger button-width" onClick={() => stopRecording(dataForScreen, screenSetup, setStartScreenRec)} disabled={!startScreenRec}>
                        Stop Screen Recording
                    </button>
                </Tab>
            </Tabs>
        </div>
    );
};

export default MediaRecorder;
