import { useEffect, useState } from "react";
import { useRecorder } from "../../../hooks/useRecorder";
import { convertToWav } from "./convertToWav";
import { SendIcon } from "./SendIcon";
import { MicrophoneButton } from "./MicrophoneButton";
import { FaStop, FaRedo } from "react-icons/fa";
import RecordingPlayer from "./RecordingPlayer";
import api from "../../../services/axios";
import { form } from "framer-motion/client";

type RecorderState = "idle" | "recording" | "readyToSend" | "done";

interface AudioRecorderProps {
  onScoreReady: (score: number | null) => void;
  setIsSending: (isSending: boolean) => void; // 상위 컴포넌트의 로딩 상태를 변경하는 함수를 받습니다.
  isKorean: boolean;
}

const AudioRecorder = ({ onScoreReady, setIsSending, isKorean }: AudioRecorderProps) => {
  const { isRecording, startRecording, stopRecording } = useRecorder();
  
  // AudioRecorder 컴포넌트의 상태를 관리합니다.
  const [recorderState, setRecorderState] = useState<RecorderState>("idle");
  const [wavBlob, setWavBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [language, setLanguage] = useState<string>("");

  useEffect(() => {
    isKorean ? setLanguage("KOREAN") : setLanguage("ENGLISH");
    //console.log("Language set to:", language);
  }, [isKorean]);

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

  const handleRestart = () => {
    setWavBlob(null);
    setAudioUrl(null);
    onScoreReady(null);
    setRecorderState("idle");
  };

  const handleSend = async () => {
    if (!wavBlob) return;
    
    // 전송 시작 시 상위 컴포넌트에 로딩 시작을 알립니다.
    setIsSending(true);

    const formData = new FormData();
    formData.append("audioFile", wavBlob, "recording.wav");
    formData.append("language", language);

    try {
      // 실제 API 요청을 시뮬레이션하기 위해 3초의 딜레이를 추가했습니다.
      // setTimeout(() => {
      //   const score = 13;
      //   onScoreReady(score);
      //   setRecorderState("readyToSend");
      //   setIsSending(false); // 딜레이 후 로딩 상태를 해제합니다.
      // }, 3000); // 3초 (3000ms) 딜레이
      
      // 실제 API 요청 코드 
      const response = await api.post("/signup/language/take-level-test", formData, {
        headers: {
          'Accept': 'application/json',
        }
      });

      onScoreReady(response.data.data);
      setRecorderState("readyToSend");
      setIsSending(false);

    } catch (err) {
      console.error("음성 분석에 실패했습니다:", err);
      setRecorderState("readyToSend");
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mx-auto h-40 w-[357px] relative">

      {audioUrl && <RecordingPlayer audioUrl={audioUrl} />}

      {recorderState === "readyToSend" ? (
        <div className="flex gap-4">
          <button
            onClick={handleRestart}
            className="flex justify-center items-center bg-primary-700 hover:bg-primary-800 rounded-lg h-[45px] w-[45px] transition-colors"
          >
            <FaRedo color="white" size={20} />
          </button>

          <button
            onClick={handleSend}
            className="flex justify-center items-center bg-primary-700 hover:bg-primary-800 rounded-lg h-[45px] w-[45px] transition-colors"
          >
            <SendIcon />
          </button>
        </div>
      ) : (
        <button
          onClick={handleMicClick}
          className="flex justify-center mt-10 items-center bg-primary-700 hover:bg-primary-800 rounded-lg h-[45px] w-[45px] transition-colors"
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
