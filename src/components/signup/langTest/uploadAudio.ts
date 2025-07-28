import axios from 'axios';


// 오디오 파일을 서버로 보내주는 함수
export const uploadAudio = async (wavBlob: Blob) => {
  const formData = new FormData();
  formData.append('file', wavBlob, 'recording.wav');


  // 임시 api주소
  const response = await axios.post('/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
