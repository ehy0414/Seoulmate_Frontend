import { useEffect, useState } from "react";
import { convertToWav } from "../signup/langTest/convertToWav";
import RecordingPlayer from "../signup/langTest/RecordingPlayer";
import { FaRedo, FaStop } from "react-icons/fa";
import { SendIcon } from "../signup/langTest/SendIcon";
import { MicrophoneButton } from "../signup/langTest/MicrophoneButton";
import { useRecorder } from "../../hooks/useRecorder";
import api from "../../services/axios";
import { useSetAtom } from "jotai";
import { userProfileAtom } from "../../store/userProfileAtom";

type RecorderState = "idle" | "recording" | "readyToSend";

interface AudioRecorderProps {
  onScoreReady: (score: number | null) => void;
  setIsSending: (isSending: boolean) => void; // 상위 컴포넌트 로딩 상태
  isKorean: boolean;
}

const ReAudioRecorder = ({ onScoreReady, setIsSending, isKorean }: AudioRecorderProps) => {
  const { isRecording, startRecording, stopRecording } = useRecorder();
  const setUserProfile = useSetAtom(userProfileAtom);

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
      // 점수 업데이트 요청
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
        // 최신 점수 가져와서 atom 업데이트
        const getRes = await api.get("/my-page");
        const languages = getRes.data.data.languages;
        setUserProfile(prev => prev
          ? { ...prev, languages: { ...prev.languages, ...languages } }
          : { profileImageUrl: "", name: "", email: "", bio: "", hobbies: [], university: "", age: 0, languages }
        );
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
