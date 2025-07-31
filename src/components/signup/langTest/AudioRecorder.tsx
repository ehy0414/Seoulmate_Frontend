"use client";

import { useState } from "react";
import { useRecorder } from "../../../hooks/useRecorder";
import { convertToWav } from "./convertToWav";
import { SendIcon } from "./SendIcon";
import { MicrophoneButton } from "./MicrophoneButton";
import { FaStop, FaCheck  } from "react-icons/fa";


type RecorderState = "idle" | "recording" | "readyToSend" | "sending" | "done";

interface AudioRecorderProps {
  onScoreReady: (score: number) => void;
}

const AudioRecorder = ({ onScoreReady }: AudioRecorderProps) => {
  const { isRecording, startRecording, stopRecording } = useRecorder();
  const [recorderState, setRecorderState] = useState<RecorderState>("idle");
  const [wavBlob, setWavBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handleMicClick = async () => {
    if (recorderState === "idle") {
      startRecording();
      setRecorderState("recording");
    } else if (recorderState === "recording") {
      const blob = await stopRecording();
      const wav = await convertToWav(blob);
      const url = URL.createObjectURL(wav);
      setWavBlob(wav);
      setAudioUrl(url);
      setRecorderState("readyToSend");
    }
  };

  const handleSend = async () => {
    if (!wavBlob) return;
    setRecorderState("sending");

    const formData = new FormData();
    formData.append("file", wavBlob, "recording.wav");

    try {
      // 테스트용 딜레이
      alert("음성파일이 제출되었습니다. 테스트는 10초가 걸리니 잠시 기다려주세요!");
      setTimeout(() => {
        const score = 13;
        onScoreReady(score);
        setRecorderState("done");
        setWavBlob(null);
        setAudioUrl(null);

        // 2초 후 다시 idle로 복귀
        setTimeout(() => setRecorderState("idle"), 2000);
    }, 10000);


      // 실제 요청이라면 이 부분 사용:
      // const response = await fetch("/api/score", { method: "POST", body: formData });
      // const { score } = await response.json();
      // onScoreReady(score);
      // setTimeout(() => setRecorderState("idle"), 2000);
    } catch (err) {
      alert("음성 분석에 실패했습니다.");
      console.error(err);
      setRecorderState("readyToSend");
    }
  };

  return (
    <div className="flex gap-4 items-center m-5 h-40 w-[357px]">
      <div className="flex items-center px-4 py-0 rounded-lg border bg-zinc-50 border-zinc-900 flex-1 h-[45px]">
        <p className="text-sm font-medium text-zinc-900 truncate">
          {audioUrl ? "녹음된 파일.wav" : "음성 파일을 녹음하세요"}
        </p>
      </div>

      {recorderState === "sending" ? (
        <div className="flex justify-center items-center w-[45px] h-[45px]">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary-700" />
        </div>
        ) : recorderState === "done" ? (
        <div className="flex justify-center items-center bg-primary-700 rounded-lg w-[45px] h-[45px]">
            <FaCheck color="white" size={20} />
        </div>
        ) : recorderState === "readyToSend" ? (
        <button
            onClick={handleSend}
            className="flex justify-center items-center bg-primary-700 hover:bg-primary-800 rounded-lg w-[45px] h-[45px] transition-colors"
        >
            <SendIcon />
        </button>
        ) : (
        <button
            onClick={handleMicClick}
            className="flex justify-center items-center bg-primary-700 hover:bg-primary-800 rounded-lg w-[45px] h-[45px] transition-colors"
        >
            {recorderState === "recording" ? (
            <FaStop color="#fff" size={20} />
            ) : (
            <MicrophoneButton />
            )}
        </button>
        )}
    </div>
  );
};

export default AudioRecorder;
