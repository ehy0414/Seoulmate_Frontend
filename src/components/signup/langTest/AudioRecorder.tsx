"use client";

import { useState } from 'react';
import { convertToWav } from './convertToWav';
import { useRecorder } from '../../../hooks/useRecorder';

interface AudioRecorderProps {
    onWavReady: (wavBlob: Blob) => void;
}

const AudioRecorder = ({ onWavReady }: AudioRecorderProps) => {
    const { isRecording, startRecording, stopRecording } = useRecorder();
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    // 녹음 시작 핸들러
    const handleStart = () => {
        startRecording();
    };

    // 녹음 중지 핸들러 (오디오 타입형식을 wav로 변경)
    const handleStop = async () => {
        const blob = await stopRecording();
        const wavBlob = await convertToWav(blob);
        const url = URL.createObjectURL(wavBlob);
        setAudioUrl(url);
        onWavReady(wavBlob);
    };

    return (
        <div className="mt-4 p-4 w-full text-center">
            <button
                onClick={isRecording ? handleStop : handleStart}
                className={`px-4 py-2 rounded text-white ${
                isRecording ? 'bg-red-500' : 'bg-blue-500'
                }`}
            >
                {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>

            {audioUrl && (
                <div className="mt-4">
                <audio controls src={audioUrl} />
                </div>
            )}
        </div>
    );
};

export default AudioRecorder;
