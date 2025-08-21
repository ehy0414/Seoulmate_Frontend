import { useEffect, useState } from "react";
import { convertToWav } from "../signup/langTest/convertToWav";
import RecordingPlayer from "../signup/langTest/RecordingPlayer";
import { FaRedo, FaStop } from "react-icons/fa";
import { SendIcon } from "../signup/langTest/SendIcon";
import { MicrophoneButton } from "../signup/langTest/MicrophoneButton";
import { useRecorder } from "../../hooks/useRecorder";
import api from "../../services/axios";

type RecorderState = "idle" | "recording" | "readyToSend";

interface AudioRecorderProps {
  onScoreReady: (score: number | null) => void;
  setIsSending: (isSending: boolean) => void; // 상위 컴포넌트 로딩 상태
  isKorean: boolean;
}

const ReAudioRecorder = ({ onScoreReady, setIsSending, isKorean }: AudioRecorderProps) => {
  const { isRecording, startRecording, stopRecording } = useRecorder();

  const [recorderState, setRecorderState] = useState<RecorderState>("idle");
  const [wavBlob, setWavBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  // WAV URL 메모리 해제
  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

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

    setIsSending(true);

    const lang = isKorean ? "ENGLISH" : "KOREAN";

    const formData = new FormData();
    formData.append("audioFile", wavBlob, "recording.wav");

    try {
      // query parameter 방식으로 수정
      const response = await api.patch(
        `/my-page/update-language-level?language=${lang}`,
        formData,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      if(response.data.success === true) {
        onScoreReady(1);
      }
      setRecorderState("readyToSend");
    } catch (err) {
      console.error("음성 분석에 실패했습니다:", err);
      alert("다시 시도해주세요.");
      setRecorderState("readyToSend");
      onScoreReady(null);
    } finally {
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
          {recorderState === "recording" ? <FaStop color="#fff" size={20} /> : <MicrophoneButton />}
        </button>
      )}
    </div>
  );
};

export default ReAudioRecorder;
