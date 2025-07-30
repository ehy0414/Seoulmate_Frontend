import audioBufferToWav from 'audiobuffer-to-wav';

/**
 * 주어진 오디오 Blob 데이터를 WAV 형식의 Blob으로 변환하는 함수
 * @param blob - 입력 오디오 Blob (예: webm 또는 다른 형식)
 * @returns WAV 형식의 Blob
 */

export const convertToWav = async (blob: Blob): Promise<Blob> => {
  // Blob을 ArrayBuffer로 변환: binary 데이터를 처리하기 위함
  const arrayBuffer = await blob.arrayBuffer();

  // 웹 오디오 API의 AudioContext 생성 (오디오 데이터 처리를 위한 컨텍스트)
  const audioCtx = new AudioContext();

  // ArrayBuffer를 AudioBuffer로 디코딩 (오디오 파형 데이터로 변환)
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

  // AudioBuffer를 WAV 포맷의 ArrayBuffer로 변환
  const wavBuffer = audioBufferToWav(audioBuffer);

  // WAV 포맷 ArrayBuffer를 Blob으로 래핑하여 반환 (타입을 'audio/wav'로 지정)
  return new Blob([wavBuffer], { type: 'audio/wav' });
};
