"use client";
import React, { useEffect, useRef, useState } from "react";

interface RecordingPlayerProps {
  audioUrl?: string;
}

const RecordingPlayer: React.FC<RecordingPlayerProps> = ({
  audioUrl,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [progress, setProgress] = useState(0); // 비율 (0 ~ 1)
  const [isPlaying, setIsPlaying] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${mins}:${secs}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  useEffect(() => {
    if (!audioUrl) return;
    const audio = audioRef.current;
    if (audio && audio.readyState >= 1) {
      setDuration(formatTime(audio.duration));
    }
  }, [audioUrl]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const svgWidth = 241;
  const svgHeight = 6;

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Pretendard:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <section
        className={`box-border flex flex-col gap-5 mt-5  p-5 rounded-lg bg-stone-500 h-[50px] w-[357px] `}
        role="region"
        aria-label="Audio recording player"
      >
        <div className="flex relative gap-5 self-stretch">
          {/* 재생 / 일시정지 버튼 */}
          <button
            className="flex "
            aria-label="Play recording"
            onClick={handlePlayPause}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: isPlaying
                  ? `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="2" width="2.5" height="10" fill="#F45F3A"/><rect x="8.5" y="2" width="2.5" height="12" fill="#F45F3A"/></svg>`
                  : `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 6.13397C14.1667 6.51888 14.1667 7.48112 13.5 7.86603L4.5 13.0622C3.83333 13.4471 3 12.966 3 12.1962L3 1.80385C3 1.03405 3.83333 0.552922 4.5 0.937822L13.5 6.13397Z" fill="#F45F3A"/></svg>`,
              }}
            />
          </button>

          {/* 시각 바 (SVG) */}
          <div className="h-4 flex-1 relative">
            <svg
              width={svgWidth}
              height={svgHeight}
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-[14px]"
            >
              {/* 배경 */}
              <rect width={svgWidth} height={5} y={0.5} fill="#FCE134" rx="2.5" />
              {/* 진행 바 */}
              <rect
                width={svgWidth * progress}
                height={5}
                y={0.5}
                fill="#F45F3A"
                rx="2.5"
              />
            </svg>
          </div>

          {/* 시간 표시 */}
          <time className="relative shrink-0 text-xs font-medium text-zinc-50 ">
            {currentTime} / {duration}
          </time>

          {/* 오디오 요소 */}
          {audioUrl && (
            <audio
              ref={audioRef}
              src={audioUrl}
              preload="metadata"
              onLoadedMetadata={(e) => {
                const audio = e.currentTarget;
                setDuration(formatTime(audio.duration));
              }}
              onTimeUpdate={(e) => {
                const audio = e.currentTarget;
                setCurrentTime(formatTime(audio.currentTime));
                setProgress(audio.currentTime / audio.duration || 0);
              }}
              hidden
            />
          )}
        </div>
      </section>
    </>
  );
};

export default RecordingPlayer;
